import React from 'react'

export const Note = props => (
  <div data-testid={props['data-testid'] || 'Notes'} {...props}>
    {props.children}
  </div>
)

Note.Comment = props => <div {...props}>{props.comment}</div>
