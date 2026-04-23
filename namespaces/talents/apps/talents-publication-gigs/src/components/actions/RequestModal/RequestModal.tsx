import React from 'react'
import { Button, Form as PicassoForm } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form, FinalField } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { trackEvent } from '@staff-portal/monitoring-service'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  DESCRIPTION_HINT,
  DESCRIPTION_PLACEHOLDER,
  ERRORS,
  TITLE_HINT,
  TITLE_PLACEHOLDER
} from './constants'
import RequestSkills from '../../RequestSkills'
import { RequestEvents } from '../../../core/enums'
import { useEditPublicationRequest } from '../../../data/edit-publication-request'
import { useCreateRequest } from '../../../data/create-request'

interface RequestModalProps {
  request?: GigFragment
  open?: boolean
  hideModal: () => void
}

export interface FormValues {
  title: string
  description: string
  skills: string[]
}

const ERROR_MESSAGE = `Something went wrong`

const validator = (field: keyof FormValues) => {
  const errors = ERRORS[field]
  const { min, message } = errors

  return (value: string | string[]) => {
    if (value === undefined) {
      return field === 'skills' ? message : undefined
    }

    if (
      value.length < min ||
      (typeof value === 'string' && value.trim().length < min)
    ) {
      return message
    }

    return undefined
  }
}

const RequestModal = ({
  request,
  open = true,
  hideModal
}: RequestModalProps) => {
  const { showSuccess, showError } = useNotifications()
  const { editPublicationRequest, loading: editLoading } =
    useEditPublicationRequest({
      onCompleted: resp => {
        const returnedErrors = resp?.editGig?.errors

        if (returnedErrors?.length) {
          const mutationErrorMessages = concatMutationErrors(
            returnedErrors,
            ERROR_MESSAGE
          )

          showError(mutationErrorMessages)
        }

        if (resp.editGig?.success) {
          showSuccess('Request was successfully edited')

          if (resp.editGig?.gig) {
            const { id, title, description, skills } = resp.editGig.gig

            trackEvent(RequestEvents.EditSuccess, {
              id,
              title,
              description,
              skills
            })
          }

          return hideModal()
        }
      },

      onError: error => {
        showError(`${ERROR_MESSAGE} ${error.message}`)
      }
    })

  const { createRequest, loading: createLoading } = useCreateRequest({
    onCompleted: resp => {
      const returnedErrors = resp?.createPublicationGig?.errors

      if (returnedErrors?.length) {
        showError(ERROR_MESSAGE)
      }

      if (resp.createPublicationGig?.success) {
        showSuccess('Request was successfully created')
        if (resp.createPublicationGig.publicationGig) {
          const { id, title, description, skills } =
            resp.createPublicationGig.publicationGig

          trackEvent(RequestEvents.CreateSuccess, {
            id,
            title,
            description,
            skills
          })
        }

        return hideModal()
      }
    }
  })

  const handleCancel = () => {
    if (request?.id) {
      trackEvent(RequestEvents.EditCanceled, { id: request.id })
    } else {
      trackEvent(RequestEvents.CreateCanceled)
    }
    hideModal()
  }

  const handleSubmit = async ({ title, description, skills }: FormValues) => {
    const requestData = {
      title,
      description,
      skills
    }

    if (request?.id) {
      const editRequestData = { ...requestData, id: request.id }

      trackEvent(RequestEvents.EditClick, editRequestData)

      return editPublicationRequest(editRequestData)
    }

    trackEvent(RequestEvents.CreateClick, requestData)

    return createRequest(requestData)
  }

  const loading = createLoading || editLoading

  return (
    <Modal size='small' open={open} data-testid='request-modal'>
      <Form<FormValues> onSubmit={handleSubmit}>
        <Modal.Title>Request</Modal.Title>
        <Modal.Content>
          <PicassoForm.Field hint={TITLE_HINT}>
            <Form.Input
              required
              name='title'
              label='Title'
              placeholder={TITLE_PLACEHOLDER}
              width='full'
              validate={validator('title')}
              defaultValue={request?.title}
            />
          </PicassoForm.Field>
          <PicassoForm.Field hint={DESCRIPTION_HINT}>
            <Form.Input
              required
              multiline
              counter='entered'
              limit={50}
              multilineResizable
              rows={10}
              name='description'
              label='Description'
              placeholder={DESCRIPTION_PLACEHOLDER}
              width='full'
              validate={validator('description')}
              defaultValue={request?.description}
            />
          </PicassoForm.Field>
          <FinalField
            name='skills'
            required
            validate={validator('skills')}
            initialValue={request?.skills || []}
          >
            {props => <RequestSkills skillsList={props} />}
          </FinalField>
        </Modal.Content>

        <Modal.Actions>
          <Button
            variant='secondary'
            data-testid='request-modal-cancel'
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Form.SubmitButton
            data-testid='request-modal-confirm'
            variant='primary'
            loading={loading}
          >
            {request?.id ? 'Update' : 'Create'}
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RequestModal
