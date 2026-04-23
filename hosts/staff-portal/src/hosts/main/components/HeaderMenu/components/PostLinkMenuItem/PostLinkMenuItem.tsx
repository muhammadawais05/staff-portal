import React, { createRef } from 'react'
import { Menu } from '@toptal/picasso'

interface Props {
  path: string
  label: string
}

const PostLinkMenuItem = ({ path, label }: Props) => {
  const inputRef = createRef<HTMLInputElement>()

  return (
    <>
      <form
        action={path}
        method='post'
        css={{ display: 'none' }}
        data-testid='action-form'
      >
        <input ref={inputRef} type='submit' />
      </form>
      <Menu.Item
        key={label}
        onClick={() => inputRef.current?.click()}
      >
        {label}
      </Menu.Item>
    </>
  )
}

export default PostLinkMenuItem
