import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { Container } from '@toptal/picasso'
import {
  NewEngagementWizardAttributes,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import { Form, FormSpy, SubmissionErrors } from '@toptal/picasso-forms'
import { FormBaseErrorContainer } from '@staff-portal/forms'
import { useApolloClient } from '@staff-portal/data-layer-service'
import { ScrollToTop } from '@staff-portal/ui'

import { useCandidateSendingContext, useHandleQueryErrors } from '../../hooks'
import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import { GetNewEngagementWizardForNextStepDocument } from '../../data/get-new-engagement-wizard-for-next-step'
import {
  CancelStepButton,
  NextStepButton,
  PreviousStepButton
} from '../../components'
import { FormRegisteredFieldsInitializer } from './components'
import { CandidateSendingStepDirection } from '../../enums'
import * as S from './styles'

export type Props<
  TStep extends keyof CandidateSendingStepsAttributesByStep,
  TStepAttributes extends CandidateSendingStepAttributes<TStep>
> = {
  children: ReactNode
  initialValues: TStepAttributes | null
  destroyOnUnregister?: boolean
  actions?: ReactNode
  onSubmit?: (
    stepAttributes: NewEngagementWizardAttributes
  ) => SubmissionErrors | Promise<SubmissionErrors> | void
}

const CandidateSendingForm = <
  TStep extends keyof CandidateSendingStepsAttributesByStep,
  TStepAttributes extends CandidateSendingStepAttributes<TStep> = CandidateSendingStepAttributes<TStep>
>({
  children,
  initialValues,
  destroyOnUnregister,
  actions,
  onSubmit
}: Props<TStep, TStepAttributes>) => {
  const client = useApolloClient()
  const { handleQueryErrors } = useHandleQueryErrors()
  const {
    actualSteps,
    direction,
    currentStep,
    previousStep,
    nextStep,
    stepAttributesForCurrentStep,
    persistedStepAttributesForCurrentStep,
    refetchInitialStepData,
    setStepAttributes,
    setPersistedStepAttributes,
    goToNextStep,
    goToPreviousStep
  } = useCandidateSendingContext()

  const calculatedInitialValues = useMemo(
    () =>
      direction === CandidateSendingStepDirection.Backward
        ? stepAttributesForCurrentStep ?? initialValues
        : persistedStepAttributesForCurrentStep ?? initialValues,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [previousStepLoading, setPreviousStepLoading] = useState<boolean>(false)
  const [nextStepLoading, setNextStepLoading] = useState<boolean>(false)

  const fetchNextStepData = useCallback(
    async (
      step: NewEngagementWizardStep,
      attributes: NewEngagementWizardAttributes
    ) => {
      const { data, errors: rootLevelErrors } = await client.query({
        query: GetNewEngagementWizardForNextStepDocument,
        variables: {
          step,
          attributes
        }
      })

      return {
        actualSteps: data?.newEngagementWizard?.actualSteps ?? actualSteps,
        errors: data?.newEngagementWizard?.errors,
        rootLevelErrors
      }
    },
    [actualSteps, client]
  )

  const handleStepSubmit = useCallback(
    async (stepAttributes: TStepAttributes) => {
      if (!currentStep || !nextStep) {
        return
      }

      const updatedStepsAttributes = setStepAttributes(
        currentStep as TStep,
        stepAttributes
      )

      setPersistedStepAttributes(currentStep as TStep, null)

      if (onSubmit) {
        return await onSubmit(updatedStepsAttributes)
      }

      setNextStepLoading(true)

      const {
        actualSteps: newActualSteps,
        errors,
        rootLevelErrors
      } = await fetchNextStepData(nextStep, updatedStepsAttributes)

      setNextStepLoading(false)

      if (!errors?.length && !rootLevelErrors?.length) {
        goToNextStep(newActualSteps)

        return
      }

      return handleQueryErrors({ errors, rootLevelErrors })
    },
    [
      onSubmit,
      nextStep,
      currentStep,
      setStepAttributes,
      setPersistedStepAttributes,
      fetchNextStepData,
      goToNextStep,
      handleQueryErrors
    ]
  )
  const handlePreviousStepClick = useCallback(
    async (stepAttributes: TStepAttributes) => {
      if (!currentStep || !previousStep) {
        return
      }

      const updatedStepsAttributes = setStepAttributes(
        currentStep as TStep,
        null
      )

      setPersistedStepAttributes(currentStep as TStep, stepAttributes)

      setPreviousStepLoading(true)

      const { actualSteps: newActualSteps } = await fetchNextStepData(
        previousStep,
        updatedStepsAttributes
      )

      setPreviousStepLoading(false)
      const { isInitialStep } = goToPreviousStep(newActualSteps)

      if (isInitialStep) {
        refetchInitialStepData()
      }
    },
    [
      currentStep,
      previousStep,
      fetchNextStepData,
      refetchInitialStepData,
      goToPreviousStep,
      setStepAttributes,
      setPersistedStepAttributes
    ]
  )

  const actionButtons = useMemo(() => {
    if (actions) {
      return actions
    }

    return (
      <NextStepButton
        disabled={previousStepLoading}
        loading={nextStepLoading}
      />
    )
  }, [actions, nextStepLoading, previousStepLoading])

  return (
    <Form<NonNullable<TStepAttributes>>
      initialValues={calculatedInitialValues ?? undefined}
      destroyOnUnregister={destroyOnUnregister}
      onSubmit={handleStepSubmit}
    >
      {destroyOnUnregister && <FormRegisteredFieldsInitializer />}

      <ScrollToTop />

      <FormBaseErrorContainer top='small' parseAllHtml />

      {children}

      <Container top='medium' flex justifyContent='space-between'>
        <FormSpy<TStepAttributes> subscription={{ values: true }}>
          {({ values }) => (
            <PreviousStepButton
              disabled={nextStepLoading}
              loading={previousStepLoading}
              onClick={() => handlePreviousStepClick(values)}
            />
          )}
        </FormSpy>

        <Container css={S.buttonsContainer}>
          <CancelStepButton disabled={previousStepLoading || nextStepLoading} />

          {actionButtons}
        </Container>
      </Container>
    </Form>
  )
}

export default CandidateSendingForm
