import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'

import ConfirmAvailabilityQuestionItem, {
  Props
} from './ConfirmAvailabilityQuestionItem'

const renderComponent = ({
  talentFullName,
  talentProfileLink,
  talentRoleType
}: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmAvailabilityQuestionItem
          talentFullName={talentFullName}
          talentProfileLink={talentProfileLink}
          talentRoleType={talentRoleType}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmAvailabilityQuestionItem', () => {
  it('renders the component', () => {
    renderComponent({
      talentFullName: 'Timofei Kachalov',
      talentProfileLink:
        'https://staging.toptal.net/platform/staff/talents/3037800',
      talentRoleType: 'Designer'
    })

    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent?.includes(
            'Did you confirm availability for this job with Timofei Kachalov before sending them to the client?'
          ) ?? false
      )[0]
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Yes, designer's availability has been confirmed for this job."
      )
    ).toBeInTheDocument()
  })
})
