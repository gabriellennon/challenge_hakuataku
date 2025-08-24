import mockData from './mockData.json'

export type SearchResult = {
	id: string
	title: string
	content: string
	category: 'documentation' | 'api' | 'wiki' | 'slack' | 'email'
	source: string
	score: number
	snippet: string
	timestamp: string
	author?: string
}

const mockResults: SearchResult[] = mockData as SearchResult[]

// Normaliza texto removendo acentos e convertendo para lowercase
function normalizeText(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
}

// Calcula distância de Levenshtein para fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
	const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
	
	for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
	for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
	
	for (let j = 1; j <= str2.length; j++) {
		for (let i = 1; i <= str1.length; i++) {
			const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
			matrix[j][i] = Math.min(
				matrix[j][i - 1] + 1,     // deletion
				matrix[j - 1][i] + 1,     // insertion
				matrix[j - 1][i - 1] + indicator // substitution
			)
		}
	}
	
	return matrix[str2.length][str1.length]
}

// Verifica se há fuzzy match (tolerância para typos)
function isFuzzyMatch(term: string, text: string, threshold = 0.8): boolean {
	const words = text.split(/\s+/)
	
	for (const word of words) {
		if (word.length >= term.length - 1) {
			const distance = levenshteinDistance(term, word)
			const similarity = 1 - (distance / Math.max(term.length, word.length))
			if (similarity >= threshold) {
				return true
			}
		}
	}
	return false
}

// Calcula frequência do termo no texto
function calculateTermFrequency(term: string, text: string): number {
	const normalizedText = normalizeText(text)
	const normalizedTerm = normalizeText(term)
	
	// Exact matches
	const exactMatches = (normalizedText.match(new RegExp(normalizedTerm, 'g')) || []).length
	
	// Fuzzy matches (com peso menor)
	const words = normalizedText.split(/\s+/)
	let fuzzyMatches = 0
	
	for (const word of words) {
		if (word !== normalizedTerm && isFuzzyMatch(normalizedTerm, word, 0.7)) {
			fuzzyMatches++
		}
	}
	
	return exactMatches + (fuzzyMatches * 0.5) // Fuzzy matches valem metade
}

// Calcula TF-IDF simplificado
function calculateScore(query: string, result: SearchResult): number {
	const queryTerms = normalizeText(query).split(/\s+/).filter(term => term.length > 1)
	let totalScore = 0
	
	for (const term of queryTerms) {
		// Term Frequency no título (peso 3x)
		const titleTF = calculateTermFrequency(term, result.title)
		const titleScore = titleTF * 3
		
		// Term Frequency no conteúdo (peso 1x)
		const contentTF = calculateTermFrequency(term, result.content)
		const contentScore = contentTF * 1
		
		// Term Frequency no snippet (peso 2x)
		const snippetTF = calculateTermFrequency(term, result.snippet)
		const snippetScore = snippetTF * 2
		
		// Bonus por correspondência em category/author
		let categoryBonus = 0
		if (normalizeText(result.category).includes(normalizeText(term))) {
			categoryBonus = 1.5
		}
		
		let authorBonus = 0
		if (result.author && normalizeText(result.author).includes(normalizeText(term))) {
			authorBonus = 1.2
		}
		
		const termScore = titleScore + contentScore + snippetScore + categoryBonus + authorBonus
		
		// Aplica log para evitar dominância de termos muito frequentes
		totalScore += termScore > 0 ? Math.log(1 + termScore) : 0
	}
	
	// Normaliza o score para um valor entre 0 e 1
	return Math.min(totalScore / (queryTerms.length * 3), 1)
}

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
	if (!query.trim()) {
		return []
	}

	const queryTerms = normalizeText(query).split(/\s+/).filter(term => term.length > 1)
	
	const filtered = mockResults.filter((result) => {
		return queryTerms.some(term => {
			const normalizedTitle = normalizeText(result.title)
			const normalizedContent = normalizeText(result.content)
			const normalizedSnippet = normalizeText(result.snippet)
			const normalizedCategory = normalizeText(result.category)
			const normalizedAuthor = result.author ? normalizeText(result.author) : ''
			
			const hasExactMatch = 
				normalizedTitle.includes(term) ||
				normalizedContent.includes(term) ||
				normalizedSnippet.includes(term) ||
				normalizedCategory.includes(term) ||
				normalizedAuthor.includes(term)
			
			const hasFuzzyMatch = 
				isFuzzyMatch(term, normalizedTitle) ||
				isFuzzyMatch(term, normalizedContent) ||
				isFuzzyMatch(term, normalizedSnippet)
			
			return hasExactMatch || hasFuzzyMatch
		})
	})

	const withScores = filtered.map(result => ({
		...result,
		score: calculateScore(query, result)
	}))

	const sorted = withScores
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)

	return sorted
}
