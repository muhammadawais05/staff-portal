import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery, useMutation } from '@staff-portal/data-layer-service'
import { screen, render } from '@testing-library/react'

import EmailTemplateCreate from './EmailTemplateCreate'
import { useGetTemplateIdSearchParam } from '../../hooks/use-get-template-id-search-param'
import { useGetManageEmailTemplatesPermits } from '../../components/EmailTemplateFormContent/components/EmailTemplatePrivateField/data/get-manage-email-templates-permit/get-manage-email-templates-permit.staff.gql'

jest.mock(
  '../../components/EmailTemplateFormContent/components/EmailTemplatePrivateField/data/get-manage-email-templates-permit/get-manage-email-templates-permit.staff.gql',
  () => ({
    useGetManageEmailTemplatesPermits: jest.fn()
  })
)

const useGetManageEmailTemplatesPermitsMock =
  useGetManageEmailTemplatesPermits as jest.Mock

jest.mock('../../hooks/use-get-template-id-search-param', () => ({
  useGetTemplateIdSearchParam: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}))

const useGetTemplateIdSearchParamMock = useGetTemplateIdSearchParam as jest.Mock
const useQueryMock = useQuery as jest.Mock
const useMutationMock = useMutation as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EmailTemplateCreate />
    </TestWrapper>
  )

describe('EmailTemplateCreate', () => {
  beforeEach(() => {
    useGetTemplateIdSearchParamMock.mockReturnValue({
      templateId: null
    })
    useGetManageEmailTemplatesPermitsMock.mockReturnValue({
      loading: false,
      permits: {
        canManageEmailTemplates: true
      }
    })
    useMutationMock.mockReturnValue([jest.fn()])
    useQueryMock.mockImplementation(() => ({ data: null }))
  })

  it('render fields when creating a new template', () => {
    arrangeTest()

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Raw Template')).toBeInTheDocument()
    expect(screen.getByText('Private')).toBeInTheDocument()
    expect(screen.getByText('Target Role')).toBeInTheDocument()
    expect(screen.getByText('Token')).toBeInTheDocument()
    expect(screen.getByText('Email Template')).toBeInTheDocument()
    expect(screen.getByText('Related To')).toBeInTheDocument()
  })
})
