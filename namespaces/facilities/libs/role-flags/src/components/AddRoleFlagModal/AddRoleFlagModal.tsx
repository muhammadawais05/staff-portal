import {
  Alert,
  Button,
  Container,
  SelectOption,
  TypographyOverflow
} from '@toptal/picasso'
import React, { useMemo, useState } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Link } from '@staff-portal/navigation'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { ROLE_FLAGS_UPDATED } from '../../messages'
import { useAddRoleFlag } from './data/add-role-flag'
import { useGetRoleMissingFlags } from './data/get-role-missing-flags'

const ITEMS_LIMIT = 999

type FormValues = {
  flagId: string
  comment: string
}

export interface Props {
  roleId: string
  fullName: string
  hideModal: () => void
}

const AddFlagModal = ({ roleId, fullName, hideModal }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const { type: decodedRoleType, id: decodedRoleId } = useMemo(
    () => decodeEntityId(roleId),
    [roleId]
  )

  const nodeType = decodedRoleType as NodeType.CLIENT | NodeType.ROLE
  const operationVariables = useMemo<GetLazyOperationVariables>(
    () => ({
      nodeId: roleId,
      ...(nodeType === NodeType.CLIENT
        ? {
            nodeType,
            operationName: 'addClientRoleFlag'
          }
        : {
            nodeType,
            operationName: 'addRoleFlag'
          })
    }),
    [nodeType, roleId]
  )
  const { addFlag, loading: isSubmittingRoleFlag } = useAddRoleFlag({
    nodeType,
    onError: () => showError('Failed to add flag.')
  })

  const {
    canCreateTalentInfractions,
    data: missingFlags,
    loading: isLoadingMissingFlags
  } = useGetRoleMissingFlags(roleId)
  const missingFlagsList: SelectOption[] = useMemo(
    () =>
      missingFlags?.map(({ id, title }) => ({
        value: id,
        text: title
      })) || [],
    [missingFlags]
  )

  const [isYellowFlagSelected, setIsYellowFlagSelected] = useState(false)
  const yellowFlag = useMemo(
    () => missingFlags?.find(flag => flag.token === 'yellow_flag'),
    [missingFlags]
  )

  const handleRoleFlagSubmit = async ({ flagId, comment }: FormValues) => {
    const submitResult = await addFlag({
      roleId,
      flagId,
      comment
    })

    return handleMutationResult({
      mutationResult: submitResult,
      successNotificationMessage: 'The Flag was successfully added.',
      onSuccessAction: () => {
        /* TODO: investigate the possibility to get rid of the message emitter
         * https://toptal-core.atlassian.net/browse/SP-2191
         */
        emitMessage(ROLE_FLAGS_UPDATED)
        hideModal()
      }
    })
  }

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      operationVariables={operationVariables}
    >
      <Form<FormValues> onSubmit={handleRoleFlagSubmit}>
        <Modal.Title>Add New Flag</Modal.Title>
        <Modal.Content>
          <Container bottom={1.5}>
            <TypographyOverflow lines={3} size='medium'>
              Add New Flag for {fullName}
            </TypographyOverflow>
          </Container>
          <Form.Select
            label='Flag'
            placeholder='Please select a flag'
            name='flagId'
            required
            limit={ITEMS_LIMIT}
            options={missingFlagsList}
            loading={isLoadingMissingFlags}
            data-testid='flag-select'
          />

          {nodeType !== NodeType.CLIENT && yellowFlag && (
            <FormSpy<FormValues>
              subscription={{ values: true }}
              onChange={({ values }) =>
                setIsYellowFlagSelected(() => values.flagId === yellowFlag.id)
              }
            />
          )}

          {isYellowFlagSelected && (
            <Container top='small' bottom='small'>
              <Alert>
                Please report any talent performance issues as an infraction.
                Yellow flags are no longer used to report performance issues.{' '}
                {canCreateTalentInfractions && (
                  <Link
                    variant='action'
                    href={
                      getTalentProfilePath(decodedRoleId) +
                      `?modal=add_talent_infraction&talent_id=${roleId}#performance`
                    }
                    target='_blank'
                  >
                    Create Infraction
                  </Link>
                )}
              </Alert>
            </Container>
          )}

          {!isYellowFlagSelected && (
            <Form.Input
              label='Comment'
              name='comment'
              required
              width='full'
              multiline
              rows={4}
              rowsMax={25}
              data-testid='comment-field'
            />
          )}
        </Modal.Content>

        <Modal.Actions>
          <Button
            variant='secondary'
            onClick={hideModal}
            disabled={isSubmittingRoleFlag}
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            disabled={isYellowFlagSelected}
            data-testid='add-flag-button'
          >
            Add Flag
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default AddFlagModal
