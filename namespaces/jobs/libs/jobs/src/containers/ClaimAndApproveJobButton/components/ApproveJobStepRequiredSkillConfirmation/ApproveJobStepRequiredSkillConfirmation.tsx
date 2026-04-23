import { Button, Modal, Typography } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import React from 'react'

const ApproveJobStepRequiredSkillConfirmation = () => {
  const { change } = useForm()

  return (
    <>
      <Modal.Content>
        <Typography size='medium'>
          You haven't added any required skills to this job. Are you sure you
          want to claim it?
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          onClick={() => change('skipQualityChecks', true)}
        >
          Add Required Skills
        </Button>
        <Button
          variant='positive'
          onClick={() => change('showNoRequiredSkillsConfirmation', false)}
        >
          Claim Job
        </Button>
      </Modal.Actions>
    </>
  )
}

export default ApproveJobStepRequiredSkillConfirmation
