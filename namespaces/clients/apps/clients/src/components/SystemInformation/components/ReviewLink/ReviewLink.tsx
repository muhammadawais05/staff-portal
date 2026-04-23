import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Link } from '@staff-portal/navigation'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  EditableFieldProps,
  QueryResult,
  EditableField
} from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { SystemInformationFragment } from '../../data'

interface Props {
  reviewLink: SystemInformationFragment['reviewLink']
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operationDisabled: boolean
  useClientReviewLink: () => QueryResult<string>
}

const ReviewLink = ({
  reviewLink,
  handleChange,
  operationDisabled,
  useClientReviewLink
}: Props) => {
  return (
    <EditableField<PatchClientProfileInput>
      disabled={operationDisabled}
      name='reviewLink'
      onChange={handleChange}
      queryValue={useClientReviewLink}
      value={reviewLink || undefined}
      updateOnBlur
      viewer={
        reviewLink ? (
          <TypographyOverflow weight='semibold' size='medium'>
            <Link
              href={reviewLink || ''}
              data-testid='ReviewLink-link'
              target='_blank'
            >
              {reviewLink}
            </Link>
          </TypographyOverflow>
        ) : (
          NO_VALUE
        )
      }
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default ReviewLink
