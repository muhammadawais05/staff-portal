import React, { ReactNode } from 'react'

type Props = {
  engagementId: string
  title: string
  description: ReactNode
  submitLabel: string
  errorMessage: string
  successNotificationMessage: string
  mutationName: string
}

const MockComponent = ({
  engagementId,
  title,
  description,
  submitLabel,
  errorMessage,
  successNotificationMessage,
  mutationName
}: Props) => (
  <div data-testid='ReasonModal'>
    <div data-testid='ReasonModal-engagementId'>{engagementId}</div>
    <div data-testid='ReasonModal-title'>{title}</div>
    <div data-testid='ReasonModal-description'>{description}</div>
    <div data-testid='ReasonModal-submitLabel'>{submitLabel}</div>
    <div data-testid='ReasonModal-errorMessage'>{errorMessage}</div>
    <div data-testid='ReasonModal-successNotificationMessage'>
      {successNotificationMessage}
    </div>
    <div data-testid='ReasonModal-mutationName'>{mutationName}</div>
  </div>
)

export default MockComponent
