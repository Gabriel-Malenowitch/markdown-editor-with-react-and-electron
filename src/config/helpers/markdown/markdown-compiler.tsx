import { ReactElement} from 'react'

interface PairElement {
	name: 'ul' | 'table'
	value: string
}

interface EmptyElements {
	name: 'br' | 'hr'
	value: string
}

interface TitleElement {
	name: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	value: string
}

interface TextElement {
	name: 'p'
	value: string
}

export type MarkdownElement = {
	name: TitleElement['name'] | PairElement['name'] | EmptyElements['name'] | TextElement['name']
	value: TitleElement['value'] | PairElement['value'] | EmptyElements['value'] | TextElement['name']
	element?: ReactElement
}

const regexMarkdownIdentifierElements = {
	h1: /^\s(#)\s(.+)$/,
	h2: /^\s(##)\s(.+)$/,
	h3: /^\s(###)\s(.+)$/,
	h4: /^\s(####)\s(.+)$/,
	h5: /^\s(#####)\s(.+)$/,
	h6: /^\s(######)\s(.+)$/,
	hr: /^\s---/,
	ul: /^\s(-|\*){1}\s(.+)$/,
	table: /\s(\|.+)+\|/,
	// code: /\s/,
	br: /^$/,
}

const CUSTOMIZED_MARKDOWN_KEY = 'markdown-compiler-custom-key'
const createMarkdownElementKey = (index: number, value: MarkdownElement['value'], name: MarkdownElement['name']) => {
	return String(CUSTOMIZED_MARKDOWN_KEY+value+String(name)+new Date(index).toString())
}

const findElementWithRegexBase = (markdownLinesArray: Array<string>) => {
	const regexArray = Object.entries(regexMarkdownIdentifierElements)
	const elementsArray: Array<MarkdownElement> = []
	
	markdownLinesArray.forEach(markdownLine=>{
		regexArray.forEach(([key, regex])=>{
			if(regex.test(markdownLine)){ 
				elementsArray.push({
					name: key as MarkdownElement['name'],
					value: markdownLine.replace(regex, '$2'),
				})
			}
		})
	})

	return elementsArray
}

const getElements = (elementsArray: Array<MarkdownElement>): Array<MarkdownElement> => {
	const createTransformElement = ({ name, value }: MarkdownElement, index: number): ReactElement => {
		const createTransformUlElement = () => {
			const sanitizedBeforeIndex = elementsArray[index-1]?.name !== name ? index - 1 : false
			if(elementsArray[index-1]?.name === name){
				return <></>
			}

			const sanitizedNextIndex = elementsArray.findIndex((markdownElement, internalIndex) => {
				if(internalIndex >= index){
					return markdownElement?.name !== name
				}

				return false
			})
			const transformedArray = sanitizedBeforeIndex ? elementsArray.slice(index, index < sanitizedNextIndex ? sanitizedNextIndex : undefined) : false

			if(!transformedArray){
				return <></>
			}
			
			return (
				<ul>
					{transformedArray.map(({value, name}, index) => (
						<li key={createMarkdownElementKey(index, value, name)}>{value}</li>
					))}
				</ul>
			)
		}
		const createTransformTableElement = () => {
			const sanitizedBeforeIndex = elementsArray[index-1]?.name !== name ? index - 1 : false
			if(elementsArray[index-1]?.name === name){
				return <></>
			}

			const sanitizedNextIndex = elementsArray.findIndex((markdownElement, internalIndex) => {
				if(internalIndex >= index){
					return markdownElement?.name !== name
				}

				return false
			})
			const transformedArray = sanitizedBeforeIndex ? elementsArray.slice(index, index < sanitizedNextIndex ? sanitizedNextIndex : undefined) : false

			if(!transformedArray){
				return <></>
			}


			return (
				<table>
					{
						transformedArray.map(({value, name}, index)=>{
							const sanitizedRow = value.split('|').filter(value=>value !== '').map(value=>value.trim())
							
							return (
								<tr key={createMarkdownElementKey(index, value, name)}>
									{
										sanitizedRow.map((value, index) => {
											return index === 0 ?
												(
													<th key={createMarkdownElementKey(index, value, name)}>{value}</th>
												) :
												(
													<td key={createMarkdownElementKey(index, value, name)}>{value}</td>
												)
										})
									}
								</tr>
							)
						})
					}
				</table>
			)
		}
		switch(name){
		case 'h1':
			return <h1>{value}</h1>
		case 'h2':
			return <h2>{value}</h2>
		case 'h3':
			return <h3>{value}</h3>
		case 'h4':
			return <h4>{value}</h4>
		case 'h5':
			return <h5>{value}</h5>
		case 'h6':
			return <h6>{value}</h6>
		case 'br':
			return <br/>
		case 'hr':
			return <hr/>
		case 'ul':
			return createTransformUlElement()
		case 'table':
			return createTransformTableElement()
		}

		return <p>{value}</p>
	}

	elementsArray.forEach((element: MarkdownElement, index: number) => {
		elementsArray[index].element = createTransformElement(element, index)		
	})

	return elementsArray
}

export const exec = (markdown: string): Array<MarkdownElement> => {
	const markdownLinesArray = markdown.split('\n')
	const identifiedArrayElements = findElementWithRegexBase(markdownLinesArray)
	const markdownElements = getElements(identifiedArrayElements)
	return markdownElements
}

