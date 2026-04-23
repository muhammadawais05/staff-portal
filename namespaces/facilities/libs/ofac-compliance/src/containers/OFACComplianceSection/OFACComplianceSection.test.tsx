import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { OfacStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import OFACComplianceSection from './OFACComplianceSection'
import { createOfacStatusDataMock } from './data/get-ofac-status-data/mocks'
import { createOfacStatusChangeFragment } from './data/ofac-status-change-fragment/mocks'
import { createUpdateRoleOfacStatusMock } from './components/ChangeOFACStatusModal/data/update-role-ofac-status/mocks'

const createUpdateRoleOfacStatusLazyOperationMock = (id: string) =>
  createGetLazyOperationMock({
    operation: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    variables: {
      nodeId: id,
      nodeType: NodeType.TALENT,
      operationName: 'updateRoleOfacStatus'
    }
  })

const arrangeTest = (nodeId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <OFACComplianceSection nodeId={nodeId} />
    </TestWrapperWithMocks>
  )
}

describe('OFACComplianceSection', () => {
  it('shows the section title', async () => {
    const TALENT_ID = encodeEntityId('123', 'Test')

    arrangeTest(TALENT_ID, [createOfacStatusDataMock({ id: TALENT_ID })])

    expect(screen.getByText('OFAC Compliance')).toBeInTheDocument()
  })

  // move to Cypress in https://toptal-core.atlassian.net/browse/SPB-3229
  it.skip('reloads the list of OFAC status changes when status is changed', async () => {
    const TALENT_ID = encodeEntityId('456', 'Talent')
    const NEW_STATUS = OfacStatus.RESTRICTED
    const COMMENT = 'Test Comment po8'

    arrangeTest(TALENT_ID, [
      createOfacStatusDataMock({
        id: TALENT_ID,
        node: {
          ofacStatusChanges: {
            nodes: [],
            __typename: 'OfacStatusChangeConnection'
          }
        }
      }),
      createOfacStatusDataMock({
        id: TALENT_ID,
        node: {
          ofacStatusChanges: {
            nodes: [createOfacStatusChangeFragment({ comment: COMMENT })],
            __typename: 'OfacStatusChangeConnection'
          }
        }
      }),
      createUpdateRoleOfacStatusMock({
        roleId: TALENT_ID,
        ofacStatus: NEW_STATUS,
        comment: COMMENT
      }),
      createUpdateRoleOfacStatusLazyOperationMock(TALENT_ID)
    ])

    fireEvent.click(await screen.findByText('Change OFAC Status'))

    fireEvent.click(await screen.findByLabelText(/New OFAC Status/))
    fireEvent.click(screen.getByText(new RegExp(NEW_STATUS, 'i')))
    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: COMMENT }
    })
    fireEvent.click(screen.getByTestId('change-ofac-status-submit-button'))

    fireEvent.click(await screen.findByText('Show History (1)'))

    expect(await screen.findByText(COMMENT)).toBeInTheDocument()
  })

  it('disables the change OFAC status button when operation is disabled', async () => {
    const TALENT_ID = encodeEntityId('456', 'Talent')

    arrangeTest(TALENT_ID, [
      createOfacStatusDataMock({
        id: TALENT_ID,
        operationType: OperationCallableTypes.DISABLED
      }),
      createUpdateRoleOfacStatusLazyOperationMock(TALENT_ID)
    ])

    await waitForElementToBeRemoved(() => screen.getAllByText('Loading...'))

    expect(
      screen.queryByRole('button', { name: 'Change OFAC Status' })
    ).toBeDisabled()
  })

  it('hides the change OFAC status button when operation is hidden', async () => {
    const TALENT_ID = encodeEntityId('456', 'Talent')

    arrangeTest(TALENT_ID, [
      createOfacStatusDataMock({
        id: TALENT_ID,
        operationType: OperationCallableTypes.HIDDEN
      }),
      createUpdateRoleOfacStatusLazyOperationMock(TALENT_ID)
    ])

    await waitForElementToBeRemoved(() => screen.getAllByText('Loading...'))

    expect(screen.queryByText('Change OFAC Status')).not.toBeInTheDocument()
  })

  describe('even though "ofacStatus" is falsy', () => {
    it('shows the section', () => {
      const TALENT_ID = encodeEntityId('456', 'Talent')

      arrangeTest(TALENT_ID, [
        createOfacStatusDataMock({
          id: TALENT_ID,
          operationType: OperationCallableTypes.DISABLED,
          ofacStatus: null
        })
      ])

      expect(screen.getByText('OFAC Compliance')).toBeInTheDocument()
    })
  })
})
