import Tabs from '@toptal/picasso/Tabs'
import type { TabProps } from '@toptal/picasso/Tab'
import React, { ReactElement } from 'react'

import useTabsListContext from '../../services/use-tabs-list-context/use-tabs-list-context'
import type {
  TabValue,
  TabValueEnumObject
} from '../../../NavigationTabsProvider/NavigationTabsProvider'

export type Props<
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
> = {
  value: TTabValue
  label: string
  hidden?: boolean
  icon?: ReactElement
}

const TabsListTab = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>({
  value,
  label,
  hidden,
  icon,
  ...rest
}: Props<TTabValueEnumObject, TTabValue>) => {
  const { tabValues } = useTabsListContext<TTabValueEnumObject, TTabValue>()

  if (!Object.values(tabValues).includes(value)) {
    throw new Error(
      `Unknown value: '${value}' for object values: [${Object.values(
        tabValues
      ).join(', ')}]`
    )
  }

  return (
    <Tabs.Tab
      value={value}
      label={label}
      hidden={hidden}
      icon={icon}
      // Material-UI is expecting this prop while performing React.cloneElement
      // https://github.com/mui/material-ui/blob/6a7daaad5d7db4ebcc48eeeba927ef007c655e5f/packages/material-ui/src/Tabs/Tabs.js#L347-L351
      onChange={(rest as Pick<TabProps, 'onChange'>).onChange}
    />
  )
}

export default TabsListTab
