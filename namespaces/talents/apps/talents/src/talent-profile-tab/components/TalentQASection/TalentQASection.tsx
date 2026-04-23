import React, { memo } from 'react'
import { Container, Typography, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { TalentStatusV2 } from '@staff-portal/graphql/staff'

import * as S from './styles'
import { useGetTalentQA } from './data/get-talent-qa.staff.gql'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentQASection = ({ talentId, sectionVariant = 'default' }: Props) => {
  const { showError } = useNotifications()

  const { loading, data, status, refetch } = useGetTalentQA(talentId, {
    onError: () => {
      showError('Unable to fetch questions and answers.')
    }
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  if (loading) {
    return <SkeletonLoader.Typography />
  }

  const shouldCollapseSection =
    !!status &&
    ![TalentStatusV2.APPLIED, TalentStatusV2.PENDING_PROFILE].includes(status)

  return data?.length ? (
    <Section
      title='Q&amp;A'
      collapsible
      variant={sectionVariant}
      data-testid='talent-qa-section'
      defaultCollapsed={shouldCollapseSection}
    >
      {/** Note: Duplicates some logic in QuestionAndAnswersModal. May be a good idea to extract to a common place? */}
      {data.map(({ questionLabel, readableValue }) => (
        <Container key={questionLabel} css={S.quizItem}>
          <Container bottom='xsmall'>
            <Typography color='dark-grey' size='xsmall'>
              {questionLabel}
            </Typography>
          </Container>
          {readableValue.map((value, index) => (
            <Typography
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {value}
            </Typography>
          ))}
        </Container>
      ))}
    </Section>
  ) : null
}

export default memo(TalentQASection)
