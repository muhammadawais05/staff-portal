import ramdaPathOr from 'ramda/src/pathOr'

import { humanize } from '../core'
import {
  PerformedAction,
  ModelDescription,
  PayloadDataSource,
  PayloadValueType
} from './types'
import { SYSTEM_USER, GID_FIELD } from './constants'
import { PossibleModelDescriptionKeys } from './get-value'

const getModelDescriptionById = (
  gid: string | null,
  modelDescriptions: ModelDescription[]
) =>
  modelDescriptions.find(modelDescription => modelDescription.gid === gid) ||
  undefined

const getPerformer = (
  performerGID: string | null,
  modelDescriptions: ModelDescription[]
) => {
  if (performerGID === null) {
    return SYSTEM_USER
  }

  return getModelDescriptionById(performerGID, modelDescriptions)
}

export const getValueKey = (path: string): string | undefined => {
  const paths = path.split('.')

  if (paths.length <= 0) {
    return
  }

  return paths[paths.length - 1]
}

export const getValueByPath = (
  payloadDataSource: PayloadDataSource,
  path: string
): PayloadValueType | null | undefined =>
  ramdaPathOr(undefined, path.split('.'), payloadDataSource)

export const getAssociationReferenceValueByPath = (
  payloadDataSource: PayloadDataSource,
  path: string
): PayloadValueType | undefined => {
  const keyPath = getValueKey(path)
  const { subject, performer } = payloadDataSource
  const payloadDataSourceKey = path.split(
    '.'
  )[0] as PossibleModelDescriptionKeys

  if (payloadDataSourceKey === PossibleModelDescriptionKeys.Subject) {
    return subject?.associationReferences.find(item => item.name === keyPath)
  }

  if (performer && typeof performer !== 'string') {
    return performer.associationReferences.find(item => item.name === keyPath)
  }
}

const getSimplePayloadModelDescription = (
  id: string,
  modelDescriptions: ModelDescription[]
) => {
  const modelDescription =
    modelDescriptions.find(modelDescription => modelDescription.gid === id) ||
    null

  return modelDescription
}

export const getArrayPayloadModelDescriptions = (
  payload: Record<string, any>,
  modelDescriptions: ModelDescription[]
): Record<string, any> =>
  payload.map((value: any) =>
    getPayloadModelDescription(value, modelDescriptions)
  )

export const getObjectPayloadModelDescriptions = (
  payload: Record<string, any>,
  modelDescriptions: ModelDescription[]
): Record<string, any> =>
  Object.keys(payload).reduce((acc, key) => {
    const value = payload[key]

    return {
      ...acc,
      [key]: getPayloadModelDescription(value, modelDescriptions)
    }
  }, {})

const getPayloadModelDescription = (
  value: any,
  modelDescriptions: ModelDescription[]
) => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  const id = value[GID_FIELD]
  const hasId = Boolean(id)

  if (hasId) {
    const modelDescription = getSimplePayloadModelDescription(
      id,
      modelDescriptions
    )

    return modelDescription || value
  }

  return getPayloadModelDescriptions(value, modelDescriptions)
}

export const getPayloadModelDescriptions = (
  payload: Record<string, any>,
  modelDescriptions: ModelDescription[]
): PayloadValueType => {
  if (Array.isArray(payload)) {
    return getArrayPayloadModelDescriptions(payload, modelDescriptions)
  }

  return getObjectPayloadModelDescriptions(payload, modelDescriptions)
}

export const getPayloadDataSource = (
  performedAction: PerformedAction,
  modelDescriptions: ModelDescription[]
): PayloadDataSource => {
  const { subjectGID, performerGID, action } = performedAction

  const subject = getModelDescriptionById(subjectGID, modelDescriptions)
  const performer = getPerformer(performerGID, modelDescriptions)

  let payload = {}

  try {
    payload = JSON.parse(performedAction.payload)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      'Error appeared while parsing payload field from performed action record',
      e
    )
  }

  return {
    subject,
    performer,
    action: humanize(action),
    payload: getPayloadModelDescriptions(payload, modelDescriptions)
  }
}

const getPayloadIds = (payload: Record<string, any>): string[] =>
  Object.keys(payload).reduce((acc: string[], key) => {
    const value = payload[key]

    if (value === null || typeof value !== 'object') {
      return acc
    }

    const id: string | null = value[GID_FIELD] ?? null
    const isValidId = !!id && !id.includes(SYSTEM_USER)

    if (isValidId) {
      return [...acc, id]
    }

    // continue iterating on objects without id prop
    return [...acc, ...getPayloadIds(value)]
  }, [])

export const getRecordIds = (performedAction: PerformedAction): string[] => {
  const { subjectGID, performerGID } = performedAction
  const ids = [subjectGID]

  if (performerGID) {
    ids.push(performerGID)
  }

  let payload = null

  try {
    payload = JSON.parse(performedAction.payload)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      'Error appeared while parsing payload field from performed action record',
      e
    )

    return ids
  }

  const payloadIds = getPayloadIds(payload)

  return ids.concat(payloadIds)
}

export const getUniqueIds = (performedActions: PerformedAction[]): string[] => {
  const allGids = performedActions.reduce((acc: string[], performedAction) => {
    const ids = getRecordIds(performedAction)

    return acc.concat(ids)
  }, [])

  const uniqueGids = new Set(allGids)

  return Array.from(uniqueGids)
}
