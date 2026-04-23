import React, { PropsWithChildren, useState } from 'react'
import { Button, Grid } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { FormCancelButton } from '@staff-portal/forms'
import { useNotifications } from '@toptal/picasso/utils'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import {
  CommunityLeaderStatus,
  CommunityLeaderType,
  Operation as OperationGQL,
  TalentCommunityLeaderTypeEnum,
  UpdateCommunityLeaderInput
} from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useParams } from '@staff-portal/navigation'

import { useRestoreCommunityLeader } from '../../data/restore-community-leader'
import { CommunityLeaderData } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import { REFRESH_COMMUNITY_LEADER_LIST } from '../../messages'

interface Props {
  id: string
  communityLeaderData: CommunityLeaderData
  refetchQueries?: RefetchQueries
  onRestoreLeader?: () => void
  render?: (action: () => void) => JSX.Element
  operation: OperationGQL
  hidden?: boolean
}

const RestoreCommunityLeaderButton = ({
  id,
  communityLeaderData,
  render,
  children,
  operation,
  refetchQueries,
  hidden = false
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false)
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { id: paramId } = useParams<{ id: string }>()

  const role = getCommunityLeaderRole(communityLeaderData)

  const isOnCommunityLeaderPage = !!paramId

  const initialValues = {
    type: communityLeaderData?.type ?? CommunityLeaderType.COMMUNITY_LEADER,
    memos: communityLeaderData?.node?.memos ?? '',
    status: CommunityLeaderStatus.APPROVED
  }

  const [restoreCommunityLeader, { loading }] = useRestoreCommunityLeader({
    onError() {
      showError('Could not restore Community Leader')
    }
  })

  const togglePromptModal = () => {
    setIsOpen(open => !open)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (
    fields: Omit<UpdateCommunityLeaderInput, 'id'>
  ) => {
    if (loading) {
      return
    }

    const { type = CommunityLeaderType.COMMUNITY_LEADER, memos = '' } = fields

    const { data } = await restoreCommunityLeader({
      variables: {
        input: {
          id,
          type,
          memos
        }
      },
      refetchQueries: isOnCommunityLeaderPage ? refetchQueries : undefined
    })

    return handleMutationResult({
      mutationResult: data?.restoreCommunityLeader,
      successNotificationMessage: `Community Leader ${role?.fullName} was restored successfully`,
      onSuccessAction: () => {
        hideModal()
        if (!isOnCommunityLeaderPage) {
          emitMessage(REFRESH_COMMUNITY_LEADER_LIST)
        }
      }
    })
  }

  return (
    <Operation operation={operation} hidden={hidden}>
      {render ? (
        render(togglePromptModal)
      ) : (
        <Button size='small' variant='secondary' onClick={togglePromptModal}>
          {children ?? 'Restore Community Leader'}
        </Button>
      )}

      <Modal open={isOpen} onBackdropClick={hideModal} onClose={hideModal}>
        <Modal.Title>{`Restore ${role?.fullName} as Community Leader`}</Modal.Title>
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          <Modal.Content>
            <Grid spacing={16}>
              <Grid.Item small={12} medium={6}>
                <Form.RadioGroup
                  name='type'
                  label='Select the type of Community Leader'
                  titleCase={false}
                >
                  <Form.Radio
                    value={TalentCommunityLeaderTypeEnum.COMMUNITY_LEADER}
                    label='Full Community Leader'
                    data-testid='type-full-field'
                  />
                  <Form.Radio
                    value={TalentCommunityLeaderTypeEnum.ONLINE_LEADER}
                    label='Online Community Leader'
                    data-testid='type-online-field'
                  />
                </Form.RadioGroup>
              </Grid.Item>
              <Grid.Item small={12}>
                <Form.Input
                  name='memos'
                  label='Reason'
                  multiline
                  rows={6}
                  width='full'
                  placeholder='Provide a reason for your decision'
                  data-testid='memos-field'
                />
              </Grid.Item>
            </Grid>
          </Modal.Content>

          <Modal.Actions>
            <FormCancelButton onClick={hideModal} />
            <Form.SubmitButton loading={loading} variant='positive'>
              Confirm
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      </Modal>
    </Operation>
  )
}

export default RestoreCommunityLeaderButton
