import React, { useCallback } from 'react'
import { ArrowDownMinor16, Button } from '@toptal/picasso'
import { Transitions } from '@toptal/picasso/utils'
import { useQueryParamsState } from '@staff-portal/query-params-state'

import { PerformedActionsQueryParams } from '../../types'
import { PERFORMED_ACTIONS_QUERY_PARAMS_CONFIG } from '../../config'

const PerformedActionsListExpandCommentsButton = () => {
  const [urlValues, setUrlValues] =
    useQueryParamsState<PerformedActionsQueryParams>(
      PERFORMED_ACTIONS_QUERY_PARAMS_CONFIG
    )

  const areCommentsExpanded = urlValues.comments

  const handleClick = useCallback(() => {
    setUrlValues({
      ...urlValues,
      comments: !areCommentsExpanded
    })
  }, [areCommentsExpanded, urlValues, setUrlValues])

  return (
    <Button
      data-testid='performed-actions-list-expand-comments-button'
      size='small'
      onClick={handleClick}
      icon={
        <Transitions.Rotate180 on={areCommentsExpanded}>
          <ArrowDownMinor16 />
        </Transitions.Rotate180>
      }
      iconPosition='right'
      variant='secondary'
    >
      {areCommentsExpanded ? 'Collapse Comments' : 'Expand Comments'}
    </Button>
  )
}

export default PerformedActionsListExpandCommentsButton
