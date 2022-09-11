import { Parent } from '../models/modded.model'

type ContainerProps = Parent

export const Container = ({ children }: ContainerProps) => <div className="horizontal">{ children }</div>