import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import {
  BaseAppProps,
  TaskCardConfig
} from '@staff-portal/billing/src/@types/types'
import { TimelineButton } from '@staff-portal/tasks'
import { useBillingBaseProps } from '@staff-portal/billing'

import InvoiceTaskCard from '../../modules/invoice/components/InvoiceTaskCard/components/InvoiceTaskCard'

export interface Props {
  baseAppProps?: BaseAppProps
  taskCardConfig: TaskCardConfig
  /**
   * @deprecated
   */
  task: {
    id: string
    description: string
    status: string
    playbookTemplate?: {
      identifier: string
    } | null
  }
}

const WidgetStaffInvoiceTaskCard: FC<Props> = memo<Props>(
  ({ taskCardConfig, task, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <InvoiceTaskCard
          taskCardConfig={taskCardConfig}
          task={task}
          TimelineButton={TimelineButton}
        />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffInvoiceTaskCard.displayName = 'WidgetStaffInvoiceTaskCard'

export default WidgetStaffInvoiceTaskCard
