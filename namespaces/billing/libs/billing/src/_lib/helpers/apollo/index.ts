import * as Sentry from '@sentry/react'
import { AnyObject } from '@toptal/picasso-forms'
import { ErrorResponse } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { ServerError, ServerParseError } from '@apollo/client'
import { camelCase, noop } from 'lodash-es'

export interface GetMessagesFromErrors {
  errors?:
    | { key: string; message: string; code: string }[]
    | readonly GraphQLError[]
}

export const getMessagesFromErrors = ({ errors = [] }: GetMessagesFromErrors) =>
  Array.from(errors as { key: string; message: string; code: string }[])
    .map(({ message }) => message)
    .join('\n\n')

export const getMutationErrorMessage = ({
  graphQLErrors,
  networkError
}: ErrorResponse) => {
  let errorMessage = ''
  let errorType = ''

  // NetworkError
  if (networkError) {
    errorType = 'networkError'
    if ((networkError as ServerError).result) {
      errorMessage = getMessagesFromErrors({
        errors: (networkError as ServerError).result.errors
      })
    } else if ((networkError as ServerParseError).statusCode) {
      errorMessage = `${(networkError as ServerParseError).statusCode} ${
        (networkError as ServerParseError).response
      }`
    } else {
      errorMessage = `${networkError.message}`
    }
  }

  // graphQLErrors
  if (graphQLErrors && graphQLErrors.length > 0) {
    errorType = 'graphQLErrors'
    errorMessage = getMessagesFromErrors({ errors: graphQLErrors })
  }

  // TODO: investigate if required
  // Not sure about this, as far as I see with the current implementation it should be removed or refined
  Sentry.captureMessage(`[${errorType} error]: ${errorMessage}`)

  return errorMessage
}

export const getEGidIntl = (engagementGid: string) =>
  Number(engagementGid.replace(/^\D+/g, ''))

export enum NodeIdPrefix {
  billingAch = 'V1-ACHBillingOption-',
  billingCreditCard = 'V1-CreditCardBillingOption-',
  billingCycle = 'V1-BillingCycle-',
  billingOther = 'V1-OtherBillingOption-',
  client = 'V1-Client-',
  company = 'V1-Company-',
  companyRep = 'V1-CompanyRepresentative-',
  country = 'V1-Country-',
  engagement = 'V1-Engagement-',
  invoice = 'V1-Invoice-',
  job = 'V1-Job-',
  memorandum = 'V1-Memorandum-',
  note = 'V1-Note-',
  payee = 'V1-Payee-',
  payment = 'V1-Payment-',
  paymentGroup = 'V1-PaymentGroup-',
  purchaseOrder = 'V1-PurchaseOrder-',
  purchaseOrderLine = 'V1-PurchaseOrderLine-',
  role = 'V1-Role-',
  staff = 'V1-Staff-',
  talent = 'V1-Talent-',
  transfer = 'V1-Transfer-'
}

export enum LegacyGidFormat {
  engagement = 'gid://platform/Engagement/',
  billingCycle = 'gid://platform/Billing::Cycle/',
  invoice = 'gid://platform/Invoice/'
}

interface EncodeDecodeArguments {
  type: keyof typeof NodeIdPrefix
  id: string
}

interface GetLegacyGidFormat {
  type: keyof typeof LegacyGidFormat
  id: number
}

export const getOldGID = ({ type, id }: GetLegacyGidFormat) => {
  return `${LegacyGidFormat[type]}${id}`
}

export const decodeRawIdAndType = (encodedId = '') => {
  const [, type, id] = window.atob(encodedId).split('-')
  const typedId = id as EncodeDecodeArguments['id']
  const typedType = camelCase(type) as EncodeDecodeArguments['type']

  if (!NodeIdPrefix[typedType]) {
    console.error(
      `decodeRawIdAndType(${encodedId}): NodeIdPrefix is missing for type: '${typedType}'`
    )
  }

  return { type: typedType, id: typedId }
}

export const decodeId = ({ type, id }: EncodeDecodeArguments) =>
  Number(window.atob(id).split(NodeIdPrefix[type])[1])

export const encodeId = ({ type, id }: EncodeDecodeArguments) => {
  if (!type) {
    console.error(`encodeId: type is missing for id: '${id}'`)
  }
  if (!NodeIdPrefix[type]) {
    console.error(
      `encodeId(${type}, ${id}): NodeIdPrefix is missing for type: '${type}'`
    )
  }

  // '=' characters (base64 padding) removed to align with back-end
  return window.btoa(`${NodeIdPrefix[type]}${id}`).replace(/=/g, '')
}

// TODO: Remove when node base access provided for invoices
export const getInvoiceOldFormat = (invoiceId: string) =>
  decodeId({ id: invoiceId, type: 'invoice' })

export const getNotableObject = (notableId: string) => {
  const { type, id } = decodeRawIdAndType(notableId)

  return {
    notableId: id,
    notableType: type
  }
}

export interface BaseSubmitParams {
  beforeAction?: Function
  handleError?: Function
  handleSuccess?: Function
  responseKey: string
  spreadInputProps?: boolean
  submit: Function
  updateCache?: Function
}

interface SubmitMutationParams extends BaseSubmitParams {
  input: AnyObject
}

export const submitMutation = async ({
  beforeAction = noop,
  handleError = noop,
  handleSuccess = noop,
  input,
  responseKey,
  spreadInputProps = false,
  submit,
  updateCache
}: SubmitMutationParams) => {
  try {
    beforeAction()

    const submitOptions = spreadInputProps
      ? { variables: { ...input } }
      : { variables: { input } }

    if (updateCache) {
      Object.assign(submitOptions, { update: updateCache })
    }

    const mutation = await submit(submitOptions)

    if (mutation) {
      const response = mutation.data[responseKey]

      if (response.success) {
        handleSuccess(input, response)

        return response.success
      }
    }

    return handleError(mutation)
  } catch (error) {
    return handleError(error)
  }
}
