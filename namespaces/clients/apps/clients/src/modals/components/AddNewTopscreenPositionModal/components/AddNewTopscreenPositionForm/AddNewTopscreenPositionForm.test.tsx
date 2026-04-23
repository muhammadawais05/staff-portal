import React from 'react'
import {
  act,
  fireEvent,
  render,
  cleanup,
  screen
} from '@toptal/picasso/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { noop } from '@staff-portal/utils'
import { TestWrapper } from '@staff-portal/test-utils'

import AddNewTopscreenPositionForm from '.'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const mockedHandleSubmit = jest.fn()

const renderComponent = () => {
  return render(
    <TestWrapper>
      <AddNewTopscreenPositionForm
        topscreenClientId='111-222'
        hideModal={noop}
      />
    </TestWrapper>
  )
}

describe('AddNewTopscreenPositionForm', () => {
  beforeEach(() => {
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: mockedHandleSubmit,
      loading: false
    })
  })

  afterEach(cleanup)

  it('renders form with useModalFormChangeHandler', async () => {
    renderComponent()

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledTimes(1)
  })

  describe('when form is not fully filled', () => {
    const mockFormInput = {
      topscreenClientId: 'test-client-id-123',
      title: 'title-1',
      description: 'desc-2',
      jobUrl: 'https://topt.al',
      contactName: 'contact-name-1',
      contactEmail: 'contact@email.com'
    }

    it('submit without title', async () => {
      renderComponent()

      await act(async () => {
        fireEvent.change(screen.getByLabelText(/Programming Language/i), {
          target: { value: mockFormInput.description }
        })
        fireEvent.change(screen.getByLabelText(/Job Url/i), {
          target: { value: mockFormInput.jobUrl }
        })
        fireEvent.change(screen.getByLabelText(/Contact Name/i), {
          target: { value: mockFormInput.contactName }
        })
        fireEvent.change(screen.getByLabelText(/Contact Email/i), {
          target: { value: mockFormInput.contactEmail }
        })
        fireEvent.click(screen.getByLabelText(/English/i))

        fireEvent.click(screen.getByRole('button', { name: 'Create' }))
      })

      expect(
        await screen.findByText('Please complete this field.')
      ).toBeInTheDocument()
    })

    it('submit without step', async () => {
      renderComponent()

      await act(async () => {
        fireEvent.change(screen.getByLabelText(/Title/i), {
          target: { value: mockFormInput.title }
        })
        fireEvent.change(screen.getByLabelText(/Programming Language/i), {
          target: { value: mockFormInput.description }
        })
        fireEvent.change(screen.getByLabelText(/Job Url/i), {
          target: { value: mockFormInput.jobUrl }
        })
        fireEvent.change(screen.getByLabelText(/Contact Name/i), {
          target: { value: mockFormInput.contactName }
        })
        fireEvent.change(screen.getByLabelText(/Contact Email/i), {
          target: { value: mockFormInput.contactEmail }
        })

        fireEvent.click(screen.getByRole('button', { name: 'Create' }))
      })

      expect(
        await screen.findByText('Please complete this field.')
      ).toBeInTheDocument()
    })
  })
})
