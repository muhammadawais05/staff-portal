import React, { ReactElement, ReactNode, useState } from 'react'

// TODO: rewrite this mock (and dependent tests) to not use any logic https://toptal-core.atlassian.net/browse/SPB-2312
export const Tooltip = ({
  children,
  content,
  open
}: {
  children: ReactElement
  content?: ReactNode
  open?: boolean
}) => {
  const [showingTooltip, setShowingTooltip] = useState(false)

  return (
    <>
      {(open || showingTooltip) && (
        <span role='tooltip' data-testid='Tooltip-content'>
          {content}
        </span>
      )}
      {React.cloneElement(children, {
        onMouseOver: () => setShowingTooltip(true),
        onMouseOut: () => setShowingTooltip(false)
      })}
    </>
  )
}

export default Tooltip
