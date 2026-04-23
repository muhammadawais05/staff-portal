import { format } from '@staff-portal/date-time-utils'
import { Container, Link, Tooltip, Typography } from '@toptal/picasso'
import { Info16 } from '@toptal/picasso/Icon'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const platformUrl = (path: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  //return `${window.TP.platform_url}${path}`
  return `${window.SP.DAVINCI_PLATFORM_API_URL}${path}`
}

export const profileSettingsUrl = (talentId: string | number) =>
  platformUrl(`/platform/talents/${talentId}/walkthrough`)

export interface EditorWrapperHeaderProps {
  roleId: number
  action: React.ReactNode
  profileUpdatedAt: Date | null
}

const EditorWrapperHeader = ({
  roleId,
  action,
  profileUpdatedAt
}: EditorWrapperHeaderProps) => {
  const tooltipContent =
    'This is how you introduce yourself to clients. Make sure your profile is current.'

  const isBellow500px = useMediaQuery({ maxWidth: '500px' })
  const isBetween992and1150px = useMediaQuery({
    minWidth: '992px',
    maxWidth: '1150px'
  })
  const shouldDisplayActionsInNewLine = isBellow500px || isBetween992and1150px
  const shouldDisplayProfileUpdateAtInNewLine = useMediaQuery({
    maxWidth: '1400px'
  })

  const renderProfileUpdatedAt = profileUpdatedAt && (
    <Container
      flex
      direction='row'
      left={shouldDisplayProfileUpdateAtInNewLine ? undefined : 'small'}
      top={shouldDisplayProfileUpdateAtInNewLine ? 'small' : undefined}
    >
      <Typography variant='body' size='xsmall'>
        Last profile update: {format(profileUpdatedAt, 'MMM yyyy')}
      </Typography>
      &nbsp;
      <Typography variant='body' size='xsmall'>
        <Link href={profileSettingsUrl(roleId)}>Update</Link>
      </Typography>
    </Container>
  )

  return (
    <Container flex direction='column' bottom='small'>
      <Container
        flex
        direction={shouldDisplayActionsInNewLine ? 'column' : 'row'}
        justifyContent='space-between'
      >
        <Container flex direction='row' alignItems='center'>
          <Container flex direction='row'>
            <Typography variant='heading' size='medium'>
              Application Card
            </Typography>

            <Tooltip content={tooltipContent} placeholder='top'>
              <Container
                flex
                left='xsmall'
                alignItems='center'
                data-testid='icon'
              >
                <Info16 />
              </Container>
            </Tooltip>
          </Container>

          {!shouldDisplayProfileUpdateAtInNewLine && renderProfileUpdatedAt}
        </Container>

        <Container
          flex
          direction='row'
          top={shouldDisplayActionsInNewLine ? 'small' : undefined}
        >
          {action}
        </Container>
      </Container>
      {shouldDisplayProfileUpdateAtInNewLine && renderProfileUpdatedAt}
    </Container>
  )
}

export default EditorWrapperHeader
