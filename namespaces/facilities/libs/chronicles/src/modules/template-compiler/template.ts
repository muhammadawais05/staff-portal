import { getValue } from './get-value'
import { PayloadDataSource, Literal } from './types'
import { extractVariableWithModifier } from './variable'

// parse %{} variables from the string
// [^{}]* - all the symbols, which are not '{' or '}'
// to exclude nested variables
const variableRegexp = /%{[^{}]*}/g

const merge = (literals: string[], variables: Literal[][]) => {
  const result = []

  // merge array elements one by one:
  // one from literals then one from variables, and so on
  // variables array 1 element shorter than literals
  // eslint-disable-next-line id-length
  for (let i = 0; i < literals.length; i++) {
    result.push(literals[i])

    if (i < variables.length) {
      result.push(...variables[i])
    }
  }

  return result
}

const sanitizeVariableMatch = (match: string) =>
  match.replace('%{', '').replace('}', '').trim()

export const parseTemplate = (
  template: string,
  payloadDataSource: PayloadDataSource
) => {
  const staticLiterals = template.split(variableRegexp)

  const variables = (template.match(variableRegexp) || [])
    .map(sanitizeVariableMatch)
    .map(extractVariableWithModifier)

  const variablesFulfilled = variables.map(variable =>
    getValue(variable, payloadDataSource)
  )

  return merge(staticLiterals, variablesFulfilled)
}
