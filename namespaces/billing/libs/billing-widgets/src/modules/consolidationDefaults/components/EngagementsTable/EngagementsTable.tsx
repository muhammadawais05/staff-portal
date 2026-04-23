import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import { GetConsolidationDefaultsQuery } from '../../data/getConsolidationDefaults.graphql.types'
import EngagementsTableHeader from '../EngagementsTableHeader'
import EngagementsTableRow from '../EngagementsTableRow'
import ListTable from '../../../commercialDocument/components/ListTable'
import { mapEngagementListFields } from '../../modals/ConsolidationDefault/utils'

const displayName = 'EngagementsTable'

export type Engagements = Exclude<
  GetConsolidationDefaultsQuery['node'],
  undefined | null
>['consolidationDefaults']['nodes'][0]['engagements']['nodes']

export type Engagement = Engagements[number]

interface Props {
  engagements: Engagements
  isSelectable?: true
  consolidationDefaultId?: string
}

export const EngagementsTable: FC<Props> = memo(
  ({ engagements, isSelectable, consolidationDefaultId }) => {
    const { t: translate } = useTranslation('billingDetails')
    const engagementsWithEffectivePO = engagements.map(mapEngagementListFields)

    return (
      <ListTable
        fixedHeight={isSelectable ? '200px' : undefined}
        top={0}
        bottom={0}
        loading={false}
        initialLoading={false}
        emptyMessage={translate('consolidationDefaults.list.selectableEmpty')}
        header={<EngagementsTableHeader isSelectable={isSelectable} />}
        body={
          engagements.length !== 0 && (
            <Table.Body>
              {engagementsWithEffectivePO.map((engagement, index) => (
                <EngagementsTableRow
                  key={engagement.id}
                  engagement={engagement}
                  isEven={Boolean(index % 2)}
                  isSelectable={isSelectable}
                  parentConsolidationDefaultId={consolidationDefaultId}
                />
              ))}
            </Table.Body>
          )
        }
      />
    )
  }
)

EngagementsTable.displayName = displayName

export default EngagementsTable
