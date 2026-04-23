import { UpdateClientLegalNameInput } from '@staff-portal/graphql/staff'
import { isEmpty } from '@staff-portal/utils'

type Key = keyof Pick<UpdateClientLegalNameInput, 'legalName'>

export const adjustLegalName = ({
  legalName
}: Partial<Pick<UpdateClientLegalNameInput, 'legalName'>>): {
  [key in Key]: string
} => ({
  legalName: isEmpty(legalName) ? '' : legalName.trim()
})
