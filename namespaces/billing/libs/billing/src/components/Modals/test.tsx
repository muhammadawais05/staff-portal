import { act } from '@testing-library/react-hooks'
import React, { ComponentProps, useEffect } from 'react'

import { useStore } from '../../store'
import Modals from '.'
import renderComponent from '../../utils/tests'
import { useQueryParams } from '../../_lib/customHooks/useQueryParams'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...(jest.requireActual('@toptal/picasso') as object),
  Modal: jest.fn().mockImplementation(({ children, size }) => (
    <div data-testid='Modal'>
      {size && <div data-testid='Modal-size'>{size}</div>}
      {children && <div data-testid='Modal-children'>{children}</div>}
    </div>
  ))
}))

jest.mock('../ModalsState')
jest.mock('../../components/Confirmation')
jest.mock('../../store', () => ({
  useStore: jest.fn(() => ({
    dispatch: jest.fn(),
    state: {
      modal: {
        modalName: ''
      }
    }
  }))
}))

const mockHandleOnCloseModal = jest.fn()
const mockHandleOnOpenModal = jest.fn()
const mockHandleOnOpenModalWithUrlSearch = jest.fn()

const mockSetQuery = jest.fn()

const useQueryParamsMock = useQueryParams as jest.Mock
const useEffectMock = useEffect as jest.Mock
const useStoreMock = useStore as jest.Mock

jest.mock('../../_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnCloseModal: mockHandleOnCloseModal,
    handleOnOpenModal: mockHandleOnOpenModal,
    handleOnOpenModalWithUrlSearch: mockHandleOnOpenModalWithUrlSearch
  })
}))

jest.mock('../../_lib/customHooks/useQueryParams', () => ({
  useQueryParams: jest.fn()
}))

const render = (props: ComponentProps<typeof Modals> = {}) =>
  renderComponent(<Modals {...props} />)

describe('Modals', () => {
  beforeEach(() => {
    useQueryParamsMock.mockImplementation(() => [{}, mockSetQuery])

    mockHandleOnCloseModal.mockReset()
    mockHandleOnOpenModalWithUrlSearch.mockReset()
    mockHandleOnOpenModal.mockReset()
  })

  describe('when modal is the only opened overlay', () => {
    beforeEach(() => {
      window.location = { hash: 'timesheet-unsubmit' } as Location
      const modalRoot = global.document.createElement('div')

      modalRoot.setAttribute('id', 'react_modal')
      const body = global.document.querySelector('body')

      body?.appendChild(modalRoot)

      useStoreMock.mockImplementation(() => ({
        dispatch: jest.fn(),
        state: {
          confirmation: {},
          modal: {
            modalName: 'timesheet',
            visible: true,
            options: {
              options: {
                billingCycleId: '12345'
              }
            }
          }
        }
      }))
    })

    it('default render', async () => {
      await act(async () => {
        const { queryByTestId } = render()

        expect(queryByTestId('Modal-size')).toContainHTML('large')
        expect(queryByTestId('Confirmation')).not.toBeInTheDocument()
      })
    })

    describe('when modal is not visible', () => {
      it('does not render', async () => {
        useStoreMock.mockImplementation(() => ({
          dispatch: jest.fn(),
          state: {
            confirmation: {},
            modal: {
              modalName: 'timesheet',
              visible: false,
              options: {
                options: {
                  billingCycleId: ''
                }
              }
            }
          }
        }))

        await act(async () => {
          const { queryByTestId } = render()

          expect(queryByTestId('Confirmation')).not.toBeInTheDocument()
        })
      })
    })

    describe('when modal name is empty', () => {
      it('passes empty modal size', async () => {
        useStoreMock.mockImplementation(() => ({
          dispatch: jest.fn(),
          state: {
            confirmation: {},
            modal: {
              modalName: undefined,
              visible: false,
              options: {
                options: {
                  billingCycleId: ''
                }
              }
            }
          }
        }))

        await act(async () => {
          const { queryByTestId } = render()

          expect(queryByTestId('Modal-size')).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('when modal and confirmation are open together', () => {
    beforeEach(() => {
      window.location = { hash: 'timesheet-unsubmit' } as Location
      const modalRoot = global.document.createElement('div')

      modalRoot.setAttribute('id', 'react_modal')
      const body = global.document.querySelector('body')

      body?.appendChild(modalRoot)

      useStoreMock.mockImplementation(() => ({
        dispatch: jest.fn(),
        state: {
          confirmation: {
            actionTitle: 'test confirmation'
          },
          modal: {
            modalName: 'timesheet',
            visible: true,
            options: {
              options: {
                billingCycleId: '12345'
              }
            }
          }
        }
      }))
    })

    it('default render', async () => {
      await act(async () => {
        const { queryByTestId } = render()

        expect(queryByTestId('Modal-size')).toContainHTML('small')
        expect(queryByTestId('Confirmation')).toContainHTML('test confirmation')
      })
    })
  })

  describe('when query does not contain parameter with modal name', () => {
    beforeEach(() => {
      const modalRoot = global.document.createElement('div')

      modalRoot.setAttribute('id', 'react_modal')
      const body = global.document.querySelector('body')

      body?.appendChild(modalRoot)

      useEffectMock.mockImplementation((func: () => void) => func())
      useStoreMock.mockImplementation(() => ({
        dispatch: jest.fn(),
        state: {
          modal: {
            modalName: 'timesheet',
            visible: true,
            options: {}
          },
          confirmation: {}
        }
      }))
    })

    it('does not open modal on page load', async () => {
      await act(async () => {
        render()

        expect(mockHandleOnOpenModal).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when query contains parameter with modal name`', () => {
    beforeEach(() => {
      const modalRoot = global.document.createElement('div')

      modalRoot.setAttribute('id', 'react_modal')
      const body = global.document.querySelector('body')

      body?.appendChild(modalRoot)

      useQueryParamsMock.mockImplementation(() => [
        { modal: 'commitment-change' },
        mockSetQuery
      ])
      useEffectMock.mockImplementation((func: () => void) => func())
      useStoreMock.mockImplementation(() => ({
        dispatch: jest.fn(),
        state: {
          modal: {
            modalName: 'timesheet',
            visible: true,
            options: {}
          },
          confirmation: {}
        }
      }))
    })

    it('opens modal on page load', async () => {
      await act(async () => {
        // first render
        render()

        // second render
        render()

        expect(mockHandleOnOpenModal).toHaveBeenCalledTimes(1)
        expect(mockHandleOnOpenModal).toHaveBeenCalledWith(
          'commitment-change',
          expect.anything()
        )
      })
    })
  })
})
