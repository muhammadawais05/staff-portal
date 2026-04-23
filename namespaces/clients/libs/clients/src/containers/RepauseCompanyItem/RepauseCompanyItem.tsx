import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Button, Menu } from '@toptal/picasso'
import React from 'react'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'

import useRepauseCompanyModal from './use-repause-company-modal'

type Props = ActionItemProps & {
  companyId: string
  operation?: OperationType
}

const RepauseCompanyItem = ({
  componentType,
  companyId,
  operation,
  ...props
}: Props) => {
  const { showModal } = useRepauseCompanyModal({
    companyId
  })

  const Component = componentType === 'menu-item' ? Menu.Item : Button

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Component
          disabled={disabled}
          data-testid='repause-company-item'
          onClick={showModal}
          {...props}
        >
          Repause Company
        </Component>
      )}
    />
  )
}

export default RepauseCompanyItem
