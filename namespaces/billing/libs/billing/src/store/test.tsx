import React, { ReactNode, useReducer } from 'react'

import { StoreProvider, reducer, initialState } from '.'
import { confirmationActions } from './confirmationActions'
import { modalActions } from './modalActions'
import renderComponent from '../utils/tests'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useReducer: jest.fn().mockImplementation(() => [{}, jest.fn()])
}))

jest.mock('./modalActions', () => ({
  modalActions: {
    hideModal: jest.fn(),
    showModal: jest.fn()
  }
}))

jest.mock('./confirmationActions', () => ({
  confirmationActions: {
    hideConfirmation: jest.fn(),
    showConfirmation: jest.fn()
  }
}))

const render = (children?: ReactNode) =>
  renderComponent(<StoreProvider>{children}</StoreProvider>)

describe('Store', () => {
  it('default render', () => {
    render()

    expect(useReducer).toHaveBeenCalledWith(reducer, initialState)
  })

  describe('reducer', () => {
    it('modalActions.showModal', () => {
      reducer(
        {
          modal: {
            id: 'version'
          }
        },
        { payload: { id: 'test' }, type: 'showModal' }
      )

      expect(modalActions.showModal).toHaveBeenCalledTimes(1)
      expect(modalActions.showModal).toHaveBeenCalledWith(
        {
          modal: {
            id: 'version'
          }
        },
        { payload: { id: 'test' }, type: 'showModal' }
      )
    })

    it('modalActions.hideModal', () => {
      reducer(
        {
          modal: {
            id: 'version'
          }
        },
        { payload: { id: 'test' }, type: 'hideModal' }
      )

      expect(modalActions.hideModal).toHaveBeenCalledTimes(1)
      expect(modalActions.hideModal).toHaveBeenCalledWith(
        {
          modal: {
            id: 'version'
          }
        },
        { payload: { id: 'test' }, type: 'hideModal' }
      )
    })

    it('confirmationActions.showConfirmation', () => {
      const onSuccess = jest.fn()

      reducer(
        {
          confirmation: {}
        },
        {
          payload: {
            actionTitle: 'example notification',
            onSuccess
          },
          type: 'showConfirmation'
        }
      )

      expect(confirmationActions.showConfirmation).toHaveBeenCalledTimes(1)
      expect(confirmationActions.showConfirmation).toHaveBeenCalledWith(
        {
          confirmation: {}
        },
        {
          payload: {
            actionTitle: 'example notification',
            onSuccess
          },
          type: 'showConfirmation'
        }
      )
    })

    it('confirmationActions.hideConfirmation', () => {
      const onSuccess = jest.fn()

      reducer(
        {
          confirmation: {
            actionTitle: 'example notification',
            onSuccess
          }
        },
        { type: 'hideConfirmation' }
      )

      expect(confirmationActions.hideConfirmation).toHaveBeenCalledTimes(1)
      expect(confirmationActions.hideConfirmation).toHaveBeenCalledWith(
        {
          confirmation: {
            actionTitle: 'example notification',
            onSuccess
          }
        },
        { type: 'hideConfirmation' }
      )
    })
  })
})
