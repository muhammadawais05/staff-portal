import { Context, useContext } from 'react'

import {
  TabValue,
  TabValueEnumObject,
  TabsListContext,
  TabsListContextType
} from '../../../NavigationTabsProvider/NavigationTabsProvider'

const useTabsListContext = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>() =>
  useContext<TabsListContextType<TTabValueEnumObject, TTabValue>>(
    TabsListContext as unknown as Context<
      TabsListContextType<TTabValueEnumObject, TTabValue>
    >
  )

export default useTabsListContext
