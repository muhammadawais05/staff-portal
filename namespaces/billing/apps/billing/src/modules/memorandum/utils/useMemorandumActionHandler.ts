import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { memorandumActionHandler } from './memorandumActionHandler'

export const useMemorandumActionHandler = () => {
  const { handleOnOpenModalWithUrlSearch: handleOnOpenModal } = useModals()
  const handleOnActionClick = memorandumActionHandler({ handleOnOpenModal })

  return {
    handleOnActionClick
  }
}
