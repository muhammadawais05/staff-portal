import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useRef, useState } from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import DynamicForm from '../ScheduleBreakModal/components'
import { SCHEDULE_ENGAGEMENT_BREAK_MAPPING } from '../ScheduleBreakModal/constants'
import {
  BreakType,
  EngagementBreakInitialValues,
  FormValues,
  ScheduleType
} from '../ScheduleBreakModal/types'
import {
  getMutationInput,
  getScheduleBreakMutationResult,
  getFormInitialValues
} from '../ScheduleBreakModal/utils'
import { ENGAGEMENT_UPDATED } from '../../messages'

interface Props {
  engagementId: string
  scheduleType: ScheduleType
  engagementBreakId?: string
  status?: EngagementStatus | null
  breakType?: BreakType
  initialValues?: EngagementBreakInitialValues
  onClose: () => void
}

const ScheduleBreakModalContent = ({
  engagementId,
  scheduleType,
  status,
  engagementBreakId,
  initialValues,
  breakType = BreakType.MULTI,
  onClose
}: Props) => {
  const autoFocusFirstField = useRef(true)
  const formInitialValues = useRef<FormValues | undefined>(
    getFormInitialValues(initialValues)
  )
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const [activeTab, setActiveTab] = useState(breakType)
  const [multiFormValues, setMultiFormValues] = useState(
    formInitialValues.current
  )
  const [singleFormValues, setSingleFormValues] = useState(
    formInitialValues.current
  )
  const handleChangeTab = (_: unknown, newValue: BreakType) => {
    setActiveTab(newValue)
  }
  const { useScheduleMutation, errorMessage, successMessage, submitText } =
    SCHEDULE_ENGAGEMENT_BREAK_MAPPING[scheduleType]

  const [scheduleBreak, { loading }] = useScheduleMutation({
    onError: () => showError(errorMessage)
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleFormInitializedFirstTime = () => {
    autoFocusFirstField.current = false
  }

  const handleSubmit = async (values: FormValues) => {
    const { data } = await scheduleBreak({
      variables: {
        input: getMutationInput({
          values,
          activeTab,
          engagementId,
          engagementBreakId,
          scheduleType
        })
      }
    })

    return handleMutationResult({
      mutationResult: getScheduleBreakMutationResult({ data, scheduleType }),
      successNotificationMessage: successMessage,
      capitalizeErrors: true,
      onSuccessAction: () => {
        onClose()
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
      }
    })
  }

  const commonProps = {
    activeTab,
    loading,
    status,
    scheduleType,
    autoFocusFirstField: autoFocusFirstField.current,
    submitText,
    onFormInitializedFirstTime: handleFormInitializedFirstTime,
    onChangeActiveTab: handleChangeTab,
    onClose,
    onSubmit: handleSubmit
  }

  return (
    <>
      {activeTab === BreakType.MULTI && (
        <DynamicForm
          initialValues={multiFormValues}
          setValues={setMultiFormValues}
          {...commonProps}
        />
      )}
      {activeTab === BreakType.SINGLE && (
        <DynamicForm
          initialValues={singleFormValues}
          setValues={setSingleFormValues}
          {...commonProps}
        />
      )}
    </>
  )
}

export default ScheduleBreakModalContent
