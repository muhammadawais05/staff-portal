import React, { useMemo, useCallback } from 'react'
import { Form } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { AutocompleteHighlightOption, useTagSelector } from '@staff-portal/ui'
import {
  useGetTaskTagsAutocomplete,
  TaskTagEdgeFragment
} from '@staff-portal/tasks'

import {
  useAddTaskTag,
  useRemoveTaskTag,
  readTaskTagsFromCache,
  writeTaskTagsToCache,
  useGetTaskTags
} from './data'
import {
  getItemId,
  getItemKey,
  getItemLabel,
  prepareTaskTags
} from '../../utils'
import TaskTagSelector from '../TaskTagSelector'

export interface Props {
  taskId: string
}

const renderTagOption = (item: Item) => {
  const { label, labelHighlight } = item as TaskTagEdgeFragment

  return (
    <AutocompleteHighlightOption
      labelHighlight={labelHighlight}
      label={label}
    />
  )
}

const TaskTags = ({ taskId }: Props) => {
  const { data: tags, loading } = useGetTaskTags(taskId)
  const existingTags = useMemo<TaskTagEdgeFragment[] | undefined>(
    () => prepareTaskTags(tags),
    [tags]
  )

  const {
    getTaskTags,
    loading: getTagsLoading,
    data: availableTaskTags
  } = useGetTaskTagsAutocomplete()

  const getTags = useCallback(
    (inputValue: string) =>
      getTaskTags(
        inputValue,
        existingTags?.map(({ node }) => node?.id ?? '').filter(Boolean)
      ),
    [getTaskTags, existingTags]
  )

  const selectorProps = useTagSelector({
    options: availableTaskTags,
    loading: loading || getTagsLoading,
    getOptions: getTags
  })

  const { showError } = useNotifications()
  const [addTaskTag] = useAddTaskTag({
    onCompleted: data => {
      if (!data?.addTaskTag?.success && data?.addTaskTag?.errors) {
        showError(concatMutationErrors(data?.addTaskTag?.errors))
      }
    },
    onError: () => showError('An error occurred, the tag was not added.')
  })
  const [removeTaskTag] = useRemoveTaskTag({
    onCompleted: data => {
      if (!data?.removeTaskTag?.success && data?.removeTaskTag?.errors) {
        showError(concatMutationErrors(data?.removeTaskTag?.errors))
      }
    },
    onError: () => showError('An error occurred, the tag was not removed.')
  })

  const handleTaskTagSelect = (item: Item) => {
    const { node: newTag } = item as TaskTagEdgeFragment

    addTaskTag({
      variables: {
        taskId,
        tagId: newTag?.id ?? ''
      },
      update: (cacheProxy, { data: response }) => {
        if (!response?.addTaskTag?.success) {
          return
        }

        const data = readTaskTagsFromCache(cacheProxy, taskId)

        if (data?.node && newTag) {
          writeTaskTagsToCache(cacheProxy, taskId, {
            ...data,
            node: {
              ...data.node,
              tags: {
                ...data.node.tags,
                nodes: [...data.node.tags.nodes, { ...newTag }]
              }
            }
          })
        }
      }
    })
  }
  const handleRemoveTaskTag = (item: Item) => {
    const tagId = getItemId(item)

    if (!tagId) {
      return
    }

    removeTaskTag({
      variables: {
        taskId,
        tagId
      },
      update: (cacheProxy, { data: response }) => {
        if (!response?.removeTaskTag?.success) {
          return
        }

        const data = readTaskTagsFromCache(cacheProxy, taskId)

        if (data?.node) {
          writeTaskTagsToCache(cacheProxy, taskId, {
            ...data,
            node: {
              ...data.node,
              tags: {
                ...data.node.tags,
                nodes: data.node.tags.nodes.filter(({ id }) => id !== tagId)
              }
            }
          })
        }
      }
    })
  }

  return (
    <Form.Field data-testid='task-tags'>
      <Form.Label>Tags</Form.Label>
      <TaskTagSelector
        {...selectorProps}
        value={existingTags}
        getKey={getItemKey}
        getDisplayValue={getItemLabel}
        renderOption={renderTagOption}
        onSelect={handleTaskTagSelect}
        onDelete={handleRemoveTaskTag}
      />
    </Form.Field>
  )
}

export default TaskTags
