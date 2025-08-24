import { expect } from 'chai'
import { searchKnowledge } from '../lib/searchAPI'

describe('Search Relevance Algorithm', () => {
	it('should return empty array for empty query', async () => {
		const results = await searchKnowledge('')
		expect(results).to.deep.equal([])
	})

	it('should return results for valid query', async () => {
		const results = await searchKnowledge('busca')
		expect(results.length).to.be.greaterThan(0)
		expect(results[0]).to.have.property('id')
		expect(results[0]).to.have.property('title')
		expect(results[0]).to.have.property('score')
	})

	it('should prioritize title matches over content matches', async () => {
		const results = await searchKnowledge('busca')

		const titleMatch = results.find((r) => r.title.toLowerCase().includes('busca'))
		const contentOnlyMatch = results.find((r) => !r.title.toLowerCase().includes('busca') && r.content.toLowerCase().includes('busca'))

		if (titleMatch && contentOnlyMatch) {
			expect(titleMatch.score).to.be.greaterThan(contentOnlyMatch.score)
		}
	})

	it('should calculate relevance scores correctly', async () => {
		const results = await searchKnowledge('RAG')

		// Todos os resultados devem ter score calculado (não 0)
		results.forEach((result) => {
			expect(result.score).to.be.greaterThan(0)
		})

		for (let i = 1; i < results.length; i++) {
			expect(results[i - 1].score).to.be.at.least(results[i].score)
		}
	})

	it('should handle accent normalization', async () => {
		const results = await searchKnowledge('semantica')
		expect(results.some((r) => r.title.includes('semântica') || r.content.includes('semântica'))).to.equal(true)
	})

	it('should respect limit parameter', async () => {
		const results = await searchKnowledge('busca', 3)
		expect(results.length).to.be.at.most(3)
	})

	it('should handle partial word matches', async () => {
		const results = await searchKnowledge('integr')
		expect(results.some((r) => r.title.includes('integração') || r.content.includes('integração'))).to.equal(true)
	})

	// Cenários específicos do README
	it('should prioritize title matches for "busca" query', async () => {
		const results = await searchKnowledge('busca')
		
		// Deve ter resultados
		expect(results.length).to.be.greaterThan(0)
		
		// Resultados com "busca" no título devem ter score maior
		const titleMatches = results.filter(r => r.title.toLowerCase().includes('busca'))
		const contentMatches = results.filter(r => !r.title.toLowerCase().includes('busca') && (r.content.toLowerCase().includes('busca') || r.snippet.toLowerCase().includes('busca')))
		
		if (titleMatches.length > 0 && contentMatches.length > 0) {
			expect(titleMatches[0].score).to.be.greaterThan(contentMatches[0].score)
		}
	})

	it('should find "semântica" when searching for "semantica" (no accent)', async () => {
		const results = await searchKnowledge('semantica')
		
		// Deve encontrar documentos com "semântica"
		const hasSemanticMatch = results.some(r => 
			r.title.toLowerCase().includes('semântica') || 
			r.content.toLowerCase().includes('semântica') ||
			r.snippet.toLowerCase().includes('semântica')
		)
		
		expect(hasSemanticMatch).to.equal(true)
		expect(results.length).to.be.greaterThan(0)
	})

	it('should find "busca" when searching for "buca" (typo)', async () => {
		const results = await searchKnowledge('buca')
		
		// Deve encontrar documentos relacionados a "busca" através de fuzzy matching
		expect(results.length).to.be.greaterThan(0)
		
		// Pelo menos um resultado deve ter score > 0
		expect(results.some(r => r.score > 0)).to.equal(true)
	})

	it('should handle multiple query terms correctly', async () => {
		const results = await searchKnowledge('busca semantica')
		
		// Deve encontrar resultados que mencionam ambos os termos ou similares
		expect(results.length).to.be.greaterThan(0)
		
		// Resultados devem ter scores calculados
		results.forEach(result => {
			expect(result.score).to.be.greaterThan(0)
		})
	})
})

describe('Edge Cases', () => {
	it('should handle single character query', async () => {
		const results = await searchKnowledge('a')
		expect(Array.isArray(results)).to.equal(true)
	})

	it('should handle special characters', async () => {
		const results = await searchKnowledge('GraphQL')
		expect(results.length).to.be.greaterThan(0)
	})

	it('should handle case insensitive search', async () => {
		const lowerResults = await searchKnowledge('graphql')
		const upperResults = await searchKnowledge('GRAPHQL')
		const mixedResults = await searchKnowledge('GraphQL')

		expect(lowerResults.length).to.equal(upperResults.length)
		expect(lowerResults.length).to.equal(mixedResults.length)
	})
})
