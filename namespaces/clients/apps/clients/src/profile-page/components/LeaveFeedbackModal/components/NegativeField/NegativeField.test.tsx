import React from 'react'
import { Checkbox, Form } from '@toptal/picasso'
import { useFieldArray, useField } from '@toptal/picasso-forms'
import { render } from '@toptal/picasso/test-utils'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import NegativeField from './NegativeField'
import EngagementItemContent from '../EngagementItemContent'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFieldArray: jest.fn(),
  useField: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Form: {
    Error: jest.fn(),
    Hint: jest.fn(),
    Label: jest.fn()
  },
  Checkbox: jest.fn()
}))

const useFieldArrayMock = useFieldArray as jest.Mock
const useFieldMock = useField as jest.Mock
const mockedCheckbox = Checkbox as unknown as jest.Mock
const mockedFormError = Form.Error as unknown as jest.Mock
const mockedFormHint = Form.Hint as unknown as jest.Mock

const job = {
  webResource: 'webResource',
  vertical: {
    name: 'vertical'
  }
}
const talent = {
  webResource: 'webResource'
}
const engagement = {
  id: 0,
  job,
  talent
}

const renderComponent = () => {
  return render(
    <NegativeField
      scoreIndex={0}
      engagements={
        {
          nodes: [engagement],
          totalCount: 1
        } as unknown as NonNullable<SurveyEngagementFragment['engagements']>
      }
    />
  )
}

describe('NegativeField', () => {
  beforeEach(() => {
    useFieldArrayMock.mockReturnValue({
      fields: { push: () => {}, remove: () => {}, value: [] },
      meta: { submitError: [null] }
    })
    useFieldMock.mockReturnValue(null)
    mockedCheckbox.mockReturnValue(null)
    mockedFormError.mockReturnValue(null)
    mockedFormHint.mockReturnValue(null)
  })

  describe('when no score or score is yes for negative field', () => {
    it('renders nothing', () => {
      useFieldMock.mockReturnValue({ input: { value: [null] } })

      renderComponent()

      expect(useFieldMock).toHaveBeenCalledWith('scores')
      expect(useFieldArray).toHaveBeenCalledWith('negative')
    })
  })

  describe('when score is no for negative field', () => {
    it('renders component', () => {
      useFieldMock.mockReturnValue({ input: { value: [0] } })

      renderComponent()

      expect(mockedFormHint).toHaveBeenCalledWith(
        {
          children: 'Please specify which engagements received a "no" response:'
        },
        {}
      )
      expect(useFieldMock).toHaveBeenCalledWith('scores')
      expect(useFieldArray).toHaveBeenCalledWith('negative')
      expect(mockedCheckbox).toHaveBeenCalledWith(
        expect.objectContaining({
          label: expect.objectContaining({
            type: EngagementItemContent,
            props: {
              jobLink: engagement.job.webResource,
              verticalName: engagement.job.vertical.name,
              talentLink: engagement.talent.webResource
            }
          }),
          onChange: expect.any(Function)
        }),
        {}
      )
    })
  })

  describe('when there is a submit error', () => {
    it('renders error label', () => {
      const error = 'error'

      useFieldArrayMock.mockReturnValue({
        fields: { push: () => {}, remove: () => {}, value: [] },
        meta: { error: [error], touched: true }
      })
      useFieldMock.mockReturnValue({ input: { value: [0] } })

      renderComponent()

      expect(mockedFormError).toHaveBeenCalledWith({ children: error }, {})
    })
  })
})
