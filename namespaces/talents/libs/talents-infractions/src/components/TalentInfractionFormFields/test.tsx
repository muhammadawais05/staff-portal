import { render } from '@toptal/picasso/test-utils'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import { screen } from '@testing-library/react'

import { useGetTalentEngagements } from '../../data'
import TalentInfractionFormFields from './TalentInfractionFormFields'

jest.mock('../../data/get-talent-engagements', () => ({
  __esModule: true,
  useGetTalentEngagements: jest.fn()
}))

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

const arrangeTest = (
  props?: ComponentProps<typeof TalentInfractionFormFields>
) =>
  render(
    <Form
      mutators={{ ...arrayMutators }}
      initialValues={{}}
      onSubmit={jest.fn()}
    >
      <TalentInfractionFormFields editMode {...props} />
    </Form>
  )

describe('TalentInfractionFormFields', () => {
  const mockedUseGetTalentEngagements = useGetTalentEngagements as jest.Mock

  it('renders fields', () => {
    mockedUseGetTalentEngagements.mockReturnValue({ data: [], loading: false })
    arrangeTest()

    expect(screen.queryByLabelText(/Status/)).toBeInTheDocument()
    expect(screen.queryByLabelText('Assignee')).toBeInTheDocument()
    expect(screen.queryByLabelText(/Review/)).toBeInTheDocument()
    expect(screen.queryByLabelText('Summary')).toBeInTheDocument()
    expect(screen.queryByLabelText('Reason')).toBeInTheDocument()
    expect(screen.queryByLabelText('When occurred')).toBeInTheDocument()
    expect(
      screen.queryByLabelText(/Link infraction with an engagement/)
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Details/)).toBeInTheDocument()
  })

  describe('when talent engagements are loading', () => {
    it('renders fields', () => {
      mockedUseGetTalentEngagements.mockReturnValue({
        data: undefined,
        loading: true
      })
      arrangeTest()

      expect(
        screen.queryByLabelText(/Link infraction with an engagement/)
      ).toBeInTheDocument()
    })
  })

  describe('when talent has some engagements', () => {
    it('renders fields', () => {
      mockedUseGetTalentEngagements.mockReturnValue({
        data: [{ id: 'engagement-1', webResource: { text: 'text' } }],
        loading: false
      })
      arrangeTest()

      expect(
        screen.queryByLabelText(/Link infraction with an engagement/)
      ).toBeInTheDocument()
    })
  })
})
