import { TypographyOverflow } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import { DetailedListValueViewOptions } from '../types'

/**
 *
 * @deprecated:
 * 1. 'string' values will be auto-wrapped by DetailedList itself (see DetailedListItemContent);
 * 2. most of custom components have own logic and own layout;
 * 3. you may also have some overlapping issues like that: https://toptal-core.atlassian.net/browse/SPB-2507
 * 4. this TypographyOverflow does not support `tooltipVariant` prop,
 *    namely if Link is auto-wrapped, it will be unreadable (blue colored text on dark bg)
 * so this wrap is obsolete and bad. DON'T USE IT.
 */
export const wrapInTypography = (
  content: ReactNode,
  { size, color, weight }: DetailedListValueViewOptions,
  defaultValue?: string
) => (
  <TypographyOverflow as='div' size={size} color={color} weight={weight} noWrap>
    {content ?? defaultValue}
  </TypographyOverflow>
)
