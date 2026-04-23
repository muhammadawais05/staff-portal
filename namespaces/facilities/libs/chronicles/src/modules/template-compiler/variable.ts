import { Modifier, Variable } from './types'

export const extractVariableWithModifier = (match: string): Variable => {
  const parts = match.split('|')
  const [path, modifier] = parts

  return {
    path,
    modifier: modifier as Modifier
  }
}
