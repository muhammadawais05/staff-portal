import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { FeedbackReasonFragment } from '../../containers/FormReasonSelect/data/get-feedback-reasons'
import FormReasonSelectWithSubReason, {
  Props
} from './FormReasonSelectWithSubReason'

const REASONS: FeedbackReasonFragment[] = [
  { id: '1', identifier: 'dissatisfied_with_my_talent', name: 'Reason 1' },
  { id: '2', identifier: 'hiring_replacement', name: 'Reason 2' },
  { id: '3', identifier: 'other', name: 'Reason 3' },
  {
    id: '4',
    identifier: 'sub-reason-1',
    name: 'SubReason 1',
    group: {
      id: '2',
      name: 'Reason 2'
    }
  }
]

const arrangeTest = ({
  name = 'reasonId',
  label = 'Main Reasons',
  reasons = REASONS,
  subReasonProps = { name: 'subReasonId' },
  ...restProps
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormReasonSelectWithSubReason
          name={name}
          label={label}
          reasons={reasons}
          subReasonProps={subReasonProps}
          {...restProps}
        />
      </Form>
    </TestWrapper>
  )

describe('FormReasonSelectWithSubReason', () => {
  it('toggles the sub reasons', async () => {
    arrangeTest()

    expect(
      screen.queryByText('How Did You Find a Replacement?')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Main Reasons'))

    fireEvent.click(await screen.findByText('Reason 2'))

    expect(
      await screen.findByText('How Did You Find a Replacement?')
    ).toBeInTheDocument()
  })

  it('toggles the sub reasons with defined label', async () => {
    arrangeTest({
      subReasonProps: { name: 'subReasonId', label: 'Custom Label' }
    })

    expect(screen.queryByText('Custom Label')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Main Reasons'))

    fireEvent.click(await screen.findByText('Reason 2'))

    expect(await screen.findByText('Custom Label')).toBeInTheDocument()
  })
})
