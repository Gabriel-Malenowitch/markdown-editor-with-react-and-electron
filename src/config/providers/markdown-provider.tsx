import { createContext, useContext, useState } from 'react' 
import { Parent } from '../../models/modded.model'

interface MarkdownContextProps {
    markdown: string
    setMarkdown: (markdown: string) => void
}

type MarkdownProviderProps = Parent

export const MarkdownContext = createContext<MarkdownContextProps>({} as MarkdownContextProps)


export const MarkdownProvider = ({children}: MarkdownProviderProps) => {
	const [ markdown, setMarkdown ] = useState<string>('')

	return (
		<MarkdownContext.Provider value={{ markdown, setMarkdown }}>
			{children}
		</MarkdownContext.Provider>
	)
}


export const useMarkdown = () => {
	const { markdown, setMarkdown } = useContext(MarkdownContext)

	return { markdown, setMarkdown } 
}