import React from 'react'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { CompanyRegion } from '../CompanyRegion'
import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import { SetUpdateClientSecondaryRegionDocument } from '../../../../data/set-update-client-secondary-region.staff.gql.types'
import { useGetCompanySecondaryRegion } from '../../../../data/get-company-secondary-region.staff.gql'
import { adjustSecondaryRegionId } from '../../utils/adjust-values/adjust-secondary-region'

interface Props {
  clientId: CompanyOverviewFragment['id']
  secondaryRegion: CompanyOverviewFragment['secondaryRegion']
  updateClientSecondaryRegion: CompanyOverviewFragment['operations']['updateClientSecondaryRegion']
}

const SecondaryRegion = ({
  clientId,
  updateClientSecondaryRegion,
  secondaryRegion
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientSecondaryRegionDocument,
    initialValues: { secondaryRegionId: secondaryRegion?.id },
    requiredValues: { clientId }
  })
  const queryValue = useGetCompanySecondaryRegion(clientId)

  return (
    <CompanyRegion
      name='secondaryRegionId'
      adjustValues={adjustSecondaryRegionId}
      queryValue={queryValue}
      handleChange={handleChange}
      value={secondaryRegion}
      operation={updateClientSecondaryRegion}
    />
  )
}

export default SecondaryRegion
