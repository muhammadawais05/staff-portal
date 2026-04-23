// eslint-disable-next-line no-restricted-imports
import {
  Button,
  Container,
  Table,
  Typography,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { getReferralUsersPath } from '@staff-portal/routes'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { ReferredRoleEdgeFragment } from '../../data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'
import { getReferralRole } from '../../services/get-referral-role/get-referral-role'
import ReferralStatus from '../ReferralStatus/ReferralStatus'
import ReferralUser from '../ReferralUser/ReferralUser'

export interface Props {
  hasMore?: boolean
  referrals: ReferredRoleEdgeFragment[]
}

const AvailableReferrals = ({ referrals, hasMore = false }: Props) => {
  const currentUser = useGetCurrentUser()

  return (
    <Container
      bordered
      rounded
      padded='medium'
      top='large'
      data-testid='available-referrals'
    >
      <Container
        flex
        direction='row'
        justifyContent='space-between'
        bottom='small'
        alignItems='center'
      >
        <Typography variant='heading' size='small'>
          Recently Referred Users
        </Typography>

        {hasMore && (
          <Button
            as={Link as typeof PicassoLink}
            size='small'
            variant='secondary'
            data-testid='see-all-referrals-button'
            href={getReferralUsersPath()}
          >
            See All
          </Button>
        )}
      </Container>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Applied</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {referrals.map(
            ({
              createdAt,
              statusText,
              statusCategory,
              statusTooltip,
              node
            }) => (
              <Table.Row key={node.id}>
                <Table.Cell>
                  <ReferralUser referral={node} />
                </Table.Cell>
                <Table.Cell>
                  {parseAndFormatDate(createdAt, {
                    timeZone: currentUser?.timeZone?.value
                  })}
                </Table.Cell>
                <Table.Cell titleCase>{getReferralRole(node)}</Table.Cell>
                <Table.Cell titleCase>
                  <ReferralStatus
                    statusText={statusText}
                    statusCategory={statusCategory}
                    statusTooltip={statusTooltip}
                  />
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default AvailableReferrals
