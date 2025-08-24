import { styles } from '../styles/knowledgeBase.styles'

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div style={styles.filterGroup}>
			<label style={styles.label}>Buscar:</label>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Digite para buscar..."
				style={styles.input}
			/>
		</div>
	)
}
