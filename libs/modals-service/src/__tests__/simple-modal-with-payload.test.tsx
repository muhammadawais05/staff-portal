import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { render, within, fireEvent } from '@testing-library/react'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'

import {
  ModalProvider,
  useModalRegistry,
  useModal,
  ModalComponentBaseProps,
  PayloadOf
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: () => ({ search: '', hash: '' })
}))

interface ModalWithPayloadProps extends ModalComponentBaseProps {
  nodeId: string
  onClose?: () => void
  handleAction?: (id: string) => void
}

const ModalWithPayload = ({
  hideModal,
  nodeId,
  onClose,
  handleAction
}: ModalWithPayloadProps) => {
  const [modalData, setModalData] = useState(0)
  const updateModalData = () => setModalData(prevData => prevData + 1)
  const [hideAndShowNestedModal, setHideAndShowNestedModal] = useState(false)

  const { showModal } = useModal(ModalWithPayload, {
    nodeId: `payload-${nodeId}-modal-${modalData}`,
    handleAction: nestedModalId => {
      handleAction?.(`nested-${nestedModalId}`)
    },
    onClose: () => {
      hideModal()
    }
  })

  const hide = useCallback(() => {
    onClose?.()
    hideModal()
  }, [onClose, hideModal])

  // TODO: https://toptal-core.atlassian.net/browse/SP-1770
  // rewrite this test to cypress component tests
  // once it will be available
  useEffect(() => {
    if (hideAndShowNestedModal) {
      hide()
      showModal()
    }
  }, [hide, hideAndShowNestedModal, showModal])

  return (
    <div data-testid='modal'>
      <div data-testid='close-modal' onClick={hide} />
      Modal payload: {nodeId}
      <div data-testid='update-modal-state' onClick={updateModalData} />
      <div data-testid='trigger-nested-modal' onClick={showModal} />
      <div
        data-testid='hide-and-trigger-nested-modal'
        onClick={() => setHideAndShowNestedModal(true)}
      />
      {handleAction && (
        <div
          data-testid='modal-action'
          onClick={() => handleAction(`modal-${modalData}`)}
        />
      )}
    </div>
  )
}

interface ModalWithPayloadCallerProps {
  onModalAction?: (nodeId: string, modalData: string) => void
}

const SimpleModalWithPayloadCaller = ({
  onModalAction
}: ModalWithPayloadCallerProps) => {
  const [id, setId] = useState(1)
  const nodeId = `node-id-${id}`

  const updatePayload = () => setId(prevId => prevId + 1)
  const handleAction = (modalData: string) => onModalAction?.(nodeId, modalData)

  const { showModal, showDetachedModal } = useModal(ModalWithPayload, {
    nodeId,
    handleAction
  })

  return (
    <>
      <div data-testid='trigger-modal' onClick={showModal} />
      <div
        data-testid='trigger-detached-modal'
        onClick={() => showDetachedModal({ nodeId })}
      />
      <div
        data-testid='trigger-modal-with-payload-update'
        onClick={() => {
          updatePayload()
          showModal()
        }}
      />
      <div data-testid='update-payload' onClick={updatePayload} />
    </>
  )
}

const SimpleModalWithNullPayloadCaller = () => {
  const [modalPayload, setModalPayload] = useState<PayloadOf<
    typeof ModalWithPayload
  > | null>(null)
  const { showModal } = useModal(ModalWithPayload, modalPayload)

  useEffect(() => {
    if (modalPayload) {
      showModal()
    }
  }, [modalPayload, showModal])

  return (
    <>
      <div data-testid='trigger-modal' onClick={showModal} />
      <div
        data-testid='set-payload'
        onClick={() => setModalPayload({ nodeId: 'test-node-id' })}
      />
    </>
  )
}

const App = ({
  onModalAction,
  children
}: {
  onModalAction?: (nodeId: string, modalData: string) => void
  children?: ReactNode
}) => {
  const registry = useModalRegistry()

  return (
    <MessagesProvider>
      <ModalProvider registry={registry}>
        {children || (
          <SimpleModalWithPayloadCaller onModalAction={onModalAction} />
        )}
      </ModalProvider>
    </MessagesProvider>
  )
}

describe('Modals service: simple modal with payload', () => {
  it('allows showing specified modal with provided payload', () => {
    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId('trigger-modal'))

    const modal = getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Modal payload: node-id-1')
  })

  it('allows showing specified modal right after updating the payload', () => {
    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId('trigger-modal-with-payload-update'))

    const modal = getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Modal payload: node-id-2')
  })

  it('does not show specified modal when providing null payload', () => {
    const { getByTestId, queryByTestId } = render(
      <App>
        <SimpleModalWithNullPayloadCaller />
      </App>
    )

    fireEvent.click(getByTestId('trigger-modal'))

    expect(queryByTestId('modal')).not.toBeInTheDocument()

    fireEvent.click(getByTestId('set-payload'))

    const modal = getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Modal payload: test-node-id')
  })

  it('allows closing the modal', () => {
    const { getByTestId, queryByTestId } = render(<App />)

    fireEvent.click(getByTestId('trigger-modal'))

    expect(getByTestId('modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('close-modal'))

    expect(queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('propagates payload changes to the modal when it is opened', () => {
    const { getByTestId } = render(<App />)

    fireEvent.click(getByTestId('trigger-modal'))

    const modal = getByTestId('modal')

    expect(modal).toHaveTextContent('Modal payload: node-id-1')

    fireEvent.click(getByTestId('update-payload'))

    expect(modal).toHaveTextContent('Modal payload: node-id-2')
  })

  it('allows passing callbacks as part of the payload', () => {
    const onModalAction = jest.fn()
    const { getByTestId } = render(<App onModalAction={onModalAction} />)

    fireEvent.click(getByTestId('trigger-modal'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenCalledWith('node-id-1', 'modal-0')
  })

  it('propagates callback changes to the modal when it is opened', () => {
    const onModalAction = jest.fn()
    const { getByTestId } = render(<App onModalAction={onModalAction} />)

    fireEvent.click(getByTestId('trigger-modal'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('node-id-1', 'modal-0')

    fireEvent.click(getByTestId('update-payload'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('node-id-2', 'modal-0')

    fireEvent.click(getByTestId('update-modal-state'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('node-id-2', 'modal-1')
  })

  describe('nested modals', () => {
    it('propagates payload changes to the nested modal when it is opened', () => {
      const { getByTestId, getAllByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))
      fireEvent.click(getByTestId('trigger-nested-modal'))

      const modals = getAllByTestId('modal')

      expect(modals).toHaveLength(2)

      expect(modals[0]).toHaveTextContent('Modal payload: node-id-1')
      expect(modals[1]).toHaveTextContent(
        'Modal payload: payload-node-id-1-modal-0'
      )

      fireEvent.click(getByTestId('update-payload'))

      expect(modals[0]).toHaveTextContent('Modal payload: node-id-2')
      expect(modals[1]).toHaveTextContent(
        'Modal payload: payload-node-id-2-modal-0'
      )

      fireEvent.click(within(modals[0]).getByTestId('update-modal-state'))

      expect(modals[1]).toHaveTextContent(
        'Modal payload: payload-node-id-2-modal-1'
      )
    })

    it('allows passing callbacks as part of the payload to the nested modal', () => {
      const onModalAction = jest.fn()
      const { getByTestId, getAllByTestId } = render(
        <App onModalAction={onModalAction} />
      )

      fireEvent.click(getByTestId('trigger-modal'))
      fireEvent.click(getByTestId('trigger-nested-modal'))

      const modals = getAllByTestId('modal')

      expect(modals).toHaveLength(2)

      fireEvent.click(within(modals[1]).getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenCalledWith('node-id-1', 'nested-modal-0')
    })

    it('propagates callback changes to the nested modal when it is opened', () => {
      const onModalAction = jest.fn()
      const { getByTestId, getAllByTestId } = render(
        <App onModalAction={onModalAction} />
      )

      fireEvent.click(getByTestId('trigger-modal'))
      fireEvent.click(getByTestId('trigger-nested-modal'))

      const modals = getAllByTestId('modal')

      expect(modals).toHaveLength(2)

      fireEvent.click(within(modals[1]).getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenLastCalledWith(
        'node-id-1',
        'nested-modal-0'
      )

      fireEvent.click(getByTestId('update-payload'))
      fireEvent.click(within(modals[1]).getByTestId('update-modal-state'))
      fireEvent.click(within(modals[1]).getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenLastCalledWith(
        'node-id-2',
        'nested-modal-1'
      )
    })

    it('allows closing parent modal when nested is closed', () => {
      const onModalAction = jest.fn()
      const { getByTestId, queryByTestId, getAllByTestId } = render(
        <App onModalAction={onModalAction} />
      )

      fireEvent.click(getByTestId('trigger-modal'))
      fireEvent.click(getByTestId('trigger-nested-modal'))

      const modals = getAllByTestId('modal')

      expect(modals).toHaveLength(2)

      fireEvent.click(within(modals[1]).getByTestId('close-modal'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()
    })
  })

  describe('detached modals', () => {
    it('does not propagate payload changes to the modal when it is opened', () => {
      const { getByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-detached-modal'))

      const modal = getByTestId('modal')

      expect(modal).toHaveTextContent('Modal payload: node-id-1')

      fireEvent.click(getByTestId('update-payload'))

      expect(modal).toHaveTextContent('Modal payload: node-id-1')
    })
  })

  it('allows showing nested modal after closing the current one', () => {
    const { getByTestId, getAllByTestId } = render(<App />)

    fireEvent.click(getByTestId('trigger-modal'))
    fireEvent.click(getByTestId('hide-and-trigger-nested-modal'))

    const modals = getAllByTestId('modal')

    expect(modals).toHaveLength(1)
    expect(modals[0]).toHaveTextContent(
      'Modal payload: payload-node-id-1-modal-0'
    )
  })
})
