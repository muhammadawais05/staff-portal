import React, { ComponentPropsWithRef, isValidElement, Children } from 'react'
import { Container, ContainerProps } from '@toptal/picasso'

import { isOperationHidden } from '../../utils'

interface Props extends ContainerProps {
  marginSizeBetweenChildren?: ComponentPropsWithRef<typeof Container>['left']
}

// TODO: https://toptal-core.atlassian.net/browse/SPB-2518
// Possibly switch for Grid and gap css approach
const InlineActionsWrapper = ({
  // Default value between the buttons, desired 1em
  marginSizeBetweenChildren = 'small',
  children,
  flex = true,
  inline = true,
  as = 'span',
  ...rest
}: Props) => {
  const containerWrappedChildren = Children.map(children, (child, index) => {
    if (!child || !isValidElement(child)) {
      return
    }

    const operation = child?.props?.operation || child?.props?.initialOperation

    if (!operation || !isOperationHidden(operation)) {
      return (
        <Container
          left={!index ? undefined : marginSizeBetweenChildren}
          data-testid='InlineActionsWrapper-item'
          inline={inline}
          as={as}
        >
          {child}
        </Container>
      )
    }
  })

  return (
    <Container
      data-testid='InlineActionsWrapper'
      inline={inline}
      flex={flex}
      as={as}
      {...rest}
    >
      {containerWrappedChildren}
    </Container>
  )
}

export default InlineActionsWrapper
