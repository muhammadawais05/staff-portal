import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { useRemoveConsolidationDefaultMutation } from '../../../data/removeConsolidationDefault.graphql.types'

type Args = {
  id: string
  name: string
  hasActions: boolean
}

const useConsolidationDefaultsTableRowActions = ({
  id,
  name,
  hasActions
}: Args) => {
  const { t: translate } = useTranslation('billingDetails')
  const { showSuccess, showError } = useNotifications()
  const {
    handleOnOpenConfirmation,
    handleOnSetConfirmation,
    handleOnCloseConfirmation
  } = useConfirmations()
  const [removeConsolidationDefault] = useRemoveConsolidationDefaultMutation({
    onValidationError: error => showError(error[0].message),
    onCompleted: () =>
      showSuccess(
        translate('consolidationDefaults.list.actions.delete.notification', {
          name
        })
      )
  })
  const variables = { input: { consolidationDefaultId: id } }
  const { handleOnOpenModal } = useModals()
  const onEditClick = () =>
    handleOnOpenModal(ModalKey.consolidationDefaultsUpdate, {
      consolidationDefaultId: id
    })

  const onDeleteClick = useCallback(() => {
    handleOnOpenConfirmation({
      actionTitle: translate('consolidationDefaults.list.actions.delete.label'),
      description: translate(
        'consolidationDefaults.list.actions.delete.content',
        { name }
      ),
      title: `${translate(
        'consolidationDefaults.list.actions.delete.title'
      )}: ${name}`,
      actionVariant: 'negative',
      onSuccess: async () => {
        handleOnSetConfirmation({
          actionIsLoading: true
        })
        await removeConsolidationDefault({ variables })
        handleOnCloseConfirmation()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, name])

  const actions = [
    {
      label: translate('consolidationDefaults.list.actions.edit.label'),
      onClick: onEditClick
    },
    {
      label: translate('consolidationDefaults.list.actions.delete.label'),
      onClick: onDeleteClick
    }
  ]

  return hasActions ? actions : []
}

export default useConsolidationDefaultsTableRowActions
