import { Form, FormRenderProps } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EngagementCommitmentEnum,
  EngagementRateMethodEnum,
  Operation,
  Maybe
} from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  formatDateURL,
  getCurrentLocalTime
} from '@staff-portal/billing/src/_lib/dateTime'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import AlertModal from '@staff-portal/billing/src/components/AlertModal'

import CommitmentChangeModalForm, {
  CommitmentChangeModalFormValues
} from '../CommitmentChangeModalForm/CommitmentChangeModalForm'
import { adjustValues, truncateNumberFromString } from './utils'
import { useSetChangeCommitmentMutation } from '../../data/setChangeCommitment.graphql.types'

const RESPONSE_KEY = 'changeEngagementCommitment'
const ENGAGEMENT_TYPE = 'engagement'

interface Props {
  engagementId: string
  canBeDiscounted?: Maybe<boolean>
  commitment: EngagementCommitmentEnum
  companyFullTimeRate: Maybe<string>
  companyHourlyRate: Maybe<string>
  companyPartTimeRate: Maybe<string>
  defaultDiscount?: Maybe<number>
  defaultFullTimeDiscount?: Maybe<string>
  defaultMarkup?: Maybe<string>
  defaultPartTimeDiscount?: Maybe<string>
  defaultUpcharge?: Maybe<string>
  discountMultiplier?: Maybe<string>
  fullTimeDiscount?: Maybe<string>
  markup?: Maybe<string>
  partTimeDiscount?: Maybe<string>
  rateMethod?: Maybe<EngagementRateMethodEnum>
  talentFullTimeRate: Maybe<string>
  talentHourlyRate: Maybe<string>
  talentPartTimeRate: Maybe<string>
  changeEngagementCommitmentOperation?: Maybe<Operation>
  job?: Maybe<{
    title: string
  }>
}

const CommitmentChangeModalContent: FC<Props> = memo(
  // eslint-disable-next-line complexity
  ({
    engagementId,
    canBeDiscounted,
    commitment,
    companyFullTimeRate,
    companyHourlyRate,
    companyPartTimeRate,
    defaultFullTimeDiscount,
    defaultMarkup,
    defaultPartTimeDiscount,
    defaultUpcharge,
    discountMultiplier,
    fullTimeDiscount,
    markup,
    partTimeDiscount,
    rateMethod,
    talentFullTimeRate,
    talentHourlyRate,
    talentPartTimeRate,
    changeEngagementCommitmentOperation,
    job
  }) => {
    const encodedEngagementId = encodeId({
      id: engagementId,
      type: ENGAGEMENT_TYPE
    })

    const { t: translate } = useTranslation(['commitment', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [changeCommitmentGatewayMutation] = useSetChangeCommitmentMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const isEnabled = isCallableEnabled(
      changeEngagementCommitmentOperation?.callable
    )

    if (!isEnabled) {
      return (
        <AlertModal
          message={
            changeEngagementCommitmentOperation?.messages?.length
              ? changeEngagementCommitmentOperation.messages.join('\n\n')
              : translate('common:actionUnavailable')
          }
          title={translate('commitment:changeModal.title')}
        />
      )
    }

    const initialValues: CommitmentChangeModalFormValues = {
      canBeDiscounted: !!canBeDiscounted,
      changeDate: formatDateURL(getCurrentLocalTime()),
      commitment,
      companyFullTimeRate: Number(companyFullTimeRate).toFixed(2),
      companyHourlyRate: Number(companyHourlyRate).toFixed(2),
      companyPartTimeRate: Number(companyPartTimeRate).toFixed(2),
      defaultFullTimeDiscount: defaultFullTimeDiscount ?? undefined,
      defaultMarkup: defaultMarkup ?? undefined,
      defaultPartTimeDiscount: defaultPartTimeDiscount ?? undefined,
      defaultUpcharge: defaultUpcharge ?? undefined,
      discountMultiplier: discountMultiplier ?? undefined,
      engagementId: encodedEngagementId,
      fullTimeDiscount: truncateNumberFromString(
        fullTimeDiscount ?? defaultFullTimeDiscount
      ),
      markup: markup ?? (defaultMarkup || undefined),
      notifyCompany: true,
      notifyTalent: true,
      partTimeDiscount: truncateNumberFromString(
        partTimeDiscount ?? defaultPartTimeDiscount
      ),
      rateMethod: rateMethod || undefined,
      rateOverrideReason: '',
      talentFullTimeRate: Number(talentFullTimeRate).toFixed(2),
      talentHourlyRate: Number(talentHourlyRate).toFixed(2),
      talentPartTimeRate: Number(talentPartTimeRate).toFixed(2)
    }

    const renderForm = (
      finalFormProps: FormRenderProps<CommitmentChangeModalFormValues>
    ) => <CommitmentChangeModalForm finalFormProps={finalFormProps} job={job} />

    return (
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit({
          adjustValues,
          handleError: handleOnSubmissionError(RESPONSE_KEY),
          handleSuccess: handleOnSuccess({
            apolloEvent: ApolloContextEvents.commitmentChange,
            outboundEvent: { key: 'commitment:changed' },
            successMessage: translate('commitment:notification.success.update')
          }),
          responseKey: RESPONSE_KEY,
          submit: changeCommitmentGatewayMutation
        })}
        render={renderForm}
      />
    )
  }
)

export default CommitmentChangeModalContent
