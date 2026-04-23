import React from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobAvailabilityRequestEdgeFragment } from '../RequestAvailabilityForm/data'
import FormJobSelection, { Props } from './FormJobSelection'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormJobSelection {...props} />
      </Form>
    </TestWrapper>
  )

describe('FormJobSelection', () => {
  it('renders a message when there is no job', () => {
    const TALENT_TYPE = 'Test'
    const AVAILABILITY_REQUESTS: JobAvailabilityRequestEdgeFragment[] = []

    arrangeTest({
      talentType: TALENT_TYPE,
      jobAvailabilityRequests: AVAILABILITY_REQUESTS
    })

    expect(
      screen.getByText(
        `This company has no pending jobs matching ${TALENT_TYPE}'s specializations. Try to select another one.`
      )
    ).toBeInTheDocument()
  })
})
