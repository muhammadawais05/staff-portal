import { PerformedAction, ModelDescription, Literal } from './types'
import { getPayloadDataSource } from './payload'
import { parseTemplate } from './template'
import resolveToJSX from './jsx-resolver'

export const compileRecord = (
  performedAction: PerformedAction,
  modelDescriptions: ModelDescription[]
): Literal[] => {
  const payloadDataSource = getPayloadDataSource(
    performedAction,
    modelDescriptions
  )

  return parseTemplate(performedAction.template, payloadDataSource)
}

export const compile = (
  performedActions: PerformedAction[],
  modelDescriptions: ModelDescription[]
): Literal[][] =>
  performedActions.map(performedAction =>
    compileRecord(performedAction, modelDescriptions)
  )

export const renderRecord = (
  performedAction: PerformedAction,
  modelDescriptions: ModelDescription[]
): (string | JSX.Element)[] =>
  resolveToJSX(compileRecord(performedAction, modelDescriptions))

export const render = (
  performedActions: PerformedAction[],
  modelDescriptions: ModelDescription[]
): (string | JSX.Element)[][] =>
  performedActions.map(performedAction =>
    renderRecord(performedAction, modelDescriptions)
  )
