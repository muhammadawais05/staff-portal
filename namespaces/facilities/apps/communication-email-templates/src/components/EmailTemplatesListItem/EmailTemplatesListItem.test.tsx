import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { Table } from '@toptal/picasso'

import { EmailTemplatesListFragment } from '../../data/use-get-email-templates-list/get-email-templates-list.staff.gql.types'
import EmailTemplatesListItem from './EmailTemplatesListItem'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: (id: string) => ({ id })
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

const destroyEmailTemplateMock = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}
const updateEmailTemplateMock = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}
const copyEmailTemplateMock = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const EMAIL_TEMPLATE_MOCK = {
  id: '123',
  name: 'Email Template 1',
  private: false,
  role: {
    fullName: 'test name',
    id: '345',
    webResource: {
      text: 'test name',
      url: 'test-url'
    }
  },
  targetRole: {
    title: 'Talent',
    value: 'Talent'
  },
  topscreenClient: null,
  operations: {
    destroyEmailTemplate: destroyEmailTemplateMock,
    updateEmailTemplate: updateEmailTemplateMock,
    copyEmailTemplate: copyEmailTemplateMock
  }
}

const mockOperation = Operation as jest.Mock

const arrangeTest = (emailTemplate: EmailTemplatesListFragment) => {
  mockOperation.mockImplementation(children => <div>{children.render()}</div>)

  return render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <EmailTemplatesListItem emailTemplate={emailTemplate} />
        </Table.Body>
      </Table>
    </TestWrapper>
  )
}

describe('EmailTemplatesListItem', () => {
  it('renders correctly', () => {
    arrangeTest(EMAIL_TEMPLATE_MOCK)

    expect(
      screen.getByTestId('email-templates-list-item-row')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('email-templates-list-item-name-cell')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-templates-list-item-name-cell')
    ).toHaveTextContent('Email Template 1')

    expect(
      screen.getByTestId('email-templates-list-item-created-by-cell')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-templates-list-item-created-by-cell')
    ).toHaveTextContent('test name')

    expect(
      screen.getByTestId('email-templates-list-item-private-cell')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('email-templates-list-item-private-cell')
    ).toHaveTextContent('Public')

    expect(
      screen.getByTestId('email-templates-list-item-actions-cell')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('email-templates-list-item-copy-button')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('email-templates-list-item-edit-button')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('email-templates-list-item-delete-button')
    ).toBeInTheDocument()
  })

  it('correct operations passed to actions', () => {
    arrangeTest(EMAIL_TEMPLATE_MOCK)

    expect(mockOperation).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: destroyEmailTemplateMock
      }),
      expect.anything()
    )
    expect(mockOperation).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: updateEmailTemplateMock
      }),
      expect.anything()
    )
    expect(mockOperation).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: copyEmailTemplateMock
      }),
      expect.anything()
    )
  })
})
