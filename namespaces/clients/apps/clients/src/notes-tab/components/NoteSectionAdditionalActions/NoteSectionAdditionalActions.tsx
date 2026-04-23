import { Checkbox, Container, Typography } from '@toptal/picasso'
import React from 'react'
import { ClientActivitiesAndNotesScope } from '@staff-portal/graphql/staff'

import * as S from './styles'

export interface Props {
  clientActivitiesAndNotesScope: ClientActivitiesAndNotesScope
  isSubsidiaryNotesSelected: boolean
  setClientActivitiesAndNotesScope: (
    scope: ClientActivitiesAndNotesScope
  ) => void
  setIsSubsidiaryNotesSelected: (checked: boolean) => void
}

const NoteSectionAdditionalActions = ({
  clientActivitiesAndNotesScope,
  isSubsidiaryNotesSelected,
  setClientActivitiesAndNotesScope,
  setIsSubsidiaryNotesSelected
}: Props) => {
  return (
    <Container css={S.container} flex padded='medium' bottom='medium'>
      <Container right='small'>
        <Typography size='medium' weight='semibold'>
          Display Activities and Subsidiary Notes:
        </Typography>
      </Container>
      <Container left='small'>
        <Checkbox
          label='Show Activities'
          data-testid='NoteSectionAdditionalActions-show-activities'
          checked={
            clientActivitiesAndNotesScope ===
            ClientActivitiesAndNotesScope.ACTIVITIES_AND_NOTES
          }
          onChange={(event, checked) =>
            setClientActivitiesAndNotesScope(
              checked
                ? ClientActivitiesAndNotesScope.ACTIVITIES_AND_NOTES
                : ClientActivitiesAndNotesScope.ONLY_NOTES
            )
          }
        />
      </Container>
      <Container left='small'>
        <Checkbox
          label='Show Subsidiary Notes'
          data-testid='NoteSectionAdditionalActions-show-subsidiary-notes'
          checked={isSubsidiaryNotesSelected}
          onChange={(event, checked) => setIsSubsidiaryNotesSelected(checked)}
        />
      </Container>
    </Container>
  )
}

export default NoteSectionAdditionalActions
