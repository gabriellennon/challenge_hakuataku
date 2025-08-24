export const styles = {
	container: {
		padding: '20px',
		fontFamily: 'Arial, sans-serif',
		maxWidth: '1200px',
		margin: '0 auto',
	},
	
	title: {
		marginBottom: '30px',
		color: '#333',
	},
	
	filtersContainer: {
		display: 'flex',
		gap: '20px',
		marginBottom: '30px',
		flexWrap: 'wrap' as const,
		alignItems: 'center',
	},
	
	filterGroup: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
	
	label: {
		fontWeight: 'bold' as const,
	},
	
	input: {
		padding: '8px 12px',
		border: '1px solid #ddd',
		borderRadius: '4px',
		width: '250px',
	},
	
	select: {
		padding: '8px 12px',
		border: '1px solid #ddd',
		borderRadius: '4px',
	},
	
	tagsContainer: {
		display: 'flex',
		gap: '10px',
		flexWrap: 'wrap' as const,
	},
	
	tagButton: (isSelected: boolean) => ({
		padding: '4px 8px',
		border: isSelected ? '2px solid #007bff' : '1px solid #ddd',
		borderRadius: '20px',
		background: isSelected ? '#e7f3ff' : 'white',
		cursor: 'pointer',
		fontSize: '12px',
	}),
	
	resultsCount: {
		marginBottom: '20px',
	},
	
	documentsGrid: {
		display: 'grid',
		gap: '20px',
		gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
	},
	
	documentCard: {
		border: '1px solid #ddd',
		borderRadius: '8px',
		padding: '20px',
		backgroundColor: '#fafafa',
		transition: 'transform 0.2s',
		cursor: 'pointer',
	},
	
	documentHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: '10px',
	},
	
	documentTitle: {
		margin: '0',
		color: '#333',
	},
	
	categoryBadge: (color: string) => ({
		padding: '4px 8px',
		borderRadius: '4px',
		backgroundColor: color,
		color: 'white',
		fontSize: '12px',
		fontWeight: 'bold' as const,
	}),
	
	documentContent: {
		color: '#666',
		marginBottom: '15px',
	},
	
	documentTags: {
		marginBottom: '10px',
	},
	
	tag: {
		display: 'inline-block',
		padding: '2px 6px',
		margin: '2px',
		backgroundColor: '#e0e0e0',
		borderRadius: '12px',
		fontSize: '11px',
		color: '#555',
	},
	
	documentFooter: {
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: '12px',
		color: '#888',
	},
	
	loadingContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		fontFamily: 'Arial, sans-serif',
	},
	
	emptyState: {
		textAlign: 'center' as const,
		padding: '40px',
		color: '#666',
	},
}
