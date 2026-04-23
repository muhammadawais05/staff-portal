import {
  Link as LinkType,
  QuizItem as QuizItemType
} from '@staff-portal/graphql/staff'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'
import { Typography } from '@toptal/picasso'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'

import QuizItem from './components/QuizItem'

export type Props = {
  quizItems?: QuizItemType[]
  referralPage?: LinkType | null
  remoteQuizUrl?: string | null
}

const ClientQuizContent = ({
  quizItems,
  referralPage,
  remoteQuizUrl
}: Props) => (
  <>
    {quizItems?.map(({ questionLabel, readableValue }) => (
      <QuizItem
        bottom='small'
        key={questionLabel}
        label={questionLabel}
        answer={
          <>
            {readableValue.length ? (
              readableValue.map((answer, index) => (
                <Typography
                  // Seems to be to be non unique text rendering
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  size='medium'
                  weight='semibold'
                  data-testid='quiz-content-answer'
                >
                  {answer}
                </Typography>
              ))
            ) : (
              <Typography
                size='medium'
                weight='semibold'
                data-testid='quiz-content-answer-no-value'
              >
                {NO_VALUE}
              </Typography>
            )}
          </>
        }
      />
    ))}

    <QuizItem
      label='Landing page'
      answer={
        <TypographyOverflowLink
          size='medium'
          weight='semibold'
          data-testid='quiz-content-landing-page-answer'
        >
          <LinkWrapper
            wrapWhen={Boolean(referralPage?.url)}
            href={referralPage?.url as string}
            target='_blank'
            data-testid='quiz-content-landing-page-link'
          >
            {(referralPage?.text || referralPage?.url) ?? NO_VALUE}
          </LinkWrapper>
        </TypographyOverflowLink>
      }
    />

    {remoteQuizUrl && (
      <QuizItem
        top='small'
        label='Remote Quiz URL'
        answer={
          <Typography size='medium' weight='semibold'>
            <Link
              href={remoteQuizUrl}
              target='_blank'
              data-testid='quiz-content-remote-quiz-url'
            >
              {remoteQuizUrl}
            </Link>
          </Typography>
        }
      />
    )}
  </>
)

export default ClientQuizContent
