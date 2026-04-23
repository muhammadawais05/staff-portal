import { renderHook } from '@testing-library/react-hooks'
import { useFieldPollingUpdate } from '@staff-portal/data-layer-service'

import useUpdateLeadStatusModal from './use-update-lead-status-modal'
import useGetClientLeadStatusModalData from '../../../utils/use-get-client-lead-status-modal-data'
import { GetClientFollowUpStatusCommentDocument } from '../../../data/get-client-follow-up-status-comment.staff.gql.types'

jest.mock('../../../utils/use-get-client-lead-status-modal-data')

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useFieldPollingUpdate: jest.fn()
}))

const useFieldPollingUpdateMock = useFieldPollingUpdate as jest.Mock
const useGetClientLeadStatusModalDataMock =
  useGetClientLeadStatusModalData as jest.Mock

describe('useUpdateLeadStatusModal', () => {
  beforeEach(() => {
    useFieldPollingUpdateMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    useGetClientLeadStatusModalDataMock.mockReturnValue({
      data: 'data',
      loading: 'loading'
    })

    renderHook(() => useUpdateLeadStatusModal('client-id'))

    expect(useFieldPollingUpdateMock).toHaveBeenCalledTimes(1)
    expect(useFieldPollingUpdateMock).toHaveBeenCalledWith(
      GetClientFollowUpStatusCommentDocument,
      {
        variables: { clientId: 'client-id' },
        pollInterval: 3000,
        maxAttempts: 4
      }
    )

    expect(useGetClientLeadStatusModalData).toHaveBeenCalledTimes(1)
    expect(useGetClientLeadStatusModalData).toHaveBeenCalledWith('client-id')
  })

  it('returns expected data', () => {
    useGetClientLeadStatusModalDataMock.mockReturnValue({ loading: 'loading' })

    const { result } = renderHook(() => useUpdateLeadStatusModal('client-id'))

    expect(result.current).toEqual({
      showModal: expect.any(Function),
      loading: 'loading'
    })
  })
})
