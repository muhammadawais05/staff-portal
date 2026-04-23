import React, { ReactNode } from 'react'
import { CSS, useSortable } from '@staff-portal/sortable'
import { CSSProp } from 'styled-components'

import * as S from './styles'

type Props = {
  id: string
  children: ReactNode | ((data: { isDragging: boolean }) => ReactNode)
  style?: CSSProp
  disabled?: boolean
  'data-testid'?: string
}

const SortableItem = ({
  id,
  children,
  style,
  disabled,
  'data-testid': dataTestId
}: Props) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transition,
    transform
  } = useSortable({ id, disabled })

  return (
    <div
      data-testid={dataTestId}
      ref={setNodeRef}
      css={
        disabled
          ? [style]
          : [isDragging ? S.cursorGrabbing : S.cursorGrab, style]
      }
      style={{
        transition,
        transform: CSS.Translate.toString(transform)
      }}
      {...listeners}
      {...attributes}
    >
      {typeof children === 'function' ? children({ isDragging }) : children}
    </div>
  )
}

export default SortableItem
