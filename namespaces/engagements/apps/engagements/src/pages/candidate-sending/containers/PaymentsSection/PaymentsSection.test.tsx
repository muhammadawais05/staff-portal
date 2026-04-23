import React, { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import PaymentsSection from './PaymentsSection'
import { useCandidateSendingContext } from '../../hooks'
import {
  DetailsStepPaymentsJobFragment,
  DetailsStepPaymentsTalentFragment,
  DetailsStepNewEngagementFragment
} from '../../data/get-details-step-data'
import {
  PaymentsDetails,
  PaymentsRateTable,
  PaymentsBillingSubSection
} from './components'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  PaymentsDetails: jest.fn(),
  PaymentsRateTable: jest.fn(),
  PaymentsBillingSubSection: jest.fn()
}))

const PaymentsDetailsMock = PaymentsDetails as jest.Mock
const PaymentsRateTableMock = PaymentsRateTable as jest.Mock
const PaymentsBillingSubSectionMock = PaymentsBillingSubSection as jest.Mock

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  job,
  talent,
  newEngagement,
  commitmentSettingsHoursOptions
}: {
  job?: DetailsStepPaymentsJobFragment | null
  talent?: DetailsStepPaymentsTalentFragment | null
  newEngagement?: DetailsStepNewEngagementFragment | null
  commitmentSettingsHoursOptions: number[]
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))

  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <PaymentsSection
          job={job}
          talent={talent}
          newEngagement={newEngagement}
          commitmentSettingsHoursOptions={commitmentSettingsHoursOptions}
        />
      </Form>
    </TestWrapper>
  )
}

const jobMock = {
  id: '123',
  client: {
    id: '234',
    netTerms: 10,
    fullName: 'Company',
    enterprise: false,
    webResource: {
      text: 'Best Company LLC',
      url: 'http://staging.toptal.net/companies/234'
    }
  }
}

const talentMock = {
  id: '123',
  fullName: 'Andrei Mocanu',
  type: 'Developer',
  webResource: {
    text: 'Andrei Mocanu',
    url: 'http://staging.toptal.net/talents/123'
  }
}

describe('PaymentsSection', () => {
  describe('when there is no job, talent or new engagement', () => {
    it('does not render the payments section', () => {
      renderComponent({
        commitmentSettingsHoursOptions: [1, 2]
      })

      expect(screen.queryByTestId('payments-section')).not.toBeInTheDocument()
    })
  })

  describe('when there is a job, talent and new engagement', () => {
    it('renders the payments section and it`s content', () => {
      const componentImplementation = ({
        children
      }: PropsWithChildren<unknown>) => <>{children}</>

      PaymentsDetailsMock.mockImplementation(componentImplementation)
      PaymentsRateTableMock.mockImplementation(componentImplementation)
      PaymentsBillingSubSectionMock.mockImplementation(componentImplementation)

      renderComponent({
        job: jobMock,
        talent: talentMock,
        newEngagement: {},
        commitmentSettingsHoursOptions: [1, 2]
      })

      expect(screen.getByTestId('payments-section')).toBeInTheDocument()

      expect(PaymentsDetailsMock).toHaveBeenCalledTimes(1)
      expect(PaymentsDetailsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          client: {
            id: '234',
            netTerms: 10,
            fullName: 'Company',
            enterprise: false,
            webResource: {
              text: 'Best Company LLC',
              url: 'http://staging.toptal.net/companies/234'
            }
          },
          defaultFullTimeDiscount: undefined,
          defaultMarkup: undefined,
          defaultPartTimeDiscount: undefined,
          talent: {
            id: '123',
            fullName: 'Andrei Mocanu',
            type: 'Developer',
            webResource: {
              text: 'Andrei Mocanu',
              url: 'http://staging.toptal.net/talents/123'
            }
          }
        }),
        {}
      )

      expect(PaymentsRateTableMock).toHaveBeenCalledTimes(1)
      expect(PaymentsRateTableMock).toHaveBeenCalledWith(
        expect.objectContaining({
          canBeDiscounted: false,
          commitment: undefined,
          defaultUpcharge: undefined,
          discountMultiplier: '0.97',
          mostRecentEngageableApplication: undefined,
          talent: {
            id: '123',
            fullName: 'Andrei Mocanu',
            type: 'Developer',
            webResource: {
              text: 'Andrei Mocanu',
              url: 'http://staging.toptal.net/talents/123'
            }
          }
        }),
        {}
      )

      expect(PaymentsBillingSubSectionMock).toHaveBeenCalledTimes(1)
      expect(PaymentsBillingSubSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          commitmentSettingsApplicable: undefined,
          commitmentSettingsHoursOptions: [1, 2],
          hasInitialBillCycle: undefined,
          hasInitialBillDay: undefined,
          semiMonthlyBilling: false,
          talentProfileLink: undefined,
          talentType: 'Developer'
        }),
        {}
      )
    })
  })
})
