import React, { ReactNode, useState } from 'react'
import { Drawer, Button, Container } from '@toptal/picasso'

import { RecentActivityList } from '../../components'
import { SearchChroniclesVariables } from '../../types'

export interface Props extends SearchChroniclesVariables {
  fullHistoryUrl: string
  children?: ReactNode
}

const RecentActivityButton = ({ children, ...restProps }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <Drawer
        disablePortal
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='Recent Activity'
        width='narrow'
        data-testid='recent-activity-drawer'
      >
        <Container>
          <RecentActivityList {...restProps} />
        </Container>
      </Drawer>

      <Button
        variant='secondary'
        size='small'
        onClick={() => setIsDrawerOpen(true)}
        data-testid='history-button'
      >
        {children ?? 'History'}
      </Button>
    </>
  )
}

RecentActivityButton.defaultProps = {}

RecentActivityButton.displayName = 'RecentActivityButton'

export default RecentActivityButton
