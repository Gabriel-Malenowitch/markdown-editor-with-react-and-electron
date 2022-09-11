import { useEffect } from 'react'
import { useMarkdown } from '../config/providers/markdown-provider'

export const MarkdownTextEditor = () => {
	const { markdown, setMarkdown } = useMarkdown()
	useEffect(()=>{
		setMarkdown(`
 |nome|idade|escolaridade|
 |gabriel|19|superior interrompido|
 |manu|18|superiorir incompleto|
				   `)
	}, [])
 
	return (
		<textarea
			className='markdown-text-editor fullWidth' 
			onChange={event => setMarkdown(event.target.value)}
		/>
	)
}