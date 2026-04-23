import { interpolate } from './interpolate'
import {
  getValueKey,
  getValueByPath,
  getAssociationReferenceValueByPath
} from './payload'
import { Literal, PayloadDataSource, Variable } from './types'

/**
 * based on: https://github.com/toptal/staff-portal/blob/6e098a94d25642c9d48aa43388588c3fd4303c65/namespaces/facilities/libs/chronicles/src/modules/template-compiler/types.ts#L34-L36
 */
export enum PossibleModelDescriptionKeys {
  Subject = 'subject',
  Performer = 'performer'
}

export const getValue = (
  variable: Variable,
  payloadDataSource: PayloadDataSource
): Literal[] => {
  const { path, modifier } = variable

  const key = getValueKey(path)
  const value = getValueByPath(payloadDataSource, path)

  if (value === undefined) {
    if (
      [
        `${PossibleModelDescriptionKeys.Subject}.`,
        `${PossibleModelDescriptionKeys.Performer}.`
      ].some(substring => path.startsWith(substring))
    ) {
      const associationReferenceValue = getAssociationReferenceValueByPath(
        payloadDataSource,
        path
      )

      if (associationReferenceValue) {
        return interpolate({
          payload: associationReferenceValue,
          key,
          modifier
        })
      }
    }

    return [variable.path]
  }

  return interpolate({ payload: value, key, modifier })
}
