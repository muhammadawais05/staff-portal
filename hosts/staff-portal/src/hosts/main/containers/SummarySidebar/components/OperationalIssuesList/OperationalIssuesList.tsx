import React, { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Table,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import DOMPurify from 'dompurify'
import { useNotifications } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { RoleOwnedOperationalIssueScope } from '@staff-portal/graphql/staff'
import { getOperationalIssuePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { OperationalIssueBadge } from '@staff-portal/operational-issues'

import { OperationalIssueOffsetConnectionFragment } from '../OperationalIssuesModal/data/get-latest-owned-operational-issues'
import * as S from './styles'
import { INITIAL_OPERATIONAL_ISSUES_COUNT } from '../../config'
import { useGetOwnedOperationalIssues } from './data'

export interface Props {
  operationalIssues?: OperationalIssueOffsetConnectionFragment | null
  ownerId: string
  scope: RoleOwnedOperationalIssueScope
}

const LOAD_STEP = 100

const OperationalIssuesList = ({
  operationalIssues,
  ownerId,
  scope
}: Props) => {
  const formatDate = useUserDateFormatter()
  const { showError } = useNotifications()
  const [numberOfDisplayedItems, setNumberOfDisplayedItems] = useState(
    INITIAL_OPERATIONAL_ISSUES_COUNT
  )

  const { getOperationalIssues, resetQueryCache, loading, data } =
    useGetOwnedOperationalIssues({
      onError: () => showError('Unable to fetch operational issues.')
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetQueryCache(), [])
  useEffect(() => {
    if (numberOfDisplayedItems > INITIAL_OPERATIONAL_ISSUES_COUNT) {
      const pagination = {
        limit: LOAD_STEP,
        offset: numberOfDisplayedItems - LOAD_STEP
      }

      getOperationalIssues({ ownerId, scope, pagination })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfDisplayedItems])

  if (!operationalIssues) {
    return null
  }

  const displayedOperationalIssues = [...operationalIssues.nodes, ...data]
  const hasOcurrencies =
    displayedOperationalIssues.filter(
      ({ occurrencesCount }) => occurrencesCount && occurrencesCount > 1
    ).length > 0

  return (
    <Container css={S.listContainer}>
      <Table>
        <Table.Body>
          {displayedOperationalIssues.map(
            ({
              id,
              description,
              descriptionWithLinks,
              lastTimeOccurredAt,
              occurrencesCount,
              template
            }) => (
              <Table.Row key={id} css={S.tableRow}>
                <Table.Cell css={S.occurrencesColumn} align='center'>
                  {occurrencesCount && occurrencesCount > 1 && (
                    <Container>
                      <OperationalIssueBadge count={occurrencesCount} />
                    </Container>
                  )}
                </Table.Cell>
                <Table.Cell css={S.dateColumn}>
                  <Container>
                    <Typography noWrap weight='semibold' align='right'>
                      <Link
                        href={getOperationalIssuePath(decodeEntityId(id).id)}
                      >
                        {formatDate(lastTimeOccurredAt)}
                      </Link>
                    </Typography>
                  </Container>
                </Table.Cell>
                {template?.name && (
                  <Table.Cell css={S.nameColumn}>
                    <Container>
                      <TypographyOverflow weight='semibold'>
                        {template.name as string}
                      </TypographyOverflow>
                    </Container>
                  </Table.Cell>
                )}
                {descriptionWithLinks && (
                  <Table.Cell css={S.descriptionColumn(hasOcurrencies)}>
                    <Container>
                      <TypographyOverflow
                        noWrap
                        tooltipContent={description}
                        css={S.description}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(descriptionWithLinks)
                        }}
                      />
                    </Container>
                  </Table.Cell>
                )}
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>

      {displayedOperationalIssues.length < operationalIssues.totalCount && (
        <Container top='small'>
          <Button
            fullWidth
            onClick={() =>
              setNumberOfDisplayedItems(numberOfDisplayedItems + LOAD_STEP)
            }
            loading={loading}
            variant='secondary'
            size='small'
          >
            {`load next ${LOAD_STEP} issues`}
          </Button>
        </Container>
      )}

      {displayedOperationalIssues.length === 0 && (
        <Container top='small'>
          <Typography align='center' color='dark-grey'>
            There are no operational issues to show here.
          </Typography>
        </Container>
      )}
    </Container>
  )
}

export default OperationalIssuesList
