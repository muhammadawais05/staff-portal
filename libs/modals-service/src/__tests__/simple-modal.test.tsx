import React, { useState } from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'

import {
  ModalProvider,
  useModalRegistry,
  useModal,
  ModalComponentBaseProps
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: () => ({ search: '', hash: '' })
}))

const Modal = ({ hideModal, isTopModal }: ModalComponentBaseProps) => {
  const { showModal } = useModal(Modal, {})

  return (
    <div data-testid='modal'>
      {isTopModal && <div data-testid='top-modal' />}
      <div data-testid='trigger-nested-modal' onClick={showModal} />
      <div data-testid='close-modal' onClick={hideModal} />
    </div>
  )
}

const SimpleModalCaller = ({
  id,
  leaveOnCallerUnmount
}: {
  id: number
  leaveOnCallerUnmount?: true
}) => {
  const { showModal, showDetachedModal } = useModal(Modal, undefined, {
    leaveOnCallerUnmount
  })

  return (
    <>
      <div
        data-testid={id > 1 ? `trigger-modal-${id}` : 'trigger-modal'}
        onClick={showModal}
      />
      <div
        data-testid={
          id > 1 ? `trigger-detached-modal-${id}` : 'trigger-detached-modal'
        }
        onClick={() => showDetachedModal()}
      />
    </>
  )
}

const SimpleModalCallerWrapper = ({
  id,
  leaveOnCallerUnmount
}: {
  id: number
  leaveOnCallerUnmount?: true
}) => {
  const [showModalCaller, setShowModalCaller] = useState(true)

  return (
    <>
      <div
        data-testid={`hide-modal-caller-${id}`}
        onClick={() => setShowModalCaller(false)}
      />
      {showModalCaller && (
        <SimpleModalCaller
          id={id}
          leaveOnCallerUnmount={leaveOnCallerUnmount}
        />
      )}
    </>
  )
}

const App = ({
  leaveModalOnCallerUnmount
}: {
  leaveModalOnCallerUnmount?: true
}) => {
  const registry = useModalRegistry()

  return (
    <MessagesProvider>
      <ModalProvider registry={registry}>
        <SimpleModalCallerWrapper
          id={1}
          leaveOnCallerUnmount={leaveModalOnCallerUnmount}
        />
        <SimpleModalCallerWrapper
          id={2}
          leaveOnCallerUnmount={leaveModalOnCallerUnmount}
        />
      </ModalProvider>
    </MessagesProvider>
  )
}

describe('Modals service: simple modal without payload', () => {
  describe('modal is registered', () => {
    it('allows showing specified modal', () => {
      const { getByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()
    })

    it('allows closing the modal', () => {
      const { getByTestId, queryByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('close-modal'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('hides the modal when modal caller is unmounted', () => {
      const { getByTestId, queryByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('hide-modal-caller-1'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('does not hide the modal when modal specifies this explicitly', () => {
      const { getByTestId } = render(<App leaveModalOnCallerUnmount />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('hide-modal-caller-1'))

      expect(getByTestId('modal')).toBeInTheDocument()
    })

    it('does not hide the modal when unrelated modal caller is unmounted', () => {
      const { getByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('hide-modal-caller-2'))

      expect(getByTestId('modal')).toBeInTheDocument()
    })
  })

  describe('nested modals indication', () => {
    it('allows to check if top-level modal or not', () => {
      const { getByTestId, getAllByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()
      expect(getByTestId('top-modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('trigger-nested-modal'))

      const modals = getAllByTestId('modal')

      expect(modals).toHaveLength(2)
      expect(
        within(modals[0]).queryByTestId('top-modal')
      ).not.toBeInTheDocument()
      expect(within(modals[1]).getByTestId('top-modal')).toBeInTheDocument()
    })
  })

  describe('detached modals', () => {
    it('does not hide the modal when caller is removed', () => {
      const { getByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-detached-modal'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('hide-modal-caller-1'))

      expect(getByTestId('modal')).toBeInTheDocument()
    })
  })
})
