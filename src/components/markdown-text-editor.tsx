import { useMarkdown } from '../config/providers/markdown-provider'

export const MarkdownTextEditor = () => {
	const { setMarkdown } = useMarkdown()
 
	return (
		<textarea
			className='markdown-text-editor fullWidth' 
			onChange={event => setMarkdown(event.target.value)}
		/>
	)
}
