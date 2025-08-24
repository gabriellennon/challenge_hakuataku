import { styles } from '../styles/knowledgeBase.styles'

export function EmptyState() {
	return (
		<div style={styles.emptyState}>
			<h3>Nenhum documento encontrado</h3>
			<p>Tente ajustar os filtros de busca</p>
		</div>
	)
}
