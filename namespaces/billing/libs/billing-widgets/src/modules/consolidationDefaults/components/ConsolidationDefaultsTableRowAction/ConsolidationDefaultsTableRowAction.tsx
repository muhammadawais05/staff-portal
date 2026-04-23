import { Button, Container, Dropdown, Menu } from '@toptal/picasso'
import { More16 } from '@toptal/picasso/Icon'
import React from 'react'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

const displayName = 'ConsolidationDefaultsTableRowActions'

type Action = {
  label: string
  onClick: () => void
}

interface Props {
  actions: Action[]
}

const ConsolidationDefaultsTableRowAction = ({ actions }: Props) => {
  const { modalContainer } = useExternalIntegratorContext()

  return actions.length > 0 ? (
    <Container flex>
      <Dropdown
        popperContainer={modalContainer}
        content={
          <Menu data-testid={`${displayName}-actions`}>
            {actions.map(({ label, onClick }) => (
              <Menu.Item onClick={onClick} key={label}>
                {label}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <Button.Circular
          data-testid={`${displayName}-button`}
          icon={<More16 />}
          variant='flat'
        />
      </Dropdown>
    </Container>
  ) : null
}

ConsolidationDefaultsTableRowAction.displayName = displayName

export default ConsolidationDefaultsTableRowAction
