import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ImportContractAsTopButton, { Props } from './ImportContractAsTopButton'
import { createEngagementCommonActionsFragmentMock } from '../../data/engagement-common-actions-fragment/mocks'
import EngagementOperationButtonWithModal from '../EngagementOperationButtonWithModal'
import { useImportContractAsTopModal } from '../ImportContractAsTopModal'

jest.mock('../EngagementOperationButtonWithModal', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../ImportContractAsTopModal', () => ({
  useImportContractAsTopModal: jest.fn()
}))

const EngagementOperationButtonWithModalMock =
  EngagementOperationButtonWithModal as jest.Mock
const engagementMock = createEngagementCommonActionsFragmentMock()

const useImportContractAsTopModalMock = useImportContractAsTopModal as jest.Mock
const useImportContractAsTopModalDataMock = {
  showModal: jest.fn()
}

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <ImportContractAsTopButton {...props} />
    </TestWrapper>
  )
}

describe('ImportContractAsTopButton', () => {
  beforeEach(() => {
    EngagementOperationButtonWithModalMock.mockImplementation(() => <div />)
    useImportContractAsTopModalMock.mockImplementation(
      () => useImportContractAsTopModalDataMock
    )
  })

  it('correctly passes props to `EngagementOperationButtonWithModal`', () => {
    arrangeTest({ engagement: engagementMock })

    const expectedUseImportContractAsTopModalParams: Parameters<
      typeof useImportContractAsTopModal
    > = [
      {
        engagementId: engagementMock.id
      }
    ]
    const expectedProps: Partial<
      ComponentProps<typeof EngagementOperationButtonWithModal>
    > = {
      children: 'Import STA as TOP',
      engagement: engagementMock,
      operationName: 'importContractAsTop',
      modalData: useImportContractAsTopModalDataMock
    }

    expect(useImportContractAsTopModal).toHaveBeenCalledWith(
      ...expectedUseImportContractAsTopModalParams
    )
    expect(EngagementOperationButtonWithModalMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedProps),
      expect.anything()
    )
  })
})
