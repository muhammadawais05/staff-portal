import React from 'react'
import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

const NewLeadNotificationsTooltip = () => (
  <Container flex>
    <Tooltip
      interactive
      content={
        <Container>
          <Container
            flex
            alignItems='center'
            justifyContent='space-between'
            bottom='xsmall'
          >
            <Typography weight='semibold' size='medium'>
              How to Enable Desktop Notifications
            </Typography>
          </Container>
          <Container>
            Follow the instructions for your browser to enable notifications:
            <ul>
              <li>
                <Link
                  href='https://support.google.com/chrome/answer/3220216'
                  target='_blank'
                >
                  Chrome
                </Link>
              </li>
              <li>
                <Link
                  href='https://support.mozilla.org/en-US/kb/push-notifications-firefox'
                  target='_blank'
                >
                  Firefox
                </Link>
              </li>
              <li>
                <Link
                  href='https://support.apple.com/guide/safari/customize-website-notifications-sfri40734/mac'
                  target='_blank'
                >
                  Safari
                </Link>
              </li>
            </ul>
            Mac users may need to allow the browser to show notifications in the
            Notification Center. See how to enable notifications for Mac{' '}
            <Link
              href='https://support.apple.com/en-us/HT204079'
              target='_blank'
            >
              here
            </Link>
            .
          </Container>
        </Container>
      }
    >
      <Container>
        <Info16 />
      </Container>
    </Tooltip>
  </Container>
)

export default NewLeadNotificationsTooltip
