import React, { ReactNode } from 'react'
import { Button, Dropdown, Menu, Typography, Loader } from '@toptal/picasso'
import { Vertical as VerticalType } from '@staff-portal/graphql/staff'
import { getCreateTalentProfilePath } from '@staff-portal/routes'
import { ApolloError } from '@staff-portal/data-layer-service'
import { MenuLink } from '@staff-portal/ui'
import { titleize, compareAlphabetically } from '@staff-portal/string'

import * as S from './styles'

const ItemWrapper = ({ children }: { children: ReactNode }) => (
  <Typography size='xsmall' css={S.itemWrapper}>
    {children}
  </Typography>
)

const ErrorItem = () => (
  <Menu.Item>
    <ItemWrapper>An error occurred!</ItemWrapper>
  </Menu.Item>
)

const LoadingItem = () => (
  <Menu.Item>
    <ItemWrapper>
      <Loader />
    </ItemWrapper>
  </Menu.Item>
)

const TOP_SCREEN_TYPE = 'top_screen'

const getTitle = (talentType: string) => {
  if (talentType === TOP_SCREEN_TYPE) {
    return titleize(talentType, { separator: '' })
  }

  return titleize(talentType)
}

export const AddTalentButton = ({
  verticals,
  loading,
  error
}: {
  verticals?: Pick<VerticalType, 'id' | 'talentType'>[]
  loading?: boolean
  error?: ApolloError
}) => {
  const alphabeticallySortedVerticals =
    verticals?.length &&
    [...verticals].sort((first, second) =>
      compareAlphabetically(first.talentType, second.talentType)
    )

  return (
    <Dropdown
      content={
        <Menu>
          {loading && <LoadingItem />}
          {error && <ErrorItem />}
          {alphabeticallySortedVerticals &&
            alphabeticallySortedVerticals.map(({ id, talentType }) => (
              <Menu.Item
                key={id}
                as={MenuLink}
                href={getCreateTalentProfilePath(talentType)}
                data-testid={`talent-type-${talentType}`}
              >
                <ItemWrapper>{getTitle(talentType)}</ItemWrapper>
              </Menu.Item>
            ))}
        </Menu>
      }
    >
      <Button variant='positive' size='small' data-testid='add-new-talent'>
        Add New Talent
        <Dropdown.Arrow />
      </Button>
    </Dropdown>
  )
}

export default AddTalentButton
