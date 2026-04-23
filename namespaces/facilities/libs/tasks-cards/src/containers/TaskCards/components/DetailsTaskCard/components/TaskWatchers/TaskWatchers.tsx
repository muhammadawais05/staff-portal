import React, { useMemo, useCallback } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { AutocompleteHighlightOption, useTagSelector } from '@staff-portal/ui'

import { TaskWatcherAutocompleteEdgeFragment } from './data/get-task-watchers-autocomplete'
import {
  useAddTaskWatcher,
  useRemoveTaskWatcher,
  readTaskWatchersFromCache,
  writeTaskWatchersToCache,
  useGetTaskWatchers,
  useGetTaskWatchersAutocomplete
} from './data'
import TaskTagSelector from '../TaskTagSelector'
import TaskWatcherLabel from '../TaskWatcherLabel'
import { getItemId, getItemKey, getItemLabel } from '../../utils'

export interface Props {
  taskId: string
  performerId: string
}

const renderWatcherOption = (item: Item) => {
  const { label, labelHighlight } = item as TaskWatcherAutocompleteEdgeFragment

  return (
    <AutocompleteHighlightOption
      labelHighlight={labelHighlight}
      label={label}
    />
  )
}

const TaskWatchers = ({ taskId, performerId }: Props) => {
  const { data: watchers, loading: existingWatchersLoading } =
    useGetTaskWatchers(taskId)
  const existingWatchers = useMemo<
    TaskWatcherAutocompleteEdgeFragment[] | undefined
  >(
    () =>
      watchers?.map(watcher => ({
        key: watcher.id,
        node: watcher,
        label: watcher.fullName
      })),
    [watchers]
  )

  const {
    data: availableWatchers,
    loading: availableWatchersLoading,
    getWatchers
  } = useGetTaskWatchersAutocomplete()
  const loading = existingWatchersLoading || availableWatchersLoading
  const getOptions = useCallback(
    (term: string) =>
      getWatchers({
        term,
        excludedIds: existingWatchers
          ?.map(({ node }) => node?.id ?? '')
          .filter(Boolean)
      }),
    [getWatchers, existingWatchers]
  )

  const selectorProps = useTagSelector({
    options: availableWatchers,
    loading,
    getOptions
  })

  const { showError } = useNotifications()
  const [addTaskWatcher] = useAddTaskWatcher({
    onCompleted: data => {
      if (!data?.addTaskWatcher?.success && data?.addTaskWatcher?.errors) {
        showError(concatMutationErrors(data?.addTaskWatcher?.errors))
      }
    },
    onError: () => showError('An error occurred, the watcher was not added.')
  })
  const [removeTaskWatcher] = useRemoveTaskWatcher({
    onCompleted: data => {
      if (!data?.removeTaskWatcher?.success) {
        showError(
          data?.removeTaskWatcher?.errors
            .map(({ message }) => message)
            .join(', ')
        )
      }
    },
    onError: () => showError('An error occurred, the watcher was not removed.')
  })

  const handleOnSelect = (watcher: Item) => {
    const { node: newWatcher } = watcher as TaskWatcherAutocompleteEdgeFragment

    addTaskWatcher({
      variables: {
        taskId,
        watcherId: newWatcher?.id ?? ''
      },
      update: (cacheProxy, { data: response }) => {
        if (!response?.addTaskWatcher?.success) {
          return
        }

        const data = readTaskWatchersFromCache(cacheProxy, taskId)

        if (data?.node && newWatcher) {
          writeTaskWatchersToCache(cacheProxy, taskId, {
            ...data,
            node: {
              ...data.node,
              watchers: {
                ...data.node.watchers,
                nodes: [...data.node.watchers.nodes, { ...newWatcher }]
              }
            }
          })
        }
      }
    })
  }
  const handleOnDelete = (watcher: Item) => {
    const watcherId = getItemId(watcher)

    if (!watcherId) {
      return
    }

    removeTaskWatcher({
      variables: {
        taskId,
        watcherId
      },
      update: (cacheProxy, { data: response }) => {
        if (!response?.removeTaskWatcher?.success) {
          return
        }

        const data = readTaskWatchersFromCache(cacheProxy, taskId)

        if (data?.node) {
          writeTaskWatchersToCache(cacheProxy, taskId, {
            ...data,
            node: {
              ...data.node,
              watchers: {
                ...data.node.watchers,
                nodes: data.node.watchers.nodes.filter(
                  ({ id }) => id !== watcherId
                )
              }
            }
          })
        }
      }
    })
  }

  return (
    <Form.Field data-testid='task-watchers'>
      <Form.Label>Watchers</Form.Label>
      <TaskTagSelector
        {...selectorProps}
        value={existingWatchers}
        getKey={getItemKey}
        getDisplayValue={getItemLabel}
        renderOption={renderWatcherOption}
        onDelete={handleOnDelete}
        onSelect={handleOnSelect}
        renderLabel={({ item, ...restProps }) => {
          const autocompleteItem = item as TaskWatcherAutocompleteEdgeFragment

          return (
            autocompleteItem.node && (
              <TaskWatcherLabel
                performerId={performerId}
                watcher={autocompleteItem.node}
                {...restProps}
              />
            )
          )
        }}
      />
    </Form.Field>
  )
}

export default TaskWatchers
