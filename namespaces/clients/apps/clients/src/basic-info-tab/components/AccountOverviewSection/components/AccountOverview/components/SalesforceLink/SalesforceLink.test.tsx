import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useFieldPollingUpdate } from '@staff-portal/data-layer-service'
import { NO_VALUE } from '@staff-portal/config'

import { GetClientSalesforceLinkDocument } from '../../data/get-client-salesforce-link.staff.gql.types'
import SalesforceLink from '.'
import { companyOverviewFragmentMock } from '../../../../data/company-overview-fragment.mock'

jest.mock('./data', () => ({
  usePushClientToSalesforce: () => [() => {}, { loading: false }]
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useHandleMutationResult: () => () => {}
}))
jest.mock('@staff-portal/ui/src/components/TypographyOverflowLink')
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useFieldPollingUpdate: jest.fn()
}))
jest.mock('@staff-portal/operations/src/components/LazyOperation')

const useFieldPollingUpdateMock = useFieldPollingUpdate as jest.Mock

const arrangeTest = (
  props: Pick<
    ComponentProps<typeof SalesforceLink>,
    'salesforceLink' | 'operation'
  >
) => {
  const clientId = 'clientId'

  render(
    <TestWrapper>
      <SalesforceLink {...props} clientId={clientId} />
    </TestWrapper>
  )
}

describe('SalesforceLink', () => {
  beforeEach(() => {
    useFieldPollingUpdateMock.mockReturnValue({})
  })

  it('invokes useFieldPollingUpdate with correct params', () => {
    const operation = {
      callable: OperationCallableTypes.DISABLED,
      messages: ['Client is already connected to Salesforce']
    }

    arrangeTest({
      salesforceLink: companyOverviewFragmentMock.salesforceLink,
      operation: operation
    })

    expect(useFieldPollingUpdateMock).toHaveBeenCalledTimes(1)
    expect(useFieldPollingUpdateMock).toHaveBeenCalledWith(
      GetClientSalesforceLinkDocument,
      {
        variables: { clientId: 'clientId' },
        pollInterval: 15000,
        maxAttempts: 6
      }
    )
  })

  describe('with salesforce account', () => {
    it('returns salesforce link without push to salesforce button', () => {
      const operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: ['Client is already connected to Salesforce']
      }

      arrangeTest({
        salesforceLink: companyOverviewFragmentMock.salesforceLink,
        operation: operation
      })

      expect(screen.getByTestId('LazyOperation-hidden')).toHaveTextContent(
        'true'
      )
      expect(screen.getByTestId('SalesforceLink-link')).toHaveTextContent(
        '0014A00002knCOIQA2'
      )
    })
  })

  describe('without salesforce account, status is active', () => {
    it('returns push to salesforce button', () => {
      const operation = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }

      arrangeTest({
        operation: operation
      })

      expect(screen.getByTestId('LazyOperation-children')).toHaveTextContent(
        'Push to Salesforce'
      )
      expect(screen.getByTestId('TypographyOverflowLink')).toHaveTextContent(
        NO_VALUE
      )
    })
  })

  describe('without salesforce account, status is not active', () => {
    it('returns tooltip for push to salesforce button', () => {
      const operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: ['message']
      }

      arrangeTest({
        operation: operation
      })

      expect(screen.getByTestId('TypographyOverflowLink')).toHaveTextContent(
        NO_VALUE
      )
      expect(screen.getByTestId('LazyOperation-children')).toHaveTextContent(
        'Push to Salesforce'
      )
      expect(
        screen.getByTestId('LazyOperation-initialOperation')
      ).toHaveTextContent('{"callable":"DISABLED","messages":["message"]}')
    })
  })
})
