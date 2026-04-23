import React, { ComponentProps, ReactNode } from 'react'

import FeatureFlagsContainer from '.'
import renderComponent from '../../utils/tests'

let mockedUrlValue: {}

jest.mock('../../_lib/customHooks/useQueryParams', () => ({
  useQueryParams: () => [mockedUrlValue]
}))

const render = (
  children: ReactNode,
  props: ComponentProps<typeof FeatureFlagsContainer>
) =>
  renderComponent(
    <FeatureFlagsContainer {...props}>{children}</FeatureFlagsContainer>
  )

describe('FeatureFlagsContainer', () => {
  describe('when only `defaultFeatureFlags` provided', () => {
    beforeEach(() => {
      mockedUrlValue = { flag: [] }
    })

    it('default render', () => {
      const { container } = render(<h1>Test</h1>, {})

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `flags` provided', () => {
    beforeEach(() => {
      mockedUrlValue = { flag: [] }
    })

    it('default render', () => {
      const { container } = render(<h1>Test</h1>, {
        flags: { example: true }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `url` flags provided', () => {
    beforeEach(() => {
      mockedUrlValue = { flag: ['urlTestValue'] }
    })

    it('default render', () => {
      const { container } = render(<h1>Test</h1>, {
        flags: { example: true }
      })

      expect(container).toMatchSnapshot()
    })
  })
})
