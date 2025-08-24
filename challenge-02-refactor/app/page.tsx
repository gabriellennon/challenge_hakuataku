'use client'

import { useKnowledgeBase } from '../hooks/useKnowledgeBase'
import { SearchBar } from '../components/SearchBar'
import { CategoryFilter } from '../components/CategoryFilter'
import { SortSelector } from '../components/SortSelector'
import { TagFilter } from '../components/TagFilter'
import { DocumentCard } from '../components/DocumentCard'
import { LoadingState } from '../components/LoadingState'
import { EmptyState } from '../components/EmptyState'
import { styles } from '../styles/knowledgeBase.styles'

export default function KnowledgeBase() {
	const {
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
	} = useKnowledgeBase()

	if (loading) {
		return <LoadingState />
	}

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>📚 Base de Conhecimento Hakutaku</h1>

			<div style={styles.filtersContainer}>
				<SearchBar value={searchTerm} onChange={setSearchTerm} />
				<CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
				<SortSelector value={sortBy} onChange={setSortBy} />
			</div>

			<TagFilter
				availableTags={getAllTags()}
				selectedTags={selectedTags}
				onTagToggle={handleTagToggle}
			/>

			<div style={styles.resultsCount}>
				<strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
			</div>

			<div style={styles.documentsGrid}>
				{filteredDocs.map((doc) => (
					<DocumentCard key={doc.id} document={doc} />
				))}
			</div>

			{filteredDocs.length === 0 && <EmptyState />}
		</div>
	)
}
