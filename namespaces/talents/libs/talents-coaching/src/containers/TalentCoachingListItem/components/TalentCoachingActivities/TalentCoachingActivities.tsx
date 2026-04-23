import React, { useEffect } from 'react'
import pluralize from 'pluralize'
import { Accordion, Button, Container, Tabs } from '@toptal/picasso'
import { ArrowDownMinor16 } from '@toptal/picasso/Icon'
import { Transitions, palette } from '@toptal/picasso/utils'
import { TalentCoachingEngagementStatus } from '@staff-portal/graphql/staff'

import NotesTab from '../NotesTab'
import TasksTab from '../TasksTab'
import { useTalentCoachingActivitiesContext } from './TalentCoachingActivitiesContext'
import { TalentCoachingEngagementWithActivitiesFragment } from '../../../../data/talent-coaching-engagement-with-activities-fragment'
import * as S from './styles'

export interface Props {
  talentCoachingEngagement: TalentCoachingEngagementWithActivitiesFragment
  expandTasks?: boolean
  refetch: () => void
}

export enum ActivityTabs {
  NOTES,
  TASKS
}

const TalentCoachingActivities = ({
  talentCoachingEngagement,
  expandTasks,
  refetch
}: Props) => {
  const { setTabIndex, tabIndex, isExpanded, setIsExpanded } =
    useTalentCoachingActivitiesContext()

  const handleOnTabIndexChange = (
    _: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setTabIndex(newValue)
  }

  const { nodes: notes, totalCount: notesCount } =
    talentCoachingEngagement.notes
  const { nodes: tasks, totalCount: tasksCount } =
    talentCoachingEngagement.tasks

  const isNotCompleted =
    talentCoachingEngagement.status != TalentCoachingEngagementStatus.COMPLETED
  const hasTasks = talentCoachingEngagement.tasks.totalCount > 0

  useEffect(() => {
    if (isNotCompleted && hasTasks && expandTasks) {
      setIsExpanded(true)
      setTabIndex(ActivityTabs.TASKS)
    }
  }, [])

  const pendingTaskCount = tasks.filter(
    task => task.status === 'pending'
  ).length
  const hasAtleastOneTaskOrOneNote = notesCount > 0 || tasksCount > 0

  const activitiesContent = (
    <Accordion.Details css={S.noteContainer}>
      <Tabs value={tabIndex} onChange={handleOnTabIndexChange}>
        <Tabs.Tab label={`Notes (${notesCount})`} />
        <Tabs.Tab label={`Tasks (${tasksCount})`} />
      </Tabs>
      {tabIndex === ActivityTabs.NOTES && (
        <NotesTab
          talentCoachingEngagementId={talentCoachingEngagement.id}
          notes={notes}
          refetch={refetch}
        />
      )}
      {tabIndex === ActivityTabs.TASKS && (
        <TasksTab tasks={tasks} refetch={refetch} />
      )}
    </Accordion.Details>
  )

  return (
    <>
      <Accordion
        content={activitiesContent}
        expanded={isExpanded}
        borders='none'
      />
      {hasAtleastOneTaskOrOneNote && (
        <Container flex alignItems='center' top='small'>
          <Button.Action
            iconPosition='right'
            icon={
              <Transitions.Rotate180 on={isExpanded}>
                <ArrowDownMinor16 color={palette.common.black} />
              </Transitions.Rotate180>
            }
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? 'Collapse activities'
              : `Expand activities (${notesCount} ${pluralize(
                  'note',
                  notesCount
                )}, ${pendingTaskCount} / ${tasksCount} ${pluralize(
                  'task',
                  tasksCount
                )})`}
          </Button.Action>
        </Container>
      )}
    </>
  )
}

export default TalentCoachingActivities
