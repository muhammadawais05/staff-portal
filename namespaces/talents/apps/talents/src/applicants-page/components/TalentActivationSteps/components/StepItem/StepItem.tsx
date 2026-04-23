import { Container, Tooltip, TagProps } from '@toptal/picasso'
import { TooltipContent } from '@staff-portal/ui'
import React from 'react'

import CustomTag from '../../../CustomTag'

interface Props {
  content: string
  color?: TagProps['variant']
  disabled?: boolean
  messages?: string[]
}

const StepItem = ({
  messages,
  color = 'light-grey',
  content,
  disabled
}: Props) => {
  return (
    <Container right='xsmall' bottom='xsmall' inline as='span'>
      <Tooltip
        content={<TooltipContent messages={messages} stepName={content} />}
        placement='top'
      >
        <span>
          <CustomTag disabled={disabled} variant={color}>
            {content}
          </CustomTag>
        </span>
      </Tooltip>
    </Container>
  )
}

export default StepItem
