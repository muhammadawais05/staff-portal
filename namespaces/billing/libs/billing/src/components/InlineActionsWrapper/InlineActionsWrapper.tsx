import React, { ComponentPropsWithRef, isValidElement, Children } from 'react'
import { Container, ContainerProps } from '@toptal/picasso'

import { isCallableHidden } from '../../_lib/helpers/operations'

interface Props extends ContainerProps {
  marginSizeBetweenChildren?: ComponentPropsWithRef<typeof Container>['left']
}

const displayName = 'InlineActionsWrapper'

// TODO:
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
    if (
      child &&
      isValidElement(child) &&
      !isCallableHidden(child?.props?.operation?.callable)
    ) {
      return (
        <Container
          left={!index ? undefined : marginSizeBetweenChildren}
          data-testid={`${displayName}-item`}
          inline={inline}
          as={as}
        >
          {child}
        </Container>
      )
    }
  })

  return (
    <Container inline={inline} flex={flex} as={as} {...rest}>
      {containerWrappedChildren}
    </Container>
  )
}

InlineActionsWrapper.displayName = displayName

export default InlineActionsWrapper
