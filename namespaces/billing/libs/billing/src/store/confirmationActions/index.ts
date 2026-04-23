import { ReactNode, ComponentProps } from 'react'
import { Button } from '@toptal/picasso'

export interface BaseConfirmation {
  cancelTitle?: ReactNode
  actionVariant?: ComponentProps<typeof Button>['variant']
  cancelVariant?: ComponentProps<typeof Button>['variant']
  actionIsLoading?: boolean
  actionIsDisabled?: boolean
  title?: ReactNode
  description?: ReactNode
  notice?: ReactNode
  onCancel?: () => void
}

export interface ConfirmationActionI extends BaseConfirmation {
  actionTitle: ReactNode
  onSuccess: () => void
}

export interface ConfirmationStoreData extends BaseConfirmation {
  actionTitle?: ReactNode
  onSuccess?: () => void
}

export interface ConfirmationStore extends BaseConfirmation {
  confirmation: ConfirmationStoreData
}

export const confirmationInitialState: ConfirmationStore = {
  confirmation: {}
}

interface ConfirmationShow {
  payload: ConfirmationActionI
}

interface ConfirmationSet {
  payload: BaseConfirmation
}

export const confirmationActions = {
  hideConfirmation() {
    return { confirmation: {} }
  },
  setConfirmation(state: ConfirmationStore, action: ConfirmationSet) {
    return {
      ...state,
      confirmation: { ...state.confirmation, ...action.payload }
    }
  },
  showConfirmation(state: ConfirmationStore, action: ConfirmationShow) {
    return {
      ...state,
      confirmation: { ...state.confirmation, ...action.payload }
    }
  }
}
