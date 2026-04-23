import { gql } from 'graphql-tag'
import { useMutation } from '@staff-portal/data-layer-service'
import {
  MUTATION_RESULT_FRAGMENT,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { UnlinkOpportunityCompanyRepresentativeInput } from '@staff-portal/graphql/staff'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { OPPORTUNITY_UNLINKED } from '@staff-portal/clients'

import { UnlinkOpportunityCompanyRepresentativeDocument } from './unlink-opportunity-company-representative.staff.gql.types'

export default gql`
  mutation UnlinkOpportunityCompanyRepresentative(
    $input: UnlinkOpportunityCompanyRepresentativeInput!
  ) {
    unlinkOpportunityCompanyRepresentative(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUnlinkOpportunityCompanyRepresentative = (
  hideModal: () => void
) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [unlinkOpportunity, { loading }] = useMutation(
    UnlinkOpportunityCompanyRepresentativeDocument,
    {
      onError: () => {
        showError('An error occurred, unable to unlink opportunity.')
      }
    }
  )

  const handleSubmit = async (
    input: UnlinkOpportunityCompanyRepresentativeInput
  ) => {
    const { data } = await unlinkOpportunity({
      variables: {
        input
      }
    })

    return handleMutationResult({
      mutationResult: data?.unlinkOpportunityCompanyRepresentative,
      successNotificationMessage: 'Opportunity was successfully unlinked.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(OPPORTUNITY_UNLINKED, {
          representativeId: input.companyRepresentativeId,
          opportunityId: input.opportunityId
        })
      },
      isFormSubmit: true
    })
  }

  return { handleSubmit, loading }
}
