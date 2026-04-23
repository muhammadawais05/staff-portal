import React from 'react'
import { Container, Typography, ShowMore } from '@toptal/picasso'
import {
  Operation,
  UpdateCompanyRepresentativeProfileInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { UpdateCompanyRepresentativeInformationDocument } from './data'
import { getRepresentativeInformationHook } from './utils/get-representative-information-hook'
import * as S from './styles'

const MAX_UNTRUNCATED_CHARS = 200

export type Props = {
  companyRepresentativeId: string
  value?: string | null
  operation?: Operation
}

const EditableInformation = ({
  companyRepresentativeId,
  value,
  operation
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateCompanyRepresentativeInformationDocument,
    initialValues: {
      information: value
    },
    requiredValues: {
      companyRepresentativeId
    }
  })

  const content = value || NO_VALUE

  return (
    <EditableField<Pick<UpdateCompanyRepresentativeProfileInput, 'information'>>
      value={value || ''}
      queryValue={getRepresentativeInformationHook(companyRepresentativeId)}
      name='information'
      onChange={handleChange}
      fullWidthEditor
      disabled={!isOperationEnabled(operation)}
      editor={props => <EditableTextarea {...props} />}
      viewer={
        <Container right='xsmall' css={S.editableInfoContainer}>
          {content.length > MAX_UNTRUNCATED_CHARS ? (
            <ShowMore rows={18} css={S.information}>
              {content}
            </ShowMore>
          ) : (
            <Typography size='medium' css={S.information}>
              {content}
            </Typography>
          )}
        </Container>
      }
    />
  )
}

export default EditableInformation
