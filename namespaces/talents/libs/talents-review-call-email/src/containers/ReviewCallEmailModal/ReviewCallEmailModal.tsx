import React, { FC } from 'react'
import { MutationResult } from '@staff-portal/mutation-result-handlers'
import {
  SendEmailModal as SEM,
  SendEmailModalProps,
  EmailPreviewProps
} from '@staff-portal/communication-send-email'

type Props<
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>
> = Omit<
  SendEmailModalProps<TMutationResponse, TMutationResult, TMutationInput>,
  'children'
> & {
  emailPreview: FC<EmailPreviewProps>
}

export const ReviewCallEmailModal = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>
>({
  emailPreview,
  ...restProps
}: Props<TMutationResponse, TMutationResult, TMutationInput>) => {
  return (
    <SEM {...restProps}>
      {({ emailContext }) => (
        <>
          <SEM.BookingObjectField
            autoFocus
            initialSearchTerm={emailContext?.defaultBookingObject?.name ?? ''}
          />
          <SEM.EmailTemplatesField readOnly />
          <SEM.SubjectField label='Title' readOnly />
          <SEM.CCSuggestedField />
          <SEM.CCAdditionalField />
          <SEM.EmailBodyField emailPreview={emailPreview} />
          <SEM.OfacStatusNotification />
          <SEM.GoogleAppsAuthNotification />
        </>
      )}
    </SEM>
  )
}
