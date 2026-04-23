/* eslint-disable complexity */
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useMemo } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import {
  TALENT_UPDATED,
  useGetTalentEngagementsRates,
  useGetClientWillHireTalentAgain
} from '@staff-portal/talents'
import { OFAC_UPDATED } from '@staff-portal/ofac-compliance'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import { useGetTalentPaymentOptions } from '../../PaymentMethodsField/data/get-talent-payment-options'
import { useGetTalentProfileGeneralData } from '../data/get-talent-profile-general-data'
import { useGetTalentProfileOperations } from '../data/get-talent-profile-operations'
import { useGetTalentPortfolio } from '../../TalentPortfolioField/data/get-talent-portfolio'
import { useGetTalentPortfolioUrl } from '../../TalentPortfolioUrlField/data/get-talent-portfolio-url'
import { TALENT_GENERAL_DATA_BATCH_KEY } from '../../../config'
import { useGetTalentStatus } from '../../StatusField/data/get-talent-status/get-talent-status.staff.gql'
import { useGetTalentRejectForInactivity } from '../../RejectForInactivityField/data/get-talent-reject-for-inactivity/get-talent-reject-for-inactivity.staff.gql'

const useGetTalentGeneralData = (talentId: string) => {
  const { showDevError } = useNotifications()

  const {
    talent,
    loading: generalDataLoading,
    error,
    refetch: refetchGeneralData
  } = useGetTalentProfileGeneralData(talentId, {
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY
  })

  const {
    operations,
    loading: operationsLoading,
    refetch: refetchProfileOperations
  } = useGetTalentProfileOperations({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Failed fetching talent operations.')
  })

  const {
    data: paymentOptions,
    loading: paymentOptionsLoading,
    refetch: refetchPaymentOptions
  } = useGetTalentPaymentOptions({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Failed fetching payment options.')
  })

  const {
    data: talentStatus,
    loading: talentStatusLoading,
    refetch: refetchStatus
  } = useGetTalentStatus(talentId, {
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Unable to load talent status.')
  })

  const {
    data: clientWillHireAgain,
    loading: clientWillHireAgainLoading,
    refetch: refetchClientWillHireAgain
  } = useGetClientWillHireTalentAgain({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Unable to fetch client feedback statistics.')
  })

  const {
    data: engagementRates,
    loading: engagementRatesLoading,
    refetch: refetchEngagementRates
  } = useGetTalentEngagementsRates({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Unable to fetch engagement rate.')
  })

  const {
    portfolioUrlData,
    loading: portfolioUrlLoading,
    refetch: refetchPortfolioUrl
  } = useGetTalentPortfolioUrl({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Failed fetching talent portfolio url.')
  })

  const {
    portfolioData,
    loading: portfolioLoading,
    refetch: refetchPortfolio
  } = useGetTalentPortfolio({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Failed fetching talent portfolio.')
  })

  const {
    data: rejectForInactivityData,
    loading: rejectForInactivityLoading,
    refetch: refetchRejectForInactivity
  } = useGetTalentRejectForInactivity({
    talentId,
    batchKey: TALENT_GENERAL_DATA_BATCH_KEY,
    onError: () => showDevError('Failed fetching talent activation.')
  })

  useMessageListener(TALENT_UPDATED, ({ talentId: id }) => {
    if (id === talentId) {
      refetchGeneralData()
      refetchProfileOperations()
      refetchPaymentOptions()
      refetchStatus()
      refetchClientWillHireAgain()
      refetchEngagementRates()
      refetchPortfolioUrl()
      refetchPortfolio()
      refetchRejectForInactivity()
    }
  })
  useMessageListener(OFAC_UPDATED, ({ nodeId: id }) => {
    if (id === talentId) {
      refetchGeneralData()
    }
  })
  useMessageListener([ROLE_FLAGS_UPDATED], refetchGeneralData)

  const talentData = useMemo(() => {
    if (!talent || !operations) {
      return
    }

    return {
      ...talent,
      operations,
      paymentOptions,
      talentStatus,
      clientWillHireAgain,
      engagementRates,
      portfolioUrlData,
      portfolioData,
      rejectForInactivityData
    }
  }, [
    talent,
    operations,
    paymentOptions,
    talentStatus,
    clientWillHireAgain,
    engagementRates,
    portfolioUrlData,
    portfolioData,
    rejectForInactivityData
  ])

  const loading =
    (generalDataLoading && !talent) ||
    (operationsLoading && !operations) ||
    (paymentOptionsLoading && !paymentOptions) ||
    (talentStatusLoading && !talentStatus) ||
    (clientWillHireAgainLoading && !clientWillHireAgain) ||
    (engagementRatesLoading && !engagementRatesLoading) ||
    (portfolioUrlLoading && !portfolioUrlData) ||
    (portfolioLoading && !portfolioData) ||
    (rejectForInactivityLoading && !rejectForInactivityData)

  return { data: talentData, loading, error }
}

export default useGetTalentGeneralData
