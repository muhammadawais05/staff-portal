import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import MarkAsPrimaryButton from './MarkAsPrimaryButton'

const arrangeTest = ({
  props,
  isPrimary
}: {
  props: ComponentProps<typeof MarkAsPrimaryButton>
  isPrimary?: boolean
}) =>
  render(
    <TestWrapper>
      <Form
        onSubmit={() => {}}
        name={props.formName}
        initialValues={{
          [props.formName]: [{ primary: isPrimary }]
        }}
      >
        <MarkAsPrimaryButton {...props} />
      </Form>
    </TestWrapper>
  )

describe('MarkAsPrimaryButton', () => {
  describe('when item is Primary', () => {
    it('renders primary label', () => {
      const itemIndex = 0

      arrangeTest({
        props: {
          itemIndex,
          setPrimary: () => null,
          formName: 'test',
          disabled: false
        },
        isPrimary: true
      })

      expect(
        screen.getByTestId(`MarkAsPrimaryButton-${itemIndex}-label`)
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId(`MarkAsPrimaryButton-${itemIndex}-button`)
      ).toBeNull()
    })
  })

  describe('when item is not Primary', () => {
    it('renders set as primary button', () => {
      const itemIndex = 0

      arrangeTest({
        props: {
          itemIndex,
          setPrimary: () => null,
          formName: 'test',
          disabled: false
        }
      })

      expect(
        screen.getByTestId(`MarkAsPrimaryButton-${itemIndex}-button`)
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId(`MarkAsPrimaryButton-${itemIndex}-label`)
      ).toBeNull()
    })
  })
})
