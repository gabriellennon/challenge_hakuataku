import { Document } from '@/types'
import { useState, useEffect } from 'react'

export function useKnowledgeBase() {
	const [documents, setDocuments] = useState<Document[]>([])
	const [filteredDocs, setFilteredDocs] = useState<Document[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<string>('title')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchDocuments()
	}, [])

	useEffect(() => {
		filterAndSortDocuments()
	}, [searchTerm, selectedCategory, selectedTags, sortBy, documents])

	const fetchDocuments = async () => {
		setLoading(true)
		const mockDocs: Document[] = [
			{
				id: '1',
				title: 'API Documentation',
				content: 'Complete API reference for Hakutaku platform',
				category: 'api',
				tags: ['api', 'reference', 'backend'],
				createdAt: '2024-01-15',
				author: 'João Silva',
			},
			{
				id: '2',
				title: 'User Guide',
				content: 'How to use Hakutaku knowledge management system',
				category: 'docs',
				tags: ['guide', 'tutorial', 'frontend'],
				createdAt: '2024-01-20',
				author: 'Maria Santos',
			},
			{
				id: '3',
				title: 'Architecture Overview',
				content: 'System architecture and design patterns',
				category: 'wiki',
				tags: ['architecture', 'design', 'system'],
				createdAt: '2024-01-10',
				author: 'Pedro Costa',
			},
		]
		setDocuments(mockDocs)
		setLoading(false)
	}

	const filterAndSortDocuments = () => {
		let filtered = documents

		if (searchTerm.trim() !== '') {
			filtered = filtered.filter(
				(doc) =>
					doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
			)
		}

		if (selectedCategory !== 'all') {
			filtered = filtered.filter((doc) => doc.category === selectedCategory)
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)))
		}

		if (sortBy === 'title') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === 'date') {
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		} else if (sortBy === 'author') {
			filtered.sort((a, b) => a.author.localeCompare(b.author))
		}

		setFilteredDocs(filtered)
	}

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const getAllTags = () => {
		const allTags = documents.flatMap((doc) => doc.tags)
		return [...new Set(allTags)]
	}

	return {
		documents,
		filteredDocs,
		searchTerm,
		selectedCategory,
		selectedTags,
		sortBy,
		loading,
		setSearchTerm,
		setSelectedCategory,
		setSortBy,
		handleTagToggle,
		getAllTags,
	}
}
