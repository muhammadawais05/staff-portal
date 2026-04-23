import { RestoreSpecializationApplicationInput } from '@staff-portal/graphql/staff'

import { RESTORE_TALENT_SPECIALIZATION_APPLICATION } from './restore-talent-specialization-application.staff.gql'

export const createRestoreTalentSpecializationApplicationMock = ({
  input,
  success,
  errorMessage
}: {
  input: RestoreSpecializationApplicationInput
  success: boolean
  errorMessage?: string
}) => ({
  request: {
    query: RESTORE_TALENT_SPECIALIZATION_APPLICATION,
    variables: { input }
  },
  result: {
    data: {
      restoreSpecializationApplication: {
        specializationApplication: success
          ? {
              id: input.specializationApplicationId,
              __typename: 'SpecializationApplication'
            }
          : null,
        success,
        errors: success
          ? []
          : [
              {
                code: 'restorable',
                key: 'base',
                message:
                  errorMessage ||
                  'This specialization application has already been resumed',
                __typename: 'GraniteError'
              }
            ],
        __typename: 'RestoreSpecializationApplicationPayload'
      }
    }
  }
})

export const createRestoreTalentSpecializationApplicationFailedMock = (
  input: RestoreSpecializationApplicationInput
) => ({
  request: {
    query: RESTORE_TALENT_SPECIALIZATION_APPLICATION,
    variables: { input }
  },
  error: new Error('Error occurred')
})
