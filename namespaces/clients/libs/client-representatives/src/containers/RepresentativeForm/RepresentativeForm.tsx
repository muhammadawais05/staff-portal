import React from 'react'
import { Button, Container, Grid } from '@toptal/picasso'
import { Form as PicassoForm, arrayMutators } from '@toptal/picasso-forms'
import {
  Client,
  CreateCompanyRepresentativeInput,
  UpdateCompanyRepresentativeProfileInput,
  Maybe
} from '@staff-portal/graphql/staff'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { RepresentativeFragment as Representative } from '../../data'
import useInitialRepresentativeValues from './services/use-initial-representative-values'
import useHandleRepresentativeSubmit from './data/use-handle-representative-submit/use-handle-representative-submit'
import RepresentativeFormFields from './components/RepresentativeFormFields'

export type Props = {
  // when a client ID is passed as string we're creating a new rep
  // if a Representative is passed we're editing the existing rep
  clientIdOrRepresentative: string | Representative
  jobId?: string
  onClose: () => void
  client?: Partial<Maybe<Client>> | undefined
}

export type LanguageOption = { text: string; value: string }

export type CreateRepresentativeFormValues = Omit<
  CreateCompanyRepresentativeInput,
  'clientId' | 'portalEnabled' | 'languageIds'
> & {
  // TagSelectorInput for languages
  languageIds?: LanguageOption[]
  // booleans that final-form wants as strings :/
  portalEnabled?: 'true' | 'false'
}

export type EditRepresentativeFormValues = Omit<
  UpdateCompanyRepresentativeProfileInput,
  | 'companyRepresentativeId'
  | 'portalEnabled'
  | 'readBillingReport'
  | 'languageIds'
> & {
  // TagSelectorInput for languages
  languageIds?: LanguageOption[]
  // booleans that final-form wants as strings :/
  portalEnabled?: 'true' | 'false'
  readBillingReport?: 'true' | 'false'
}

const RepresentativeForm = ({
  clientIdOrRepresentative,
  jobId,
  onClose,
  client
}: Props) => {
  const initialValues = useInitialRepresentativeValues(clientIdOrRepresentative)

  const { handleSubmit, loading: submitting } = useHandleRepresentativeSubmit({
    clientIdOrRepresentative,
    jobId,
    onSuccess: onClose
  })

  const representative =
    typeof clientIdOrRepresentative !== 'string'
      ? clientIdOrRepresentative
      : undefined

  return (
    <PicassoForm<CreateRepresentativeFormValues | EditRepresentativeFormValues>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
    >
      <FormBaseErrorContainer bottom='medium' />

      <RepresentativeFormFields
        client={client}
        representative={representative}
      />

      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container gap='xsmall'>
              <Button
                variant='secondary'
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </Button>

              <PicassoForm.SubmitButton variant='positive'>
                Save
              </PicassoForm.SubmitButton>
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </PicassoForm>
  )
}

export default RepresentativeForm
