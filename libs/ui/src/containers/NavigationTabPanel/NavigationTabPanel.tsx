import React, { ReactNode, useState, useEffect } from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { Container } from '@toptal/picasso'

import type {
  TabValue,
  TabValueEnumObject
} from '../NavigationTabsProvider/NavigationTabsProvider'
import useTabsListContext from '../NavigationTabsList/services/use-tabs-list-context/use-tabs-list-context'

type Props<
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
> = {
  value: TTabValue
  children: ReactNode
}

export const NavigationTabPanel = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>({
  value,
  children
}: Props<TTabValueEnumObject, TTabValue>) => {
  const {
    activeTabValue,
    options: { keepMounted }
  } = useTabsListContext<TTabValueEnumObject, TTabValue>()

  const [isCached, setIsCached] = useState(false)
  const isActiveTabValue = activeTabValue === value

  useEffect(() => {
    if (!keepMounted || isCached || !isActiveTabValue) {
      return
    }

    setIsCached(true)
  }, [keepMounted, isCached, isActiveTabValue])

  if (keepMounted) {
    if (!isCached) {
      return null
    }

    return (
      <WidgetErrorBoundary emptyOnError>
        <Container style={{ display: isActiveTabValue ? '' : 'none' }}>
          {children}
        </Container>
      </WidgetErrorBoundary>
    )
  }

  if (!isActiveTabValue) {
    return null
  }

  return <WidgetErrorBoundary emptyOnError>{children}</WidgetErrorBoundary>
}
