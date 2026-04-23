import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent } from 'react'
import { Container, Button } from '@toptal/picasso'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

const displayName = 'CommissionContentItemWithAction'

interface Props {
  handleOnClick: (e: SyntheticEvent<HTMLElement, Event>) => void
  operation?: OperationItemFragment
  type: 'claimer' | 'referrer'
  webResource?: WebResourceFragment
}

export const CommissionContentItemWithAction = ({
  operation,
  handleOnClick,
  type,
  webResource
}: Props) => {
  const { t: translate } = useTranslation('common')
  const isReferrer = type === 'referrer'

  const referralLink = webResource ? (
    <WebResourceLinkWrapper
      data-testid={`${displayName}-${type}_link`}
      webResource={webResource}
      weight='semibold'
      size='medium'
    />
  ) : (
    <>{EMPTY_DATA}</>
  )

  const actionButton = (
    <OperationWrapper operation={operation}>
      <Button
        data-testid={`${displayName}-${type}_action`}
        onClick={handleOnClick}
        data-value={
          isReferrer
            ? ModalKey.changeRoleReferrer
            : ModalKey.clientClaimerUpdate
        }
        size='small'
        variant='secondary'
      >
        {translate('actions.change')}
      </Button>
    </OperationWrapper>
  )

  return actionButton ? (
    <Container flex justifyContent='space-between'>
      {referralLink}
      {actionButton}
    </Container>
  ) : (
    referralLink
  )
}

CommissionContentItemWithAction.displayName = displayName

export default CommissionContentItemWithAction
