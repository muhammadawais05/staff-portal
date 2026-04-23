import { fireEvent, render, screen } from '@testing-library/react'
import React, { createRef } from 'react'
import {
  TalentNoteType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  useGetDefaultNoteAnswers,
  useGetSoftSkills
} from '@staff-portal/talents'

import AddCustomNoteButton, { Props } from './AddCustomNoteButton'

jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  useActionLoading: () => ({ actionsLoading: false })
}))

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  useRenderLazyOperation:
    ({ onSuccess }: { onSuccess: () => void }) =>
    (renderChildren: (params: {}) => React.ReactElement) => {
      return (
        <div data-testid='lazy-operation'>
          {renderChildren({ checkOperation: onSuccess })}
        </div>
      )
    }
}))

jest.mock('@staff-portal/notes', () => ({
  ...jest.requireActual('@staff-portal/notes'),
  getPersistStorageKey: jest.fn(),
  CreateNoteForm: ({
    children,
    headerContent
  }: {
    children?: string
    headerContent?: string
  }) => (
    <div data-testid='create-note-form'>
      {headerContent}
      {children}
    </div>
  )
}))

jest.mock('@staff-portal/talents', () => ({
  __esModule: true,
  useGetDefaultNoteAnswers: jest.fn(),
  useGetSoftSkills: jest.fn()
}))

const mockedCheckForm = jest.fn()

jest.mock('@staff-portal/forms', () => ({
  usePersistentFormContext: () => ({
    checkForm: mockedCheckForm
  })
}))

const getDefaultNoteAnswersMock = jest.fn()
const getSoftSkillsMock = jest.fn()

type GetDefaultNoteAnswersQueryType = Parameters<
  NonNullable<Parameters<typeof useGetDefaultNoteAnswers>[0]['onCompleted']>
>[0]

const mockReturnValues = ({
  hasFormInCache = false,
  answers
}: {
  hasFormInCache?: boolean
  answers: { id: string }[]
}) => {
  const mockUseGetDefaultNoteAnswers = useGetDefaultNoteAnswers as jest.Mock
  const mockUseGetSoftSkills = useGetSoftSkills as jest.Mock

  mockUseGetDefaultNoteAnswers.mockImplementation(
    ({
      onCompleted
    }: {
      onCompleted: (data: GetDefaultNoteAnswersQueryType) => void
    }) => ({
      loading: false,
      answers,
      getDefaultNoteAnswers: () => {
        getDefaultNoteAnswersMock()
        const data = {
          node: { defaultNoteAnswers: { nodes: answers } }
        } as unknown as GetDefaultNoteAnswersQueryType

        onCompleted(data)
      }
    })
  )

  mockUseGetSoftSkills.mockImplementation(
    ({ onCompleted }: { onCompleted: () => void }) => {
      return {
        loading: false,
        getSoftSkills: () => {
          onCompleted()
          getSoftSkillsMock()
        }
      }
    }
  )

  mockedCheckForm.mockReturnValue(hasFormInCache)
}

const renderComponent = (props: Partial<Props> = {}) => {
  const containerRef = createRef<HTMLDivElement>()

  render(
    <TestWrapper>
      <AddCustomNoteButton
        {...props}
        talent={{ id: 'VjEtVGFsZW50LTE4OTI1NTQ=', fullName: 'Awesome Talent' }}
        noteType={TalentNoteType.ENGLISH_CALL}
        onSubmit={() => {}}
        formContainer={containerRef}
        operationName='createEnglishCallTalentNote'
        initialOperation={{
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }}
      >
        Add Note
      </AddCustomNoteButton>
      <div ref={containerRef} />
    </TestWrapper>
  )
}

describe('AddCustomNoteButton', () => {
  it('shows the create note form', async () => {
    mockReturnValues({ answers: [{ id: 'id-1' }, { id: 'id-2' }] })
    renderComponent()

    fireEvent.click(screen.getByText('Add Note'))

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  it('shows the create note form with content', async () => {
    mockReturnValues({ answers: [{ id: 'id-1' }, { id: 'id-2' }] })
    renderComponent({ headerContent: 'form content' })

    fireEvent.click(screen.getByText('Add Note'))

    expect(await screen.findByText('form content')).toBeInTheDocument()
  })

  describe('when form is cached & fetchPolicy is cache-first', () => {
    it('shows the form without clicking on the add note button & does not call getDefaultNoteAnswers', async () => {
      mockReturnValues({
        hasFormInCache: true,
        answers: [{ id: 'id-1' }, { id: 'id-2' }]
      })
      renderComponent({ fetchPolicy: 'cache-first' })

      expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
      expect(getDefaultNoteAnswersMock).not.toHaveBeenCalled()
    })
  })

  describe('when form is cached & fetchPolicy is not passed', () => {
    it('shows the form without clicking on the add note button & does call getDefaultNoteAnswers', async () => {
      mockReturnValues({
        hasFormInCache: true,
        answers: [{ id: 'id-1' }, { id: 'id-2' }]
      })
      renderComponent()

      expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
      expect(getDefaultNoteAnswersMock).toHaveBeenCalled()
    })
  })

  describe('when includeSoftSkills is true, form is in cache & there are no answers', () => {
    it('call getDefaultNote & getSoftSkills functions', async () => {
      mockReturnValues({ hasFormInCache: true, answers: [] })
      renderComponent({ includeSoftSkills: true })

      expect(getDefaultNoteAnswersMock).toHaveBeenCalled()
      expect(getSoftSkillsMock).toHaveBeenCalled()
    })
  })

  describe('when includeSoftSkills is false, form is in cache & there are no answers', () => {
    it('call getDefaultNoteAnswers function & does not call getSoftSkills function', async () => {
      mockReturnValues({ hasFormInCache: true, answers: [] })
      renderComponent({ includeSoftSkills: false })

      expect(getDefaultNoteAnswersMock).toHaveBeenCalled()
      expect(getSoftSkillsMock).not.toHaveBeenCalled()
    })
  })
})
