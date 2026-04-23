import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { Router } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  defineModalWithQueryParams,
  ModalProvider,
  useModalRegistry,
  useModal
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

const QUERY_PARAMS_MODAL = defineModalWithQueryParams('query-param-modal')

interface ModalProps {
  hideModal: () => void
}

const Modal = ({ hideModal }: ModalProps) => {
  return (
    <div data-testid='modal'>
      <div data-testid='close-modal' onClick={hideModal} />
    </div>
  )
}

const QueryParamsModalCaller = ({ id }: { id: number }) => {
  const { showModal, showModalWithQueryParams, queryParams } = useModal(
    QUERY_PARAMS_MODAL,
    undefined
  )

  return (
    <>
      <div data-testid={`trigger-modal-${id}`} onClick={showModal} />
      <div
        data-testid={`trigger-modal-with-navigation-${id}`}
        onClick={showModalWithQueryParams}
      />
      <div data-testid={`modal-link-${id}`}>{JSON.stringify(queryParams)}</div>
    </>
  )
}

const QueryParamsModalCallerWrapper = ({ id }: { id: number }) => {
  const [showModalCaller, setShowModalCaller] = useState(true)

  return (
    <>
      <div
        data-testid={`hide-modal-caller-${id}`}
        onClick={() => setShowModalCaller(false)}
      />
      {showModalCaller && <QueryParamsModalCaller id={id} />}
    </>
  )
}

const App = ({
  history,
  leaveModalOnCallerUnmount
}: {
  history?: ReturnType<typeof createMemoryHistory>
  leaveModalOnCallerUnmount?: true
}) => {
  const memoryHistory = history ?? createMemoryHistory()
  const registry = useModalRegistry()

  registry.set(QUERY_PARAMS_MODAL, {
    Component: Modal,
    leaveOnCallerUnmount: leaveModalOnCallerUnmount
  })

  return (
    <Router history={memoryHistory}>
      <TestWrapper>
        <MessagesProvider>
          <ModalProvider registry={registry}>
            <QueryParamsModalCallerWrapper id={1} />
            <QueryParamsModalCallerWrapper id={2} />
          </ModalProvider>
        </MessagesProvider>
      </TestWrapper>
    </Router>
  )
}

const AppWithoutModal = ({
  history
}: {
  history?: ReturnType<typeof createMemoryHistory>
}) => {
  const memoryHistory = history ?? createMemoryHistory()
  const registry = useModalRegistry()

  return (
    <Router history={memoryHistory}>
      <TestWrapper>
        <MessagesProvider>
          <ModalProvider registry={registry}>
            <QueryParamsModalCaller id={1} />
          </ModalProvider>
        </MessagesProvider>
      </TestWrapper>
    </Router>
  )
}

describe('Modals service: query params modal without payload', () => {
  describe('modal is registered', () => {
    it('allows showing specified modal without navigation', () => {
      const history = createMemoryHistory()
      const { getByTestId, queryByTestId } = render(<App history={history} />)

      expect(queryByTestId('modal')).not.toBeInTheDocument()

      fireEvent.click(getByTestId('trigger-modal-1'))

      expect(getByTestId('modal')).toBeInTheDocument()
      expect(history.location.search).toBe('')
    })

    it('allows closing the modal', () => {
      const { getByTestId, queryByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal-1'))

      expect(getByTestId('modal')).toBeInTheDocument()

      fireEvent.click(getByTestId('close-modal'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('provides query params (e.g. for linking)', () => {
      const { getByTestId } = render(<App />)

      expect(getByTestId('modal-link-1')).toHaveTextContent(
        JSON.stringify({ modal: 'query-param-modal' })
      )
    })

    describe('showing modal with query params history navigation', () => {
      it('allows showing specified modal with pushing query params to history', () => {
        const history = createMemoryHistory({
          initialEntries: ['?unrelated=true']
        })
        const { getByTestId, queryByTestId } = render(<App history={history} />)

        expect(queryByTestId('modal')).not.toBeInTheDocument()

        fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

        expect(getByTestId('modal')).toBeInTheDocument()
        expect(history.location.search).toBe(
          '?unrelated=true&modal=query-param-modal'
        )
      })

      it('removes modal query params when closing the modal without touching unrelated query params', () => {
        const history = createMemoryHistory({
          initialEntries: ['?unrelated=true']
        })
        const { getByTestId } = render(<App history={history} />)

        fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

        expect(getByTestId('modal')).toBeInTheDocument()
        expect(history.location.search).toBe(
          '?unrelated=true&modal=query-param-modal'
        )

        fireEvent.click(getByTestId('close-modal'))

        expect(history.location.search).toBe('?unrelated=true')
      })

      it('opens the modal when query params are present in history', () => {
        const history = createMemoryHistory({
          initialEntries: ['?modal=query-param-modal']
        })
        const { getByTestId } = render(<App history={history} />)

        expect(getByTestId('modal')).toBeInTheDocument()
      })

      it('does not open unregistered modal', () => {
        const history = createMemoryHistory({
          initialEntries: ['?modal=unregistered-modal']
        })
        const { queryByTestId } = render(<App history={history} />)

        expect(queryByTestId('modal')).not.toBeInTheDocument()
      })

      it('opens the modal when query params are replaced in history', async () => {
        const history = createMemoryHistory()
        const { findByTestId, queryByTestId } = render(
          <App history={history} />
        )

        expect(queryByTestId('modal')).not.toBeInTheDocument()

        history.replace({ search: '?modal=query-param-modal' })

        expect(await findByTestId('modal')).toBeInTheDocument()
      })

      it('opens the modal when query params are pushed to history', async () => {
        const history = createMemoryHistory()
        const { findByTestId, queryByTestId } = render(
          <App history={history} />
        )

        expect(queryByTestId('modal')).not.toBeInTheDocument()

        history.push({ search: '?modal=query-param-modal' })

        expect(await findByTestId('modal')).toBeInTheDocument()
      })

      it('hides the modal when modal caller is unmounted', () => {
        const { getByTestId, queryByTestId } = render(<App />)

        fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

        expect(getByTestId('modal')).toBeInTheDocument()

        fireEvent.click(getByTestId('hide-modal-caller-1'))

        expect(queryByTestId('modal')).not.toBeInTheDocument()
      })

      it('does not hide the modal when modal specifies this explicitly', () => {
        const { getByTestId } = render(<App leaveModalOnCallerUnmount />)

        fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

        expect(getByTestId('modal')).toBeInTheDocument()

        fireEvent.click(getByTestId('hide-modal-caller-1'))

        expect(getByTestId('modal')).toBeInTheDocument()
      })

      it('does not hide the modal when unrelated modal caller is unmounted', () => {
        const { getByTestId } = render(<App />)

        fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

        expect(getByTestId('modal')).toBeInTheDocument()

        fireEvent.click(getByTestId('hide-modal-caller-2'))

        expect(getByTestId('modal')).toBeInTheDocument()
      })
    })
  })

  describe('modal is not reqistered', () => {
    it('adds console warning when trying to use the modal', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

      render(<AppWithoutModal />)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Modal "query-param-modal" is not registered, please register it with ModalRegistry first.`
      )
    })

    it('does not show any modal when trying to show', () => {
      jest.spyOn(console, 'warn').mockImplementation()

      const history = createMemoryHistory()
      const { getByTestId, queryByTestId } = render(
        <AppWithoutModal history={history} />
      )

      fireEvent.click(getByTestId('trigger-modal-1'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()

      fireEvent.click(getByTestId('trigger-modal-with-navigation-1'))

      expect(queryByTestId('modal')).not.toBeInTheDocument()
      expect(history.location.search).toBe('')
    })

    it('does not show any modal when trying to show with query params navigation', () => {
      jest.spyOn(console, 'warn').mockImplementation()
      const history = createMemoryHistory({
        initialEntries: ['?modal=query-param-modal']
      })
      const { queryByTestId } = render(<AppWithoutModal history={history} />)

      expect(queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('returns empty object for query params', () => {
      jest.spyOn(console, 'warn').mockImplementation()
      const { getByTestId } = render(<AppWithoutModal />)

      expect(getByTestId('modal-link-1')).toHaveTextContent(JSON.stringify({}))
    })
  })
})
