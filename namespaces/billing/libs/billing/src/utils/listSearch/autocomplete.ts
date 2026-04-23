import { decodeRawIdAndType } from '../../_lib/helpers/apollo'
import {
  QueryAutocompleteClientFragment,
  QueryAutocompleteEdgeFragment
} from '../../data'

export type AutocompleteOption = {
  id: string
  label: string
}

export const fromOption = ({ label, node }: QueryAutocompleteEdgeFragment) => {
  const companyLegacyId = (node as QueryAutocompleteClientFragment)
    .companyLegacyId

  return {
    // TODO: remove `companyLegacyId`
    //   `Client` entities should use Company id instead of Client id
    //    @see https://toptal-core.atlassian.net/browse/SPB-1290
    //   Actually, `companyLegacyId` is deprecated, but invoices\payments filtration
    //   doesn't work properly in case of client id usage and we still need to use company id instead
    companyLegacyId,
    id: node?.id ?? '',
    label: label || ''
  }
}

export const getBadgeLabel = ({ label }: { label: string }) => label || ''

export const toQueryParam = ({
  id,
  companyLegacyId
}: AutocompleteOption & { companyLegacyId?: string }) =>
  // TODO: remove `companyLegacyId`
  //   `Client` entities should use Company id instead of Client id
  //    @see https://toptal-core.atlassian.net/browse/SPB-1290
  //   Actually, `companyLegacyId` is deprecated, but invoices\payments filtration
  //   doesn't work properly in case of client id usage and we still need to use company id instead
  //   ----
  //   that's just a workaround to support legacy urls
  companyLegacyId || decodeRawIdAndType(id).id
