import { ClientCumulativeStatus, Maybe } from '@staff-portal/graphql/staff'

export const getIsCommentsSectionCollapsedByDefault = (
  cumulativeStatus?: Maybe<ClientCumulativeStatus>
) =>
  !!cumulativeStatus &&
  ![
    ClientCumulativeStatus.APPLIED,
    ClientCumulativeStatus.BAD_LEAD,
    ClientCumulativeStatus.SOURCED
  ].includes(cumulativeStatus)
