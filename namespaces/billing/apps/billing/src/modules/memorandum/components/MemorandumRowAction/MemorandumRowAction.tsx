import { Button, Dropdown } from '@toptal/picasso'
import { Overview16 } from '@toptal/picasso/Icon'
import React, { FC, SyntheticEvent, memo } from 'react'
import OperationFetcherForActions from '@staff-portal/billing/src/components/OperationFetcherForActions'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'

import { MemorandumListItemFragment } from '../../../__fragments__/memorandumListItemFragment.graphql.types'
import { memorandumListItemActions } from '../../utils'

const displayName = 'MemorandumRowAction'

const ButtonCircular = Button.Circular

interface Props {
  memorandum: MemorandumListItemFragment
  handleOnClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const MemorandumRowAction: FC<Props> = memo<Props>(
  ({ memorandum: { id }, handleOnClick }) => {
    return (
      <>
        <span>
          <Dropdown
            content={
              <WidgetErrorBoundary>
                <OperationFetcherForActions
                  actionItems={memorandumListItemActions}
                  handleOnClick={handleOnClick}
                  id={id}
                />
              </WidgetErrorBoundary>
            }
          >
            <ButtonCircular
              data-testid='more-actions-button'
              icon={<Overview16 />}
              variant='flat'
            />
          </Dropdown>
        </span>
      </>
    )
  }
)

MemorandumRowAction.displayName = displayName

export default MemorandumRowAction
