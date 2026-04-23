import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { Router } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  defineModalWithQueryParams,
  ModalProvider,
  useModalRegistry,
  useModal,
  ModalComponentBaseProps
} from '..'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn(() => ({ showError: jest.fn() }))
}))

type ModalPayload = {
  nodeId: string
  handleAction?: (id: string) => void
}

type ModalQueryParams = {
  node_id: string
}

const QUERY_PARAMS_MODAL_WITH_PAYLOAD = defineModalWithQueryParams<
  ModalPayload,
  ModalQueryParams
>('query-param-modal-with-payload')

interface ModalWithPayloadProps extends ModalComponentBaseProps {
  nodeId: string
  handleAction?: (id: string) => void
}

const ModalWithPayload = ({
  hideModal,
  nodeId,
  handleAction
}: ModalWithPayloadProps) => {
  const [modalData, setModalData] = useState(0)
  const updateModalData = () => setModalData(prevData => prevData + 1)

  return (
    <div data-testid='modal'>
      <div data-testid='close-modal' onClick={hideModal} />
      Payload data: {nodeId}
      <div data-testid='update-modal-state' onClick={updateModalData} />
      {handleAction && (
        <div
          data-testid='modal-action'
          onClick={() => handleAction(`modal-data-${modalData}`)}
        />
      )}
    </div>
  )
}

interface ModalWithPayloadCallerProps {
  onModalAction?: (nodeId: string, modalData: string) => void
}

const QueryParamsModalWithPayloadCaller = ({
  onModalAction
}: ModalWithPayloadCallerProps) => {
  const [id, setId] = useState(1)
  const nodeId = `test-id-${id}`

  const handleAction = (modalData: string) => onModalAction?.(nodeId, modalData)
  const updatePayload = () => setId(prevId => prevId + 1)

  const { showModal, showModalWithQueryParams, queryParams } = useModal(
    QUERY_PARAMS_MODAL_WITH_PAYLOAD,
    { nodeId, handleAction }
  )

  return (
    <>
      <div data-testid='trigger-modal' onClick={showModal} />
      <div
        data-testid='trigger-modal-with-navigation'
        onClick={showModalWithQueryParams}
      />
      <div data-testid='modal-link'>{JSON.stringify(queryParams)}</div>
      <div data-testid='update-payload' onClick={updatePayload} />
    </>
  )
}

interface AppProps {
  history?: ReturnType<typeof createMemoryHistory>
  onModalAction?: (nodeId: string, modalData: string) => void
}

const App = ({ history, onModalAction }: AppProps) => {
  const memoryHistory = history ?? createMemoryHistory()
  const registry = useModalRegistry()

  registry.set(QUERY_PARAMS_MODAL_WITH_PAYLOAD, {
    Component: ModalWithPayload,
    queryParams: {
      to: payload => ({
        node_id: payload.nodeId
      }),
      from: (params, { showWarning }) => {
        if (typeof params.node_id !== 'string') {
          return showWarning()
        }

        return { nodeId: params.node_id }
      }
    }
  })

  return (
    <Router history={memoryHistory}>
      <TestWrapper>
        <MessagesProvider>
          <ModalProvider registry={registry}>
            <QueryParamsModalWithPayloadCaller onModalAction={onModalAction} />
          </ModalProvider>
        </MessagesProvider>
      </TestWrapper>
    </Router>
  )
}

const useNotificationsMock = useNotifications as jest.Mock

describe('Modals service: query params modal with payload', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({
      showError: jest.fn()
    })
  })

  it('allows showing specified modal with provided payload', () => {
    const history = createMemoryHistory()
    const { getByTestId, queryByTestId } = render(<App history={history} />)

    expect(queryByTestId('modal')).not.toBeInTheDocument()

    fireEvent.click(getByTestId('trigger-modal'))

    const modal = getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('test-id-1')
    expect(history.location.search).toBe('')
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

    expect(modal).toHaveTextContent('Payload data: test-id-1')

    fireEvent.click(getByTestId('update-payload'))

    expect(modal).toHaveTextContent('Payload data: test-id-2')
  })

  it('allows passing callbacks as part of the payload', () => {
    const onModalAction = jest.fn()
    const { getByTestId } = render(<App onModalAction={onModalAction} />)

    fireEvent.click(getByTestId('trigger-modal'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenCalledWith('test-id-1', 'modal-data-0')
  })

  it('propagates callback changes to the modal when it is opened', () => {
    const onModalAction = jest.fn()
    const { getByTestId } = render(<App onModalAction={onModalAction} />)

    fireEvent.click(getByTestId('trigger-modal'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('test-id-1', 'modal-data-0')

    fireEvent.click(getByTestId('update-payload'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('test-id-2', 'modal-data-0')

    fireEvent.click(getByTestId('update-modal-state'))
    fireEvent.click(getByTestId('modal-action'))

    expect(onModalAction).toHaveBeenLastCalledWith('test-id-2', 'modal-data-1')
  })

  it('provides query params (e.g. for linking)', () => {
    const { getByTestId } = render(<App />)

    expect(getByTestId('modal-link')).toHaveTextContent(
      JSON.stringify({
        modal: 'query-param-modal-with-payload',
        node_id: 'test-id-1'
      })
    )

    fireEvent.click(getByTestId('update-payload'))

    expect(getByTestId('modal-link')).toHaveTextContent(
      JSON.stringify({
        modal: 'query-param-modal-with-payload',
        node_id: 'test-id-2'
      })
    )
  })

  describe('showing modal with query params history navigation', () => {
    it('allows showing specified modal with provided payload', () => {
      const history = createMemoryHistory({
        initialEntries: ['?unrelated=true']
      })
      const { getByTestId, queryByTestId } = render(<App history={history} />)

      expect(queryByTestId('modal')).not.toBeInTheDocument()

      fireEvent.click(getByTestId('trigger-modal-with-navigation'))

      expect(getByTestId('modal')).toBeInTheDocument()
      expect(history.location.search).toBe(
        '?unrelated=true&modal=query-param-modal-with-payload&node_id=test-id-1'
      )
    })

    it('removes modal query params from history when closing the modal', () => {
      const history = createMemoryHistory({
        initialEntries: ['?unrelated=true#unrelated-as-well']
      })
      const { getByTestId } = render(<App history={history} />)

      fireEvent.click(getByTestId('trigger-modal-with-navigation'))

      expect(getByTestId('modal')).toBeInTheDocument()
      expect(history.location.search).toBe(
        '?unrelated=true&modal=query-param-modal-with-payload&node_id=test-id-1'
      )
      expect(history.location.hash).toBe('#unrelated-as-well')

      fireEvent.click(getByTestId('close-modal'))

      expect(history.location.search).toBe('?unrelated=true')
      expect(history.location.hash).toBe('#unrelated-as-well')
    })

    it('propagates payload changes to the modal when it is opened', () => {
      const { getByTestId } = render(<App />)

      fireEvent.click(getByTestId('trigger-modal-with-navigation'))

      const modal = getByTestId('modal')

      expect(modal).toHaveTextContent('Payload data: test-id-1')

      fireEvent.click(getByTestId('update-payload'))

      expect(modal).toHaveTextContent('Payload data: test-id-2')
    })

    it('allows passing callbacks as part of the payload', () => {
      const onModalAction = jest.fn()
      const { getByTestId } = render(<App onModalAction={onModalAction} />)

      fireEvent.click(getByTestId('trigger-modal-with-navigation'))
      fireEvent.click(getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenCalledWith('test-id-1', 'modal-data-0')
    })

    it('propagates callback changes to the modal when it is opened', () => {
      const onModalAction = jest.fn()
      const { getByTestId } = render(<App onModalAction={onModalAction} />)

      fireEvent.click(getByTestId('trigger-modal-with-navigation'))
      fireEvent.click(getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenLastCalledWith(
        'test-id-1',
        'modal-data-0'
      )

      fireEvent.click(getByTestId('update-payload'))
      fireEvent.click(getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenLastCalledWith(
        'test-id-2',
        'modal-data-0'
      )

      fireEvent.click(getByTestId('update-modal-state'))
      fireEvent.click(getByTestId('modal-action'))

      expect(onModalAction).toHaveBeenLastCalledWith(
        'test-id-2',
        'modal-data-1'
      )
    })

    describe('automatic modal opening', () => {
      it('opens the modal when query params are present in history', () => {
        const history = createMemoryHistory({
          initialEntries: [
            '?modal=query-param-modal-with-payload&node_id=test-id-1'
          ]
        })
        const { getByTestId } = render(<App history={history} />)

        expect(getByTestId('modal')).toBeInTheDocument()
      })

      it('opens the modal when query params are replaced in history', async () => {
        const history = createMemoryHistory()
        const { findByTestId, queryByTestId } = render(
          <App history={history} />
        )

        expect(queryByTestId('modal')).not.toBeInTheDocument()

        history.replace({
          search: '?modal=query-param-modal-with-payload&node_id=test-id-1'
        })

        expect(await findByTestId('modal')).toBeInTheDocument()
      })

      it('opens the modal when query params are pushed to history', async () => {
        const history = createMemoryHistory()
        const { findByTestId, queryByTestId } = render(
          <App history={history} />
        )

        expect(queryByTestId('modal')).not.toBeInTheDocument()

        history.push({
          search: '?modal=query-param-modal-with-payload&node_id=test-id-1'
        })

        expect(await findByTestId('modal')).toBeInTheDocument()
      })

      describe('invalid query params', () => {
        it('does not open the modal', () => {
          const history = createMemoryHistory({
            initialEntries: ['?modal=query-param-modal-with-payload']
          })
          const { queryByTestId } = render(<App history={history} />)

          expect(queryByTestId('modal')).not.toBeInTheDocument()
        })

        it('allows to show validation error', () => {
          const showError = jest.fn()

          useNotificationsMock.mockReturnValue({ showError })

          const history = createMemoryHistory({
            initialEntries: ['?modal=query-param-modal-with-payload']
          })
          const { queryByTestId } = render(<App history={history} />)

          expect(queryByTestId('modal')).not.toBeInTheDocument()

          expect(showError).toHaveBeenLastCalledWith(
            `Cannot open "query-param-modal-with-payload" modal, some required params are missing.`
          )
        })
      })
    })
  })
})
