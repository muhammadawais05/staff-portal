import React, { ReactNode } from 'react'
import { Section, Button } from '@toptal/picasso'
import { Operation } from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'

import * as S from './styles'

interface Props {
  children: ReactNode
  resolvePossibleDuplicates: () => void
  loading: boolean
  operation?: Operation
  hidden?: boolean
  operationVariables: GetLazyOperationVariables
}

const PossibleDuplicatesSection = ({
  children,
  resolvePossibleDuplicates: markAsDuplicated,
  loading,
  operationVariables,
  operation,
  hidden
}: Props) => {
  if (hidden) {
    return null
  }

  return (
    <Section
      css={S.section}
      data-testid='possible-duplicates-section'
      title='Possible Duplicates Found'
      variant='withHeaderBar'
      actions={
        <LazyOperation
          initialOperation={operation}
          getLazyOperationVariables={operationVariables}
        >
          {({ disabled, loading: operationLoading }) => (
            <Button
              size='small'
              variant='secondary'
              disabled={disabled || operationLoading}
              loading={loading}
              onClick={markAsDuplicated}
              data-testid='PossibleDuplicates-mark-as-resolved'
            >
              Mark as resolved
            </Button>
          )}
        </LazyOperation>
      }
    >
      {children}
    </Section>
  )
}

export default PossibleDuplicatesSection
