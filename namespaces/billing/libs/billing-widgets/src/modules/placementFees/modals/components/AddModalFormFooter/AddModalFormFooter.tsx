import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'AddModalFormFooter'

interface Props {
  isConfirmStep: boolean
  isSubmitting: boolean
  handleOnClick: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const AddModalFormFooter: FC<Props> = memo(
  ({ isConfirmStep, isSubmitting, handleOnClick }) => {
    const { t: translate } = useTranslation(['placementFees', 'common'])

    return (
      <ModalFooter
        data-testid='PlacementFeesAddModalForm-footer'
        hasCancelButton={!isConfirmStep}
      >
        {isConfirmStep ? (
          <>
            <Button
              data-testid='back'
              onClick={handleOnClick}
              variant='secondary'
              value='back'
            >
              {translate('common:actions.back')}
            </Button>
            <Button
              data-testid='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              type='submit'
              variant='positive'
            >
              {translate('placementFees:AddModal.confirm.actions.submit')}
            </Button>
          </>
        ) : (
          <Button
            data-testid='continue'
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={handleOnClick}
            type='button'
            variant='positive'
            value='continue'
          >
            {translate('placementFees:AddModal.actions.continue')}
          </Button>
        )}
      </ModalFooter>
    )
  }
)

AddModalFormFooter.displayName = displayName

export default AddModalFormFooter
