import { Menu, Tooltip } from '@toptal/picasso'
import React, { SyntheticEvent, memo, ReactNode } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { MenuLink } from '@staff-portal/ui'

import * as OperationHelpers from '../../../../_lib/helpers/operations'
import { OperationItemFragment } from '../../../../__fragments__/operationItemFragment.graphql.types'

const displayName = 'ActionsItem'

interface Props {
  handleOnClick: (e: SyntheticEvent<HTMLElement, Event>) => void
  href?: Maybe<string>
  nodeId?: string
  /**
   * @deprecated https://toptal-core.atlassian.net/browse/SPB-1354
   */
  documentNumber?: Maybe<number>
  isUrlAction?: boolean
  label: ReactNode
  operation?: OperationItemFragment
  option: string
  target?: HTMLLinkElement['target']
}

const ActionsItem = ({
  nodeId,
  documentNumber,
  handleOnClick,
  href,
  isUrlAction,
  label,
  operation,
  option,
  target
}: Props) => {
  const isEmptyUrlAction = isUrlAction && !href

  if (
    OperationHelpers.isCallableHidden(operation?.callable) ||
    isEmptyUrlAction
  ) {
    return null
  }

  const isDisabled = OperationHelpers.isCallableDisabled(operation?.callable)

  if (isUrlAction) {
    return (
      // TODO: https://github.com/toptal/picasso/issues/1281
      // eslint-disable-next-line
      // @ts-ignore
      <Menu.Item data-testid={option} as={MenuLink} href={href} target={target}>
        {label}
      </Menu.Item>
    )
  }

  const content = (
    <Menu.Item
      data-node-id={nodeId}
      data-document-number={documentNumber}
      data-testid={option}
      data-value={option}
      disabled={isDisabled}
      key={option}
      onClick={handleOnClick}
    >
      {label}
    </Menu.Item>
  )

  const tooltipText = OperationHelpers.getOperationMessage(operation?.messages)

  return tooltipText ? (
    <Tooltip content={tooltipText} placement='left' interactive>
      <div>{content}</div>
    </Tooltip>
  ) : (
    content
  )
}

ActionsItem.displayName = displayName

export default memo(ActionsItem)
