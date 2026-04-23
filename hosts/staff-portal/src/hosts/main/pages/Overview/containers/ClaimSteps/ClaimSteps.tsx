import React, { ComponentProps } from 'react'
import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Typography,
  Table,
  SkeletonLoader
} from '@toptal/picasso'
import pluralize from 'pluralize'
import { Link } from '@staff-portal/navigation'
import { DashboardItemWrapper, LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import { useGetClaimsWidget } from './data/get-claims-widget/get-claims-widget.staff.gql'
import * as S from './styles'

const defaultGridSize = 6

const Loader = ({
  gridSize
}: {
  gridSize: ComponentProps<typeof DashboardItemWrapper>['gridSize']
}) => (
  <DashboardItemWrapper
    hasPaddingTop={false}
    gridSize={gridSize}
    title={<SkeletonLoader.Typography style={{ width: 140 }} />}
    actions={<SkeletonLoader.Button size='small' />}
  >
    {[...new Array(3)].map((_, index) => (
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Container css={S.loaderContainer} key={index}>
        <SkeletonLoader.Typography />
        <SkeletonLoader.Typography style={{ width: 100 }} />
      </Container>
    ))}
  </DashboardItemWrapper>
)

const ClaimSteps = () => {
  const { data, loading } = useGetClaimsWidget()

  if (loading) {
    return <Loader gridSize={defaultGridSize} />
  }

  if (!data?.nodes.length) {
    return null
  }

  const { allClaimedTalentUrl, nodes } = data
  const actions = allClaimedTalentUrl && (
    <Button
      size='small'
      as={Link as typeof PicassoLink}
      href={allClaimedTalentUrl}
      variant='secondary'
    >
      All Claimed Talent
    </Button>
  )

  return (
    <DashboardItemWrapper
      hasPaddingTop={false}
      gridSize={defaultGridSize}
      title='Your Claimed Steps'
      actions={actions}
      data-testid='claim-steps'
    >
      <Table>
        <Table.Body>
          {nodes.map(
            ({
              createdAt,
              roleStepsCount,
              roleStepsTitle,
              talent: {
                id,
                webResource: { text, url }
              }
            }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Typography size='inherit' color='dark-grey'>
                    <Typography weight='semibold' as='strong'>
                      {roleStepsTitle}
                    </Typography>{' '}
                    {pluralize('step', roleStepsCount)} to{' '}
                    <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
                      {text}
                    </LinkWrapper>
                  </Typography>
                  <Typography css={S.date} size='xsmall' color='dark-grey'>
                    {getDateDistanceFromNow(createdAt)}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </DashboardItemWrapper>
  )
}

export default ClaimSteps
