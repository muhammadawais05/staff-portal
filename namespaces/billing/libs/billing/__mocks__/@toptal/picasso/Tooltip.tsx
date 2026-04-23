import React from 'react'

export const Tooltip = jest
  .fn()
  .mockImplementation(({ children, content, placement }) => (
    <div data-testid='Tooltip'>
      <div data-testid='Tooltip-content'>{content}</div>
      <div data-testid='Tooltip-children'>{children}</div>
      <div data-testid='Tooltip-placement'>{placement}</div>
    </div>
  ))

export default Tooltip
