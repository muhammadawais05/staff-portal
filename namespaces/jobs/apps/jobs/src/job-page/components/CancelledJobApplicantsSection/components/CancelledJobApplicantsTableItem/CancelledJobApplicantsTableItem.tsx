import React from 'react'
import { Container, Table, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { CancelledJobApplicantFragment } from '../../data/get-cancelled-job-applicants/get-cancelled-job-applicants.staff.gql.types'
import CancelledJobApplicantsTableItemActions from '../CancelledJobApplicantsTableItemActions'
import * as S from './styles'

type Props = {
  cancelledJobApplicant: CancelledJobApplicantFragment
  stripeEven?: boolean
}

const CancelledJobApplicantsTableItem = ({
  cancelledJobApplicant,
  stripeEven
}: Props) => {
  return (
    <Table.Row
      key={cancelledJobApplicant.id}
      data-testid='cancelled-job-applicant-row'
      stripeEven={stripeEven}
    >
      <Table.Cell>
        <Container flex justifyContent='space-between'>
          <Container flex alignItems='flex-start' css={S.minWidth}>
            <LinkWrapper
              wrapWhen={Boolean(cancelledJobApplicant.webResource.url)}
              href={cancelledJobApplicant.webResource.url as string}
            >
              <TypographyOverflow as='span' color='inherit'>
                {cancelledJobApplicant.talent.fullName} on{' '}
                {parseAndFormatDate(cancelledJobApplicant.createdAt)}
              </TypographyOverflow>
            </LinkWrapper>
          </Container>

          <CancelledJobApplicantsTableItemActions
            cancelledJobApplicant={cancelledJobApplicant}
          />
        </Container>
      </Table.Cell>
    </Table.Row>
  )
}

export default CancelledJobApplicantsTableItem
