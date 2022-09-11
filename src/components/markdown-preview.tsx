import { MarkdownElement } from '../config/helpers/markdown/markdown-compiler'
import { useGetProcessedMarkdown } from '../hooks/useGetProcessedMarkdown'

export const MarkdownPreview = () => {
	const processedMarkdownArray = useGetProcessedMarkdown()

	return (
		<div className="fullWidth">
			{processedMarkdownArray.map(({element, value, name}: MarkdownElement, index: number) => (
				<span key={String(value + String(name) + index)}>
					{element}
				</span>
			))}
		</div>
	)
} 
