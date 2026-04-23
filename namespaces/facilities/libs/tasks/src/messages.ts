import { defineMessage } from '@toptal/staff-portal-message-bus'

export const TASK_UPDATED = defineMessage<{ taskId: string }>('task-updated')
export const REFETCH_TASKS = defineMessage()
export const CLOSE_EXPANDED_TASK = defineMessage()
