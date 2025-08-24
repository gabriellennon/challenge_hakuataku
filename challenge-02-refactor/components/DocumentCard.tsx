import { Document } from '@/types'
import { styles } from '../styles/knowledgeBase.styles'

interface DocumentCardProps {
	document: Document
}

export function DocumentCard({ document }: DocumentCardProps) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	const getCategoryColor = (category: string) => {
		if (category === 'docs') return '#4CAF50'
		if (category === 'wiki') return '#2196F3'
		if (category === 'api') return '#FF9800'
		return '#666'
	}

	return (
		<div
			style={styles.documentCard}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'translateY(-2px)'
				e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'translateY(0)'
				e.currentTarget.style.boxShadow = 'none'
			}}
		>
			<div style={styles.documentHeader}>
				<h3 style={styles.documentTitle}>{document.title}</h3>
				<span style={styles.categoryBadge(getCategoryColor(document.category))}>
					{document.category.toUpperCase()}
				</span>
			</div>

			<p style={styles.documentContent}>{document.content}</p>

			<div style={styles.documentTags}>
				{document.tags.map((tag) => (
					<span key={tag} style={styles.tag}>
						#{tag}
					</span>
				))}
			</div>

			<div style={styles.documentFooter}>
				<span>
					Por: <strong>{document.author}</strong>
				</span>
				<span>{formatDate(document.createdAt)}</span>
			</div>
		</div>
	)
}
