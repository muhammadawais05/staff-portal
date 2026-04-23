import { ColorType } from '@toptal/picasso'

import { TaskStatus } from '../../enums'

export const getTaskStatusColor = (status: string): ColorType => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'yellow'
    case TaskStatus.FINISHED:
      return 'green'
  }

  return 'inherit'
}
