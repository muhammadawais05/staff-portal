import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { GenericTaskList } from '@staff-portal/tasks-lists'
import { TalentTopShieldFragment } from '@staff-portal/talents-top-shield'

interface Props {
  talentTopShield: TalentTopShieldFragment | null
  refetch: () => void
}

const TasksList = ({ talentTopShield, refetch }: Props) => {
  const tasks = talentTopShield?.topShieldApplication?.tasks.nodes ?? []

  return (
    <Container top='small'>
      <Section
        variant='withHeaderBar'
        title='Tasks'
        data-testid='tasks-section'
      >
        <GenericTaskList
          tasks={tasks}
          showDisputeActions
          loading={false}
          refreshTaskList={refetch}
        />
      </Section>
    </Container>
  )
}

export default TasksList
