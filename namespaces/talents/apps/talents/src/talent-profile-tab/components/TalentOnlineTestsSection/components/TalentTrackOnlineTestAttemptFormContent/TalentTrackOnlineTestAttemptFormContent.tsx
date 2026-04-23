import React, { forwardRef, useImperativeHandle } from 'react'
import { Typography, Container } from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'

import { GetTrackOnlineTestAttemptQuery } from '../TalentTrackOnlineTestAttemptModal/data/get-track-online-test-attempt'

type FormValues = { comment: string }

const TalentTrackOnlineTestAttemptFormContent = forwardRef(
  (
    {
      data
    }: {
      data: GetTrackOnlineTestAttemptQuery
      loading?: boolean
    },
    ref
  ) => {
    const form = useForm<FormValues>()

    useImperativeHandle(ref, () => ({
      submit: () => form.submit()
    }))

    if (!data.talent?.roleSteps?.nodes?.length) {
      throw new Error('Missing step in the tracking role steps')
    }

    const stepName = data.talent?.roleSteps.nodes[0].step.title
    const testName = data.subject?.test?.name
    const currentTestName =
      data.talent?.roleSteps.nodes[0].onlineTestAttempt?.test?.name

    return (
      <>
        <Container bottom='medium' data-testid='track-online-test-attempt-form'>
          <Typography>
            Are you sure you want to track this{' '}
            <Typography as='span' weight='semibold'>
              {testName}
            </Typography>{' '}
            for the{' '}
            <Typography as='span' weight='semibold'>
              {stepName}
            </Typography>{' '}
            step? Doing so will end current tracking for the{' '}
            <Typography as='span' weight='semibold'>
              {currentTestName}
            </Typography>
            .
          </Typography>
        </Container>
        <Form.Input
          name='comment'
          label='Comment'
          multiline
          rows={4}
          required
          width='full'
          data-testid='form-comment'
        />
      </>
    )
  }
)

export default TalentTrackOnlineTestAttemptFormContent
