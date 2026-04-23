import { PlacementFeeInput } from '../AddModal/AddModal'

const getInstallmentsTotal = ({ installments }: PlacementFeeInput) =>
  installments
    ?.reduce((acc, currentVal) => {
      return acc + (currentVal ? Number(currentVal.amount || 0) : 0)
    }, 0)
    .toFixed(2)

export default getInstallmentsTotal
