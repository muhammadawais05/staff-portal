import React, { useCallback } from 'react'
import { ArrowDownMinor16, ArrowUpMinor16, Button } from '@toptal/picasso'

export type Props = {
  expanded: boolean
  onClick: (expanded: boolean) => void
}

const ExpandButton = ({ expanded, onClick }: Props) => {
  const handleClick = useCallback(() => {
    onClick(!expanded)
  }, [expanded, onClick])

  return (
    <Button.Circular
      data-testid='ExpandButton'
      variant='flat'
      icon={
        expanded ? (
          <ArrowUpMinor16 data-testid='ExpandButton-arrow-up' />
        ) : (
          <ArrowDownMinor16 data-testid='ExpandButton-arrow-down' />
        )
      }
      onClick={handleClick}
    />
  )
}

export default ExpandButton
