import { Container, MarkdownTextEditor } from './components'
import { MarkdownPreview } from './components/markdown-preview'
import { MarkdownProvider } from './config/providers/markdown-provider'

const App = () => (
	<MarkdownProvider>
		<Container>
			<MarkdownTextEditor />
			<MarkdownPreview />
		</Container>
	</MarkdownProvider>
)

export default App
