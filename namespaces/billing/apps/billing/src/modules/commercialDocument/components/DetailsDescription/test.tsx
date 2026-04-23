import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DetailsDescription from '.'

const render = (props: ComponentProps<typeof DetailsDescription>) =>
  renderComponent(<DetailsDescription {...props} />)

describe('DetailsDescription', () => {
  describe('`description` is `undefined`', () => {
    describe('`documentNote` is `undefined`', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          description: undefined,
          documentNote: undefined
        })

        expect(
          queryByTestId('DetailsDescription-description-title')
        ).not.toBeInTheDocument()
        expect(
          queryByTestId('DetailsDescription-description')
        ).not.toBeInTheDocument()
        expect(
          queryByTestId('DetailsDescription-documentNote')
        ).not.toBeInTheDocument()
        expect(queryByTestId('MultilineComment')).not.toBeInTheDocument()
      })
    })

    describe('`documentNote` is `defined`', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          description: undefined,
          documentNote: 'example document Note'
        })

        expect(
          queryByTestId('DetailsDescription-description')
        ).not.toBeInTheDocument()
        expect(queryByTestId('DetailsDescription-documentNote')).toContainHTML(
          'Note'
        )
        expect(queryByTestId('MultilineComment')).toContainHTML(
          'example document Note'
        )
      })
    })
  })

  describe('`description` is `defined`', () => {
    describe('`documentNote` is `undefined`', () => {
      it('default render', () => {
        const { queryByTestId, getAllByTestId } = render({
          description: 'example description',
          documentNote: undefined
        })

        expect(
          queryByTestId('DetailsDescription-description-title')
        ).toContainHTML('Description')
        expect(
          getAllByTestId('DetailsDescription-description')[1]
        ).toContainHTML('example description')
        expect(
          queryByTestId('DetailsDescription-documentNote')
        ).not.toBeInTheDocument()
        expect(queryByTestId('MultilineComment')).not.toBeInTheDocument()
      })
    })

    describe('`documentNote` is `defined`', () => {
      it('default render', () => {
        const { queryByTestId, getAllByTestId } = render({
          description: 'example description',
          documentNote: 'example document Note'
        })

        expect(
          queryByTestId('DetailsDescription-description-title')
        ).toContainHTML('Description')
        expect(
          getAllByTestId('DetailsDescription-description')[1]
        ).toContainHTML('example description')
        expect(queryByTestId('DetailsDescription-documentNote')).toContainHTML(
          'Note'
        )
        expect(queryByTestId('MultilineComment')).toContainHTML(
          'example document Note'
        )
      })
    })
  })
})
