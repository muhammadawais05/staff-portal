import React, { useMemo } from 'react'
import {
  Section,
  RichText,
  Container,
  Typography,
  Form as PicassoForm
} from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { htmlToHast } from '@toptal/picasso/utils'
import { GigReachOutStatus, UserError } from '@staff-portal/graphql/staff'

import { GigReachOutMessageMetaFragment } from '../../../../data/get-gig-reach-out-message-meta'
import {
  CreateGigReachOutDocument,
  GigReachOutFragment
} from '../../data/create-gig-reach-out'

interface FormValues {
  candidateId: string
  gigId: string
  messageBody: string
}

interface GigReachOutMutationResult {
  success: boolean
  errors: UserError[]
  reachOut: GigReachOutFragment
}

export interface Props {
  candidateId: string
  gigId: string
  talentName: string
  gigReachOutMessageMeta: GigReachOutMessageMetaFragment
  onSuccessAction: (status: GigReachOutStatus | undefined) => void
  hideModal: () => void
}

const validateMessageBody = () => {
  return (value: string | string[]) => {
    if (
      value.length < 50 ||
      (typeof value === 'string' && value.trim().length < 50)
    ) {
      return 'Message body needs to be at least 50 characters long.'
    }

    return undefined
  }
}

const dataTestIds = {
  submitButton: 'send-request-modal-confirm',
  closeButton: 'send-request-modal-cancel'
}

const SendRequestModalForm = ({
  candidateId,
  gigId,
  talentName,
  gigReachOutMessageMeta,
  onSuccessAction,
  hideModal
}: Props) => {
  const {
    header,
    footer,
    messageBody: intialMessageBody
  } = gigReachOutMessageMeta

  const initialValues: FormValues = useMemo(
    () => ({
      candidateId,
      gigId,
      messageBody: intialMessageBody
    }),
    [candidateId, gigId, intialMessageBody]
  )

  return (
    <Modal.ActionForm
      title={`Request to ${talentName}`}
      submitText='Send Request'
      initialValues={initialValues}
      mutation={{
        document: CreateGigReachOutDocument,
        successMessage: `The request was sent successfully to ${talentName}.`,
        errorMessage: 'Request could not be sent, please try again.',
        onSuccess: mutationResult => {
          onSuccessAction(
            (mutationResult as GigReachOutMutationResult)?.reachOut?.status
          )
          hideModal()
        }
      }}
      adjustFormValues={({ messageBody }) => ({
        candidateId,
        gigId,
        messageBody: messageBody
      })}
      onClose={hideModal}
      testIds={dataTestIds}
    >
      <Typography>
        Please review the message that talent will receive in Slack and Email
        and edit if needed:
      </Typography>
      <Container top='small'>
        <Section variant='bordered' style={{ backgroundColor: '#FCFCFC' }}>
          <RichText
            style={{ fontSize: '14px', lineHeight: '22px' }}
            value={htmlToHast(header)}
          />
          <Container top='small' bottom='small'>
            <PicassoForm.Field>
              <Form.Input
                required
                multiline
                counter='entered'
                limit={50}
                multilineResizable
                rows={10}
                name='messageBody'
                width='full'
                validate={validateMessageBody()}
                defaultValue={intialMessageBody}
              />
            </PicassoForm.Field>
          </Container>
          <RichText
            style={{ fontSize: '14px', lineHeight: '22px' }}
            value={htmlToHast(footer)}
          />
        </Section>
      </Container>
    </Modal.ActionForm>
  )
}

export default SendRequestModalForm
