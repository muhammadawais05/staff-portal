import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import useGetEntityTitle from './use-get-entity-title'
import { PERFORMED_ACTIONS_BASE_TITLE } from '../../../../config'

const arrangeTest = (titleComponent: ReactNode) => {
  render(<TestWrapper>{titleComponent}</TestWrapper>)
}

describe('useGetEntityTitle', () => {
  const baseTitle = PERFORMED_ACTIONS_BASE_TITLE
  const fullTitle = `${baseTitle} for Timofei Kachalov`

  describe('when title is loading', () => {
    it('renders a valid title', () => {
      const { result } = renderHook(() =>
        useGetEntityTitle({
          loading: true,
          entityLink: undefined
        })
      )

      arrangeTest(result.current.title)

      expect(result.current.browserTitle).toBe(baseTitle)
      expect(
        screen.getAllByText(
          (content, element) => element?.textContent === baseTitle
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when link text is missing', () => {
    it('renders a valid title', () => {
      const { result } = renderHook(() =>
        useGetEntityTitle({
          loading: false,
          entityLink: {}
        })
      )

      arrangeTest(result.current.title)

      expect(result.current.browserTitle).toBe(baseTitle)
      expect(
        screen.getAllByText(
          (content, element) => element?.textContent === baseTitle
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when link text is exists', () => {
    it('renders a valid title', () => {
      const { result } = renderHook(() =>
        useGetEntityTitle({
          loading: false,
          entityLink: {
            text: 'Timofei Kachalov',
            url: 'url'
          }
        })
      )

      arrangeTest(result.current.title)

      expect(result.current.browserTitle).toBe(fullTitle)
      expect(
        screen.getAllByText(
          (content, element) => element?.textContent === fullTitle
        )[0]
      ).toBeInTheDocument()
    })
  })
})
