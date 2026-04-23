import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import { PaymentKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Component from '.'

jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')

const render = (props: ComponentProps<typeof Component>) =>
  renderComponent(<Component {...props} />)

const defaultReasonTalent = {
  __typename: 'Talent',
  roleType: 'Product manager',
  fullName: 'George Aidonidis',
  id: 'VjEtVGFsZW50LTk5OQ==',
  webResource: {
    __typename: 'Link',
    text: 'George Aidonidis',
    url: 'http://localhost:3000/platform/staff/talent/999'
  }
}
const defaultReason = {
  __typename: 'Default',
  fullName: 'José Silva',
  id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
  talent: defaultReasonTalent,
  roleStepTalent: defaultReasonTalent,
  referrer: {
    __typename: 'Staff',
    fullName: 'Peter Marosi',
    id: 'VjEtU3RhZmYtNzc3',
    roleType: 'designer',
    webResource: {
      __typename: 'Link',
      text: 'Peter Marosi',
      url: 'http://localhost:3000/platform/staff/staff/777'
    }
  },
  webResource: {
    __typename: 'Link',
    text: 'José Silva',
    url: 'http://localhost:3000/platform/staff/staff/1455082'
  }
}

describe('#PaymentShortDescription', () => {
  describe.each([
    [
      PaymentKind.SOURCING_COMMISSION,
      'Commission for sourcing product manager <a data-testid="reason-link" href="http://localhost:3000/platform/staff/staff/1455082">José Silva</a>',
      {
        reason: {
          __typename: 'Talent',
          roleType: 'Product manager',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      PaymentKind.SOURCING_COMMISSION,
      'Commission for referring company <a data-testid="reason-link" href="http://localhost:3000/platform/staff/staff/1455082">José Silva</a>',
      {
        billingCycle: undefined,
        createdOn: '2020-01-01',
        reason: {
          __typename: 'Talent',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      PaymentKind.SOURCING_COMMISSION,
      'Commission for referring partner <a data-testid="reason-link" href="http://localhost:3000/platform/staff/staff/1455082">José Silva</a>',
      {
        reason: {
          __typename: 'TalentPartner',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      PaymentKind.SOURCING_COMMISSION,
      'Commission for referring company <a data-testid="reason-link" href="http://localhost:3000/platform/staff/staff/1455082">José Silva</a>',
      {
        reason: {
          __typename: 'Client',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      PaymentKind.TALENT_PAYMENT,
      'Extra expenses on position <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a> for <a data-testid="company-link" href="http://localhost:3000/platform/staff/companies/256814">Baumbach-Willms UK</a>',
      { extraExpenses: true }
    ],
    [
      PaymentKind.TALENT_PAYMENT,
      'Jul 21 — Jul 21, 2021 on <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a> for <a data-testid="company-link" href="http://localhost:3000/platform/staff/companies/256814">Baumbach-Willms UK</a>'
    ],
    [
      PaymentKind.CASH_LEAD_PROMOTION,
      'Promotional reward for adding multiple Leads-for-Cash leads'
    ],
    [PaymentKind.CASH_LEAD_REWARD, 'Reward for Leads-for-Cash approved lead'],
    [
      PaymentKind.COMPANY_CLAIMING_COMMISSION,
      'Commission for engagement letter <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.ENTERPRISE_CLIENT_PARTNER_COMMISSION,
      'Commission for enterprise company client partner of <a data-testid="company-link" href="http://localhost:3000/platform/staff/companies/256814">Baumbach-Willms UK</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.ENTERPRISE_COMPANY_CLAIMING_COMMISSION,
      'Commission for enterprise company claimer of <a data-testid="company-link" href="http://localhost:3000/platform/staff/companies/256814">Baumbach-Willms UK</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.JOB_CLAIMING_COMMISSION,
      'Commission for engagement <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.PROJECT_SALES_COMMISSION,
      'Commission for projects engagement of <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.REFERRED_COMMISSION,
      'Commission for being referred by designer <a data-testid="refer-link" href="http://localhost:3000/platform/staff/staff/777">Peter Marosi</a>'
    ],
    [PaymentKind.RETURNED_CREDIT, 'Refunded credit balance payment'],
    [
      PaymentKind.ROLE_STEP_COMMISSION,
      'Commission for screening Short role step title step of <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a>',
      {
        reason: {
          __typename: 'RoleStep',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          step: {
            __typename: 'Step',
            title: 'Full role step title',
            short: 'Short role step title'
          },
          roleStepTalent: defaultReasonTalent
        }
      }
    ],
    [
      PaymentKind.SALES_ANALYSIS_COMMISSION,
      'Commission for sales analysis <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.SALES_OWNER_COMMISSION,
      'Commission for engagement of <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/jobs/94454">Principal Marketing Developer (94454)</a>'
    ],
    [
      PaymentKind.TOP_SKILL_BONUS_REFERRED_COMMISSION,
      'Commission for being referred by designer <a data-testid="refer-link" href="http://localhost:3000/platform/staff/staff/777">Peter Marosi</a>'
    ],
    [
      PaymentKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION,
      'Commission for referring company <a data-testid="reason-link" href="http://localhost:3000/platform/staff/staff/1455082">José Silva</a>'
    ]
  ])('variations', (paymentKind, result, override = {}) => {
    beforeEach(() => MockDate.set('2020-01-01T19:00:00.000+00:00'))

    afterEach(() => MockDate.reset())

    describe(`when kind is ${paymentKind} and ${
      override?.reason?.__typename || 'default'
    } reason`, () => {
      it('renders the expected short description', () => {
        const { getByTestId } = render({
          payment: {
            ...fixtures.MockPayment,
            paymentKind,
            ...{ reason: { ...defaultReason } },
            ...override
          }
        })

        expect(getByTestId('PaymentShortDescription')).toContainHTML(result)
      })
    })
  })
})
