import fixtures from '@staff-portal/billing/src/_fixtures'

export const useGetJob = jest.fn().mockReturnValue({
  data: { ...fixtures.MockBillingSettingsJob.data.node },
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

export const useGetPurchaseOrdersOptions = jest.fn().mockReturnValue({
  data: { ...fixtures.MockBillingSettingsJob.data.node },
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

export const useGetPurchaseOrdersOptionsQuery = jest.fn().mockReturnValue({
  data: { ...fixtures.MockBillingSettingsJob.data.node },
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

export const useGetEngagementDetails = jest.fn().mockReturnValue({
  data: {
    title: 'Title',
    engagements: { nodes: [{ id: 'VjEtRW5nYWdlbWVudC0xNzE2MDg' }] }
  },
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

// TODO: Remove after https://toptal-core.atlassian.net/browse/SPC-1267 is complete
export const useGetJobHeader = jest.fn().mockReturnValue({
  data: {
    title: 'Title',
    engagements: { nodes: [{ id: 'VjEtRW5nYWdlbWVudC0xNzE2MDg' }] }
  },
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

export const useEditJobInvoiceNoteMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      editJobInvoiceNote: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng',
          invoiceNote: 'Test'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useAssignJobPurchaseOrderLineMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      assignJobPurchaseOrderLineMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useAssignJobPurchaseOrderMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      assignJobPurchaseOrderMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useAssignJobNextPurchaseOrderMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      assignJobNextPurchaseOrderMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useAssignJobNextPurchaseOrderLineMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      assignJobNextPurchaseOrderLineMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]

export const useUpdateJobAttachTimesheetsToInvoicesMutation = () => [
  jest.fn().mockResolvedValue({
    data: {
      updateJobAttachTimesheetsToInvoicesMutation: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  })
]
