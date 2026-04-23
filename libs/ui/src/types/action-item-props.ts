import {
  ButtonProps as PicassoButtonProps,
  MenuItemProps as PicassoMenuItemProps
} from '@toptal/picasso'

export type ActionItemComponentType = 'button' | 'menu-item'

export type ActionButtonProps = Omit<
  PicassoButtonProps,
  'children' | 'onClick'
> & {
  componentType: 'button'
}

export type ActionMenuItemProps = Omit<
  PicassoMenuItemProps,
  'children' | 'onClick'
> & {
  componentType: 'menu-item'
}

export type ActionItemProps = ActionButtonProps | ActionMenuItemProps
