import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { DownloadForPeriodModal } from '@staff-portal/facilities'

import { useDownloadStatementsOfAccount } from './data'
import { useHandleSubmit } from './utils'
import DownloadStatementOfAccountModal from '.'

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  DownloadForPeriodModal: jest.fn()
}))

jest.mock('./data', () => ({
  useDownloadStatementsOfAccount: jest.fn()
}))

jest.mock('./utils', () => ({
  useHandleSubmit: jest.fn()
}))

const DownloadForPeriodModalMock = DownloadForPeriodModal as jest.Mock
const useDownloadStatementsOfAccountMock =
  useDownloadStatementsOfAccount as jest.Mock
const useHandleSubmitMock = useHandleSubmit as jest.Mock

const modalProps: ComponentProps<typeof DownloadStatementOfAccountModal> = {
  companyId: 'company-id',
  hideModal: () => {},
  operationVariables: 'variables' as unknown as GetLazyOperationVariables
}

describe('DownloadStatementOfAccountModal', () => {
  beforeEach(() => {
    DownloadForPeriodModalMock.mockReturnValue(null)
    useDownloadStatementsOfAccountMock.mockReturnValue([null, {}])
    useHandleSubmitMock.mockReturnValue('handle-submit')
  })

  it('renders DownloadForPeriodModal with expected props passed', () => {
    const loadingMock = 'loading'

    useDownloadStatementsOfAccountMock.mockReturnValue([
      null,
      { loading: loadingMock }
    ])

    // Act
    render(
      <TestWrapper>
        <DownloadStatementOfAccountModal {...modalProps} />
      </TestWrapper>
    )

    // Assert
    expect(DownloadForPeriodModalMock).toHaveBeenCalledTimes(1)
    expect(DownloadForPeriodModalMock).toHaveBeenCalledWith(
      {
        title: 'Statement of Account',
        downloadButtonText: 'Download PDF',
        onSubmit: 'handle-submit',
        loading: loadingMock,
        hideModal: modalProps.hideModal,
        operationVariables: modalProps.operationVariables
      },
      {}
    )
  })
})
