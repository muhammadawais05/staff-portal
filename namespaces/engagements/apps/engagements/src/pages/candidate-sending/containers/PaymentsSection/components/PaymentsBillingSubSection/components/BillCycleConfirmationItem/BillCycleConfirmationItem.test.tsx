import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'

import BillCycleConfirmationItem from './BillCycleConfirmationItem'

const TALENT_TYPE = 'Developer'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: jest.fn()
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getRoleTypeText: () => TALENT_TYPE
}))

const renderComponent = (
  props?: ComponentProps<typeof BillCycleConfirmationItem>
) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <BillCycleConfirmationItem talentType={TALENT_TYPE} {...props} />
      </Form>
    </TestWrapper>
  )

describe('BillCycleConfirmationItem', () => {
  describe('when there is no `talentProfileLink`', () => {
    it('does not render component', () => {
      renderComponent({ isMonthlyCycle: true, talentType: TALENT_TYPE })

      expect(
        screen.queryByText(
          `Yes, I have informed developer of the semi-monthly payment requirement.`
        )
      ).not.toBeInTheDocument()
    })
  })

  describe("when it's not monthly cycle", () => {
    it('does not render component', () => {
      renderComponent({
        talentProfileLink: { url: 'https://some.url', text: 'Tom Jones' },
        isMonthlyCycle: false,
        talentType: TALENT_TYPE
      })

      expect(
        screen.queryByText(
          `Yes, I have informed developer of the semi-monthly payment requirement.`
        )
      ).not.toBeInTheDocument()
    })
  })

  describe("when talent `profileLink` & `type` exist and it's monthly cycle", () => {
    it('renders component', () => {
      renderComponent({
        talentProfileLink: { url: 'https://some.url', text: 'Tom Jones' },
        talentType: TALENT_TYPE,
        isMonthlyCycle: true
      })

      expect(
        screen.getAllByText(
          (_, element) =>
            element?.textContent?.includes(
              'Did you inform Tom Jones of the semi-monthly payment requirement?'
            ) ?? false
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          `Yes, I have informed developer of the semi-monthly payment requirement.`
        )
      ).toBeInTheDocument()
    })
  })
})
