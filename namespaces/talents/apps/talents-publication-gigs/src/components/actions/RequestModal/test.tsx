import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetSearchBarSkillsAutocomplete } from '@staff-portal/skills'
import { buildSearchBarSkillMock } from '@staff-portal/skills/src/mocks'
import { buildGigMock } from '@staff-portal/talents-gigs/src/mocks'
import { GigFragment } from '@staff-portal/talents-gigs'

import { RequestEvents } from '../../../core/enums'
import { useEditPublicationRequest } from '../../../data/edit-publication-request'
import { useCreateRequest } from '../../../data/create-request'
import RequestModal from '.'
import { ERRORS } from './constants'

jest.mock('../../../data/edit-publication-request', () => ({
  useEditPublicationRequest: jest.fn()
}))

jest.mock('../../../data/create-request', () => ({
  useCreateRequest: jest.fn()
}))

jest.mock('@staff-portal/monitoring-service', () => ({
  trackEvent: (...args: unknown[]) => mockTrack(...args)
}))

jest.mock('@staff-portal/skills', () => ({
  ...jest.requireActual('@staff-portal/skills'),
  useGetSearchBarSkillsAutocomplete: jest.fn()
}))

const mockTrack = jest.fn()
const mockUseEditPublicationRequest = useEditPublicationRequest as jest.Mock
const mockUseCreateRequest = useCreateRequest as jest.Mock
const mockGetSearchBarSkillsAutocomplete =
  useGetSearchBarSkillsAutocomplete as jest.Mock
const noop = () => {}

const defaultRequest = buildGigMock()
const arrangeTest = ({
  open = true,
  hideModal = noop,
  request = defaultRequest
}: {
  hideModal?: () => void
  open?: boolean
  request?: GigFragment | null
}) => {
  // to fix "field.scrollIntoView is not a function" CI error
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <RequestModal
        open={open}
        hideModal={hideModal}
        request={request || undefined}
      />
    </TestWrapper>
  )
}

describe('RequestModal', () => {
  beforeEach(() => {
    mockTrack.mockClear()
    mockUseEditPublicationRequest.mockReturnValue({
      editPublicationRequest: () => {},
      loading: false
    })
    mockUseCreateRequest.mockReturnValue({
      createRequest: () => {},
      loading: false
    })
    mockGetSearchBarSkillsAutocomplete.mockReturnValue({
      fetchData: () => {},
      data: [buildSearchBarSkillMock()],
      loading: false
    })
  })

  describe('modal', () => {
    it('does not render modal if open prop is false', () => {
      arrangeTest({ open: false })

      expect(screen.queryByText('Request')).not.toBeInTheDocument()
      expect(screen.queryByText('Title')).not.toBeInTheDocument()
      expect(screen.queryByText('Description')).not.toBeInTheDocument()

      expect(
        screen.queryByTestId('request-modal-cancel')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('request-modal-confirm')
      ).not.toBeInTheDocument()
    })

    it('renders edit request modal properly', () => {
      arrangeTest({ open: true })

      const searchInput = screen.getByTestId('skillsAutoSuggest')

      act(() => {
        fireEvent.change(searchInput, {
          target: {
            value: 'Ru'
          }
        })
      })

      const skillSuggested = screen.getByText('Ruby')

      act(() => {
        fireEvent.click(skillSuggested)
      })

      expect(screen.queryByText('Ruby')).toBeInTheDocument()

      expect(screen.getByText('Request')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()

      expect(screen.getByDisplayValue(defaultRequest.title)).toBeInTheDocument()
      expect(
        screen.getByDisplayValue(defaultRequest.description)
      ).toBeInTheDocument()
      expect(screen.getByText('Javascript')).toBeInTheDocument()

      expect(screen.getByTestId('request-modal-cancel')).toBeVisible()
      expect(screen.getByTestId('request-modal-confirm')).toBeVisible()
    })

    it('closes the modal', () => {
      const mockHideModal = jest.fn()

      arrangeTest({ open: true, hideModal: mockHideModal })

      fireEvent.click(screen.getByTestId('request-modal-cancel'))

      expect(mockHideModal).toHaveBeenCalled()
      expect(mockTrack).toHaveBeenCalledWith(RequestEvents.EditCanceled, {
        id: 'VjEtUHVibGljYXRpb25HaWctMzA'
      })
    })
  })

  describe('form validation', () => {
    it('displays validation errors', async () => {
      arrangeTest({
        open: true,
        request: buildGigMock({ title: '', description: '', skills: [] })
      })

      fireEvent.click(screen.getByTestId('request-modal-confirm'))

      await waitFor(() => {
        expect(screen.getAllByText('Please complete this field.')).toHaveLength(
          2
        )
        expect(
          screen.getByText('At least one skill is required.')
        ).toBeInTheDocument()
      })
    })

    it('displays minimum length errors', () => {
      arrangeTest({
        open: true,
        request: buildGigMock({
          title: 'Title',
          description: 'Description',
          skills: []
        })
      })

      const titleInput = screen.getByDisplayValue('Title')
      const descriptionInput = screen.getByDisplayValue('Description')

      fireEvent.change(titleInput, {
        target: { value: '123' }
      })
      fireEvent.blur(titleInput)

      fireEvent.change(descriptionInput, {
        target: { value: '123' }
      })
      fireEvent.blur(descriptionInput)

      fireEvent.blur(screen.getByPlaceholderText('Add required skills...'))

      expect(screen.getByText(ERRORS.title.message)).toBeInTheDocument()
      expect(screen.getByText(ERRORS.description.message)).toBeInTheDocument()
      expect(screen.getByText(ERRORS.skills.message)).toBeInTheDocument()
    })
  })

  describe('editPublicationRequest mutation', () => {
    it('calls edit mutation and displays notification', async () => {
      const mockHideModal = jest.fn()
      const mockEditRequest = jest.fn()

      const mockRequest = {
        id: 'VjEtUHVibGljYXRpb25HaWctMzA',
        title: 'Another Request Title',
        description: 'Just a request description of at least 50 characters.',
        skills: ['Javascript']
      }

      mockUseEditPublicationRequest.mockImplementation(({ onCompleted }) => {
        mockEditRequest.mockReturnValue(
          Promise.resolve({
            editGig: {
              success: true,
              errors: undefined,
              gig: buildGigMock(mockRequest)
            }
          }).then(onCompleted)
        )

        return {
          editPublicationRequest: mockEditRequest,
          loading: false
        }
      })

      arrangeTest({
        open: true,
        hideModal: mockHideModal
      })

      const titleInput = screen.getByDisplayValue('Request Title') // current value

      fireEvent.change(titleInput, {
        target: { value: mockRequest.title } // new value
      })

      fireEvent.blur(titleInput)

      await act(async () => {
        fireEvent.click(screen.getByTestId('request-modal-confirm'))
      })

      expect(mockTrack).toHaveBeenCalledWith(
        RequestEvents.EditClick,
        mockRequest
      )

      expect(mockTrack).toHaveBeenCalledWith(
        RequestEvents.EditSuccess,
        mockRequest
      )

      expect(mockEditRequest).toHaveBeenCalledWith(mockRequest)
      expect(mockHideModal).toHaveBeenCalled()
      expect(
        screen.getByText('Request was successfully edited')
      ).toBeInTheDocument()
    })
  })

  describe('createRequest mutation', () => {
    it('calls create request mutation and displays notification', async () => {
      const mockHideModal = jest.fn()
      const mockCreateRequest = jest.fn()

      const mockRequest = {
        title: 'Another Request Title',
        description: 'Just a request description of at least 50 characters.',
        skills: ['Ruby']
      }

      mockUseCreateRequest.mockImplementation(({ onCompleted }) => {
        mockCreateRequest.mockReturnValue(
          Promise.resolve({
            createPublicationGig: {
              success: true,
              errors: undefined,
              publicationGig: {
                id: 'VjEtUDJQUmVxdWVzdC0zMA',
                ...mockRequest
              }
            }
          }).then(onCompleted)
        )

        return {
          createRequest: mockCreateRequest,
          loading: false
        }
      })

      arrangeTest({
        open: true,
        hideModal: mockHideModal,
        request: null
      })

      const titleInput = screen.getByPlaceholderText(
        'e.g. Show off your expertise in both TypeScript and JavaScript!'
      )

      fireEvent.change(titleInput, {
        target: { value: mockRequest.title }
      })

      fireEvent.change(
        screen.getByPlaceholderText(
          /I’m reaching out on behalf of the Toptal Engineering Blog/
        ),
        {
          target: { value: mockRequest.description }
        }
      )

      fireEvent.blur(titleInput)

      const searchInput = screen.getByTestId('skillsAutoSuggest')

      act(() => {
        fireEvent.change(searchInput, {
          target: {
            value: 'Ru'
          }
        })
      })

      const skillSuggested = screen.getByText('Ruby')

      act(() => {
        fireEvent.click(skillSuggested)
      })

      await act(async () => {
        fireEvent.click(screen.getByTestId('request-modal-confirm'))
      })

      expect(mockTrack).toHaveBeenCalledWith(
        RequestEvents.CreateClick,
        mockRequest
      )
      expect(mockCreateRequest).toHaveBeenCalledWith(mockRequest)
      expect(mockTrack).toHaveBeenCalledWith(RequestEvents.CreateSuccess, {
        id: 'VjEtUDJQUmVxdWVzdC0zMA',
        ...mockRequest
      })
      expect(mockHideModal).toHaveBeenCalled()
      expect(
        screen.getByText('Request was successfully created')
      ).toBeInTheDocument()
    })
  })

  describe('form skills', () => {
    it('renders edit request modal properly', () => {
      arrangeTest({ open: true })

      const searchInput = screen.getByTestId('skillsAutoSuggest')

      act(() => {
        fireEvent.change(searchInput, {
          target: {
            value: 'Ru'
          }
        })
      })

      const skillSuggested = screen.getByText('Ruby')

      act(() => {
        fireEvent.click(skillSuggested)
      })

      expect(screen.queryByText('Ruby')).toBeInTheDocument()
    })

    it('updates skills list after deleting a skill', () => {
      arrangeTest({ open: true })

      expect(screen.getByText('Javascript')).toBeInTheDocument()

      act(() => {
        fireEvent.click(screen.getByLabelText('delete icon'))
      })

      expect(screen.queryByText('Javascript')).not.toBeInTheDocument()
    })
  })

  describe('loading', () => {
    it('renders correctly when loading and when it is not loading', () => {
      mockUseEditPublicationRequest.mockReturnValueOnce({
        editPublicationRequest: () => {},
        loading: true
      })

      const { rerender } = arrangeTest({
        open: true
      })

      expect(screen.queryByText('Update')).not.toBeVisible()
      expect(screen.queryByRole('progressbar')).toBeInTheDocument()

      mockUseEditPublicationRequest.mockReturnValueOnce({
        editPublicationRequest: () => {},
        loading: false
      })

      rerender(
        <TestWrapper>
          <RequestModal
            open={true}
            hideModal={() => {}}
            request={defaultRequest}
          />
        </TestWrapper>
      )

      expect(screen.queryByText('Update')).toBeVisible()
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
})
