import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { NO_VALUE } from '@staff-portal/config'
import { TalentProfileOperationsFragment } from '@staff-portal/talents'

import { TalentProfileGeneralDataFragment } from '../TalentGeneralSection/data/get-talent-profile-general-data'
import ChangeReferrerButton from './components/ChangeReferrerButton'

const getReferrerUrl = (
  referrer?: TalentProfileGeneralDataFragment['referrer']
) => {
  if (
    !referrer?.webResource ||
    !('id' in referrer) ||
    !('__typename' in referrer)
  ) {
    return null
  }

  return referrer.__typename === 'Talent'
    ? getTalentProfilePath(decodeEntityId(referrer.id).id)
    : referrer.webResource.url
}

export type Props = Pick<
  TalentProfileGeneralDataFragment,
  'id' | 'referrer' | 'canIssueSourcingCommission'
> & {
  changeRoleReferrerOperation: TalentProfileOperationsFragment['changeRoleReferrer']
}

const ReferrerField = ({
  id,
  referrer,
  canIssueSourcingCommission,
  changeRoleReferrerOperation
}: Props) => {
  const referrerUrl = getReferrerUrl(referrer)
  const referrerText = referrer?.webResource.text

  const fieldValue = (
    <Container flex justifyContent='space-between'>
      <Typography size='medium'>
        {referrerUrl ? (
          <Link href={referrerUrl}>{referrerText}</Link>
        ) : (
          referrerText || NO_VALUE
        )}
      </Typography>
      <ChangeReferrerButton
        operation={changeRoleReferrerOperation}
        roleId={id}
        roleHasReferrer={!!referrer}
        canIssueSourcingCommission={canIssueSourcingCommission}
      />
    </Container>
  )

  return fieldValue
}

export default ReferrerField
