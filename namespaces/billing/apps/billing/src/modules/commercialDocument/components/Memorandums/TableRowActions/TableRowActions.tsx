import { Button, Dropdown } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import OperationFetcherForActions from '@staff-portal/billing/src/components/OperationFetcherForActions'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'

import { Memorandum } from '../types'
import { memorandumActions } from '../../../../memorandum/utils'

const displayName = 'TableRowActions'

interface Props {
  memorandum: Memorandum
  handleClick: (e: SyntheticEvent<HTMLElement>) => void
}

const TableRowActions: FC<Props> = memo(
  ({ handleClick, memorandum: { id } }) => {
    const { t: translate } = useTranslation(['memorandum', 'common'])

    return (
      <Dropdown
        data-testid={displayName}
        content={
          <WidgetErrorBoundary>
            <OperationFetcherForActions
              actionItems={memorandumActions}
              handleOnClick={handleClick}
              id={id}
            />
          </WidgetErrorBoundary>
        }
      >
        <Button
          data-testid={`${displayName}-button`}
          size='small'
          variant='secondary'
        >
          {translate('common:more')}
          <Dropdown.Arrow />
        </Button>
      </Dropdown>
    )
  }
)

TableRowActions.displayName = displayName

export default TableRowActions
