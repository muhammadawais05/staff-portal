import { defineDependency } from '@staff-portal/dependency-injector'
import { FC } from 'react'

import { CustomStatusMessageOptions } from './contexts'

export const STATUS_MESSAGES_COMPONENT = defineDependency<
  FC<{
    customStatusMessages: CustomStatusMessageOptions[]
  }>
>()
