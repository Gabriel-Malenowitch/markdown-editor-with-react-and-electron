import { useContext } from 'react'
import { MarkdownContext } from '../config/providers/markdown-provider'
import { markdownProcess } from '../config/helpers/markdown/markdown-process'
import { MarkdownElement } from '../config/helpers/markdown/markdown-compiler'

export const useGetProcessedMarkdown = (): Array<MarkdownElement> => {
	const { markdown } = useContext(MarkdownContext)
	const processedMarkdownArray = markdownProcess(markdown)
	return processedMarkdownArray
}