import { camelCase } from 'lodash-es'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import i18n from './i18n'
import { EnumKeysToCamelCase } from '../@types/types'

export const getCommitmentOptions = (
  commitmentOptions?: EngagementCommitmentEnum[]
) =>
  (commitmentOptions || Object.keys(EngagementCommitmentEnum)).map(
    commitmentOption => ({
      text: i18n.t(
        `options:commitment.${
          camelCase(commitmentOption) as EnumKeysToCamelCase<
            typeof EngagementCommitmentEnum
          >
        }` as const
      ),
      value:
        EngagementCommitmentEnum[
          commitmentOption as keyof typeof EngagementCommitmentEnum
        ]
    })
  )
