import React, { ReactNode } from 'react'

const EditableWrapper = (props: { children: ReactNode }) => {
  return <div data-testid='EditableWrapper'>
    {props.children}
    <div>
      <div data-testid='EditableWrapper-cancel' />
      <div data-testid='EditableWrapper-submit' />
    </div>
  </div>
}

export default EditableWrapper
