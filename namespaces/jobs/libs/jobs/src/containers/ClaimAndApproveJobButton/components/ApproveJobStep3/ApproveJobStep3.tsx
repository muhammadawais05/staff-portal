import { Button, Container, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { PropsWithChildren } from 'react'

import JobApplicationQuestions from '../../../JobApplicationQuestions/JobApplicationQuestions'
import ApproveJobSubtitle from '../ApproveJobSubtitle'
import { ClientRateLimitNotice } from './components'

export interface Props {
  title: string
  jobDescription?: string
  onClose: () => void
  navigateToStep1: () => void
  navigateToStep2: () => void
}

const ApproveJobStep3 = ({
  title,
  onClose,
  jobDescription,
  navigateToStep1,
  navigateToStep2,
  children
}: PropsWithChildren<Props>) => (
  <>
    <Modal.Content>
      {children}
      <ApproveJobSubtitle>{title}</ApproveJobSubtitle>
      <ApproveJobSubtitle weight='regular'>
        Please review the following job information.
      </ApproveJobSubtitle>

      <Container bottom='medium'>
        <Form.Input
          min={220}
          required
          multiline
          rows={5}
          rowsMax={15}
          initialValue={jobDescription}
          name='jobDescription'
          label='Summary'
          width='full'
        />

        <Form.Input
          multiline
          rows={5}
          rowsMax={15}
          name='tasksAndDeliverables'
          label='Tasks and Deliverables'
          width='full'
          placeholder='e.g., The final deliverable will be a Sketch file of the work, including all assets and a clickable InVision prototype.'
        />

        <Form.Input
          multiline
          rows={5}
          rowsMax={15}
          name='requiredExperience'
          label='Required Experience'
          width='full'
          placeholder='e.g., 5+ years working in product design'
        />

        <Form.Input
          multiline
          rows={5}
          rowsMax={15}
          name='recommendedSkills'
          label='Recommended Skills'
          width='full'
          placeholder='e.g., 5+ years working in product design'
        />
      </Container>

      <JobApplicationQuestions skipStickyQuestions>
        <ClientRateLimitNotice navigateToStep1={navigateToStep1} />
      </JobApplicationQuestions>
    </Modal.Content>

    <Modal.Actions>
      <Button variant='secondary' onClick={onClose}>
        Cancel
      </Button>
      <Button variant='secondary' onClick={navigateToStep2}>
        Go Back
      </Button>
      <Form.SubmitButton variant='positive'>Approve Job</Form.SubmitButton>
    </Modal.Actions>
  </>
)

export default ApproveJobStep3
