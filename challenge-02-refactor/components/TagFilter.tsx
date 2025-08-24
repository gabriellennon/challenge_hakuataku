import { styles } from '../styles/knowledgeBase.styles'

interface TagFilterProps {
	availableTags: string[]
	selectedTags: string[]
	onTagToggle: (tag: string) => void
}

export function TagFilter({ availableTags, selectedTags, onTagToggle }: TagFilterProps) {
	return (
		<div style={{ marginBottom: '20px' }}>
			<label style={styles.label}>Tags:</label>
			<div style={styles.tagsContainer}>
				{availableTags.map((tag) => (
					<button
						key={tag}
						onClick={() => onTagToggle(tag)}
						style={styles.tagButton(selectedTags.includes(tag))}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	)
}
