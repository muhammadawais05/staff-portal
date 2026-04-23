import { useCallback, SyntheticEvent } from 'react'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'

export const useCommission = (id?: string) => {
  const { handleOnOpenModal } = useModals()

  const handleOnActionClick = useCallback(
    ({ currentTarget: { dataset } }: SyntheticEvent<HTMLElement>) => {
      const { id: nodeId, type: nodeType } = decodeRawIdAndType(id)

      return handleOnOpenModal(dataset?.value as ModalKey, {
        nodeId,
        nodeType
      })
    },
    [handleOnOpenModal, id]
  )

  return {
    handleOnActionClick
  }
}
