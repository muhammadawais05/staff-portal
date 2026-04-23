import React from 'react'
import {
  Button,
  ArrowDownMinor16,
  Dropdown,
  Menu,
  Typography,
  ArrowUpMinor16
} from '@toptal/picasso'
import { TalentResumeJob } from '@staff-portal/graphql/staff'
import { MenuLink } from '@staff-portal/ui'

import * as S from './styles'

type Props = {
  resumeJobs: TalentResumeJob[]
}

const JobSpecificResumeButton = ({ resumeJobs }: Props) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <Dropdown
      css={S.dropdown}
      disablePortal
      content={
        <Menu css={S.menu} data-testid='ResumeSpecificJobsMenu'>
          <Menu.Item css={S.menuTitle} nonSelectable disabled>
            <Typography size='small' color='dark-grey' weight='semibold'>
              Jobs
            </Typography>
          </Menu.Item>
          {resumeJobs.map(
            ({ id, title, clientName, resumeRedirectUrl }: TalentResumeJob) => (
              <Menu.Item
                key={id}
                as={MenuLink}
                href={resumeRedirectUrl}
                target='_blank'
                rel='noopener'
              >
                <Typography size='medium' color='black'>
                  <Typography weight='semibold' color='black' as='strong'>
                    {clientName}
                  </Typography>{' '}
                  - {title}
                </Typography>
              </Menu.Item>
            )
          )}
        </Menu>
      }
      onOpen={() => setExpanded(true)}
      onClose={() => setExpanded(false)}
    >
      <Button
        active={expanded}
        size='small'
        variant='secondary'
        iconPosition='right'
        icon={expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
      >
        Job-Specific Resume
      </Button>
    </Dropdown>
  )
}

export default JobSpecificResumeButton
