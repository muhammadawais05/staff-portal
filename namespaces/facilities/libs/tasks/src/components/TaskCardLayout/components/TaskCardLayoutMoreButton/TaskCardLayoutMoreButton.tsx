import {
  Button,
  Container,
  ContainerProps,
  Dropdown,
  Menu,
  More16
} from '@toptal/picasso'
import React from 'react'

export type TaskCardLayoutMoreButtonProps = ContainerProps & {
  hidden?: boolean
  loading?: boolean
}

const TaskCardLayoutMoreButton = ({
  children,
  hidden = false,
  loading = false,
  'data-testid': dataTestId,
  ...rest
}: TaskCardLayoutMoreButtonProps) => {
  if (hidden) {
    return null
  }

  return (
    <Container
      left='xsmall'
      data-testid={dataTestId || 'task-card-layout-more-button'}
      {...rest}
    >
      <Dropdown
        offset={{ top: 'xsmall' }}
        content={
          <Menu data-testid='task-card-layout-more-dropdown'>{children}</Menu>
        }
      >
        <Button.Circular loading={loading} variant='flat' icon={<More16 />} />
      </Dropdown>
    </Container>
  )
}

export default TaskCardLayoutMoreButton
