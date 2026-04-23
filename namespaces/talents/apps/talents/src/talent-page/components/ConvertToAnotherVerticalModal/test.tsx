import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ConvertToAnotherVerticalModal, {
  Props
} from './ConvertToAnotherVerticalModal'
import {
  createConvertTalentInvalidMock,
  createConvertTalentFailedMock,
  createConvertTalentMock
} from '../ConvertToAnotherVerticalForm/data/convert-talent/mocks'

const mockedVerticals = [
  {
    id: encodeEntityId('1000', 'Test'),
    talentType: 'developer',
    specializations: {
      nodes: [
        {
          id: encodeEntityId('1001', 'Test'),
          title: 'Ruby'
        },
        {
          id: encodeEntityId('1002', 'Test'),
          title: 'Python'
        }
      ]
    }
  }
]

const mockedScreeningRoleSteps = {
  nodes: [
    {
      id: 'VjEtUm9sZVN0ZXAtMTQ1Njk4MQ',
      status: 'approved',
      step: {
        id: 'VjEtU3RlcC0xOA',
        title: 'English'
      }
    }
  ]
}

const TestComponent = ({
  talentId,
  fullName,
  type,
  hideModal,
  screeningRoleSteps
}: Omit<Props, 'open'>) => (
  <ConvertToAnotherVerticalModal
    talentId={talentId || encodeEntityId('123', 'Test')}
    fullName={fullName || 'TEST_TITLE'}
    type={type || 'TEST_TYPE'}
    verticals={mockedVerticals}
    hideModal={hideModal || jest.fn()}
    screeningRoleSteps={screeningRoleSteps || mockedScreeningRoleSteps}
  />
)

const arrangeTest = (
  { talentId, fullName, type, hideModal, screeningRoleSteps }: Partial<Props>,
  mocks: MockedResponse[] = []
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent
        talentId={talentId || encodeEntityId('123', 'Test')}
        fullName={fullName || 'TEST_NAME'}
        type={type || 'TEST_TYPE'}
        verticals={mockedVerticals}
        hideModal={hideModal || jest.fn()}
        screeningRoleSteps={screeningRoleSteps}
      />
    </TestWrapperWithMocks>
  )

describe('ConvertToAnotherVerticalModal', () => {
  it('displays Talent name and current type in the title', () => {
    const TALENT_NAME = 'John Smith ak3'
    const TALENT_TYPE = 'developer'

    arrangeTest({
      fullName: TALENT_NAME,
      type: TALENT_TYPE
    })

    expect(
      screen.getByText(new RegExp(`Convert ${TALENT_TYPE} ${TALENT_NAME}`, 'i'))
    ).toBeInTheDocument()
  })

  it('changes Talent vertical and specialization', async () => {
    const TALENT_ID = encodeEntityId('200', 'Test')
    const VERTICAL_ID = mockedVerticals[0].id
    const SPECIALIZATION_ID = mockedVerticals[0].specializations.nodes[1].id
    const COMMENT = 'Test comment ap4'

    const hideModal = jest.fn()

    arrangeTest(
      {
        talentId: TALENT_ID,
        type: 'ProductManager',
        hideModal
      },
      [
        createConvertTalentMock({
          talentId: TALENT_ID,
          toVerticalId: VERTICAL_ID,
          specializationId: SPECIALIZATION_ID,
          comment: COMMENT
        })
      ]
    )

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(/Developer/))

    fireEvent.click(screen.getByLabelText(/Specialization/))
    fireEvent.click(screen.getByText(/Python/))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(
      await screen.findByText(
        'The Product Manager was successfully converted to a Developer.'
      )
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalledTimes(1)
  })

  it('shows error if Talent conversion fails', async () => {
    const TALENT_ID = encodeEntityId('300', 'Test')
    const VERTICAL_ID = mockedVerticals[0].id
    const SPECIALIZATION_ID = mockedVerticals[0].specializations.nodes[0].id
    const COMMENT = 'Test comment ao2'
    const hideModal = jest.fn()

    arrangeTest(
      {
        talentId: TALENT_ID,
        type: 'ProductManager',
        hideModal
      },
      [
        createConvertTalentFailedMock({
          talentId: TALENT_ID,
          toVerticalId: VERTICAL_ID,
          specializationId: SPECIALIZATION_ID,
          comment: COMMENT
        })
      ]
    )

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(/Developer/))

    fireEvent.click(screen.getByLabelText(/Specialization/))
    fireEvent.click(screen.getByText(/Ruby/))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(
      await screen.findByText(
        'An error occurred, the vertical was not changed.'
      )
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalledTimes(0)
  })

  it('shows error if Talent conversion request is invalid', async () => {
    const TALENT_ID = encodeEntityId('400', 'Test')
    const VERTICAL_ID = mockedVerticals[0].id
    const SPECIALIZATION_ID = mockedVerticals[0].specializations.nodes[0].id
    const COMMENT = 'Test comment ir4'
    const ERROR_MESSAGE = 'Error Message d7m.'
    const hideModal = jest.fn()

    arrangeTest(
      {
        talentId: TALENT_ID,
        type: 'ProductManager',
        hideModal
      },
      [
        createConvertTalentInvalidMock(
          {
            talentId: TALENT_ID,
            toVerticalId: VERTICAL_ID,
            specializationId: SPECIALIZATION_ID,
            comment: COMMENT
          },
          [
            {
              key: 'base',
              message: ERROR_MESSAGE
            }
          ]
        )
      ]
    )

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(/Developer/))

    fireEvent.click(screen.getByLabelText(/Specialization/))
    fireEvent.click(screen.getByText(/Ruby/))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: COMMENT }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Convert' }))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalledTimes(0)
  })
})

describe('when Screening Step is English', () => {
  it('does not render specialization', async () => {
    const TALENT_ID = encodeEntityId('200', 'Test')
    const VERTICAL_ID = mockedVerticals[0].id
    const SPECIALIZATION_ID = mockedVerticals[0].specializations.nodes[1].id
    const COMMENT = 'Test comment ap4'

    const hideModal = jest.fn()

    arrangeTest(
      {
        talentId: TALENT_ID,
        type: 'ProductManager',
        hideModal,
        screeningRoleSteps: {
          nodes: [
            {
              id: 'VjEtUm9sZVN0ZXAtMTQ1Njk4MQ',
              status: 'claimed',
              step: {
                id: 'VjEtU3RlcC0xOA',
                title: 'English'
              }
            }
          ]
        }
      },
      [
        createConvertTalentMock({
          talentId: TALENT_ID,
          toVerticalId: VERTICAL_ID,
          specializationId: SPECIALIZATION_ID,
          comment: COMMENT
        })
      ]
    )

    fireEvent.click(screen.getByLabelText(/To/))
    fireEvent.click(screen.getByText(/Developer/))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: COMMENT }
    })

    expect(screen.queryByLabelText(/Specialization/)).not.toBeInTheDocument()
  })
})
