import React, { ReactNode } from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

type Props = {
  children: ReactNode
  disabled?: boolean
  disabledText?: string
}

const ActionsDropdownTooltipWrapper = ({
  children,
  disabled,
  disabledText
}: Props) =>
  disabled ? (
    <WrapWithTooltip
      enableTooltip={disabled}
      placement='top'
      inline={false}
      interactive={false}
      content={disabledText}
    >
      {children}
    </WrapWithTooltip>
  ) : (
    <>{children}</>
  )

export default ActionsDropdownTooltipWrapper
