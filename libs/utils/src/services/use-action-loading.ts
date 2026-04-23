import { Dispatch, SetStateAction, useState, useEffect } from 'react'

const getSetterGroup = (store: ActionLoadingStore, identifier: string) => {
  return store.setterGroups.find(
    setterGroup => setterGroup.identifier === identifier
  )
}

interface SetterGroup {
  identifier: string
  setters: Dispatch<SetStateAction<boolean>>[]
}

class ActionLoadingStore {
  private static instance: ActionLoadingStore

  public actionsLoading: boolean
  public setterGroups: SetterGroup[]

  private constructor() {
    this.actionsLoading = false
    this.setterGroups = []
  }

  public static getInstance() {
    if (!ActionLoadingStore.instance) {
      ActionLoadingStore.instance = new ActionLoadingStore()
    }

    return ActionLoadingStore.instance
  }

  public setActionsLoading(identifier: string, value: boolean) {
    this.actionsLoading = value

    const setterGroup = this.setterGroups.find(
      setter => setter.identifier === identifier
    )

    setterGroup?.setters.forEach(setter => setter(this.actionsLoading))
  }
}

export const useActionLoading = (identifier = '', loading = false) => {
  const store = ActionLoadingStore.getInstance()
  const [actionsLoading, setActionsLoading] = useState<boolean>(
    store.actionsLoading
  )

  const setterGroup = getSetterGroup(store, identifier)

  if (setterGroup) {
    if (!setterGroup.setters.includes(setActionsLoading)) {
      setterGroup.setters = [...setterGroup.setters, setActionsLoading]
    }
  } else {
    store.setterGroups = [
      ...store.setterGroups,
      { identifier, setters: [setActionsLoading] }
    ]
  }

  useEffect(() => {
    store.setActionsLoading(identifier, loading)

    return () => {
      store.setActionsLoading(identifier, false)
    }
  }, [identifier, loading, store])

  useEffect(() => {
    return () => {
      const unMountedSetterGroup = getSetterGroup(store, identifier)

      if (!unMountedSetterGroup) {
        return
      }

      unMountedSetterGroup.setters = unMountedSetterGroup.setters.filter(
        setter => setter !== setActionsLoading
      )

      if (unMountedSetterGroup.setters.length === 0) {
        store.setterGroups = store.setterGroups.filter(
          group => group.identifier !== identifier
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { actionsLoading }
}
