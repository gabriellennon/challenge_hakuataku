import { styles } from '../styles/knowledgeBase.styles'

interface CategoryFilterProps {
	value: string
	onChange: (value: string) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
	return (
		<div style={styles.filterGroup}>
			<label style={styles.label}>Categoria:</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				style={styles.select}
			>
				<option value="all">Todas</option>
				<option value="docs">Documentação</option>
				<option value="wiki">Wiki</option>
				<option value="api">API</option>
			</select>
		</div>
	)
}
