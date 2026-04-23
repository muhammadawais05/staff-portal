import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationFragment } from '@staff-portal/operations'

import {
  useTalentCoachingActivitiesContext,
  ActivityTabs
} from '../TalentCoachingActivities'

export interface Props {
  createNoteOperation?: OperationFragment
}

const AddNoteButton = ({ createNoteOperation }: Props) => {
  const {
    setShowCreateNoteForm,
    setTabIndex,
    setIsExpanded,
    showCreateCoachingEngagementNoteForm,
    showCreateNoteForm
  } = useTalentCoachingActivitiesContext()
  const isNoteEditActive =
    showCreateCoachingEngagementNoteForm || showCreateNoteForm
  const handleOnAddNoteClick = () => {
    setShowCreateNoteForm(true)
    setTabIndex(ActivityTabs.NOTES)
    setIsExpanded(true)
  }

  return (
    <Operation
      operation={createNoteOperation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled || isNoteEditActive}
          onClick={handleOnAddNoteClick}
          data-testid='addNoteButton'
        >
          Add Note
        </Button>
      )}
    />
  )
}

export default AddNoteButton
