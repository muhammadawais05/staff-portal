/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import TalentUpdateForm from './TalentUpdateForm'
import { getInitialValues } from './utils/get-initial-values'
import { useUpdateTalentProfile } from './data/update-talent-profile/update-talent-profile.staff.gql'

const ROLE_AVATAR_EDITOR_ID = 'ROLE_AVATAR_EDITOR_ID'

jest.mock('@staff-portal/languages', () => ({
  LanguagesTagSelector: () => <div />
}))
jest.mock('@staff-portal/role-profile', () => ({
  RoleAvatarEditor: () => <div data-testid={ROLE_AVATAR_EDITOR_ID} />
}))

jest.mock('./utils/get-initial-values')
jest.mock('./data/update-talent-profile/update-talent-profile.staff.gql')
jest.mock('../TalentPartnersField', () => () => <div>Talent Partner</div>)

jest.mock('@staff-portal/talents', () => ({
  ...jest.requireActual('@staff-portal/talents'),
  TalentLocationFields: () => <div data-testid='talent-location-fields' />
}))

const getInitialValuesMock = getInitialValues as jest.Mock
const useUpdateTalentProfileMock = useUpdateTalentProfile as jest.Mock

const DEFAULT_TALENT = {
  id: 'TALENT_ID',
  fullName: 'Talent Name',
  email: 'email@email.com',
  toptalEmail: 'toptalEmail@email.com',
  phoneNumber: '+1113900922',
  skype: null,
  legalName: null,
  billingName: null,
  useBillingName: false,
  type: 'TalentType',
  webResource: { url: 'talent.url' },
  locationV2: {
    country: {
      id: 'VjEtQ291bnRyeS0xMDI',
      name: 'India'
    },
    cityName: 'Bengaluru'
  },
  citizenship: {
    id: 'VjEtQ291bnRyeS0xMDI'
  },
  timeZone: {
    name: '(UTC+05:30) Asia - Calcutta',
    value: 'Asia/Calcutta'
  },
  operations: {
    updateTalentProfile: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateTalentHourlyRate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  languages: {
    nodes: [{ id: '234', name: 'English' }]
  },
  profile: {
    id: '123',
    website: 'profile-url'
  },
  linkedinUrl: 'linkedin-url',
  admissionPostUrl: 'admission-url',
  twitter: 'twitter-url'
}

const DEFAULT_PERMITS = {
  accessTalentInternals: true,
  manageTalentBillingName: true,
  hideTalentFromRobots: true,
  editTalentTopSkill: true
}

const arrangeTest = (
  props?: Partial<ComponentProps<typeof TalentUpdateForm>>
) =>
  render(
    <TestWrapper>
      <TalentUpdateForm
        talent={props?.talent ?? DEFAULT_TALENT}
        permits={props?.permits ?? DEFAULT_PERMITS}
      />
    </TestWrapper>
  )

describe('#TalentUpdateForm', () => {
  beforeEach(() => {
    useUpdateTalentProfileMock.mockReturnValue([jest.fn()])
  })

  it('calls `getInitialValues` with the talent', () => {
    arrangeTest()

    expect(getInitialValuesMock).toHaveBeenCalledWith(DEFAULT_TALENT)
  })

  it('renders RoleAvatarEditor', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(ROLE_AVATAR_EDITOR_ID)).toBeInTheDocument()
  })

  it('hides unauthorized fields', () => {
    arrangeTest({
      permits: {
        accessTalentInternals: false,
        manageTalentBillingName: false,
        hideTalentFromRobots: false,
        editTalentTopSkill: false
      }
    })

    expect(
      screen.queryByTestId('talent-update-toptal-email')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-update-legal-name')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-update-billing-name')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-update-use-billing-name')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-update-top-skill')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('talent-update-hidden-from-robots')
    ).not.toBeInTheDocument()
  })
})
