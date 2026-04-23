import React from 'react'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { CompanyRegion } from '../CompanyRegion'
import { SetUpdateClientPrimaryRegionDocument } from '../../../../data/set-update-client-primary-region.staff.gql.types'
import { useGetCompanyPrimaryRegion } from '../../../../data/get-company-primary-region.staff.gql'
import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import { adjustPrimaryRegionId } from '../../utils/adjust-values/adjust-primary-region'

interface Props {
  clientId: CompanyOverviewFragment['id']
  primaryRegion: CompanyOverviewFragment['primaryRegion']
  updateClientPrimaryRegion: CompanyOverviewFragment['operations']['updateClientPrimaryRegion']
}

const PrimaryRegion = ({
  clientId,
  updateClientPrimaryRegion,
  primaryRegion
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientPrimaryRegionDocument,
    initialValues: { primaryRegionId: primaryRegion?.id },
    requiredValues: { clientId }
  })
  const queryValue = useGetCompanyPrimaryRegion(clientId)

  return (
    <CompanyRegion
      name='primaryRegionId'
      adjustValues={adjustPrimaryRegionId}
      queryValue={queryValue}
      handleChange={handleChange}
      value={primaryRegion}
      operation={updateClientPrimaryRegion}
    />
  )
}

export default PrimaryRegion
