import React, { ReactNode } from 'react'
import {
  TypographyOverflow,
  Props as TypographyOverflowProps
} from '@toptal/picasso/TypographyOverflow/TypographyOverflow'
import { ColorType } from '@toptal/picasso'

export interface Props extends TypographyOverflowProps {
  children: ReactNode
  tooltipContent?: ReactNode
  color?: ColorType
}

// This wrapper component is meant to be used only with link components.
// It follows the color guidelines for links inside tooltips:
// https://toptal-core.slack.com/archives/CM8KE183V/p1603359279069000
const TypographyOverflowLink = ({
  children,
  tooltipContent,
  color,
  ...restProps
}: Props) => {
  const linkTooltipContent = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return
    }

    return React.cloneElement(child, { color: color || 'white' })
  })

  const content = tooltipContent ?? linkTooltipContent

  return (
    <TypographyOverflow {...restProps} tooltipContent={content}>
      {children}
    </TypographyOverflow>
  )
}

export default TypographyOverflowLink
