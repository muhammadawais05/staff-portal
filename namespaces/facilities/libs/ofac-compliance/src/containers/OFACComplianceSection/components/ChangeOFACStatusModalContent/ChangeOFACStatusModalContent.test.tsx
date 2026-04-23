import React, { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { ModalForm } from '@staff-portal/modals-service'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'
import {
  ClientCumulativeStatus,
  OfacStatus,
  CompanyRepresentativeCumulativeStatus,
  RoleStatus
} from '@staff-portal/graphql/staff'
import { useDependency } from '@staff-portal/dependency-injector'

import { AssociatedRole } from '../../../../types'
import ChangeOFACStatusModalContent, {
  ChangeOfacStatusFormValue
} from './ChangeOFACStatusModalContent'
import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '../../../../dependencies'
import {
  companyStatusTextMappingMock,
  talentStatusMappingMock
} from '../../../../mocks'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    SubmitButton: jest.fn(),
    Input: jest.fn(),
    Select: jest.fn()
  }
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalForm: jest.fn()
}))

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const mockUseDependency = useDependency as jest.Mock

const componentImplementation = ({ children }: PropsWithChildren<unknown>) => (
  <>{children}</>
)

const ButtonMock = Button as unknown as jest.Mock
const ModalFormMock = ModalForm as unknown as jest.Mock
const FormSubmitButtonMock = Form.SubmitButton as unknown as jest.Mock
const InputMock = Form.Input as unknown as jest.Mock
const SelectMock = Form.Select as unknown as jest.Mock

const initialValues = {}
const hideModal = () => {}
const handleSubmit = (input: ChangeOfacStatusFormValue) =>
  Promise.resolve(input)

const renderComponent = ({
  nodeType = 'client',
  associatedRoles,
  roleOrClientStatus = 'roleOrClientStatus'
}: {
  nodeType?: string
  associatedRoles?: AssociatedRole[]
  roleOrClientStatus?: string | null
}) =>
  render(
    <TestWrapper>
      <ChangeOFACStatusModalContent
        roleOrClientStatus={roleOrClientStatus}
        currentStatus={OfacStatus.NORMAL}
        hideModal={hideModal}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        submitting={false}
        fullName='John Doe akdas8'
        nodeType={nodeType}
        associatedRoles={associatedRoles}
      />
    </TestWrapper>
  )

describe('ChangeOFACStatusModalContent', () => {
  beforeEach(() => {
    ModalFormMock.mockImplementationOnce(componentImplementation)
    FormSubmitButtonMock.mockImplementationOnce(componentImplementation)
    ButtonMock.mockImplementationOnce(componentImplementation)
    InputMock.mockImplementationOnce(componentImplementation)
    SelectMock.mockImplementationOnce(componentImplementation)
    mockUseDependency.mockImplementation(key => {
      if (key === COMPANY_STATUS_TEXT_MAPPING_DI_KEY) {
        return companyStatusTextMappingMock
      }
      if (key === TALENT_STATUS_MAPPING_DI_KEY) {
        return talentStatusMappingMock
      }
    })
  })

  it('default render', () => {
    renderComponent({})

    expect(screen.getByTestId('current-ofac-status').textContent).toBe(
      'The current OFAC status of John Doe akdas8 is: Normal. Are you sure you want to change it?'
    )

    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues,
        onSubmit: handleSubmit,
        title: 'Change OFAC status'
      }),
      {}
    )
    expect(ButtonMock).toHaveBeenCalledWith(
      {
        onClick: hideModal,
        children: 'Cancel',
        disabled: false,
        variant: 'secondary'
      },
      {}
    )
    expect(FormSubmitButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Change OFAC status',
        variant: 'negative'
      }),
      {}
    )
    expect(InputMock).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Comment'
      }),
      {}
    )
    expect(SelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'New OFAC status',
        options: [
          { text: 'Investigation', value: OfacStatus.INVESTIGATION },
          { text: 'Restricted', value: OfacStatus.RESTRICTED }
        ]
      }),
      {}
    )
  })

  describe('when there are associated roles', () => {
    it.each([
      [
        NodeType.TALENT,
        {
          roleOrClientStatus: 'Active',
          associatedRoles: [
            {
              id: encodeEntityId('123', 'Client'),
              type: 'Client',
              clientCumulativeStatus: ClientCumulativeStatus.PENDING_TOS
            },
            {
              id: encodeEntityId('123', 'CompanyRepresentative'),
              type: 'CompanyRepresentative',
              companyRepresentativeCumulativeStatus:
                CompanyRepresentativeCumulativeStatus.NO_LOGIN
            },
            {
              id: encodeEntityId('456', 'Staff'),
              type: 'Staff',
              cumulativeStatus: RoleStatus.REJECTED
            }
          ],
          expectedStatus:
            'The following roles of John Doe akdas8 will be affected: Client - Pending TOS, Company Representative - No login, Staff - Rejected, Talent - Active.'
        }
      ],
      [
        NodeType.COMPANY_REPRESENTATIVE,
        {
          roleOrClientStatus: 'bar',
          associatedRoles: [
            {
              id: encodeEntityId('123', 'Client'),
              type: 'Client',
              clientCumulativeStatus: ClientCumulativeStatus.PENDING_TOS
            }
          ],
          expectedStatus:
            'The following roles of John Doe akdas8 will be affected: Client - Pending TOS, Company Representative - bar.'
        }
      ]
    ])(
      'displays current and associated role statuses for %s',
      (nodeType, { roleOrClientStatus, associatedRoles, expectedStatus }) => {
        renderComponent({ nodeType, roleOrClientStatus, associatedRoles })

        expect(screen.getByTestId('affected-roles').textContent).toBe(
          expectedStatus
        )
      }
    )
  })
})
