import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import Preview from './Preview'
import getProfileEducationMock from '../../mocks/get-profile-education-mock/get-profile-education-mock'
import getProfileSkillMock from '../../mocks/get-profile-skill-mock/get-profile-skill-mock'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'
import { PreviewProfileContent } from '../../types'

describe('Preview', () => {
  it('renders the selected items', () => {
    const values: PreviewProfileContent = {
      skills: [
        getProfileSkillMock({ id: 'skill-1', skill: { name: 'Skill 1' } })
      ],
      industries: [
        {
          industry: {
            id: 'industry-1',
            name: 'Industry 1'
          }
        }
      ],
      highlights: [
        {
          type: 'education',
          ...getProfileEducationMock({
            fieldOfStudy: 'Information Systems',
            degree: "Master's Degree"
          })
        },
        getProfileCertificationMock({
          certificate: 'Certificate 1'
        })
      ],
      portfolio: []
    }

    render(
      <TestWrapper>
        <Form onSubmit={() => {}}>
          <Preview
            roleType='Astronaut'
            fullName='Talent Name'
            values={values}
          />
        </Form>
      </TestWrapper>
    )

    expect(screen.getByText('Skill 1')).toBeInTheDocument()
    expect(screen.getByText('Industry 1')).toBeInTheDocument()
    expect(screen.getByText('Certificate 1 at institution')).toBeInTheDocument()
    expect(
      screen.getByText(
        "Master's Degree in Information Systems at Warsaw Technical University"
      )
    ).toBeInTheDocument()
  })
})
