import pathOr from 'ramda/src/pathOr'
import { useMemo } from 'react'
import { PLATFORM_CONTEXT, gql, useQuery } from '@staff-portal/data-layer-service'

import { ModelDescription } from '../../../template-compiler/types'

const fragments = {
  modelDescriptionLink: gql`
    fragment ModelDescriptionLink on ModelDescriptionLink {
      text
      accessible
      options {
        name
        value
      }
      path
    }
  `,
  modelDescriptionLabel: gql`
    fragment ModelDescriptionLabel on ModelDescriptionLabel {
      text
    }
  `,
  modelDescriptionTemplate: gql`
    fragment ModelDescriptionTemplate on ModelDescriptionTemplate {
      template
      variables {
        name
        value {
          ...ModelDescriptionLabel
          ...ModelDescriptionLink
        }
      }
    }
  `
}

export const MODEL_DESCRIPTION_QUERY = gql`
  query ModelDescriptions($gids: [GID!]!) {
    modelDescriptions(gids: $gids) {
      gid
      associationReferences {
        name
        reference {
          ...ModelDescriptionLink
          ...ModelDescriptionTemplate
          ...ModelDescriptionLabel
        }
      }
      designation
      reference {
        ...ModelDescriptionLink
        ...ModelDescriptionTemplate
        ...ModelDescriptionLabel
      }
    }
  }

  ${fragments.modelDescriptionLink}
  ${fragments.modelDescriptionLabel}
  ${fragments.modelDescriptionTemplate}
`

export const useModelDescriptionsQuery = (gids: string[]) => {
  const { data, ...rest } = useQuery<ModelDescription[], { gids: string[] }>(
    MODEL_DESCRIPTION_QUERY,
    {
      skip: !gids.length,
      variables: { gids: gids },
      context: { type: PLATFORM_CONTEXT }
    }
  )

  const entries = useMemo(
    () => pathOr<ModelDescription[]>([], ['modelDescriptions'], data),
    [data]
  )

  return { data: entries, ...rest }
}
