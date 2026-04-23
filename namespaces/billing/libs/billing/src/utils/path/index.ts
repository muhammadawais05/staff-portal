export const getPaymentsPath = () => '/payments'

export const getMyPaymentsPath = () => '/my_payments'

export const getMemorandumsWithEngagement = (engagementNumericalId: number) =>
  `/platform/staff/memos?engagement_id=${engagementNumericalId}`
