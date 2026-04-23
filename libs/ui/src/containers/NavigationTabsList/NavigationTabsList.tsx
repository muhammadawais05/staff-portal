import React, { Children, isValidElement, ReactElement, useMemo } from 'react'
import Tabs from '@toptal/picasso/Tabs'

import TabsListTab, {
  Props as TabsListTabProps
} from './components/TabsListTab/TabsListTab'
import useHashTabs from './services/use-hash-tabs/use-hash-tabs'
import {
  TabValue,
  TabValueEnumObject
} from '../NavigationTabsProvider/NavigationTabsProvider'
import useTabsListContext from './services/use-tabs-list-context/use-tabs-list-context'

const NavigationTabsList = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>({
  children: childrenProp,
  loading,
  'data-testid': dataTestId = 'tabs-list'
}: {
  children: ReactElement<typeof TabsListTab>[]
  loading: boolean
  'data-testid'?: string
}) => {
  const { activeTabValue, setActiveTabValue } = useTabsListContext<
    TTabValueEnumObject,
    TTabValue
  >()
  const availableTabValuesSet = useMemo(() => new Set<TTabValue>([]), [])
  const [availableTabValues, setAvailableTabValues] = React.useState<
    TTabValue[]
  >([])

  const { onChange } = useHashTabs({
    tabValues: availableTabValues,
    onChange: setActiveTabValue
  })

  const filteredChildren = useMemo(() => {
    if (loading) {
      return null
    }

    return Children.map(childrenProp, child => {
      if (!child || !isValidElement(child)) {
        return null
      }

      const props = child.props as unknown as TabsListTabProps<
        TTabValueEnumObject,
        TTabValue
      >

      if (!availableTabValues.length) {
        if (!props.hidden || typeof props.value !== 'string') {
          availableTabValuesSet.add(props.value)
        }

        if (child === childrenProp[childrenProp.length - 1]) {
          setAvailableTabValues(Array.from(availableTabValuesSet))
        }
      }

      if (props.hidden || typeof props.value !== 'string') {
        return null
      }

      return child
    })
  }, [availableTabValues, availableTabValuesSet, childrenProp, loading])

  return (
    <Tabs
      value={activeTabValue}
      data-testid={dataTestId}
      // @ts-expect-error The type for `value` is `number`, but it's possible to use strings too
      onChange={onChange}
    >
      {filteredChildren}
    </Tabs>
  )
}

NavigationTabsList.Tab = TabsListTab

export { NavigationTabsList }
