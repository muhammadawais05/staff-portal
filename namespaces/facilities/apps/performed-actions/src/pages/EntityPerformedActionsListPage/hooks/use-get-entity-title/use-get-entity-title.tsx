import React from 'react'

import { PERFORMED_ACTIONS_BASE_TITLE } from '../../../../config'
import { PerformedActionsTitle } from '../../../../components'
import { PerformedActionEntityLink } from '../../types'

export type Props = {
  loading: boolean
  entityLink: PerformedActionEntityLink
}

const useGetEntityTitle = ({ loading, entityLink }: Props) => {
  const baseTitle =
    loading || !entityLink?.text
      ? PERFORMED_ACTIONS_BASE_TITLE
      : `${PERFORMED_ACTIONS_BASE_TITLE} for`

  const browserTitle = entityLink?.text
    ? `${baseTitle} ${entityLink?.text}`
    : baseTitle

  const title = (
    <PerformedActionsTitle title={baseTitle} entityLink={entityLink} />
  )

  return {
    browserTitle,
    title
  }
}

export default useGetEntityTitle
