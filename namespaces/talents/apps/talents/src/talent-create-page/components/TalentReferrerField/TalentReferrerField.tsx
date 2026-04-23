import React from 'react'
import { useQueryParams, Link } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { GridItemField } from '@staff-portal/ui'
import { SkeletonLoader, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { getTalentProfilePath } from '@staff-portal/routes'

import { REFERRER_ID_FIELD } from '../../config'
import { useGetReferrer } from './data'

const TalentReferrerField = () => {
  const [{ referrer_id: referrerId }] = useQueryParams({
    referrer_id: 'string'
  })

  const encodedReferrerId = encodeEntityId(referrerId, 'Role')

  const { referrer, loading } = useGetReferrer(encodedReferrerId)

  if (!referrerId) {
    return null
  }

  if (loading) {
    return (
      <GridItemField>
        <SkeletonLoader.Typography />
      </GridItemField>
    )
  }

  return (
    <GridItemField>
      <Typography size='small'>
        This developer will be created as{' '}
        <Link
          href={getTalentProfilePath(referrerId)}
          data-testid='talent-create-page-referrer-link'
          target='_blank'
        >
          {referrer?.fullName}
        </Link>{' '}
        referral
      </Typography>

      <Form.Input
        id={REFERRER_ID_FIELD}
        name={REFERRER_ID_FIELD}
        width='full'
        required
        data-lpignore='true'
        type='hidden'
        data-testid='talent-create-page-referrer-field'
      />
    </GridItemField>
  )
}

export default TalentReferrerField
