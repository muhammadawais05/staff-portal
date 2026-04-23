import { ArrowLongLeft16, ArrowLongRight16, Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, ReactNode, memo } from 'react'
import { useStore } from '@staff-portal/billing/src/store'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { ModalVariant } from '@staff-portal/billing/src/store/modalActions'

import * as S from './styles'

const displayName = 'TimesheetModalFooter'

interface Props {
  children?: ReactNode
}

const ButtonCircular = Button.Circular

const TimesheetModalFooter: FC<Props> = memo(({ children }) => {
  const { t: translate } = useTranslation('timesheet')

  const {
    state: { modal }
  } = useStore()

  const {
    options: { variant }
  } = modal
  const {
    props: {
      [variant as ModalVariant]: {
        handleNavigateTo = null,
        canMovePrev = false,
        canMoveNext = false
      } = {}
    }
  } = modal

  return (
    <ModalFooter>
      {!!handleNavigateTo && (
        <>
          <ButtonCircular
            css={S.button}
            data-offset={-1}
            data-testid='movePrev'
            disabled={!canMovePrev}
            icon={<ArrowLongLeft16 />}
            onClick={handleNavigateTo}
            title={translate('TimesheetEditForm.actions.movePrev')}
            variant='flat'
          />
          <ButtonCircular
            css={S.button}
            data-offset={1}
            data-testid='moveNext'
            disabled={!canMoveNext}
            icon={<ArrowLongRight16 />}
            onClick={handleNavigateTo}
            title={translate('TimesheetEditForm.actions.moveNext')}
            variant='flat'
          />
        </>
      )}
      {children}
    </ModalFooter>
  )
})

TimesheetModalFooter.defaultProps = {}

TimesheetModalFooter.displayName = displayName

export default TimesheetModalFooter
