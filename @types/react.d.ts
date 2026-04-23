/* eslint-disable import/no-extraneous-dependencies */
import { Component, ComponentProps, ComponentType, FC } from 'react'
import { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    // NOTE: unlike the plain javascript version, it is not possible to get access
    // to the element's own attributes inside function interpolations.
    // Only theme will be accessible, and only with the DefaultTheme due to the global
    // nature of this declaration.
    // If you are writing this inline you already have access to all the attributes anyway,
    // no need for the extra indirection.
    /**
     * If present, this React element will be converted by
     * `babel-plugin-styled-components` into a styled component
     * with the given css as its styles.
     */
    css?: CSSProp
    // reason: https://toptal-core.atlassian.net/browse/SPB-3063
    forwardedAs?: string | Component | FC
  }

  // required to override clashing storybook types
  interface DOMAttributes {
    css?: CSSProp
    forwardedAs?: string | Component | FC
  }

  /**
   * Fix for react component generic parameters that are lost when a component wrapped inside `memo`
   *
   * https://fettblog.eu/typescript-react-generic-forward-refs/
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  function memo<T extends ComponentType<any>>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Component: T,
    propsAreEqual?: (
      prevProps: Readonly<ComponentProps<T>>,
      nextProps: Readonly<ComponentProps<T>>
    ) => boolean
  ): T & { displayName?: string }
}

/**
 * storybook includes the emotion css lib
 * which clashes with the styles-components typings for `css` prop.
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-759730109
 */
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp
    }
  }
}
