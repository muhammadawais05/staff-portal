import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import MemorandumList from '../../modules/memorandum/pages/MemorandumList'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffMemorandumListPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  return (
    <App {...baseProps} {...baseAppProps}>
      <ScrollToTop />
      <MemorandumList />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

WidgetStaffMemorandumListPage.displayName = 'WidgetStaffMemorandumListPage'

export default WidgetStaffMemorandumListPage
