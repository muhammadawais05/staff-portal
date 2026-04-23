import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'
import { ChangeEngagementCommitmentInput } from '@staff-portal/graphql/staff'

export const adjustValues = (mergedValues: AnyObject) =>
  omit(mergedValues, [
    'canBeDiscounted',
    'defaultDiscount',
    'defaultFullTimeDiscount',
    'defaultMarkup',
    'defaultPartTimeDiscount',
    'defaultUpcharge',
    'discountMultiplier'
  ]) as ChangeEngagementCommitmentInput
