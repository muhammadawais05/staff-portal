import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  ClientCumulativeStatus,
  LeadProbabilityBucket,
  BusinessTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import MockDate from 'mockdate'
import { ClientFragment } from '@staff-portal/clients'

import { ClientCardContent } from './ClientCardContent'

const arrangeTest = (companyApplicant: Partial<ClientFragment>) =>
  render(
    <TestWrapper>
      <ClientCardContent
        client={companyApplicant as ClientFragment}
        type='applicant'
      />
    </TestWrapper>
  )

describe('CompanyApplicantContent', () => {
  beforeAll(() => {
    MockDate.set('2021-12-01')
  })

  it('shows company applicants content', () => {
    const EMAIL = 'test@test.test'
    const CONTACT_NAME = 'Bret Watsica'
    const SKYPE = 'carolee_wiegand1996724'
    const COUNTRY = 'United States'
    const PARENT = 'Parent Company'

    arrangeTest({
      email: EMAIL,
      contact: {
        id: '',
        email: '',
        fullName: CONTACT_NAME,
        skype: SKYPE,
        contacts: { nodes: [] }
      },
      leadPotential: {
        leadProbabilityBucket: LeadProbabilityBucket.MEDIUM
      },
      scoreExplanation: {
        negativeFeatures: [],
        positiveFeatures: []
      },
      country: { id: 'test-id', name: COUNTRY },
      cumulativeStatus: ClientCumulativeStatus.APPLIED,
      businessType: BusinessTypes.ENTERPRISE_BUSINESS,
      parent: {
        id: '',
        webResource: {
          text: PARENT
        }
      },
      timeZone: {
        name: '(UTC+03:00) Europe/Moscow',
        value: 'Europe/Moscow'
      }
    })

    expect(screen.getByText(EMAIL)).toBeInTheDocument()
    expect(screen.getByText(CONTACT_NAME)).toBeInTheDocument()
    expect(screen.getByText(SKYPE)).toBeInTheDocument()
    expect(screen.getByText(COUNTRY)).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText(PARENT)).toBeInTheDocument()
    expect(
      screen.getByText('(UTC+03:00) Europe/Moscow, now 3:00 AM')
    ).toBeInTheDocument()
  })
})
