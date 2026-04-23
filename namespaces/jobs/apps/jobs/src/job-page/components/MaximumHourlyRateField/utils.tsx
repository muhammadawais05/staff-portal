import React from 'react'
import { Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

export const getUncertainOfBudgetTooltip = (
  uncertainOfBudgetReason?: Maybe<string>,
  uncertainOfBudgetReasonComment?: Maybe<string>
) => (
  <>
    Reason:{' '}
    <Typography as='span' weight='semibold'>
      {uncertainOfBudgetReason || NO_VALUE}
    </Typography>
    {uncertainOfBudgetReasonComment && (
      <>
        <br />
        Comment:{' '}
        <Typography as='span' weight='semibold'>
          {uncertainOfBudgetReasonComment}
        </Typography>
      </>
    )}
  </>
)
