import React from 'react'

export const Modal = ({ children, size }) => (
  <div data-testid='Modal'>
    {size && <div data-testid='Modal-size'>{size}</div>}
    {children && <div data-testid='Modal-children'>{children}</div>}
  </div>
)

Modal.Title = props => (
  <div data-testid={props['data-testid'] || 'Modal.Title'}>
    {props.children}
  </div>
)

Modal.Content = props => (
  <div data-testid={props['data-testid'] || 'Modal.Content'}>
    {props.children}
  </div>
)

Modal.Actions = props => (
  <div data-testid={props['data-testid'] || 'Modal.Actions'}>
    {props.children}
  </div>
)

export default Modal
