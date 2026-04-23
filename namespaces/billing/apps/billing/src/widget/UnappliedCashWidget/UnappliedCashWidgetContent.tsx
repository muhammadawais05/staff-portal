import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { UnappliedCashWidgetProps } from './UnappliedCashWidget'

const UnappliedCashWidgetContent = ({
  children,
  clientId
}: UnappliedCashWidgetProps) => {
  const { handleOnOpenModalWithUrlSearch } = useModals()

  const handleClick = () => {
    handleOnOpenModalWithUrlSearch(ModalKey.unappliedCashRecord, { clientId })
  }

  return children(handleClick)
}

export default UnappliedCashWidgetContent
