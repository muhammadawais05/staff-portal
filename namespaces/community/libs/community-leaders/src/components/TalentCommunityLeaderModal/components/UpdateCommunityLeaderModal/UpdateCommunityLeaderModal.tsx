import React from 'react'
import { Grid } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  CommunityLeaderStatus,
  CommunityLeaderType,
  TalentCommunityLeaderTypeEnum,
  UpdateCommunityLeaderInput
} from '@staff-portal/graphql/staff'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { FormCancelButton } from '@staff-portal/forms'

import { useUpdateCommunityLeader } from '../../data/update-community-leader'
import { CommunityLeaderData } from '../../../../types'
import { getCommunityLeaderRole } from '../../../../services/get-community-leader-role'

interface Props {
  hideModal: () => void
  communityLeaderData: CommunityLeaderData
  refetchQueries?: RefetchQueries
}

const UpdateCommunityLeaderModal = ({
  hideModal,
  communityLeaderData,
  refetchQueries
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const role = getCommunityLeaderRole(communityLeaderData)

  const [updateCommunityLeader, { loading }] = useUpdateCommunityLeader({
    onError() {
      showError('Unable to update community leader data')
    }
  })

  const initialValues = {
    type: communityLeaderData?.type ?? CommunityLeaderType.COMMUNITY_LEADER,
    memos: communityLeaderData?.node?.memos ?? '',
    status: CommunityLeaderStatus.APPROVED
  }

  const handleSubmit = async (
    fields: Omit<UpdateCommunityLeaderInput, 'id'>
  ) => {
    const { type = CommunityLeaderType.COMMUNITY_LEADER, memos = '' } = fields

    const { data } = await updateCommunityLeader({
      variables: {
        input: {
          type,
          memos,
          id: communityLeaderData?.node?.id as string
        }
      },
      refetchQueries
    })

    return handleMutationResult({
      mutationResult: data?.updateCommunityLeader,
      successNotificationMessage: `Community Leader ${role?.fullName} was updated successfully`,
      onSuccessAction: hideModal
    })
  }

  return (
    <Modal open onClose={hideModal} onBackdropClick={hideModal}>
      <Modal.Title>{`Edit ${role?.fullName} Community Leader Type`}</Modal.Title>
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
  )
}

export default UpdateCommunityLeaderModal
