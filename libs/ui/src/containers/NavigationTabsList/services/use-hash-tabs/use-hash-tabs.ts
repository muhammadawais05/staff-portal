import {
  useCallback,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { useHistory, useLocation } from '@staff-portal/navigation'
import { extractModalHash } from '@staff-portal/utils'

import {
  TabValue,
  TabValueEnumObject
} from '../../../NavigationTabsProvider/NavigationTabsProvider'
import { extractCleanLocationHash } from '../extract-clean-location-hash/extract-clean-location-hash'

type Props<TTabValue> = {
  tabValues: TTabValue[]
  onChange: Dispatch<SetStateAction<boolean | TTabValue>>
}

const useHashTabs = <
  TTabValueEnumObject extends TabValueEnumObject,
  TTabValue extends TabValue<TTabValueEnumObject>
>({
  tabValues,
  onChange
}: Props<TTabValue>) => {
  const history = useHistory()
  const location = useLocation()
  const { hash: locationHash } = location

  const cleanLocationHash = useMemo(
    () => extractCleanLocationHash(locationHash),
    [locationHash]
  )

  const handleTabChange = useCallback(
    (_: unknown, newTabValue: TTabValue) => {
      history.push({ ...location, hash: newTabValue })
    },
    [history, location]
  )

  useEffect(() => {
    if (!tabValues.length) {
      return
    }

    const firstTabValue = tabValues[0]
    const hash = (cleanLocationHash as TTabValue) || firstTabValue

    // This is needed to get the page content based on URL hash when page reloads
    if (tabValues.includes(hash)) {
      onChange(hash)
    }

    // Keeps compatibility with native browser history navigation
    return history.listen(({ hash: historyHash }) => {
      const cleanHistoryHash = extractCleanLocationHash(
        historyHash
      ) as TTabValue

      return onChange(cleanHistoryHash || firstTabValue)
    })
  }, [onChange, history, cleanLocationHash, tabValues])

  const isLocationHashValid =
    !locationHash ||
    !tabValues.length ||
    tabValues.includes(extractCleanLocationHash(locationHash) as TTabValue)

  useEffect(() => {
    if (isLocationHashValid) {
      return
    }

    const modalHash = extractModalHash(locationHash)

    history.replace({
      pathname: history.location.pathname,
      hash: modalHash ?? undefined
    })
  }, [locationHash, history, isLocationHashValid])

  return { onChange: handleTabChange }
}

export default useHashTabs
