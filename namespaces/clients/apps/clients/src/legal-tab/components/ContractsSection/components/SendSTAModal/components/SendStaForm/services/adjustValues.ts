import { SendStaMutationVariables } from '../../../data/send-sta/send-sta.staff.gql.types'
import { SendStaFormValues } from '../types/send-sta-form-values'

export const adjustValues = (
  { customSigner, signerEmail, signerFullName, ...rest }: SendStaFormValues,
  clientId: string,
  showDescendants: boolean
): SendStaMutationVariables => {
  const customSignerAdjusted = customSigner === 'true'

  return {
    input: {
      clientId,
      customSigner: customSignerAdjusted,
      ...(customSignerAdjusted
        ? {
            signerFullName,
            signerEmail
          }
        : {}),
      ...rest
    },
    showDescendants
  }
}
