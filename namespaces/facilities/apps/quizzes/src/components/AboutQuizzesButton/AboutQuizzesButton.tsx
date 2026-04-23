import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { HelpButton } from '@staff-portal/ui'

const AboutQuizzesButton = () => (
  <HelpButton
    title='About Quizzes'
    showBtnText={true}
    isOpenByDefault={false}
    content={
      <>
        <Container bottom='xsmall'>
          <Typography size='medium'>
            Quizzes are web interfaces that talent see in the Toptal platform
            that allow us to assess competency in certain key areas. For
            example, a new member of the network may see a quiz that asks them
            questions about the specifics of appropriate ways to engage with
            clients (e.g., that they do not discuss rates, etc.)
          </Typography>
        </Container>

        <Container bottom='xsmall'>
          <Typography size='medium'>
            Quizzes can contain questions that are shared between verticals.
            They may also be vertical specific, depending on the content of the
            quiz.
          </Typography>
        </Container>

        <Container bottom='xsmall'>
          <Typography size='medium'>
            In general, this page lets you view quizzes, including the specific
            content of quiz questions, possible answers, and feedback to each
            answer depending on how someone responds. If you have the proper
            credentials, you also will have the ability to edit the content of a
            quiz as needed.
          </Typography>
        </Container>
      </>
    }
  />
)

export default AboutQuizzesButton
