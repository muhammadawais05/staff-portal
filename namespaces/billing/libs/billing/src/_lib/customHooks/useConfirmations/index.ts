import {
  BaseConfirmation,
  ConfirmationActionI
} from '../../../store/confirmationActions'
import { useStore } from '../../../store'

export const useConfirmations = () => {
  const { dispatch } = useStore()

  const handleOnCloseConfirmation = () => {
    dispatch({ type: 'hideConfirmation' })
  }

  const handleOnSetConfirmation = (payload: BaseConfirmation) => {
    dispatch({
      payload,
      type: 'setConfirmation'
    })
  }

  const handleOnOpenConfirmation = (payload: ConfirmationActionI) => {
    dispatch({
      payload,
      type: 'showConfirmation'
    })
  }

  return {
    handleOnCloseConfirmation,
    handleOnOpenConfirmation,
    handleOnSetConfirmation
  }
}
