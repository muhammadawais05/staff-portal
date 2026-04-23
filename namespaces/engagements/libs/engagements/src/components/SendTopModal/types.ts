import type { Maybe, Scalars, SendTopInput } from '@staff-portal/graphql/staff'

import { GetSendTopModalDataQuery } from './data/get-send-top-modal-data/get-send-top-modal-data.staff.gql.types'

export type SendTopForm = Omit<
  SendTopInput,
  'engagementId' | 'number' | 'sendToPerformer'
> &
  Pick<
    NonNullable<GetSendTopModalDataQuery['node']>,
    | 'nextTopEffectiveDate'
    | 'trialLength'
    | 'trialEndDate'
    | 'companyHourlyRate'
    | 'companyPartTimeRate'
    | 'companyFullTimeRate'
  > & {
    number: string
    sendToPerformer?: 'true' | 'false'
    clientName?: string | null
    talentStartDate?: Maybe<Scalars['Date']>
  }
