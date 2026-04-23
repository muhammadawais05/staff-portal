import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getCompanyExternalSourceCompanyHqPhone } from '../../../../../../components/CompanyExternalSourceInfo/utils'
import { CompanyOverviewFragment } from '../../../data/company-overview-fragment.staff.gql.types'
import { SetPatchClientAccountOverviewDocument } from '../../../data/set-patch-client-account-overview.staff.gql.types'

export const usePatchClientChangeHandler = (
  company: CompanyOverviewFragment
) => {
  const { id: clientId, contact, timeZone, email, website } = company

  return useEditableFieldChangeHandler({
    mutationDocument: SetPatchClientAccountOverviewDocument,
    initialValues: {
      contactName: contact?.fullName ?? '',
      timeZoneName: timeZone?.value,
      website: website ?? '',
      companyHqPhone: getCompanyExternalSourceCompanyHqPhone(company),
      email
    },
    requiredValues: { clientId }
  })
}
