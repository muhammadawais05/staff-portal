import React, { Fragment } from 'react'
export { defineMessage } from '@toptal/staff-portal-message-bus'

export const mockedEmit = jest.fn()

export const MessagesProvider = ({ children }) =>
  React.createElement(Fragment, {}, children)
export const useMessageEmitter = () => mockedEmit
export const useMessageListener = jest.fn()
