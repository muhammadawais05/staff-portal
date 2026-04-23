import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetAgreementAcceptances } from './data/get-acceptances'
import { createGetAgreementAcceptancesQueryMock } from './data/get-acceptances/mocks'
import PublicAgreementsSection from '.'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  SectionWithDetailedListSkeleton: () => (
    <div data-testid='detailed-list-skeleton' />
  )
}))

jest.mock('./data/get-acceptances')
const useGetAgreementAcceptancesMock = useGetAgreementAcceptances as jest.Mock

const renderWrapper = (props: ComponentProps<typeof PublicAgreementsSection>) =>
  render(
    <TestWrapper>
      <PublicAgreementsSection {...props} />
    </TestWrapper>
  )

describe('PublicAgreementsSection', () => {
  it('renders loader when loading and company is not there yet', () => {
    useGetAgreementAcceptancesMock.mockReturnValue({ loading: true })

    renderWrapper({ companyId: '123' })

    expect(screen.getByTestId('detailed-list-skeleton')).toBeInTheDocument()
    expect(
      screen.queryByTestId('public-agreements-section')
    ).not.toBeInTheDocument()
  })

  it('does not render anything when there is no company', () => {
    useGetAgreementAcceptancesMock.mockReturnValue({ company: null })
    const { container } = renderWrapper({ companyId: '123' })

    expect(container.firstChild?.firstChild).toBeEmptyDOMElement()
  })

  it('does not render anything when there is no acceptances for the client', () => {
    const mockData = createGetAgreementAcceptancesQueryMock([])

    useGetAgreementAcceptancesMock.mockReturnValue({
      company: mockData.staffNode
    })

    const { container } = renderWrapper({ companyId: '123' })

    expect(container.firstChild?.firstChild).toBeEmptyDOMElement()
  })

  it('renders links to client agreement acceptances', () => {
    const mockLinks = [
      { text: 'Source Talent Agreement', url: '://sta.url' },
      { text: 'Privacy Policy', url: '://policy.url' },
      { text: 'Cookies', url: '://cookies.url' },
      { text: 'Missing url' }
    ]
    const mockData = createGetAgreementAcceptancesQueryMock(mockLinks)

    useGetAgreementAcceptancesMock.mockReturnValue({
      company: mockData.staffNode
    })

    const { container } = renderWrapper({ companyId: '123' })

    // labels
    mockLinks
      .map(link => link.text)
      .forEach(mockLabel => {
        expect(screen.getByText(mockLabel)).toBeInTheDocument()
      })

    // urls
    mockLinks
      .map(link => link.url)
      .filter(Boolean)
      .forEach(mockHref => {
        const link = container.querySelector(`[href="${mockHref}"]`)

        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveTextContent('Download PDF')
      })

    // missing url
    expect(screen.getByText('No downloadable link')).toBeInTheDocument()
  })

  it('throws error if loading fails', () => {
    useGetAgreementAcceptancesMock.mockImplementation(() => {
      throw new Error('Fail!')
    })

    // avoid error appearing on console
    const consoleErrorSpy = jest.spyOn(console, 'error')

    consoleErrorSpy.mockImplementation(() => {})

    expect(() => renderWrapper({ companyId: '123' })).toThrow('Fail!')
  })
})
