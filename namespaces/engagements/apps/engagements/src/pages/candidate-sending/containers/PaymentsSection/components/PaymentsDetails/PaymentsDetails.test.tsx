import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import PaymentsDetails from './PaymentsDetails'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn(),
  useFormState: jest.fn()
}))

const useFormStateMock = useFormState as jest.Mock
const useFormMock = useForm as jest.Mock

const clientMock = {
  id: '124',
  fullName: 'Kuhlman',
  contact: {
    id: '456',
    fullName: 'Elia'
  },
  webResource: {
    text: 'Some Company',
    url: 'https://staging.toptal.net/platform/staff/companies/2385649'
  },
  enterprise: true,
  netTerms: 30,
  billingDefaults: {
    id: '678',
    billCycle: null,
    billDay: null
  }
}

const talentMock = {
  id: '123',
  fullName: 'Some Talent',
  type: 'Developer',
  profileLink: {
    url: 'https://staging.toptal.net/platform/staff/talents/1340084',
    text: 'Providencia Bechtelar',
    newTab: false
  },
  webResource: {
    text: '',
    url: ''
  }
}

const renderComponent = ({
  values = {}
}: Partial<{
  values: { rateMethod?: EngagementRateMethodEnum | null }
}> = {}) => {
  useFormMock.mockImplementation(() => ({ change: () => {} }))
  useFormStateMock.mockImplementation(() => ({ values }))

  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <PaymentsDetails talent={talentMock} client={clientMock} />
      </Form>
    </TestWrapper>
  )

  return innerHTML
}

describe('Payments details subsection', () => {
  it('renders the proper labels and default values', () => {
    const component = renderComponent()

    expect(component).toContain('Company')
    expect(component).toContain('Kuhlman [Elia]')

    expect(component).toContain('Developer')
    expect(component).toContain('Some Talent')

    expect(component).toContain('Rate Method')
    expect(component).toContain('Markup')
  })

  describe('when rateMethod equals `DEFAULT`', () => {
    it('does not render rate override field', () => {
      const component = renderComponent({
        values: { rateMethod: EngagementRateMethodEnum.DEFAULT }
      })

      expect(component).not.toContain('Rate Override Reason')
    })
  })

  describe('when rateMethod does not equal `DEFAULT`', () => {
    it('renders rate override field', () => {
      const component = renderComponent({
        values: {
          rateMethod: EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES
        }
      })

      expect(component).toContain('Rate Override Reason')
    })
  })

  describe('when rateMethod `OVERRIDE_USING_CUSTOM_VALUES`', () => {
    it('does not render rate override field', () => {
      const component = renderComponent({
        values: {
          rateMethod: EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES
        }
      })

      expect(component).not.toContain('Markup')
    })
  })

  describe('when rateMethod does not equal `OVERRIDE_USING_CUSTOM_VALUES`', () => {
    it('renders rate override field', () => {
      const component = renderComponent({
        values: {
          rateMethod: EngagementRateMethodEnum.DEFAULT
        }
      })

      expect(component).toContain('Markup')
    })
  })
})
