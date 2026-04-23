import React from 'react'
import { Table } from '@toptal/picasso'
import { Client, Operation } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { PossibleDuplicatesSection } from '@staff-portal/facilities'

import { useGetClientPossibleDuplicates } from './utils'
import { useMarkClientDuplicatesResolved } from './hooks'
import { PossibleDuplicateRow } from './components'
import * as S from './styles'

export interface Props {
  clientId: string
  operation?: Operation
}

const PossibleDuplicatesCompaniesSection = ({ clientId, operation }: Props) => {
  const { loading, data } = useGetClientPossibleDuplicates(clientId)
  const { loading: submitting, markClientDuplicatesResolved } =
    useMarkClientDuplicatesResolved({ clientId })

  return (
    <PossibleDuplicatesSection
      loading={submitting}
      hidden={loading || data?.edges.length === 0}
      resolvePossibleDuplicates={markClientDuplicatesResolved}
      operation={operation}
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'markClientPossibleRoleDuplicatesResolved'
      }}
    >
      <Table css={S.fixedTableDisplay} data-testid='PossibleDuplicates-table'>
        <Table.Body>
          {data?.edges.map(({ node, explanation }) => (
            <PossibleDuplicateRow
              key={node?.id}
              node={node as Client}
              explanation={explanation}
            />
          ))}
        </Table.Body>
      </Table>
    </PossibleDuplicatesSection>
  )
}

export default PossibleDuplicatesCompaniesSection
