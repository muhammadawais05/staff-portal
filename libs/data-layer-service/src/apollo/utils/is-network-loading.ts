import { NetworkStatus } from '@apollo/client'

export const isNetworkLoading = ({
  loading,
  networkStatus,
  data
}: {
  loading: boolean
  networkStatus: NetworkStatus
  data?: unknown | null
}) => loading && (!data || networkStatus === NetworkStatus.refetch)
