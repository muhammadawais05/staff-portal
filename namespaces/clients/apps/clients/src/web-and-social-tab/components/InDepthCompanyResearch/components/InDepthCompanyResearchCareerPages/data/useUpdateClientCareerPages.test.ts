import { act, renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useMutation } from '@staff-portal/data-layer-service'

import { SetUpdateClientCareerPagesDocument , CareerPageFragment } from '../../../../../data'
import { useUpdateClientCareerPages } from './useUpdateClientCareerPages'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

const mockedUseMutation = useMutation as jest.Mock

describe('#useUpdateClientCareerPages', () => {
  it('passes correct properties into mutation', async () => {
    const mockedUpdateClientCareerPagesDocument = jest
      .fn()
      .mockImplementation(() => ({
        data: {
          updateClientCareerPages: {
            success: true,
            errors: []
          }
        }
      }))

    when(mockedUseMutation)
      .calledWith(SetUpdateClientCareerPagesDocument)
      .mockImplementation(() => [
        mockedUpdateClientCareerPagesDocument,
        {
          data: undefined,
          loading: false
        }
      ])

    const { result } = renderHook(() => useUpdateClientCareerPages('test'))

    const careerPages = [
      {
        __typename: 'CareerPage',
        id: 'test',
        url: 'test',
        primary: true
      }
    ]

    const items = {
      careerPages
    } as Partial<{
      careerPages: CareerPageFragment[]
    }>

    const { handleChange } = result.current

    await act(async () => {
      await handleChange('careerPages', items)
    })

    expect(mockedUpdateClientCareerPagesDocument).toHaveBeenCalledTimes(1)
    expect(mockedUpdateClientCareerPagesDocument).toHaveBeenCalledWith({
      variables: {
        input: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          careerPages: careerPages.map(({ __typename, ...rest }) => rest),
          clientId: 'test'
        }
      }
    })
  })
})
