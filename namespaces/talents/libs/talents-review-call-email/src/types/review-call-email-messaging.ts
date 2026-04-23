import { Maybe } from '@toptal/picasso/utils'

import { EmailMessagingActivationStepFragment } from '../data/email-messaging-fragment/email-messaging-fragment.staff.gql.types'

export type ReviewCallEmailMessaging = Maybe<
  {
    id: string
  } & EmailMessagingActivationStepFragment
>
