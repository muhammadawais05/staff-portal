import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'

import { emptyFormState } from '../../utils/emptyFormState'
import ManualHighlight from './ManualHighlight'
import getProfileSkillMock from '../../mocks/get-profile-skill-mock/get-profile-skill-mock'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'
import getProfileContentMock from '../../mocks/get-profile-content-mock/get-profile-content-mock'

describe('ManualHighlight', () => {
  it('renders the selected items', () => {
    const values = {
      ...emptyFormState,
      skills: ['skill-1'],
      certifications: ['cert-1']
    }

    const profileParams = {
      roleType: 'Astronaut',
      fullName: 'Talent Name',
      skills: [
        getProfileSkillMock({ id: 'skill-1', skill: { name: 'Skill 1' } })
      ],
      certifications: [
        getProfileCertificationMock({
          id: 'cert-1',
          certificate: 'Certificate 1'
        })
      ],
      employments: [],
      experience: [],
      portfolio: []
    }

    render(
      <FinalForm onSubmit={jest.fn()} initialValues={values}>
        {() => (
          <ManualHighlight
            talentId='123'
            fullName='Full Name'
            roleType='Astronaut'
            inEdit
            content={getProfileContentMock(profileParams)}
          />
        )}
      </FinalForm>
    )

    expect(screen.getByText('Skill 1')).toBeInTheDocument()
    expect(screen.getByText('Certificate 1')).toBeInTheDocument()
  })
})
