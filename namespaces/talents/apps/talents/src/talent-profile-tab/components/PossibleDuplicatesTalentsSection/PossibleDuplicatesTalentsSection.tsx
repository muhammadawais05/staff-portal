import React, { Fragment } from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'
import { PossibleDuplicatesSection } from '@staff-portal/facilities'

import {
  useMarkTalentPossibleDuplicatesResolved,
  useGetPossibleDuplicates
} from './hooks'

export interface Props {
  talentId: string
}

const PossibleDuplicatesTalentsSection = ({ talentId }: Props) => {
  const { loading, data } = useGetPossibleDuplicates({
    talentId
  })
  const { resolvePossibleDuplicates, loading: submitting } =
    useMarkTalentPossibleDuplicatesResolved(talentId)

  const possibleDuplicates = data?.unresolvedPossibleDuplicates?.nodes

  return (
    <PossibleDuplicatesSection
      loading={submitting}
      hidden={loading || !possibleDuplicates?.length}
      operation={data?.operations.markTalentPossibleRoleDuplicatesResolved}
      resolvePossibleDuplicates={resolvePossibleDuplicates}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'markTalentPossibleRoleDuplicatesResolved'
      }}
    >
      <Typography size='medium'>
        {possibleDuplicates?.map(({ id, fullName }, index) => (
          <Fragment key={id}>
            <Link href={getTalentProfilePath(decodeEntityId(id).id)}>
              {fullName}
            </Link>
            {index < possibleDuplicates?.length - 1 && ', '}
          </Fragment>
        ))}
      </Typography>
    </PossibleDuplicatesSection>
  )
}

export default PossibleDuplicatesTalentsSection
