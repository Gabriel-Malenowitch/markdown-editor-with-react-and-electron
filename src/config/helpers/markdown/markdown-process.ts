import { exec, MarkdownElement } from './markdown-compiler'

export const markdownProcess = (markdown: string): Array<MarkdownElement> => {
	const markdownElement: Array<MarkdownElement> = exec(markdown) 
	
	return markdownElement
}
