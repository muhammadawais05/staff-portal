import React from 'react'
import { render } from '@testing-library/react'
import { FieldWrapper } from '@toptal/picasso-forms'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import SkillNameAutocomplete from './SkillNameAutocomplete'
import {
  useGetSkillNamesAutocomplete,
} from '../../data/get-skill-name-autocomplete/get-skill-name-autocomplete.staff.gql'

jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  useDebouncedAutocomplete: jest.fn(),
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  FieldWrapper: jest.fn(),
  useForm: () => ({
    getState: jest.fn(() => ({
      values: {
        newName: 'RoR'
      }
    }))
  }),
}))

jest.mock(
  '../../data/get-skill-name-autocomplete/get-skill-name-autocomplete.staff.gql',
  () => ({
    ...jest.requireActual(
      '../../data/get-skill-name-autocomplete/get-skill-name-autocomplete.staff.gql'
    ),
    useGetSkillNamesAutocomplete: jest.fn()
  }))

const FieldWrapperStub = FieldWrapper as unknown as jest.Mock
const useGetSkillNamesAutocompleteStub = useGetSkillNamesAutocomplete as jest.Mock
const useDebouncedAutocompleteStub = useDebouncedAutocomplete as jest.Mock

const mockedSkillNames = [
  {
    key: 'skill_names_1',
    label: 'Laravel',
  },
  {
    key: 'skill_names_2',
    label: 'Laravel Mix'
  }
]

describe('SkillNameAutocomplete', () => {
  beforeEach(() => {
    FieldWrapperStub.mockImplementationOnce(() => null)
    useGetSkillNamesAutocompleteStub.mockReturnValue({
      getSkillNames: jest.fn(),
      data: mockedSkillNames,
      loading: false,
    })
    useDebouncedAutocompleteStub.mockImplementationOnce(() => ({}))
  })

  it('renders the component', () => {
    render(
      <SkillNameAutocomplete
        name='newName'
        label='Name'
        hint='some kind of long hint'
      />
    )

    expect(useGetSkillNamesAutocompleteStub).toHaveBeenCalled()
    expect(useDebouncedAutocompleteStub).toHaveBeenCalledWith({
      initialSearchTerm: 'RoR',
      loadingOptions: false,
      searchOptions: mockedSkillNames,
      onSearch: expect.any(Function)
    })

    expect(FieldWrapperStub).toHaveBeenCalledWith({
      name: 'newName',
      width: 'full',
      label: 'Name',
      autoFocus: true,
      required: true,
      children: expect.anything(),
      hint: `some kind of long hint`
    }, {})
  })
})
