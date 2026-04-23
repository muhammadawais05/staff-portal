import React, { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionProps, Section, Button, Plus16 } from '@toptal/picasso'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import ConsolidationDefaultsTable from '../../../consolidationDefaults/components/ConsolidationDefaultsTable'

const displayName = 'ConsolidationDefaultsPage'

interface Props {
  showTitle?: boolean
  clientId: string
  sectionVariant?: SectionProps['variant']
}

const ConsolidationDefaultsPage: FC<Props> = memo(
  ({ showTitle = false, clientId, sectionVariant }) => {
    const { t: translate } = useTranslation('billingDetails')
    const [showExpired, setShowExpired] = useState(false)
    const toggleExpired = () => setShowExpired(previousValue => !previousValue)

    const loading = false
    const initialLoading = false
    const title = showTitle ? translate('consolidationDefaults.title') : ''

    const { handleOnOpenModal } = useModals()
    const openConsolidationDefaultsCreate = () =>
      handleOnOpenModal(ModalKey.consolidationDefaultsCreate, {
        clientId
      })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<TableSkeleton title={title} row={10} column={4} />}
      >
        <Section
          data-testid={displayName}
          title={title}
          variant={sectionVariant}
          actions={
            <>
              <Button
                data-testid='consolidation-defaults-add'
                icon={<Plus16 />}
                onClick={openConsolidationDefaultsCreate}
                size='small'
              >
                {translate('consolidationDefaults.actions.create')}
              </Button>
              <Button
                data-testid='consolidation-defaults-filter'
                onClick={toggleExpired}
                variant={showExpired ? 'primary' : 'secondary'}
                size='small'
              >
                {translate('consolidationDefaults.actions.showExpired')}
              </Button>
            </>
          }
        >
          <ConsolidationDefaultsTable
            clientId={clientId}
            showExpired={showExpired}
          />
        </Section>
      </ContentLoader>
    )
  }
)

ConsolidationDefaultsPage.displayName = displayName

export default ConsolidationDefaultsPage
