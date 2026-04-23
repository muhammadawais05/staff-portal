import React from 'react'
import { render } from '@testing-library/react'
import { ContactType } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { companyMock } from '../../data/company-task-card-fragment/mocks'
import CompanyTaskCardMainAction from './CompanyTaskCardMainAction'

jest.mock('../ContactClientButton', () => ({
  ContactClientButton: () => <>ContactCompanyButton Component</>
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  SendEmailActionItem: () => <>SendEmailButton Component</>
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrangeTest = (customOptions: any = {}) => {
  const company = {
    ...companyMock,
    ...customOptions
  } as TaskCardCompanyFragment

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardMainAction company={company} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('CompanyTaskCardMainAction', () => {
  it('show SendEmailButton when the only email contact exists', () => {
    const textContent = arrangeTest({
      contact: {
        contacts: {
          nodes: [
            {
              id: 'id1',
              type: ContactType.EMAIL,
              value: 'test@toptal.test'
            }
          ]
        }
      }
    })

    expect(textContent).toContain('SendEmailButton Component')
    expect(textContent).not.toContain('ContactCompanyButton Component')
  })

  it('shows SendEmailButton when only email contacts are presented', () => {
    const textContent = arrangeTest({
      contact: {
        contacts: {
          nodes: [
            {
              id: 'id1',
              type: ContactType.EMAIL,
              value: 'test@toptal.test'
            },
            {
              id: 'id2',
              type: ContactType.EMAIL,
              value: 'test1@toptal.test'
            }
          ]
        }
      }
    })

    expect(textContent).not.toContain('ContactCompanyButton Component')
    expect(textContent).toContain('SendEmailButton Component')
  })

  it('shows ContactCompanyButton when different types of contacts', () => {
    const textContent = arrangeTest({
      contact: {
        contacts: {
          nodes: [
            {
              id: 'id1',
              type: ContactType.EMAIL,
              value: 'test@toptal.test'
            },
            {
              id: 'id2',
              type: ContactType.PHONE,
              value: '+0101010101010101'
            }
          ]
        }
      }
    })

    expect(textContent).toContain('ContactCompanyButton Component')
    expect(textContent).not.toContain('SendEmailButton Component')
  })

  it('shows ContactCompanyButton when only phone contact exists', () => {
    const textContent = arrangeTest({
      contact: {
        contacts: {
          nodes: [
            {
              id: 'id1',
              type: ContactType.PHONE,
              value: '+0101010101010101'
            }
          ]
        }
      }
    })

    expect(textContent).toContain('ContactCompanyButton Component')
    expect(textContent).not.toContain('SendEmailButton Component')
  })

  // It may be a wrong behaviour or an impossible case.
  // Why to show SendEmailButton if there is no any email?
  // Is it possible to have a company wothout any contact?
  it('shows SendEmailButton when no contacts', () => {
    const textContent = arrangeTest({
      contact: {
        contacts: {
          nodes: []
        }
      }
    })

    expect(textContent).toContain('SendEmailButton Component')
  })
})
