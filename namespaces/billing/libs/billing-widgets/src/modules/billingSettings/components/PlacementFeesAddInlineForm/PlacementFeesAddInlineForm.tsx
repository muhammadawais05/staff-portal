import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { Button } from '@toptal/picasso'
import { FormSpy, arrayMutators } from '@toptal/picasso-forms'
import { CreateEngagementPlacementFeeInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  GeneralResponse,
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import {
  formatDateURL,
  getCurrentTime
} from '@staff-portal/billing/src/_lib/dateTime'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import InlineFormSkeleton from '@staff-portal/billing/src/components/InlineFormSkeleton'
import InlineSectionForm from '@staff-portal/billing/src/components/InlineSectionForm'

import {
  getDefaultSelectPurchaseOrder,
  getPurchaseOrderLines,
  getSelectFormatPurchaseOrders
} from '../../../job/utils'
import AddModalForm from '../../../placementFees/modals/components/AddModalForm/AddModalForm'
import adjustValues from '../../../placementFees/modals/components/AddModal/adjustValues'
import { useGetEngagementQuery } from '../../../engagement/data/getEngagement.graphql.types'
import { useSetCreateEngagementPlacementFeeMutation } from '../../../placementFees/modals/data/setCreateEngagementPlacementFee.graphql.types'
import {
  getIsValidForm,
  PlacementFeeValidParams
} from '../../../placementFees/modals/components/AddModalForm/utils'

const responseKey = 'createEngagementPlacementFee'
const displayName = 'AddModal'

interface Props {
  engagementId: string
  isOpenInlineForm: boolean
  onCloseForm: () => void
}

export interface PlacementFeeInput
  extends Pick<CreateEngagementPlacementFeeInput, 'installments'> {
  purchaseOrderId?: string
}

const PlacementFeesAddInlineForm: FC<Props> = memo(
  ({ engagementId, isOpenInlineForm, onCloseForm }) => {
    const { t: translate } = useTranslation(['placementFees', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [isConfirmStep, setConfirmStep] = useState(false)

    const [setCreateEngagementPlacementFeeMutation] =
      useSetCreateEngagementPlacementFeeMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const { data, loading, initialLoading } = useGetEngagementQuery({
      fetchPolicy: 'network-only',
      variables: {
        engagementId
      }
    })

    const { id, job } = data?.node || {}

    const purchaseOrders = job?.client?.purchaseOrders?.nodes
    const initialValues: PlacementFeeInput = {
      installments: [
        {
          amount: '',
          dueDate: formatDateURL(getCurrentTime())
        }
      ],
      purchaseOrderId: getDefaultSelectPurchaseOrder(purchaseOrders)
    }
    const handleError = (response: GeneralResponse) => {
      setConfirmStep(false)

      return handleOnSubmissionError(responseKey)(response)
    }

    const handleOnSubmit = handleSubmit({
      adjustValues,
      handleError,
      handleSuccess: () => {
        onCloseForm()

        return handleOnSuccess({
          apolloEvent: ApolloContextEvents.placementFeeCreate,
          outboundEvent: { key: 'placement-fee-submit' },
          successMessage: translate('placementFees:notification.submit')
        })()
      },
      responseKey,
      submit: setCreateEngagementPlacementFeeMutation,
      variables: { engagementId: id }
    })

    const handleOnNextStep = ({
      values,
      blur,
      errors
    }: PlacementFeeValidParams) => {
      if (getIsValidForm({ values, blur, errors })) {
        setConfirmStep(true)
      }
    }
    const onReset = () => setConfirmStep(false)

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <InlineFormSkeleton
            title={<>{translate('placementFees:Table.title')}</>}
          />
        }
      >
        {isOpenInlineForm && (
          <InlineSectionForm<PlacementFeeInput>
            data-testid={displayName}
            headerTitle={translate('placementFees:AddModal.trigger')}
            saveButtonText='Save'
            onReset={onReset}
            onClose={isConfirmStep ? onReset : onCloseForm}
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            mutators={{ ...arrayMutators }}
            cancelButtonText={
              isConfirmStep ? translate('common:actions.back') : undefined
            }
            saveButtonComponent={
              !isConfirmStep ? (
                <FormSpy subscription={{ values: true, errors: true }}>
                  {({ form: { blur }, values, errors }) => (
                    <Button
                      size='small'
                      variant='primary'
                      data-testid='continue'
                      onClick={() =>
                        handleOnNextStep({
                          values: values as PlacementFeeInput,
                          blur,
                          errors
                        })
                      }
                    >
                      {translate('placementFees:AddModal.actions.continue')}
                    </Button>
                  )}
                </FormSpy>
              ) : undefined
            }
            keepDirtyOnReinitialize
            editComponent={
              <AddModalForm
                purchaseOrders={getSelectFormatPurchaseOrders(purchaseOrders)}
                purchaseOrderLines={getPurchaseOrderLines(purchaseOrders)}
                setConfirmStep={setConfirmStep}
                isConfirmStep={isConfirmStep}
                isInline
              />
            }
          />
        )}
      </ContentLoader>
    )
  }
)

PlacementFeesAddInlineForm.displayName = displayName

export default PlacementFeesAddInlineForm
