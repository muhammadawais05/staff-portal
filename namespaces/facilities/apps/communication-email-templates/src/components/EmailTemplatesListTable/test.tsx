import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import EmailTemplatesListTable from './EmailTemplatesListTable'
import { GroupedEmailTemplates } from '../../pages/EmailTemplatesList/EmailTemplatesList'

jest.mock('../', () => ({
  __esModule: true,
  EmailTemplatesListItem: () => <tr data-testid='email-template-list-item' />
}))

const EMAIL_TEMPLATES_MOCK = {
  Talent: [
    {
      id: '123',
      name: 'test name',
      private: false,
      role: null,
      targetRole: {
        title: 'Talent',
        value: 'Talent'
      },
      topscreenClient: null,
      operations: {
        destroyEmailTemplate: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        copyEmailTemplate: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        updateEmailTemplate: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }
    }
  ]
}

const arrangeTest = (emailTemplatesByTargetRole: GroupedEmailTemplates) => {
  return render(
    <TestWrapper>
      <EmailTemplatesListTable
        emailTemplatesByTargetRole={emailTemplatesByTargetRole}
      />
    </TestWrapper>
  )
}

describe('EmailTemplatesListTable', () => {
  it('renders correctly', () => {
    arrangeTest(EMAIL_TEMPLATES_MOCK)

    expect(screen.getByTestId('email-template-list-table')).toBeInTheDocument()
    expect(
      screen.getByTestId('email-template-list-name-row-title')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-template-list-created-by-row-title')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-template-list-visibility-row-title')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-template-list-client-row-title')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-template-list-actions-row-title')
    ).toBeInTheDocument()
    expect(screen.getByTestId('email-template-list-item')).toBeInTheDocument()
  })
})
