import { renderHook } from '@testing-library/react-hooks'
import { SearchLogic } from '@staff-portal/graphql/staff'

import { useGetInvoicesToConsolidateQuery } from '../../../components/InvoiceList/data/getInvoicesToConsolidate.graphql.types'
import { useInvoicesToConsolidate } from '.'

const buildMockData = (props = {}) => ({
  data: undefined,
  loading: true,
  initialLoading: true,
  refetch: jest.fn(),
  ...props
})

jest.mock('../data', () => ({
  useGetClientsToConsolidateQuery: jest.fn().mockReturnValue(buildMockData())
}))
jest.mock(
  '../../../components/InvoiceList/data/getInvoicesToConsolidate.graphql.types',
  () => ({
    useGetInvoicesToConsolidateQuery: jest.fn().mockReturnValue(buildMockData())
  })
)

const mockGetInvoices = useGetInvoicesToConsolidateQuery as jest.Mock

describe('#useInvoicesToConsolidate', () => {
  it('should render hook', () => {
    const {
      result: {
        current: { initialLoading }
      }
    } = renderHook(() =>
      useInvoicesToConsolidate({ badges: { logic: SearchLogic.AND } })
    )

    expect(mockGetInvoices).toHaveBeenCalledWith({
      fetchPolicy: 'network-only',
      skip: true,
      variables: {
        clientId: '',
        filter: {
          badges: {
            logic: SearchLogic.OR
          },
          forConsolidation: true
        }
      }
    })

    expect(initialLoading).toBe(true)
  })
})
