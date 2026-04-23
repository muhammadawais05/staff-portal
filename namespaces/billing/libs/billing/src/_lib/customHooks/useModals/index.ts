import { StringParam, useQueryParams } from '../useQueryParams'
import { ModalData, ModalProps } from '../../../store/modalActions'
import { ModalKey } from '../../../@types/types'
import { setObjectKeysToSnakeCase } from '../../helpers'
import { useStore } from '../../../store'

export const useModals = () => {
  const { dispatch } = useStore()
  const params = useQueryParams({
    billing_cycle_id: StringParam,
    engagement_id: StringParam,
    invoice_id: StringParam,
    memorandum_id: StringParam,
    modal: StringParam,
    node_id: StringParam,
    node_type: StringParam,
    notable_id: StringParam,
    notable_type: StringParam,
    note_id: StringParam,
    variant: StringParam,
    client_id: StringParam
  })
  const setQuery = params[1]

  // TODO: make it optional to remove url references
  // To make this hook scaleable
  const handleOnCloseModal = () => {
    setQuery({
      billing_cycle_id: undefined,
      engagement_id: undefined,
      invoice_id: undefined,
      memorandum_id: undefined,
      modal: undefined,
      node_id: undefined,
      node_type: undefined,
      notable_id: undefined,
      notable_type: undefined,
      note_id: undefined,
      variant: undefined,
      client_id: undefined
    })
    dispatch({ type: 'hideModal' })
  }

  const handleOnOpenModal = (modalName: ModalKey, options: ModalData = {}) => {
    dispatch({
      payload: { modalName, options },
      type: 'showModal'
    })
  }

  const handleOnOpenModalWithUrlSearch = (
    modalName: ModalKey,
    options?: ModalData
  ) => {
    if (options) {
      setQuery({
        modal: modalName,
        ...setObjectKeysToSnakeCase(
          options as {
            [key: string]: string | number
          }
        )
      })
    } else {
      setQuery({
        modal: modalName
      })
    }

    dispatch({
      payload: { modalName, options },
      type: 'showModal'
    })
  }

  const handleOnSetModalProps = (props: ModalProps) => {
    dispatch({
      payload: { props },
      type: 'setModalProps'
    })
  }

  return {
    handleOnCloseModal,
    handleOnOpenModal,
    handleOnOpenModalWithUrlSearch,
    handleOnSetModalProps
  }
}
