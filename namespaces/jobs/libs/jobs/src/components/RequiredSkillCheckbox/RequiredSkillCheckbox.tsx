import { Tooltip, Button } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import React from 'react'

import AsteriskIcon from '../AsteriskIcon'
import * as S from './styles'

export interface Props {
  checked: boolean
  onClick: () => void
}

const RequiredSkillCheckbox = ({ checked, onClick }: Props) => (
  <Tooltip
    content={checked ? 'Skill marked as required' : 'Mark as a required skill'}
    interactive
  >
    <Button.Circular
      variant='transparent'
      css={S.asteriskIcon}
      onClick={onClick}
      data-testid='require-skill'
      icon={
        <AsteriskIcon
          color={checked ? palette.yellow.main : palette.grey.main}
        />
      }
    />
  </Tooltip>
)

export default RequiredSkillCheckbox
