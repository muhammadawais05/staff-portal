import React, { useState } from 'react'
import {
  Button,
  Container,
  Badge,
  Tooltip,
  Heartbeat16,
  Drawer
} from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import OperationalIssues from '../OperationalIssues/OperationalIssues'
import { useGetOperationalIssuesCount } from './data/get-operational-issues-count.staff.gql'

const OperationalIssuesButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { data } = useGetOperationalIssuesCount()
  const totalCount = data?.totalCount

  const button = (
    <Tooltip content='Your Operational Issues'>
      <Button.Circular
        variant='transparent'
        icon={<Heartbeat16 color='light-grey' />}
        data-testid='operational-issues-button'
        onClick={() => setIsDrawerOpen(true)}
      />
    </Tooltip>
  )

  return (
    <>
      <Drawer
        disablePortal
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='Your Operational Issues'
        width='narrow'
      >
        <WidgetErrorBoundary emptyOnError>
          <Container left='xsmall' right='xsmall'>
            <OperationalIssues />
          </Container>
        </WidgetErrorBoundary>
      </Drawer>
      {totalCount ? (
        <Badge size='small' variant='red' content={totalCount}>
          {button}
        </Badge>
      ) : (
        button
      )}
    </>
  )
}

export default OperationalIssuesButton
