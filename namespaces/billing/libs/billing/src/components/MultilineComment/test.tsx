import React from 'react'

import MultilineComment from '.'
import renderComponent from '../../utils/tests'

const render = (children?: string) =>
  renderComponent(<MultilineComment>{children}</MultilineComment>)

describe('MultilineComment:', () => {
  describe('single-line text', () => {
    it('renders no <br /> elements', () => {
      const { getByText, container } = render('test test')

      expect(getByText('test test')).toBeInTheDocument()
      expect(container.querySelectorAll('br')).toHaveLength(0)
    })
  })

  describe('text with a linebreak', () => {
    it('renders one <br /> element', () => {
      const { container } = render(
        `test
test`
      )

      expect(container.querySelectorAll('br')).toHaveLength(1)
    })
  })

  describe('text with escape sequence newline and carriage return characters', () => {
    it('renders one <br /> element', () => {
      const { container } = render('test\r\ttest')

      expect(container.querySelectorAll('br')).toHaveLength(0)
    })
  })

  describe('text with multiple linebreaks', () => {
    it('renders multiple <br /> elements', () => {
      const { container } = render(
        `test


test
test
`
      )

      expect(container.querySelectorAll('br')).toHaveLength(5)
    })
  })

  describe('when text includes url', () => {
    it('renders a formatted link', () => {
      const { container } = render(
        ' test https://toptal-core.atlassian.net/browse/SPB-1466 example '
      )

      expect(container.querySelectorAll('a')).toHaveLength(1)
    })
  })

  describe('when no text is passed', () => {
    it('renders nothing', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('MultilineComment')).toBeNull()
    })
  })
})
