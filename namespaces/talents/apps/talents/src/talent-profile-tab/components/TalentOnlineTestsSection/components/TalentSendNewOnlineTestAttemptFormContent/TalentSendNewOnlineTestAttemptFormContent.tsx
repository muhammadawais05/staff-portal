import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import { Typography, Container, SelectOption } from '@toptal/picasso'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'

import { GetTalentNewOnlineTestAttemptQuery } from '../TalentSendNewOnlineTestAttemptModal/data/get-talent-new-online-test-attempt'

type FormValues = { serviceName: string; onlineTestId: string; comment: string }

interface OnlineTestOptionsMap {
  [key: string]: SelectOption[]
}

const TalentSendNewOnlineTestAttemptFormContent = forwardRef(
  (
    {
      data
    }: {
      data: GetTalentNewOnlineTestAttemptQuery
      loading?: boolean
    },
    ref
  ) => {
    const form = useForm<FormValues>()
    const { values } = useFormState<FormValues>()
    const [testOptions, setTestOptions] = useState<SelectOption[]>([])

    useImperativeHandle(ref, () => ({
      submit: () => form.submit()
    }))

    if (!data?.node?.trackingRoleSteps.nodes.length) {
      throw new Error('Missing step in the tracking role steps')
    }

    const stepName = data.node.trackingRoleSteps?.nodes[0].step.title
    const testName = data.node.test?.name

    const onlineTests = useMemo(
      () =>
        data.onlineTests.nodes.reduce(
          (acc, testItem) => {
            acc[testItem.service].push({
              value: testItem.id,
              text: testItem.name
            })

            return acc
          },
          {
            Codility: [],
            HackerRank: []
          } as OnlineTestOptionsMap
        ),
      [data]
    )

    const handleServiceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const currServiceName = values.serviceName
      const nextServiceName = evt.target.value

      setTestOptions(onlineTests[nextServiceName])
      if (currServiceName && currServiceName !== nextServiceName) {
        form.change('onlineTestId', '')
      }
    }

    return (
      <>
        <Container bottom='medium' data-testid='send-online-test-attempt-form'>
          <Typography>
            Are you sure you want to send a new test for the{' '}
            <Typography as='span' weight='semibold'>
              {stepName}
            </Typography>{' '}
            step? The currently tracked{' '}
            <Typography as='span' weight='semibold'>
              {testName}
            </Typography>{' '}
            test will no longer be tracked if a new test is sent.
          </Typography>
        </Container>
        <Form.RadioGroup
          name='serviceName'
          label='Test option'
          onChange={handleServiceChange}
          required
          width='full'
        >
          {onlineTests.Codility.length && (
            <Form.Radio label='Invite to Codility test' value='Codility' />
          )}
          {onlineTests.HackerRank.length && (
            <Form.Radio label='Invite to HackerRank test' value='HackerRank' />
          )}
        </Form.RadioGroup>
        {values.serviceName && (
          <Form.Select
            name='onlineTestId'
            placeholder='Please select a test'
            width='full'
            label={`${values.serviceName} test`}
            options={testOptions}
            required
          />
        )}
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

export default TalentSendNewOnlineTestAttemptFormContent
