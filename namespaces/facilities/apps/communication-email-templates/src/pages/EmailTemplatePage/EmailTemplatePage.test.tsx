import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { screen, render, within } from '@testing-library/react'

import EmailTemplatePage from './EmailTemplatePage'
import { useGetTemplateIdParam } from '../../hooks/use-get-template-id-param'

jest.mock('../../hooks/use-get-template-id-param', () => ({
  useGetTemplateIdParam: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const useGetTemplateIdParamMock = useGetTemplateIdParam as jest.Mock
const useQueryMock = useQuery as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EmailTemplatePage />
    </TestWrapper>
  )

const TEMPLATE_ID = 'test-template-id'
const TEMPLATE_DATA = {
  node: {
    name: '1SS - Low Budget / Less than 25',
    role: {
      id: '',
      fullName: 'Role fullName',
      webResource: {
        url: 'https://someurl.com'
      }
    },
    id: 'some-id',
    private: false,
    rawTemplate: 'some-template',
    targetRole: {
      title: 'Company'
    },
    topscreenClient: {
      id: 'id1',
      name: 'Client'
    },
    token: 'some-token',
    sendingFrom: ['PROFILE'],
    brandedTemplate: true
  }
}

const findValue = (label: string) =>
  within(screen.getByTestId(`item-field: ${label}`)).getByTestId(
    'item-field-value'
  )

describe('EmailTemplatePage', () => {
  beforeEach(() => {
    useGetTemplateIdParamMock.mockReturnValue({
      templateId: TEMPLATE_ID
    })
    useQueryMock.mockReturnValue({ data: TEMPLATE_DATA })
  })

  it('renders name field', () => {
    arrangeTest()
    const value = findValue('Name')

    expect(value).toHaveTextContent(TEMPLATE_DATA.node.name)
  })

  it('renders created by field', () => {
    arrangeTest()
    const value = findValue('Created By')

    expect(value).toHaveTextContent(TEMPLATE_DATA.node.role.fullName)
  })

  it('renders target role field', () => {
    arrangeTest()
    const value = findValue('Target Role')

    expect(value).toHaveTextContent(TEMPLATE_DATA.node.targetRole.title)
  })

  it('renders private field', () => {
    arrangeTest()
    const value = findValue('Private')

    expect(value).toHaveTextContent(TEMPLATE_DATA.node.private ? 'Yes' : 'No')
  })

  it('renders rawTemplate field', () => {
    arrangeTest()
    const value = findValue('Raw Template')

    expect(value).toHaveTextContent(TEMPLATE_DATA.node.rawTemplate)
  })

  it('renders token field', () => {
    arrangeTest()
    const value = findValue('Token')

    expect(value).toHaveTextContent('Token')
  })

  it('renders sending form field', () => {
    arrangeTest()
    const value = findValue('Sending Form')

    expect(value).toHaveTextContent('Profile')
  })

  it('renders branded template field', () => {
    arrangeTest()
    const value = findValue('Use Toptal Email Template')

    expect(value).toHaveTextContent(
      TEMPLATE_DATA.node.brandedTemplate ? 'Yes' : 'No'
    )
  })
})
