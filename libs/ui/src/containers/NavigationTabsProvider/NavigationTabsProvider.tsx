import React, {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  Context
} from 'react'

export type TabValueEnumObject = Record<string, string>

export type TabValue<TTabValueEnumObject extends TabValueEnumObject> = string &
  TTabValueEnumObject[keyof TTabValueEnumObject]

export type TabsListOptions = {
  keepMounted?: boolean
}

export type Props<
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
> = {
  tabValues: TTabValueEnumObject
  options?: TabsListOptions
  children:
    | ((value: { activeTabValue: TTabValue | boolean }) => ReactNode)
    | ReactNode
}

export type TabsListContextType<
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
> = {
  activeTabValue: TTabValue | boolean
  setActiveTabValue: Dispatch<SetStateAction<boolean | TTabValue>>
  tabValues: TTabValueEnumObject
  options: TabsListOptions
}

export const createTabsListContext = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>() =>
  createContext<TabsListContextType<TTabValueEnumObject, TTabValue>>(
    undefined as unknown as TabsListContextType<TTabValueEnumObject, TTabValue>
  )

export const TabsListContext = createTabsListContext()

export const NavigationTabsProvider = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>({
  tabValues,
  options = {},
  children
}: Props<TTabValueEnumObject, TTabValue>) => {
  const [activeTabValue, setActiveTabValue] =
    useState<
      TabsListContextType<TTabValueEnumObject, TTabValue>['activeTabValue']
    >(false)

  const Provider = (
    TabsListContext as unknown as Context<
      TabsListContextType<TTabValueEnumObject, TTabValue>
    >
  ).Provider

  return (
    <Provider
      value={{
        activeTabValue,
        setActiveTabValue,
        tabValues,
        options
      }}
    >
      {typeof children === 'function' ? children({ activeTabValue }) : children}
    </Provider>
  )
}
