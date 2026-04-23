import { Maybe } from '@toptal/picasso/utils'
import { getClientProfilePath } from '@staff-portal/routes'
import { getPhoneNumbersForTopCall } from '@staff-portal/contacts'
import { encodeGid } from '@staff-portal/data-layer-service'

import { ClientMetadataFragment } from '../../data/get-client'

export const collectDataForTopCall = (
  clientLegacyId: string,
  client: Maybe<ClientMetadataFragment>
) => ({
  company: client && {
    id: client.companyLegacyId,
    gid: encodeGid('Client', clientLegacyId),
    name: client.fullName,
    contact_name: client.contact?.fullName,
    phone_numbers: getPhoneNumbersForTopCall(client.contact?.contacts.nodes),
    purpose_heuristic_data: {
      pending_playbook_template_ids:
        client.topcallPurposeHeuristicData?.pendingPlaybookTemplates.nodes.map(
          ({ id }) => id
        ),
      probably_initial_sales_call:
        client.topcallPurposeHeuristicData?.probablyInitialSalesCall
    },
    profile_url: getClientProfilePath(clientLegacyId)
  }
})
