import React, { ReactNode } from 'react'
import { TalentJobPreferencesComparisonStatus as PreferenceStatus } from '@staff-portal/graphql/staff'
import {
  Container,
  List,
  QuestionMark16,
  Tag,
  Tooltip,
  Typography
} from '@toptal/picasso'
import { isNotNullish } from '@staff-portal/utils'
import {
  COMMITMENT_TITLES,
  JOB_WORK_TYPE_TEXT_MAPPING
} from '@staff-portal/jobs'

import { TalentJobPreferencesFragment } from '../../data'
import * as S from './styles'

export type Props = {
  preferences?: TalentJobPreferencesFragment | null
}

const TalentJobPreferences = ({ preferences }: Props) => {
  if (!preferences) {
    return <>Disabled</>
  }

  return (
    <Container flex alignItems='center'>
      Enabled
      <Tooltip
        maxWidth='none'
        interactive
        content={<TooltipContent preferences={preferences} />}
      >
        <Container flex left='xsmall'>
          {preferences.status ? (
            <OverlapTag status={preferences.status} />
          ) : (
            <QuestionMark16 data-testid='tooltip-icon' color='dark-grey' />
          )}
        </Container>
      </Tooltip>
    </Container>
  )
}

const OverlapTag = ({ status }: { status: PreferenceStatus }) => {
  const label = OVERLAP_TAG_LABELS_BY_STATUS[status]
  const indicatorColor = COLORS_BY_STATUS[status] || 'light-grey'

  // Render nothing in case a new status enum value is added.
  if (!label) {
    return null
  }

  return <Tag.Rectangular indicator={indicatorColor}>{label}</Tag.Rectangular>
}

const OVERLAP_TAG_LABELS_BY_STATUS = {
  [PreferenceStatus.OK]: 'Good Overlap',
  [PreferenceStatus.PARTIAL]: 'Partial Overlap',
  [PreferenceStatus.BAD]: 'Bad Overlap',
  [PreferenceStatus.NONE]: 'No Overlap'
}

type TooltipContentProps = { preferences: TalentJobPreferencesFragment }

const TooltipContent = ({ preferences }: TooltipContentProps) => {
  return (
    <Container css={S.tooltipContainer}>
      {preferences.status && (
        <Container bottom='small'>
          <Typography variant='heading' size='small' weight='regular'>
            {TITLES_BY_STATUS[preferences.status]}
          </Typography>
        </Container>
      )}
      <List variant='unordered'>
        {getTooltipListItems(preferences).map(item => (
          <List.Item key={item.key}>{item}</List.Item>
        ))}
      </List>
    </Container>
  )
}

const getTooltipListItems = ({
  skillNames,
  excludeSkillNames,
  commitments,
  workTypes,
  enterpriseProjects
}: TalentJobPreferencesFragment) => {
  return [
    isNonEmpty(skillNames) ? (
      <Container key='skills' right={-0.5} bottom={-0.5}>
        <Typography inline weight='semibold'>
          Preferred Skills:
        </Typography>
        {renderSkillTags(skillNames)}
      </Container>
    ) : null,
    isNonEmpty(excludeSkillNames) ? (
      <Container key='excluded-skills' right={-0.5} bottom={-0.5}>
        <Typography inline weight='semibold'>
          Skills to Exclude:
        </Typography>
        {renderSkillTags(excludeSkillNames)}
      </Container>
    ) : null,
    isNonEmpty(commitments) ? (
      <Typography key='commitments' weight='semibold'>
        Commitment:{' '}
        {toElementsSentence(
          commitments.map(({ commitment, status }) => (
            <Typography
              key={commitment}
              as='span'
              inline
              weight='semibold'
              color={getStatusColor(status)}
            >
              {COMMITMENT_TITLES[commitment]}
            </Typography>
          ))
        )}
      </Typography>
    ) : null,
    isNonEmpty(workTypes) ? (
      <Typography key='work-types' weight='semibold'>
        Job Type:{' '}
        {toElementsSentence(
          workTypes.map(({ workType, status }) => (
            <Typography
              key={workType}
              as='span'
              inline
              weight='semibold'
              color={getStatusColor(status)}
            >
              {JOB_WORK_TYPE_TEXT_MAPPING[workType]}
            </Typography>
          ))
        )}
      </Typography>
    ) : null,
    enterpriseProjects ? (
      <Typography
        key='enterprise'
        weight='semibold'
        color={getStatusColor(enterpriseProjects.status)}
      >
        {enterpriseProjects.enterpriseProjects
          ? 'Enterprise job'
          : 'Small-to-medium business job'}
      </Typography>
    ) : null
  ].filter(isNotNullish)
}

const isNonEmpty = <T,>(arr?: T[] | null): arr is T[] =>
  Boolean(arr && arr.length > 0)

// Like toSentence() but works on arbitrary React nodes.
const toElementsSentence = (elements: ReactNode[]) => {
  return elements.flatMap((element, index) => {
    if (index === 0) {
      return [element]
    }

    const separator = (
      <React.Fragment key={`sep-${index}`}>
        {index === elements.length - 1 ? ' or ' : ', '}
      </React.Fragment>
    )

    return [separator, element]
  })
}

const TITLES_BY_STATUS = {
  [PreferenceStatus.OK]:
    'Talent job preferences perfectly match job requirements.',
  [PreferenceStatus.PARTIAL]:
    'Talent job preferences partially match job requirements.',
  [PreferenceStatus.BAD]:
    'Talent job preferences do not match job requirements.',
  [PreferenceStatus.NONE]:
    'Talent job preferences has no conflicts with the job requirements.'
}

type SkillPreferences = TalentJobPreferencesFragment['skillNames']

const renderSkillTags = (skills: SkillPreferences) => {
  return skills?.map(({ skillName, status }, index) => (
    <Container
      inline
      left={index === 0 ? 0.5 : 0}
      right={0.5}
      bottom={0.5}
      key={skillName}
    >
      <Tag variant={getStatusColor(status)}>{skillName}</Tag>
    </Container>
  ))
}

const getStatusColor = (status?: PreferenceStatus | null) =>
  status ? COLORS_BY_STATUS[status] : undefined

const COLORS_BY_STATUS = {
  [PreferenceStatus.OK]: 'green',
  [PreferenceStatus.PARTIAL]: 'yellow',
  [PreferenceStatus.BAD]: 'red',
  [PreferenceStatus.NONE]: undefined
} as const

export default TalentJobPreferences
