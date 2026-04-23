import { ClientContentField } from '../../../enums/client-content-field'

export type ClientCardType = 'client' | 'applicant'

const getLeftColumn = (isParentVisible: boolean, type: ClientCardType) => [
  isParentVisible && ClientContentField.PARENT,
  ClientContentField.EMAIL,
  ClientContentField.PHONE,
  ClientContentField.CONTACT_NAME,
  ClientContentField.COUNTRY,
  ClientContentField.TIMEZONE,
  type === 'applicant' && ClientContentField.CALL_REQUEST_TYPE,
  ...(type === 'client'
    ? [
        ClientContentField.CLAIMER,
        ClientContentField.MATCHERS,
        ClientContentField.SALES_ANALYST
      ]
    : []),
  isParentVisible && ClientContentField.EMPTY
]

const getRightColumn = (isParentVisible: boolean, type: ClientCardType) => [
  ClientContentField.STATUS,
  ClientContentField.SKYPE,
  ClientContentField.LEAD_BUCKET,
  ClientContentField.APPLIED,
  type === 'client' && ClientContentField.APPROVED,
  ClientContentField.CLAIMABLE_SINCE,
  type === 'applicant' && ClientContentField.CALL_SCHEDULED_AT,
  ...(type === 'client'
    ? [ClientContentField.LAST_LOGIN, ClientContentField.LAST_EDITED]
    : [])
]

export const getClientsConfiguration = (
  isParentVisible: boolean,
  type: ClientCardType
) =>
  [
    ...getLeftColumn(isParentVisible, type),
    ...getRightColumn(isParentVisible, type)
  ].filter(item => item !== false) as ClientContentField[]
