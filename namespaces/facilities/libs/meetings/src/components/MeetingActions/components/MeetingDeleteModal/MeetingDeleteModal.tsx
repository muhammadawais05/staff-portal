import { NodeType } from '@staff-portal/graphql'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Typography } from '@toptal/picasso'
import React from 'react'

import { REFRESH_MEETING_LIST } from '../../../../messages'
import { RemoveMeetingDocument } from './data'

type Props = {
  meetingId: string
  attendeeName?: string | null
  hideModal: () => void
}

const MeetingDeleteModal = ({ meetingId, attendeeName, hideModal }: Props) => {
  const { handleSubmit, loading: removeMeetingLoading } =
    useModalFormChangeHandler({
      mutationDocument: RemoveMeetingDocument,
      mutationResultOptions: {
        successMessageEmitOptions: {
          type: REFRESH_MEETING_LIST
        },
        mutationResult: 'removeMeeting',
        successNotificationMessage: `Meeting with ${attendeeName} was successfully deleted.`,
        onSuccessAction: hideModal
      }
    })

  const onSubmit = () => handleSubmit({ meetingId })

  return (
    <PromptModal
      open
      loading={removeMeetingLoading}
      onClose={hideModal}
      title='Delete Meeting'
      message={
        <Typography size='medium'>
          Are you sure you want to delete the meeting with{' '}
          <Typography as='strong' weight='semibold'>
            {attendeeName}
          </Typography>
          ?
        </Typography>
      }
      submitText='Delete Meeting'
      variant='negative'
      onSubmit={onSubmit}
      operationVariables={{
        nodeId: meetingId,
        nodeType: NodeType.MEETING,
        operationName: 'removeMeeting'
      }}
    />
  )
}

export default MeetingDeleteModal
