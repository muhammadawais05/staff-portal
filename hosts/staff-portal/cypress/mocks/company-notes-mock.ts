import { HowDidYouHearValues } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { GetCompanyNotesQuery } from '@staff-portal/clients-app'

import { WithTypename } from '~integration/types'
import { enabledOperationMock } from './enabled-operation-mock'
import { clientNodeMock } from './fragments'

export const companyNotesMock = (
  data?: Partial<GetCompanyNotesQuery['node']>
): WithTypename<GetCompanyNotesQuery['node']> => ({
  id: encodeEntityId('234', 'Client'),
  howDidYouHear: HowDidYouHearValues.A_TOPTAL_EMPLOYEE,
  howDidYouHearDetails: 'husband is working with us, a UX designer',
  logSalesCallWillChangeClaimer: false,
  engagements: {
    totalCount: 3
  },
  operations: {
    ...clientNodeMock().node().operations,
    createGeneralInformationClientNote: enabledOperationMock(),
    logClientSalesCall: enabledOperationMock(),
    checkClientCompliance: enabledOperationMock(),
    createActivity: enabledOperationMock()
  },
  activitiesAndNotes: {
    totalCount: 0,
    nodes: []
  },
  __typename: 'Client',
  ...data
})
