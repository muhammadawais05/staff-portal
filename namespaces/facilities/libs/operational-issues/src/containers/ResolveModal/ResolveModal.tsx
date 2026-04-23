import { Modal } from '@staff-portal/modals-service'
import { Button, Container } from '@toptal/picasso'
import { Form, useField, arrayMutators } from '@toptal/picasso-forms'
import { useNotifications, toTitleCase } from '@toptal/picasso/utils'
import React, { useEffect } from 'react'
import {
  Maybe,
  ResolveOperationalIssueInput
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useGetOperationalIssueEnabledCauses } from './data/get-enabled-causes/get-enabled-causes.staff.gql'
import { useResolveOperationalIssue } from './data/resolve-operational-issue/resolve-operational-issue.staff.gql'
import { OperationalIssueCauseFragment } from './data/operational-issue-cause-fragment/operational-issue-cause-fragment.staff.gql.types'
import * as S from './styles'

type ResolveModalFormValue = { isOtherChecked: boolean } & Pick<
  ResolveOperationalIssueInput,
  'observation' | 'resolution' | 'causeIds' | 'otherCauseReason'
>

interface CausesFieldProps {
  causes?: OperationalIssueCauseFragment[]
}

const OtherCauseField = () => {
  const {
    input: { value: isOtherChecked }
  } = useField<boolean>('isOtherChecked')

  return (
    <Container flex bottom='xsmall'>
      <Container right='xsmall' inline>
        <Form.Checkbox name='isOtherChecked' label='Other' css={S.checkbox} />
      </Container>
      <Form.Input
        size='small'
        name='otherCauseReason'
        required={isOtherChecked}
        disabled={!isOtherChecked}
        width='full'
        placeholder='Enter root cause here'
        css={S.otherCauseInput}
      />
    </Container>
  )
}

const CausesField = ({ causes = [] }: CausesFieldProps) => {
  const {
    input: { value: isOtherChecked }
  } = useField<boolean>('isOtherChecked')

  return (
    <Form.CheckboxGroup
      name='causeIds'
      label='Root cause'
      required={!isOtherChecked}
    >
      {causes?.map(({ id, name }) => (
        <Form.Checkbox
          key={id}
          label={name}
          value={id}
          titleCase={false}
          css={S.checkbox}
        />
      ))}
      {/*
       * PS. Even though this is a child of the "causeIds" checkbox group, it's not part of it, but rather
       * an independent field. It needs to be inside just to look like it's part of the same list. It can't
       * be placed below because if "causeIds" is empty, the error has to appear below this field.
       */}
      <OtherCauseField />
    </Form.CheckboxGroup>
  )
}

export interface Props {
  operationalIssueId: string
  templateId: string
  templateName?: Maybe<string>
  onOpen: () => void
  onStartLoadingData: () => void
  onClose: () => void
}

const ResolveModal = ({
  operationalIssueId,
  templateId,
  templateName,
  onOpen,
  onStartLoadingData,
  onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { data: causes, loading } =
    useGetOperationalIssueEnabledCauses(templateId)

  useEffect(() => {
    if (loading) {
      onStartLoadingData()
    }
  }, [loading, onStartLoadingData])

  const [resolveOperationalIssue, { loading: resolveIssueLoading }] =
    useResolveOperationalIssue({
      onError: () =>
        showError(
          'An error occurred, the Operational issue has not been resolved.'
        )
    })

  const handleSubmit = async ({
    observation = '',
    resolution = '',
    causeIds,
    isOtherChecked,
    otherCauseReason
  }: ResolveModalFormValue) => {
    const { data } = await resolveOperationalIssue({
      variables: {
        input: {
          operationalIssueId,
          causeIds,
          otherCauseReason: isOtherChecked ? otherCauseReason : null,
          observation,
          resolution
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.resolveOperationalIssue,
      successNotificationMessage: 'Operational issue has been resolved.',
      onSuccessAction: () => onClose()
    })
  }

  return (
    <Modal
      withForm
      onClose={onClose}
      open={!loading}
      onOpen={() => onOpen()}
      size='medium'
      data-testid='resolve-operational-issue-modal'
    >
      <Modal.Title>
        Resolve &quot;{toTitleCase(templateName)}&quot; Operational Issue
      </Modal.Title>
      <Form<ResolveModalFormValue>
        onSubmit={handleSubmit}
        mutators={{ ...arrayMutators }}
      >
        <Modal.Content>
          <CausesField causes={causes} />
          <Form.Input
            label='Observation'
            name='observation'
            required
            multiline
            rows={4}
            width='full'
            hint='Events, correlations, or key takeaways that relate to the cohort, timeline, or specific operational issue.'
          />
          <Form.Input
            label='Resolution'
            name='resolution'
            required
            multiline
            rows={4}
            width='full'
            hint='What steps are you taking to address this operational issue?'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            disabled={resolveIssueLoading}
            onClick={() => onClose()}
            data-testid='cancel-button'
          >
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Resolve Issue
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ResolveModal
