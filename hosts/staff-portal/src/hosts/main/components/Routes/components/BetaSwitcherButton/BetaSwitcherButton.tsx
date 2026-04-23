import React, { useCallback } from 'react'
import Cookie from 'js-cookie'
import { Button, Container, Tooltip } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { ENVIRONMENT } from '@staff-portal/config'
import { useModal } from '@staff-portal/modals-service'

import { useRedirectToLegacy } from '../../hooks'
import { useDisableBeta } from './data/disable-beta'
import BetaSwitcherFeedbackModal from '../BetaSwitcherFeedbackModal'
import * as S from './styles'

const BETA_MODAL_KEY = 'beta_modal_disabled'

const BetaSwitcherButton = () => {
  const { showError } = useNotifications()
  const { isRedirecting, redirectToLegacy } = useRedirectToLegacy()

  const { disableBeta, loading } = useDisableBeta({
    onError: () => showError('Error occurred when disabling beta.'),
    onCompleted: ({ disableBeta: result }) => {
      const betaErrors = result?.errors.filter(
        ({ code }) => code !== 'flagNotAssigned'
      )

      if (betaErrors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          betaErrors,
          'Unable to disable beta'
        )

        return showError(mutationErrorMessages)
      }

      Cookie.set(BETA_MODAL_KEY, 'true', { expires: 1 })
      redirectToLegacy()
    }
  })
  const { showModal } = useModal(BetaSwitcherFeedbackModal, {
    onSubmit: disableBeta
  })

  const handleClick = useCallback(async () => {
    if (ENVIRONMENT === 'production' && !Cookie.get(BETA_MODAL_KEY)) {
      return showModal()
    }

    await disableBeta()
  }, [showModal, disableBeta])

  return (
    <Container css={S.betaSwitcherContainer}>
      <Tooltip
        preventOverflow
        content='View this page in the previous version of Staff Portal. You can enable Staff Portal Beta again whenever you choose.'
        placement='top'
      >
        <Button
          variant='secondary'
          css={S.betaSwitcherButton}
          onClick={handleClick}
          loading={loading || isRedirecting}
        >
          Return to Previous Version
        </Button>
      </Tooltip>
    </Container>
  )
}

export default BetaSwitcherButton
