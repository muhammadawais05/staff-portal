import React, { ReactNode } from 'react'
import { Avatar, Button, Grid, Link, Search16, Container } from '@toptal/picasso'
import type { AvatarSizeType } from '@toptal/picasso/Avatar/Avatar'

import * as S from './styles'
import EditButton from './components/EditButton/EditButton'

export type ActionItem = {
  key: string
  action: ReactNode
  /** `true` by default */
  showOnlyOnHover?: boolean
}

export type Props = {
  fullName: string
  size?: Extract<AvatarSizeType, 'medium' | 'large'>
  src?: string | null
  originalImageUrl?: string | null
  actions?: ActionItem[]
}

export const AvatarWithActions = ({
  fullName,
  size = 'medium',
  src,
  originalImageUrl,
  actions
}: Props) => (
  <Container css={S.avatarElementsWrapper} className='avatar-elements-wrapper'>
    <Avatar size={size} name={fullName} src={src || undefined} />
    <Grid css={S.iconsGrid(size)} direction='column' spacing={8}>
      {actions
        ?.filter(({ action }) => action)
        .map(({ action, key, showOnlyOnHover }) => (
          <Grid.Item
            key={key}
            css={[showOnlyOnHover !== false && S.shownOnHover]}
          >
            {action}
          </Grid.Item>
        ))}

      {originalImageUrl && (
        <Grid.Item css={S.shownOnHover}>
          <Button.Circular
            data-testid='avatar-editor-open-original-button'
            icon={<Search16 />}
            as={Link}
            href={originalImageUrl}
            target='_blank'
            rel='noopener noreferrer'
          />
        </Grid.Item>
      )}
    </Grid>
  </Container>
)

AvatarWithActions.EditButton = EditButton

export default AvatarWithActions
