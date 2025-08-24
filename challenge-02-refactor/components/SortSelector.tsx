import { styles } from '../styles/knowledgeBase.styles'

interface SortSelectorProps {
	value: string
	onChange: (value: string) => void
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
	return (
		<div style={styles.filterGroup}>
			<label style={styles.label}>Ordenar por:</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				style={styles.select}
			>
				<option value="title">Título</option>
				<option value="date">Data</option>
				<option value="author">Autor</option>
			</select>
		</div>
	)
}
