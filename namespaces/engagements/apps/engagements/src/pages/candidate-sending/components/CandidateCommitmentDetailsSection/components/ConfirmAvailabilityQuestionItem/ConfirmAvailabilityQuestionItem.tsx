import React from 'react'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

export type Props = {
  talentFullName: string
  talentRoleType: string
  talentProfileLink?: Maybe<string>
}

const ConfirmAvailabilityQuestionItem = ({
  talentFullName,
  talentProfileLink,
  talentRoleType
}: Props) => {
  return (
    <DetailedList.Row>
      <DetailedList.Item
        multilines
        label={
          <>
            {'Did you confirm availability for this job with '}
            <LinkWrapper
              wrapWhen={Boolean(talentProfileLink)}
              href={talentProfileLink as string}
            >
              {talentFullName}
            </LinkWrapper>
            {' before sending them to the client?'}
          </>
        }
      >
        <Form.Checkbox
          required
          name='availabilityConfirmed'
          label={`Yes, ${talentRoleType.toLowerCase()}'s availability has been confirmed for this job.`}
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default ConfirmAvailabilityQuestionItem
