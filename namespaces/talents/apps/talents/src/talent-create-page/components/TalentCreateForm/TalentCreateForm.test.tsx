/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import TalentCreateForm from './TalentCreateForm'
import { useCreateTalentProfile } from './hooks'
import TalentCreatePositionField from '../TalentCreatePositionField'
import { TalentTypes } from '../../constants'

jest.mock('./hooks/use-create-talent-profile')
jest.mock('../TalentCreateSkillsField', () => ({
  __esModule: true,
  default: () => (
    <>
      <div aria-labelledby='skills' />
      <label id='skills'>Skills</label>
    </>
  )
}))

jest.mock('@staff-portal/talents', () => ({
  ...jest.requireActual('@staff-portal/talents'),
  TalentLocationFields: () => <div data-testid='talent-location-fields' />
}))

jest.mock('../TalentReferrerField', () => () => (
  <div data-testid='talent-referrer-fields' />
))
jest.mock('../TalentPartnerField', () => () => <div>Talent Partner</div>)
jest.mock('../ApplicationQuestions', () => ({
  __esModule: true,
  default: () => <div data-testid='application-questions' />
}))

const TalentCreatePositionFieldMock = TalentCreatePositionField as jest.Mock

jest.mock('../TalentCreatePositionField', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockUseCreateTalentProfile = useCreateTalentProfile as jest.Mock
const mockHandleSubmit = jest.fn()

const arrangeTest = (talentType: string) => {
  mockUseCreateTalentProfile.mockImplementation(() => ({
    handleSubmit: mockHandleSubmit
  }))

  TalentCreatePositionFieldMock.mockImplementation(() => (
    <>
      <label htmlFor='topscreenPositionId'>TopScreen position</label>
      <Form.Input name='topscreenPositionId' id='topscreenPositionId' />
    </>
  ))

  return render(
    <TestWrapper>
      <TalentCreateForm
        talentType={talentType}
        verticalId='123'
        permits={{ assignTalentPartner: true }}
      />
    </TestWrapper>
  )
}

describe('TalentCreateForm', () => {
  it('renders form content', () => {
    arrangeTest('Developer')

    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Skype/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/About Me/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Skills/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Full legal name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Personal website URL/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/LinkedIn profile URL/i)).toBeInTheDocument()
    expect(screen.queryByTestId('talent-location-fields')).toBeInTheDocument()
    expect(screen.queryByTestId('application-questions')).toBeInTheDocument()
    expect(
      screen.queryByLabelText(/TopScreen position/i)
    ).not.toBeInTheDocument()
  })

  it('renders topscreen fields', () => {
    arrangeTest(TalentTypes.TOP_SCREEN)

    expect(screen.getByLabelText(/TopScreen position/i)).toBeInTheDocument()
  })

  it('handles form submit', async () => {
    const mockFormInput = {
      fullName: 'Test Name',
      email: 'test@email.com',
      skype: 'test_username',
      about: 'Lorem ipsum',
      legalName: 'Test Legal Name',
      phoneNumber: '123123123',
      website: 'www.testurl.website.com',
      linkedin: 'www.testurl.linkedin.com'
    }

    arrangeTest('Finance Expert')

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: mockFormInput.fullName }
      })
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: mockFormInput.email }
      })
      fireEvent.change(screen.getByLabelText(/skype/i), {
        target: { value: mockFormInput.skype }
      })
      fireEvent.change(screen.getByLabelText(/about me/i), {
        target: { value: mockFormInput.about }
      })
      fireEvent.change(screen.getByLabelText(/Full legal name/i), {
        target: { value: mockFormInput.legalName }
      })
      fireEvent.change(screen.getByLabelText(/Phone number/i), {
        target: { value: mockFormInput.phoneNumber }
      })
      fireEvent.change(screen.getByLabelText(/Personal website URL/i), {
        target: { value: mockFormInput.website }
      })
      fireEvent.change(screen.getByLabelText(/LinkedIn profile URL/i), {
        target: { value: mockFormInput.linkedin }
      })

      fireEvent.click(
        screen.getByRole('button', { name: /Add Finance Expert/i })
      )
    })

    expect(mockHandleSubmit).toHaveBeenCalledWith(
      mockFormInput,
      expect.anything(),
      expect.anything()
    )
  })
})
