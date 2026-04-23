import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Button, Menu } from '@toptal/picasso'
import React from 'react'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'

import useResumeCompanyModal from './use-resume-company-modal'

type Props = ActionItemProps & {
  companyId: string
  operation?: OperationType
}

const ResumeCompanyItem = ({
  componentType = 'button',
  companyId,
  operation,
  ...props
}: Props) => {
  const { showModal } = useResumeCompanyModal({
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
          data-testid='resume-company-item'
          onClick={showModal}
          {...props}
        >
          Resume Company
        </Component>
      )}
    />
  )
}

export default ResumeCompanyItem
