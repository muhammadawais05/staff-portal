import { FinalForm } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import { PitcherState } from '../../types'
import { emptyFormState } from '../../utils/emptyFormState'
import Editor, { EditorContentProps } from './Editor'
import getProfileContentMock from '../../mocks/get-profile-content-mock/get-profile-content-mock'
import getProfileSkillMock from '../../mocks/get-profile-skill-mock/get-profile-skill-mock'
import getProfileExperienceMock from '../../mocks/get-profile-experience-mock/get-profile-experience-mock'
import getProfilePortfolioItemMock from '../../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'
import getProfilePublicationMock from '../../mocks/get-profile-publication-mock/get-profile-publication-mock'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'
import getProfileEducationMock from '../../mocks/get-profile-education-mock/get-profile-education-mock'
import getProfileEmploymentMock from '../../mocks/get-profile-employment-mock/get-profile-employment-mock'

const renderComponent = ({
  onSubmit = jest.fn(),
  ...props
}: Partial<EditorContentProps> & {
  onSubmit?: (values: PitcherState) => void
}) =>
  render(
    <FinalForm onSubmit={onSubmit} initialValues={{ ...emptyFormState }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Editor
            talentId='talentId'
            fullName=''
            roleType='astronaut'
            content={getProfileContentMock()}
            {...props}
          />

          <button type='submit'>Submit</button>
        </form>
      )}
    </FinalForm>
  )

describe('Editor', () => {
  it('renders skills', () => {
    const skills = [
      getProfileSkillMock({ skill: { name: 'Skill 1' } }),
      getProfileSkillMock({ skill: { name: 'Skill 2' } })
    ]

    renderComponent({
      content: getProfileContentMock({ skills })
    })

    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Skill 1')).toBeInTheDocument()
    expect(screen.getByText('Skill 2')).toBeInTheDocument()
  })

  it('renders industries', () => {
    const industries = [
      { industry: { id: 'industry1', name: 'Industry 1' } },
      { industry: { id: 'industry2', name: 'Industry 2' } }
    ]

    renderComponent({
      content: getProfileContentMock({ industries })
    })

    expect(screen.getByText('Industries')).toBeInTheDocument()
    expect(screen.getByText('Industry 1')).toBeInTheDocument()
    expect(screen.getByText('Industry 2')).toBeInTheDocument()
  })

  it('renders employments', () => {
    const employments = [
      getProfileEmploymentMock({
        position: 'Lead astronaut',
        experienceItems: [],
        startDate: 0,
        company: 'company'
      }),
      getProfileEmploymentMock({
        position: 'Senior rocker launcher',
        experienceItems: [],
        startDate: 0,
        company: 'company'
      })
    ]

    renderComponent({
      content: getProfileContentMock({ employments })
    })

    expect(screen.getByText('Work Experience')).toBeInTheDocument()
    expect(screen.getByText('Lead astronaut')).toBeInTheDocument()
    expect(screen.getByText('Senior rocker launcher')).toBeInTheDocument()
  })

  it('renders experiences', () => {
    const experienceItems = [
      getProfileExperienceMock({
        title: 'Watched Apollo launch',
        description: 'Pretty far away',
        link: 'One of the greatest video-game characters.'
      }),
      getProfileExperienceMock({
        title: 'The highest jump in the school',
        description: '50 meters',
        link: 'yougottabelieve.me'
      })
    ]

    renderComponent({
      content: getProfileContentMock({ experience: experienceItems })
    })

    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument()
    expect(screen.getByText('Watched Apollo launch')).toBeInTheDocument()
    expect(
      screen.getByText('The highest jump in the school')
    ).toBeInTheDocument()
  })

  it('renders portfolio', () => {
    const portfolio = [
      getProfilePortfolioItemMock({
        title: 'Watched Apollo launch'
      }),
      getProfilePortfolioItemMock({
        title: 'The highest jump in the school'
      })
    ]

    renderComponent({
      content: getProfileContentMock({ portfolio })
    })

    expect(screen.queryByText('Experience')).not.toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Watched Apollo launch')).toBeInTheDocument()
    expect(
      screen.getByText('The highest jump in the school')
    ).toBeInTheDocument()
  })

  it('renders mentor item', () => {
    renderComponent({
      content: getProfileContentMock({ mentorship: true })
    })

    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Toptal Mentor')).toBeInTheDocument()
  })

  it('renders publications', async () => {
    const publications = [
      getProfilePublicationMock({ title: 'Post 1' }),
      getProfilePublicationMock({ title: 'Post 2' })
    ]

    renderComponent({
      content: getProfileContentMock({ publications })
    })

    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText(/Post 1/)).toBeInTheDocument()
    expect(screen.getByText(/Post 2/)).toBeInTheDocument()
  })

  it('renders certifications', () => {
    const certifications = [
      getProfileCertificationMock({ certificate: 'Certificate 1' }),
      getProfileCertificationMock({ certificate: 'Certificate 2' })
    ]

    renderComponent({
      content: getProfileContentMock({ certifications })
    })

    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Certificate 1')).toBeInTheDocument()
    expect(screen.getByText('Certificate 2')).toBeInTheDocument()
  })

  it('renders educations', () => {
    const educations = [
      getProfileEducationMock({
        fieldOfStudy: 'Information Systems',
        degree: "Master's Degree",
        yearFrom: 2010,
        yearTo: 2015,
        title: 'Warsaw Technical University',
        location: 'Warsaw, Poland'
      }),
      getProfileEducationMock({
        title: 'Warsaw Medical University',
        location: 'Warsaw, Poland',
        fieldOfStudy: 'Medicine',
        degree: 'Professional Degree',
        yearFrom: 2010,
        yearTo: 2015
      })
    ]

    renderComponent({
      content: getProfileContentMock({ educations })
    })

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(
      screen.getByText("Master's Degree in Information Systems")
    ).toBeInTheDocument()
    expect(
      screen.getByText('Professional Degree in Medicine')
    ).toBeInTheDocument()
  })

  it('adds highlights object to the form', () => {
    const handleSubmit = jest.fn()
    const certifications = [
      getProfileCertificationMock({
        id: 'cert-1',
        certificate: 'Certificate 1'
      }),
      getProfileCertificationMock({
        id: 'cert-2',
        certificate: 'Certificate 2'
      })
    ]
    const educations = [
      getProfileEducationMock({
        id: 'education-1',
        fieldOfStudy: 'Information Systems',
        degree: "Master's Degree",
        yearFrom: 2010,
        yearTo: 2015,
        title: 'Warsaw Technical University',
        location: 'Warsaw, Poland'
      })
    ]

    renderComponent({
      content: getProfileContentMock({ certifications, educations }),
      onSubmit: handleSubmit
    })

    fireEvent.click(screen.getByText('Certificate 1'))
    fireEvent.click(screen.getByText("Master's Degree in Information Systems"))
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        highlights: {
          items: [
            { type: 'certification', id: 'cert-1' },
            { type: 'education', id: 'education-1' }
          ],
          portfolio: [],
          skills: [],
          industries: []
        }
      }),
      expect.anything(),
      expect.anything()
    )
  })
})
