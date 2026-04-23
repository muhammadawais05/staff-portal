import React, { FC, memo, SyntheticEvent } from 'react'
import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import { SubSection } from '@staff-portal/ui'
import { BillingMethodName } from '@staff-portal/graphql/staff'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { ClientBillingDetailsBillingOptionsFragment } from '../../data/getClientBillingDetails.graphql.types'
import { BillingDetailsActionEnum } from '../../utils'
import BillingOptionDetails from '../BillingOptionDetails'

type Props = {
  billingOption: ClientBillingDetailsBillingOptionsFragment
  handleOnClick: (event: SyntheticEvent<HTMLButtonElement, Event>) => void
  activeId?: string
  canManageBillingOptions: boolean
}

const displayName = 'BillingOption'

const BillingOption: FC<Props> = memo(
  ({ billingOption, activeId, handleOnClick, canManageBillingOptions }) => {
    const {
      id,
      billingMethod,
      operations: {
        preferEnterpriseBillingOption,
        unsetPreferredBillingOption,
        removeBillingOption,
        removeEnterpriseBillingOption
      },
      operations,
      preferred
    } = billingOption
    const { t: translate } = useTranslation([
      'billingOptions',
      'paymentMethod',
      'billingDetails',
      'common'
    ])
    const methodKey = camelCase(billingMethod) as EnumKeysToCamelCase<
      typeof BillingMethodName
    >
    const isLoading = activeId === id
    const isDisabled = Boolean(activeId) && activeId !== id
    const primarySuffix = preferred
      ? ` (${translate(`common:primary`).toLowerCase()})`
      : ''
    const title =
      translate(`paymentMethod:${methodKey}` as const) + primarySuffix

    return (
      <SubSection
        title={title}
        data-testid={`${displayName}-${methodKey}`}
        actions={
          <InlineActionsWrapper>
            <OperationWrapper operation={preferEnterpriseBillingOption}>
              <Button
                size='small'
                variant='secondary'
                data-testid={`${displayName}-${methodKey}-setPrimary`}
                data-method={
                  BillingDetailsActionEnum.PREFER_ENTERPRISE_BILLING_OPTION
                }
                value={id}
                onClick={handleOnClick}
                loading={isLoading}
                disabled={isDisabled}
              >
                {translate('billingOptions:actions.setPrimary')}
              </Button>
            </OperationWrapper>
            <OperationWrapper operation={unsetPreferredBillingOption}>
              <Button
                size='small'
                variant='negative'
                data-testid={`${displayName}-${methodKey}-unsetPrimary`}
                data-method={
                  BillingDetailsActionEnum.UNSET_PREFERRED_BILLING_OPTION
                }
                value={id}
                onClick={handleOnClick}
                disabled={isDisabled}
              >
                {translate('billingOptions:actions.unsetPrimary')}
              </Button>
            </OperationWrapper>
            {'reverifyCreditCardBillingOption' in operations && (
              <OperationWrapper
                operation={operations.reverifyCreditCardBillingOption}
              >
                <Button
                  size='small'
                  variant='positive'
                  data-testid={`${displayName}-${methodKey}-reverify`}
                  data-method={
                    BillingDetailsActionEnum.REVERIFY_CREDIT_CARD_BILLING_OPTION
                  }
                  value={id}
                  onClick={handleOnClick}
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  {translate(
                    'billingDetails:actions.reverifyCreditCardBillingOption.label'
                  )}
                </Button>
              </OperationWrapper>
            )}
            {'verifyWireBillingOption' in operations && (
              <OperationWrapper
                enabledText={translate(
                  'billingDetails:actions.verifyWireBillingOption.tooltip'
                )}
                operation={operations.verifyWireBillingOption}
              >
                <Button
                  size='small'
                  variant='positive'
                  data-testid={`${displayName}-${methodKey}-verify`}
                  data-method={
                    BillingDetailsActionEnum.VERIFY_WIRE_BILLING_OPTION
                  }
                  value={id}
                  onClick={handleOnClick}
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  {translate(
                    'billingDetails:actions.verifyWireBillingOption.label'
                  )}
                </Button>
              </OperationWrapper>
            )}
            {'unverifyWireBillingOption' in operations && (
              <OperationWrapper
                enabledText={translate(
                  'billingDetails:actions.unverifyWireBillingOption.tooltip'
                )}
                operation={operations.unverifyWireBillingOption}
              >
                <Button
                  size='small'
                  variant='negative'
                  data-testid={`${displayName}-${methodKey}-unverify`}
                  data-method={
                    BillingDetailsActionEnum.UNVERIFY_WIRE_BILLING_OPTION
                  }
                  value={id}
                  onClick={handleOnClick}
                  disabled={isDisabled}
                >
                  {translate(
                    'billingDetails:actions.unverifyWireBillingOption.label'
                  )}
                </Button>
              </OperationWrapper>
            )}
            {'updateBillingOption' in operations && (
              <OperationWrapper operation={operations.updateBillingOption}>
                <Button
                  size='small'
                  variant='secondary'
                  data-testid={`${displayName}-${methodKey}-update`}
                  data-method={BillingDetailsActionEnum.UPDATE_BILLING_OPTION}
                  value={id}
                  onClick={handleOnClick}
                  disabled={isDisabled}
                >
                  {translate('common:actions.edit')}
                </Button>
              </OperationWrapper>
            )}
            <OperationWrapper operation={removeBillingOption}>
              <Button
                size='small'
                variant='negative'
                data-testid={`${displayName}-${methodKey}-removeBillingOption`}
                data-method={BillingDetailsActionEnum.REMOVE_BILLING_OPTION}
                value={id}
                onClick={handleOnClick}
              >
                {translate('common:actions.delete')}
              </Button>
            </OperationWrapper>
            <OperationWrapper operation={removeEnterpriseBillingOption}>
              <Button
                size='small'
                variant='negative'
                data-testid={`${displayName}-${methodKey}-removeEnterpriseBillingOption`}
                data-method={
                  BillingDetailsActionEnum.REMOVE_ENTERPRISE_BILLING_OPTION
                }
                value={id}
                onClick={handleOnClick}
              >
                {translate('common:actions.delete')}
              </Button>
            </OperationWrapper>
          </InlineActionsWrapper>
        }
      >
        <BillingOptionDetails
          billingOption={billingOption}
          canManageBillingOptions={canManageBillingOptions}
        />
      </SubSection>
    )
  }
)

BillingOption.displayName = displayName

export default BillingOption
