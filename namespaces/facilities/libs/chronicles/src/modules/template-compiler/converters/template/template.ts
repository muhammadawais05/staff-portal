import { Literal, PayloadValueType, Converter, ConvertProps } from '../../types'
import {
  TYPE_FIELD,
  TEMPLATE_TYPE,
  MODEL_DESCRIPTION_TEMPLATE_TYPE,
  MODEL_DESCRIPTION_TYPE_FIELD
} from '../../constants'
import { parseTemplate } from '../../template'

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return (
    objectPayload[TYPE_FIELD] === TEMPLATE_TYPE ||
    objectPayload[MODEL_DESCRIPTION_TYPE_FIELD] ===
      MODEL_DESCRIPTION_TEMPLATE_TYPE
  )
}

const getVariablesByName = (variables: any) => {
  if (Array.isArray(variables)) {
    return variables.reduce((result, variable) => {
      const { name, value } = variable

      result[name] = value

      return result
    }, {})
  }

  return variables
}

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<'template' | 'variables' | string, any>

  const { template, variables } = payloadValue

  const variablesByName = getVariablesByName(variables)

  return parseTemplate(template, variablesByName)
}

const templateConverter: Converter = {
  isMatching,
  convert
}

export default templateConverter
