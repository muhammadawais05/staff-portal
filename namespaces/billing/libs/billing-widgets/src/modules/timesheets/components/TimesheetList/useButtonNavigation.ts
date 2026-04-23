import { useEffect, SyntheticEvent } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useStore } from '@staff-portal/billing/src/store'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useTimesheetModals } from '@staff-portal/billing/src/_lib/customHooks/useModalsTimesheet'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalVariant } from '@staff-portal/billing/src/store/modalActions'

import { BillingCycleItemFragment } from '../../../__fragments__/billingCycleItemFragment.graphql.types'

export const useButtonNavigation = ({
  timesheets,
  propVariant
}: {
  timesheets: BillingCycleItemFragment[]
  propVariant: string
}) => {
  const { state } = useStore()
  const {
    modalName = null,
    options: { billingCycleId, variant } = {
      billingCycleId: null,
      variant: null
    }
  } = state.modal

  const { handleOnShowEdit, handleOnShowView } = useTimesheetModals()

  const { handleOnSetModalProps } = useModals()

  useEffect(() => {
    if (
      billingCycleId &&
      (modalName === ModalKey.timesheet ||
        modalName === ModalKey.timesheetEdit) &&
      propVariant === variant
    ) {
      let index = timesheets.findIndex(
        ({ id }) =>
          id ===
          encodeId({
            type: 'billingCycle',
            id: billingCycleId
          })
      )

      const handleNavigateTo = ({
        currentTarget
      }: SyntheticEvent<HTMLButtonElement>) => {
        const offset = Number(currentTarget.dataset.offset)

        if (!timesheets[index + offset]) {
          return
        }
        index += offset
        const nextId = timesheets[index].id

        if (modalName === ModalKey.timesheet) {
          handleOnShowView(nextId, variant)
        } else {
          handleOnShowEdit(nextId, variant)
        }
      }

      handleOnSetModalProps({
        [propVariant as ModalVariant]: {
          canMoveNext: index < timesheets.length - 1,
          canMovePrev: index > 0,
          handleNavigateTo
        }
      })
    }
  }, [modalName, billingCycleId, timesheets, propVariant, variant]) // eslint-disable-line
}
