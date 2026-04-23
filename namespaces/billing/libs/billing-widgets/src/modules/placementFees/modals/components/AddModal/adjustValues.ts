import { AnyObject } from '@toptal/picasso-forms'
import {
  CreateEngagementPlacementFeeInput,
  PlacementFeeInstallment
} from '@staff-portal/graphql/staff'

const adjustValues = ({
  installments = [],
  purchaseOrderId,
  purchaseOrderLineId,
  engagementId
}: AnyObject): CreateEngagementPlacementFeeInput => {
  const adjustedInstallments = installments.length
    ? installments.map((installment: PlacementFeeInstallment) => {
        if (purchaseOrderLineId) {
          installment.purchaseOrderLineId = purchaseOrderLineId
        }
        if (purchaseOrderId) {
          installment.purchaseOrderId = purchaseOrderId
        }

        return installment
      })
    : installments

  return {
    engagementId,
    installments: adjustedInstallments
  }
}

export default adjustValues
