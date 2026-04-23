import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { HowDidYouHearValues } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import HowDidYouHearNoteForm, {
  HOW_DID_YOU_HEAR_MAPPING
} from './HowDidYouHearNoteForm'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <HowDidYouHearNoteForm />
      </Form>
    </TestWrapper>
  )

describe('HowDidYouHearNoteForm', () => {
  it('shows the how did you hear select options', () => {
    const { container } = arrangeTest()

    const howDidYouHearOption = container.querySelectorAll('#howDidYouHear')[0]

    fireEvent.click(howDidYouHearOption)

    expect(screen.getByText('How did they hear about us')).toBeInTheDocument()

    Object.values(HowDidYouHearValues).forEach(option => {
      expect(
        screen.getByText(HOW_DID_YOU_HEAR_MAPPING[option])
      ).toBeInTheDocument()
    })
  })
})
