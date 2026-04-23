import { Container, List, Typography } from '@toptal/picasso'
import React from 'react'
import { HelpButton } from '@staff-portal/ui'

interface Props {
  showBtnText: boolean
  isOpenByDefault: boolean
}

const PlaybookGuidelinesButton = ({ showBtnText, isOpenByDefault }: Props) => {
  return (
    <HelpButton
      title='Playbook Guidelines'
      showBtnText={showBtnText}
      isOpenByDefault={isOpenByDefault}
      content={
        <>
          <Container bottom='xsmall'>
            <Typography size='medium'>
              Follow the guidelines below to ensure that all playbook
              expectations are well-understood and always met. If you have doubt
              regarding any playbook-related issues, use these rules to guide
              your behavior before seeking help.
            </Typography>
          </Container>

          <Container bottom='xsmall'>
            <List variant='ordered'>
              <List.Item>
                Do not close a task or advise anyone to do so unless the task is
                actually fully completed. The task system exists to ensure
                accountability, and misrepresenting work on this system is
                grounds for removal.
              </List.Item>
              <List.Item>
                If there is a valid reason for not completing a task, do not
                mark it as complete just to "make it go away". You should
                dispute the task and, when prompted, explain your reasoning
                behind it.
              </List.Item>
              <List.Item>
                Complete each task assigned to you in a timely manner and to the
                best of your abilities. You are expected both to stay on top of
                your assigned tasks and to maintain a high standard of work at
                all times.
              </List.Item>
              <List.Item>
                If there is a task being created and/or assigned to you
                incorrectly, it is the responsibility of the team lead to fix
                this ASAP. Every team lead is responsible for overseeing the
                architecture of their team's tasks and ensuring that the task
                system remains flawless. Contact the team lead and, if
                appropriate, dispute the task.
              </List.Item>
            </List>
          </Container>

          <Typography size='medium'>
            If you have any questions regarding these guidelines or any playbook
            tasks for which you are responsible, contact your team lead
            immediately to resolve the issue as soon as possible and ensure that
            all tasks can be handled rapidly and effectively.
          </Typography>
        </>
      }
    />
  )
}

export default PlaybookGuidelinesButton
