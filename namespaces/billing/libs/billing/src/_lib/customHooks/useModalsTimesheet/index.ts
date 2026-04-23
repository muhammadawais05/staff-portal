import { ModalKey } from '../../../@types/types'
import { decodeId } from '../../helpers/apollo'
import { useModals } from '../useModals'
import { ModalVariant } from '../../../store/modalActions'

export const useTimesheetModals = () => {
  const { handleOnOpenModalWithUrlSearch } = useModals()

  const handleOnShowEdit = (id: string, variant: ModalVariant) => {
    handleOnOpenModalWithUrlSearch(ModalKey.timesheetEdit, {
      billingCycleId: '' + decodeId({ type: 'billingCycle', id }),
      variant
    })
  }

  const handleOnShowView = (id: string, variant: ModalVariant) => {
    handleOnOpenModalWithUrlSearch(ModalKey.timesheet, {
      billingCycleId: '' + decodeId({ type: 'billingCycle', id }),
      variant
    })
  }

  const handleOnUnsubmit = (id: string) => {
    handleOnOpenModalWithUrlSearch(ModalKey.timesheetUnsubmit, {
      billingCycleId: '' + decodeId({ type: 'billingCycle', id })
    })
  }

  return {
    handleOnShowEdit,
    handleOnShowView,
    handleOnUnsubmit
  }
}
