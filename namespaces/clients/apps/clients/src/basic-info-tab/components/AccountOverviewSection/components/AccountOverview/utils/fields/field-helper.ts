import { ReactNode } from 'react'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableFieldProps } from '@staff-portal/editable'

import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'

export type FieldHelper =
  | ((props: {
      company: CompanyOverviewFragment
      onChange: EditableFieldProps<PatchClientProfileInput>['onChange']
    }) => [string, ReactNode])
  | false
