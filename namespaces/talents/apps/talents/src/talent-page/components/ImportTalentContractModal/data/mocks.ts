import { UserError } from '@staff-portal/graphql/staff'

import { ImportTalentContractMutationVariables } from './import-talent-contract.staff.gql.types'
import { IMPORT_TALENT_CONTRACT } from './import-talent-contract.staff.gql'

export const createImportTalentContractMock = (
  input: ImportTalentContractMutationVariables['input']
) => ({
  request: {
    query: IMPORT_TALENT_CONTRACT,
    variables: {
      input
    }
  },
  result: {
    data: {
      importTalentContract: {
        success: true,
        errors: [],
        __typename: 'ImportTalentContractPayload'
      }
    }
  }
})

export const createImportTalentContractInvalidMock = (
  input: ImportTalentContractMutationVariables['input'],
  errors: Partial<UserError>[]
) => ({
  request: {
    query: IMPORT_TALENT_CONTRACT,
    variables: {
      input
    }
  },
  result: {
    data: {
      importTalentContract: {
        success: false,
        errors: errors.map(error => ({
          code: 'base',
          key: 'base',
          message: 'Default user error',
          __typename: 'UserError',
          ...error
        })),
        __typename: 'ImportTalentContractPayload'
      }
    }
  }
})
