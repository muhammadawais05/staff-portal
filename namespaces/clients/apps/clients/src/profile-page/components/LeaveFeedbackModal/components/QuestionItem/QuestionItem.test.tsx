import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { isRequiredShort } from '@staff-portal/validators'

import QuestionItem from './QuestionItem'

jest.mock('@staff-portal/validators', () => ({
  isRequiredShort: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    Radio: jest.fn(),
    RadioGroup: jest.fn()
  }
}))

const isRequiredShortMock = isRequiredShort as jest.Mock
const mockedRadioGroup = Form.RadioGroup as unknown as jest.Mock

describe('QuestionItem', () => {
  it('renders as expected', () => {
    mockedRadioGroup.mockReturnValue(null)
    const name = 'name'
    const question = {
      title: 'title',
      answers: [
        {
          title: 'answerTitle',
          score: 1
        }
      ]
    }

    render(<QuestionItem name={name} value={1} question={question} />)

    expect(
      screen.getByTestId('leave-feedback-modal-question-item')
    ).toHaveTextContent(question.title)
    expect(mockedRadioGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        children: [
          expect.objectContaining({
            props: {
              label: 'answerTitle',
              value: '1'
            }
          })
        ],
        validate: isRequiredShortMock,
        horizontal: true,
        name: name,
        value: question.answers[0].score.toString()
      }),
      {}
    )
  })
})
