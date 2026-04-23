import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ListTable from '.'

const render = (props: ComponentProps<typeof ListTable>) =>
  renderComponent(<ListTable {...props} />)

describe('ListTable', () => {
  describe('when there is data', () => {
    it('renders body', () => {
      const { container } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: (
          <tbody>
            <tr>
              <td>body</td>
            </tr>
          </tbody>
        ),
        loading: false
      })

      expect(container).toContainHTML('<thead><tr><th>header</th></tr></thead>')
      expect(container).toContainHTML('<tbody><tr><td>body</td></tr></tbody>')
    })
  })

  describe('when data is loading', () => {
    it('renders loader', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: (
          <tbody>
            <tr>
              <td>body</td>
            </tr>
          </tbody>
        ),
        loading: true
      })

      expect(getByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    })
  })

  describe('when search result is empty', () => {
    it('renders empty search result message', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: '',
        loading: false
      })

      expect(getByTestId('ListTable-empty')).toContainHTML(
        'There are no results for this search criteria'
      )
    })
  })

  describe('when you pass fixedHeight prop', () => {
    it('renders container with style', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: (
          <tbody>
            <tr>
              <td>body</td>
            </tr>
          </tbody>
        ),
        loading: false,
        fixedHeight: '200px'
      })

      expect(getByTestId('ListTable-container')).toHaveStyle(
        'overflow: auto; height: 200px'
      )
    })
  })

  describe('when there is no data', () => {
    it('renders string empty message', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: '',
        emptyMessage: 'test',
        loading: false
      })

      expect(getByTestId('ListTable-empty')).toContainHTML('test')
    })

    it('renders react element empty message', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: '',
        emptyMessage: <div data-testid='ListTable-empty-content' />,
        loading: false
      })

      expect(getByTestId('ListTable-empty-content')).toBeInTheDocument()
    })

    it('renders empty message with icon', () => {
      const { getByTestId } = render({
        header: (
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
        ),
        body: '',
        loading: false,
        emptyMessage: 'test',
        emptyIcon: <div data-testid='customEmptyIcon' />
      })

      expect(getByTestId('customEmptyIcon')).toBeInTheDocument()
    })
  })
})
