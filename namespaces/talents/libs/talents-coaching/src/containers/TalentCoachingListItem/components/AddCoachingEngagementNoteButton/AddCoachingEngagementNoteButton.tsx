import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationFragment } from '@staff-portal/operations'

import {
  useTalentCoachingActivitiesContext,
  ActivityTabs
} from '../TalentCoachingActivities'

export interface Props {
  createCoachingNoteOperation?: OperationFragment
}

const AddCoachingEngagementNoteButton = ({
  createCoachingNoteOperation
}: Props) => {
  const {
    setShowCreateCoachingEngagementNoteForm,
    setTabIndex,
    setIsExpanded,
    showCreateCoachingEngagementNoteForm,
    showCreateNoteForm
  } = useTalentCoachingActivitiesContext()
  const isNoteEditActive =
    showCreateCoachingEngagementNoteForm || showCreateNoteForm
  const handleClick = () => {
    setShowCreateCoachingEngagementNoteForm(true)
    setTabIndex(ActivityTabs.NOTES)
    setIsExpanded(true)
  }

  return (
    <Operation
      operation={createCoachingNoteOperation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled || isNoteEditActive}
          onClick={handleClick}
          data-testid='add-coaching-engagement-note-button'
        >
          Add Coaching Note
        </Button>
      )}
    />
  )
}

export default AddCoachingEngagementNoteButton
