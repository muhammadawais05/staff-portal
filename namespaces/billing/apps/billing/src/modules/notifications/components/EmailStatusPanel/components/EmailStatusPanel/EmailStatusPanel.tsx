import React, { FC, memo } from 'react'
import { Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useGetNotification } from '../../data'
import EmailStatusPanelContent from '../EmailStatusPanelContent'
import EmailStatusPanelHeader from '../EmailStatusPanelHeader'

const displayName = 'EmailStatusPanel'

interface Props {
  nodeId: string
}

const EmailStatusPanel: FC<Props> = memo(({ nodeId }) => {
  const { data, loading, initialLoading } = useGetNotification(nodeId)
  const { t: translate } = useTranslation('emailStatus')

  return (
    <Section data-testid={displayName} title={translate('title')}>
      <ContentLoader
        showSkeleton={initialLoading}
        skeletonComponent={
          <TableSkeleton column={3}>
            <EmailStatusPanelHeader />
          </TableSkeleton>
        }
        loading={loading}
      >
        {data && (
          <EmailStatusPanelContent
            data={data}
            nodeType={decodeRawIdAndType(nodeId)?.type as 'invoice' | 'payment'}
          />
        )}
      </ContentLoader>
    </Section>
  )
})

EmailStatusPanel.displayName = displayName

export default EmailStatusPanel
