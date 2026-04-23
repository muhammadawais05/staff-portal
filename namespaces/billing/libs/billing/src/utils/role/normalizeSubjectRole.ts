import { startCase } from 'lodash-es'
import { Maybe } from '@staff-portal/graphql/staff'

import { RoleTypeFragment } from '../../__fragments__/roleTypeFragment.graphql.types'

export const normalizeSubjectRole = (subject?: object | null) =>
  startCase(
    (subject as Maybe<Partial<RoleTypeFragment>>)?.roleType ?? 'Company'
  )
