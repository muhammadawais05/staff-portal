import { css } from 'styled-components'

import { EditableFieldContentWidth } from '../../types'

export const editorContainer = ({
  width
}: {
  width: EditableFieldContentWidth
}) => css`
  ${() => {
    switch (width) {
      case 'full':
        return `flex: 1;`
      case 'small':
        return `width: 7rem;`
    }
  }}
`
