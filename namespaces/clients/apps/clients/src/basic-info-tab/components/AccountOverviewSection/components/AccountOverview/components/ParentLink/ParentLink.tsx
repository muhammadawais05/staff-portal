import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Exclamation16, Tooltip } from '@toptal/picasso'
import { UpdateClientParentInput } from '@staff-portal/graphql/staff'
import { concatMessages } from '@staff-portal/data-layer-service'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { isOperationEnabled, LazyOperation } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { ParentLinkEditor } from './components/ParentLinkEditor'
import {
  SetUpdateClientParentLinkDocument,
  SetUpdateClientParentLinkMutation
} from '../../../../data/set-update-client-parent-link.staff.gql.types'
import { useRemoveClientParentLinkMutation } from './data'
import { useUpdateCascadeParentModal } from './hooks'
import { CompanyParentFragment } from '../../../../data'
import { getParentLinkHook } from '../../utils/get-client-parent-hook'

interface Props {
  clientId: string
  parent?: CompanyParentFragment['parent']
  operations: {
    updateClientParent: CompanyOperationFragment
    removeClientParent: CompanyOperationFragment
    cascadeClientParentUpdates: CompanyOperationFragment
  }
}

const ParentLink = ({
  clientId,
  parent,
  operations: {
    updateClientParent,
    removeClientParent,
    cascadeClientParentUpdates
  }
}: Props) => {
  const { fullName = '', id: parentId = '', webResource } = parent || {}
  const [updatedParentId, setUpdatedParentId] = useState('')
  const { showModal } = useUpdateCascadeParentModal({
    clientId,
    parentId: updatedParentId
  })
  const useParentLink = getParentLinkHook(clientId)
  const editingDisabled = !isOperationEnabled(updateClientParent)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientParentLinkDocument,
    requiredValues: { clientId },
    initialValues: { parentId },
    mutationResultOptions: {
      onSuccessAction: response => {
        setUpdatedParentId(
          (response as SetUpdateClientParentLinkMutation['updateClientParent'])
            ?.client?.parent?.id || ''
        )
      }
    }
  })

  useEffect(() => {
    if (updatedParentId && isOperationEnabled(cascadeClientParentUpdates)) {
      showModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedParentId])

  const [removeParentLinkMutation, { loading: submittingRemoveParentLink }] =
    useRemoveClientParentLinkMutation()

  const removeParent = useCallback(() => {
    removeParentLinkMutation({ variables: { input: { clientId } } })
  }, [removeParentLinkMutation, clientId])

  const disabledTooltip = concatMessages(updateClientParent.messages)
  const companyLink = (
    <TypographyOverflowLink weight='semibold' size='medium'>
      <LinkWrapper
        data-testid='ParentLink-link'
        wrapWhen={Boolean(webResource?.url)}
        href={webResource?.url as string}
        title={webResource?.text}
      >
        {webResource?.text || NO_VALUE}
      </LinkWrapper>
    </TypographyOverflowLink>
  )

  const viewer =
    editingDisabled && disabledTooltip ? (
      <Tooltip content={disabledTooltip}>
        <Container flex>
          {companyLink}
          <Container flex alignItems='center' left='xsmall'>
            <Exclamation16 color='dark-grey' />
          </Container>
        </Container>
      </Tooltip>
    ) : (
      companyLink
    )

  return (
    <Container flex justifyContent='space-between'>
      <EditableField<UpdateClientParentInput>
        disabled={editingDisabled}
        name='parentId'
        width='full'
        value={parentId}
        onChange={handleChange}
        queryValue={useParentLink}
        viewer={viewer}
        editor={({ name: editorName, disabled, onChange }) => (
          <ParentLinkEditor
            name={editorName}
            disabled={disabled}
            value={fullName}
            onChange={onChange}
          />
        )}
      />

      <LazyOperation
        initialOperation={removeClientParent}
        getLazyOperationVariables={{
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'removeClientParent'
        }}
      >
        {({ disabled }) =>
          !disabled && (
            <Container left='small'>
              <Button
                variant='secondary'
                size='small'
                onClick={removeParent}
                loading={submittingRemoveParentLink}
                disabled={submittingRemoveParentLink}
              >
                Remove
              </Button>
            </Container>
          )
        }
      </LazyOperation>
    </Container>
  )
}

export default ParentLink
