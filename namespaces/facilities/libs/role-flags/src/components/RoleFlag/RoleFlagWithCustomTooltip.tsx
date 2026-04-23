import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Tooltip } from '@toptal/picasso'
import { useUserTimeZone } from '@staff-portal/current-user'

import {
  PropsWithCustomTooltip,
  PropsWithCustomTooltipAndActions
} from './types'
import RoleFlagTooltipContent, {
  getFormattedFlaggedByCopy
} from '../RoleFlagTooltipContent'
import RoleFlagActions from '../RoleFlagActions'

const RoleFlagWithCustomTooltip = ({
  title,
  comment,
  updatedAt,
  createdAt,
  flaggedBy,
  children,
  ...restProps
}: PropsWithChildren<
  PropsWithCustomTooltip | PropsWithCustomTooltipAndActions
>) => {
  const [disableListeners, setDisableListeners] = useState(false)
  const timeZone = useUserTimeZone()
  const formattedFlaggedByCopy = useMemo(
    () =>
      getFormattedFlaggedByCopy({ createdAt, updatedAt, timeZone }, flaggedBy),
    [timeZone, createdAt, updatedAt, flaggedBy]
  )

  const renderTooltipActions = useCallback(() => {
    if (!restProps.showTooltipActions) {
      return null
    }

    return (
      <RoleFlagActions
        title={title}
        comment={comment}
        roleFlagId={restProps.roleFlagId}
        operations={restProps.operations}
        setDisableListeners={setDisableListeners}
      />
    )
  }, [comment, restProps, title])

  return (
    <Tooltip
      delay='short'
      disableListeners={disableListeners}
      interactive
      content={
        <RoleFlagTooltipContent
          title={title}
          comment={comment}
          formattedFlaggedByCopy={formattedFlaggedByCopy}
          renderTooltipActions={renderTooltipActions}
        />
      }
    >
      {children}
    </Tooltip>
  )
}

export default RoleFlagWithCustomTooltip
