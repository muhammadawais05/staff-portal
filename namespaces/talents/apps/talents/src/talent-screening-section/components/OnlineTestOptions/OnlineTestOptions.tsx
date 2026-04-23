import { Form, useField, useForm } from '@toptal/picasso-forms'
import React, { useEffect, useMemo, useState } from 'react'
import { OnlineTestsFragment } from '@staff-portal/talents'

import { OnlineTestAttemptsFragment } from '../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'
import OnlineTestAttemptLabel from '../OnlineTestAttemptLabel'
import { getServiceOptions, groupOnlineTests } from './utils'

type OptionType = { value: string; text: string }

export interface Props {
  onlineTests: OnlineTestsFragment[]
  onlineTestAttempts?: OnlineTestAttemptsFragment[]
}

const OnlineTestOptions = ({ onlineTests, onlineTestAttempts }: Props) => {
  const [options, setOptions] = useState<OptionType[]>()

  const { change } = useForm()
  const {
    input: { value: testOption }
  } = useField('testOption')

  const services = useMemo(() => groupOnlineTests(onlineTests), [onlineTests])

  useEffect(() => {
    const serviceOptions = getServiceOptions(services, testOption)
    const testAttempt = onlineTestAttempts?.find(({ id }) => id === testOption)

    change('onlineTestId', undefined)
    change('testAttemptId', testAttempt?.id)
    setOptions(serviceOptions)
  }, [change, onlineTestAttempts, services, testOption])

  const showTestOptions =
    Boolean(services.length) || Boolean(onlineTestAttempts?.length)

  return (
    <>
      {showTestOptions && (
        <Form.RadioGroup
          required
          name='testOption'
          label='Test Option'
          data-testid='online-test-option'
        >
          {services.map(({ service }) => (
            <Form.Radio
              key={service}
              label={`Invite to ${service} test`}
              value={service}
            />
          ))}

          {onlineTestAttempts?.map(onlineTestAttempt => (
            <Form.Radio
              key={onlineTestAttempt.id}
              label={
                <OnlineTestAttemptLabel onlineTestAttempt={onlineTestAttempt} />
              }
              value={onlineTestAttempt.id}
            />
          ))}
        </Form.RadioGroup>
      )}

      {options && (
        <Form.Select
          required
          enableReset
          name='onlineTestId'
          label={`${testOption} test`}
          options={options}
          searchThreshold={1}
          width='full'
          placeholder='Please select a test.'
        />
      )}
    </>
  )
}

export default OnlineTestOptions
