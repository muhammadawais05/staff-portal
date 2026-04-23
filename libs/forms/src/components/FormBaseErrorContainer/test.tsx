import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import { TestWrapper } from '@staff-portal/test-utils'

import FormBaseErrorContainer from './index'

jest.mock('@staff-portal/string', () => ({
  ...jest.requireActual('@staff-portal/string'),
  SimpleHtmlFormatter: ({ text }: { text: string }) => <>{text}</>
}))

const arrangeTest = (
  props: ComponentProps<typeof FormBaseErrorContainer>,
  onSubmit = noop
) =>
  render(
    <TestWrapper>
      <Form onSubmit={onSubmit}>
        <FormBaseErrorContainer {...props}>{null}</FormBaseErrorContainer>
        <Form.Input name='inline.field' />
        <Form.SubmitButton data-testid='submitButton'>Submit</Form.SubmitButton>
      </Form>
    </TestWrapper>
  )

describe('FormBaseErrorContainer', () => {
  it('field errors', async () => {
    arrangeTest({ fieldErrorKeys: ['test'] }, () => ({
      test: 'example field form error',
      originalErrors: [
        {
          key: 'test',
          message: 'example field form error'
        }
      ]
    }))

    screen.getByTestId('submitButton').click()

    expect(
      await screen.findByTestId('FormBaseErrorContainer-error')
    ).toHaveTextContent('example field form error')
  })

  it('handles unexpected errors', async () => {
    arrangeTest({}, () => ({
      test: {
        nested: 'example unexpected field form error'
      },
      inline: {
        field: 'some inline field error'
      },
      originalErrors: [
        {
          key: 'test.nested',
          message: 'line one'
        },
        {
          key: 'test.nested',
          message: 'line two'
        },
        {
          key: 'inline.field',
          message: 'some inline field error'
        }
      ]
    }))

    screen.getByTestId('submitButton').click()

    expect(
      await screen.findByTestId('FormBaseErrorContainer-error')
    ).toHaveTextContent('line one<br />line two')
  })

  it('no errors', async () => {
    arrangeTest({})

    expect(screen.queryByTestId('FormBaseErrorContainer-error')).toBeNull()
  })
})
