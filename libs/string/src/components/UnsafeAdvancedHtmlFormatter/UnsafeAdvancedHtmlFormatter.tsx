import React from 'react'

export type Props = {
  as?: 'div' | 'span'
  className?: string
  html: string
  'data-testid'?: string
}

const UnsafeAdvancedHtmlFormatter = ({
  as: TagName = 'div',
  html,
  ...restProps
}: Props) => {
  return <TagName dangerouslySetInnerHTML={{ __html: html }} {...restProps} />
}

export default UnsafeAdvancedHtmlFormatter
