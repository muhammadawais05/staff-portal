import React from 'react'
import { Button, Container, Download16, Trash16 } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Link } from '@staff-portal/navigation'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { UpdateContractFromOpportunityInput } from '@staff-portal/graphql/staff'
import { useNotifications } from '@staff-portal/error-handling'
import { TypographyOverflowLink } from '@staff-portal/ui'
import {
  isOperationEnabled,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  useRenderLazyOperation
} from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import {
  useHandleMutationResult,
  useEditableFieldChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { NO_VALUE } from '@staff-portal/config'

import { OpportunityDetailsFragment } from '../../data'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'
import { SetUpdateContractFromOpportunityDocument } from '../../data/set-update-contract-from-opportunity.staff.gql.types'
import { useRemoveContractFromOpportunity } from './data/remove-contract'
import { OPPORTUNITY_CONTRACT_DELETED } from '../../../../../messages'
import * as S from './styles'

interface Props {
  opportunity: OpportunityDetailsFragment
}

const OpportunityDetailsContract = ({
  opportunity: {
    id: opportunityId,
    contractUrl,
    operations: { removeContractFromOpportunity, updateContractFromOpportunity }
  }
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const updateContractDisabled = !isOperationEnabled(
    updateContractFromOpportunity
  )
  const removeContractDisabled = !isOperationEnabled(
    removeContractFromOpportunity
  )

  const [removeContract] = useRemoveContractFromOpportunity({
    opportunityId,
    onError: () => {
      showError('An error occurred, contract was not deleted.')
    }
  })

  const onChangeContract = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateContractFromOpportunityDocument,
    requiredValues: { opportunityId },
    initialValues: {
      contract: contractUrl
    }
  })

  const handleDeleteContract = async () => {
    const { data } = await removeContract()

    return handleMutationResult({
      mutationResult: data?.removeContractFromOpportunity,
      successNotificationMessage: 'Contract has been deleted.',
      onSuccessAction: () =>
        emitMessage(OPPORTUNITY_CONTRACT_DELETED, { opportunityId })
    })
  }

  const renderLazyOperation = useRenderLazyOperation({
    initialOperation: removeContractFromOpportunity,
    getLazyOperationVariables: {
      nodeId: opportunityId,
      nodeType: NodeType.OPPORTUNITY,
      operationName: 'removeContractFromOpportunity'
    },
    onSuccess: handleDeleteContract
  })

  const onFileSelected = () => {}

  if (contractUrl) {
    return (
      <Container flex alignItems='flex-start'>
        <TypographyOverflowLink key='topLevelCompany'>
          <Link key='topLevelCompany' href={contractUrl}>
            {contractUrl}
          </Link>
        </TypographyOverflowLink>
        <Button.Circular
          css={S.button}
          icon={<Download16 />}
          variant='transparent'
          href={`${contractUrl}?download=true`}
        />
        {!removeContractDisabled &&
          renderLazyOperation(({ disabled, loading, checkOperation }) => (
            <Button.Circular
              css={S.button}
              icon={<Trash16 />}
              variant='transparent'
              disabled={disabled}
              loading={loading}
              onClick={checkOperation}
            />
          ))}
      </Container>
    )
  }

  return (
    <EditableField<UpdateContractFromOpportunityInput>
      disabled={updateContractDisabled}
      name='contract'
      multiline
      onChange={onChangeContract}
      queryValue={getOpportunityValueHook(opportunityId, 'contractUrl')}
      viewer={NO_VALUE}
      updateOnBlur
      editor={() => (
        <Form.FileInput name='contract' onChange={onFileSelected} />
      )}
    />
  )
}

export default OpportunityDetailsContract
