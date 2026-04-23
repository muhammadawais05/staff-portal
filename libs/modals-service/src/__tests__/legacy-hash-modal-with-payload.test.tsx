import React, { useState } from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { Router } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  defineLegacyHashModal,
  ModalProvider,
  useModalRegistry,
  useModal
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn(() => ({ showError: jest.fn() }))
}))

const MODAL_NAME = 'legacy_hash_modal_with_payload'

const LEGACY_HASH_MODAL = defineLegacyHashModal<{
  nodeId: string
  handleAction?: (id: string) => void
}>(MODAL_NAME)

const ModalWithPayloadCaller = ({
  onModalAction
}: {
  onModalAction?: () => void
}) => {
  const [id, setId] = useState(1)
  const nodeId = `node-${id}`
  const updatePayload = () => setId(prevId => prevId + 1)

  const { showLegacyHashModal } = useModal(LEGACY_HASH_MODAL, {
    nodeId,
    handleAction: onModalAction
  })

  return (
    <>
      <button
        data-testid='show-legacy-hash-modal'
        onClick={showLegacyHashModal}
      />
      <button data-testid='update-payload' onClick={updatePayload} />
    </>
  )
}

const ModalWithPayload = jest.fn()

interface AppProps {
  history?: ReturnType<typeof createMemoryHistory>
  onModalAction?: () => void
  forceFailParse?: boolean
}

const App = ({ history, onModalAction, forceFailParse }: AppProps) => {
  const memoryHistory = history ?? createMemoryHistory()
  const registry = useModalRegistry()

  registry.set(LEGACY_HASH_MODAL, {
    Component: ModalWithPayload,
    pattern: new RegExp(`#modal=${MODAL_NAME}&nodeId=(?<nodeId>node-\\d+)\\/?`),
    mapHashToPayload: ({ nodeId }, { showWarning }) => {
      if (forceFailParse) {
        return showWarning()
      }

      return nodeId ? { nodeId } : showWarning()
    },

    mapPayloadToHash: ({ nodeId }) => `#modal=${MODAL_NAME}&nodeId=${nodeId}`
  })

  return (
    <Router history={memoryHistory}>
      <TestWrapper>
        <MessagesProvider>
          <ModalProvider registry={registry}>
            <ModalWithPayloadCaller onModalAction={onModalAction} />
          </ModalProvider>
        </MessagesProvider>
      </TestWrapper>
    </Router>
  )
}

const useNotificationsMock = useNotifications as jest.Mock

const showModal = () => {
  fireEvent.click(screen.getByTestId('show-legacy-hash-modal'))
}

const hideModal = () => {
  fireEvent.click(screen.getByTestId('hide-legacy-hash-modal'))
}

const updatePayload = () => {
  fireEvent.click(screen.getByTestId('update-payload'))
}

const renderComponent = (options?: AppProps) => {
  const modalAction = jest.fn()
  const renderResult = render(<App onModalAction={modalAction} {...options} />)

  return { ...renderResult, modalAction }
}

describe('Modals service: legacy hash modal', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({
      showError: () => {}
    })

    ModalWithPayload.mockImplementation(({ hideModal: hide }) => (
      <div data-testid='modal'>
        <button data-testid='hide-legacy-hash-modal' onClick={hide} />
      </div>
    ))
  })

  describe('when modal opening triggered via user action', () => {
    it('renders modal with correct props passed', () => {
      const { modalAction } = renderComponent()

      showModal()

      expect(screen.getByTestId('modal')).toBeInTheDocument()
      expect(ModalWithPayload).toHaveBeenCalledWith(
        expect.objectContaining({
          nodeId: 'node-1',
          hideModal: expect.any(Function),
          handleAction: modalAction,
          isTopModal: true
        }),
        {}
      )
    })

    it('adds #modal to location.hash', () => {
      const history = createMemoryHistory({
        initialEntries: ['#initial-hash']
      })

      renderComponent({ history })

      showModal()

      expect(history.location.hash).toBe(
        `#initial-hash#modal=${MODAL_NAME}&nodeId=node-1`
      )
    })

    describe('when already had #modal hash', () => {
      it('changes with new opened modal hash', () => {
        const history = createMemoryHistory({
          initialEntries: ['#modal=old-modal']
        })

        renderComponent({ history })

        showModal()

        expect(history.location.hash).toBe(`#modal=${MODAL_NAME}&nodeId=node-1`)
      })
    })
  })

  describe('when modal is opened', () => {
    it('propagates payload changes to the modal component', () => {
      const { modalAction } = renderComponent()

      showModal()
      updatePayload()

      expect(screen.getByTestId('modal')).toBeInTheDocument()
      expect(ModalWithPayload).toHaveBeenCalledWith(
        expect.objectContaining({
          nodeId: 'node-2',
          hideModal: expect.any(Function),
          handleAction: modalAction,
          isTopModal: true
        }),
        {}
      )
    })

    it('closes modal via passed callback', () => {
      renderComponent()

      showModal()
      updatePayload()
      hideModal()

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('removes modal hash from url when closing the modal', () => {
      const history = createMemoryHistory({
        initialEntries: ['/']
      })

      renderComponent({ history })
      showModal()
      hideModal()

      expect(history.location.hash).toBe('')
    })
  })

  it('opens modal via location.hash', () => {
    const history = createMemoryHistory({
      initialEntries: [`#modal=${MODAL_NAME}&nodeId=node-123`]
    })

    renderComponent({ history })

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  describe('when opened via url', () => {
    it('parses and propagates payload to modal component', () => {
      const history = createMemoryHistory({
        initialEntries: [`#modal=${MODAL_NAME}&nodeId=node-123`]
      })

      renderComponent({ history })

      expect(screen.getByTestId('modal')).toBeInTheDocument()
      expect(ModalWithPayload).toHaveBeenCalledWith(
        expect.objectContaining({
          nodeId: 'node-123',
          hideModal: expect.any(Function),
          isTopModal: true
        }),
        {}
      )
    })
  })

  it('opens the modal when modal hash pushed to history', async () => {
    const history = createMemoryHistory()

    renderComponent({ history })

    history.push({
      pathname: '/',
      hash: `#modal=${MODAL_NAME}&nodeId=node-123`
    })

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
  })

  describe('when unable to parse payload from hash', () => {
    it('does not render modal and shows an error notification', () => {
      const showError = jest.fn()

      useNotificationsMock.mockReturnValue({ showError })

      const history = createMemoryHistory({
        initialEntries: [`#modal=${MODAL_NAME}&nodeId=node-123`]
      })

      renderComponent({ history, forceFailParse: true })

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
      expect(showError).toHaveBeenCalledTimes(1)
      expect(showError).toHaveBeenCalledWith(
        `Cannot open "${MODAL_NAME}" modal, some required params are missing.`
      )
    })
  })
})
