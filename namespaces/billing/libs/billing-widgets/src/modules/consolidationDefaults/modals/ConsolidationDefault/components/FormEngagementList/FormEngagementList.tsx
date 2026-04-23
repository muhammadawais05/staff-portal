import { Form } from '@toptal/picasso'
import React, { useMemo, useState } from 'react'
import { useFormState } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'

import EngagementsTable from '../../../../components/EngagementsTable'
import { Engagements } from '../../../../components/EngagementsTable/EngagementsTable'
import {
  mapEngagementListFields as engagementListFields,
  filterByClientsOrIds as byClientsOrIds,
  filterNonWorkingForOtherCDs as byWorkingStatus,
  sortByField as byField,
  SortField
} from '../../utils'
import Sorter from '../Sorter/Sorter'

const displayName = 'FormEngagementList'

interface Props {
  engagements: Engagements
  selectedClientIds: string[]
}

const FormEngagementList = ({ engagements, selectedClientIds }: Props) => {
  const { t: translate } = useTranslation('billingDetails')
  const {
    values: {
      engagementIds: selectedEngagementIds = [],
      consolidationDefaultId
    } = {}
  } = useFormState()

  const sortFields: SortField[] = [
    {
      name: 'startDate',
      label: translate(
        'modals.consolidationDefault.fields.engagements.sortOrder.startDate'
      ),
      dataType: 'date'
    },
    {
      name: 'talent.fullName',
      label: translate(
        'modals.consolidationDefault.fields.engagements.sortOrder.talent'
      ),
      dataType: 'string'
    },
    {
      name: 'effectivePurchaseOrder.poLineNumber',
      label: translate(
        'modals.consolidationDefault.fields.engagements.sortOrder.poNumber'
      ),
      dataType: 'number',
      emptyLast: true
    }
  ]
  const [sortField, setSortField] = useState<SortField>(sortFields[0])

  const handleSortChange = (value: SortField) => setSortField(value)

  const listedEngagements = useMemo(() => {
    return engagements
      .map(engagementListFields)
      .filter(byClientsOrIds(selectedEngagementIds, selectedClientIds))
      .filter(byWorkingStatus(consolidationDefaultId))
      .sort(byField(sortField))
  }, [
    engagements,
    selectedClientIds,
    selectedEngagementIds,
    sortField,
    consolidationDefaultId
  ])

  return (
    <Form.Field>
      <Form.Label>
        {translate('modals.consolidationDefault.fields.engagements.label')}
      </Form.Label>
      <Sorter
        onValueChange={handleSortChange}
        sortFields={sortFields}
        initialValue={sortField.name}
      />
      <EngagementsTable
        engagements={listedEngagements}
        isSelectable
        consolidationDefaultId={consolidationDefaultId}
      />
    </Form.Field>
  )
}

FormEngagementList.displayName = displayName

export default FormEngagementList
