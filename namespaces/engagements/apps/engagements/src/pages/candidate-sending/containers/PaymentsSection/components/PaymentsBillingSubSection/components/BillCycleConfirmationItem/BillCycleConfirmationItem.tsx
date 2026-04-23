import React from 'react'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { getRoleTypeText } from '@staff-portal/facilities'
import { Container } from '@toptal/picasso'

import * as S from '../../../../../../styles'

type Props = {
  talentProfileLink?: {
    url?: string | null
    text: string
  } | null
  isMonthlyCycle?: boolean
  talentType: string
}

const BillCycleConfirmationItem = ({
  talentProfileLink,
  isMonthlyCycle,
  talentType
}: Props) => {
  if (!talentProfileLink || !isMonthlyCycle) {
    return null
  }
  const roleTypeText = getRoleTypeText(talentType).toLowerCase()

  return (
    <>
      <DL.Row>
        <DL.Item
          multilines
          label={
            <>
              {'Did you inform '}
              <LinkWrapper
                wrapWhen={Boolean(talentProfileLink.url)}
                href={talentProfileLink?.url as string}
              >
                {talentProfileLink.text}
              </LinkWrapper>
              {' of the semi-monthly payment requirement?'}
            </>
          }
        >
          <Container css={S.formFieldWidth}>
            <Form.Checkbox
              required
              name='billCycleConfirmed'
              label={`Yes, I have informed ${roleTypeText} of the semi-monthly payment requirement.`}
              titleCase={false}
            />
          </Container>
        </DL.Item>
      </DL.Row>
    </>
  )
}

export default BillCycleConfirmationItem
