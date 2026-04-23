import emphazisedModifier from './modifiers/emphasized'
import { Literal } from './types'

const computeEmphasizedLiterals = (literals: Literal[]) => {
  const result: Literal[] = []

  literals.forEach(literal => {
    if (typeof literal === 'string') {
      result.push(emphazisedModifier(literal))
    } else if (literal.kind === 'typography') {
      literal.weight = 'semibold'
      result.push(literal)
    } else {
      result.push(literal)
    }
  })

  return result
}

export default computeEmphasizedLiterals
