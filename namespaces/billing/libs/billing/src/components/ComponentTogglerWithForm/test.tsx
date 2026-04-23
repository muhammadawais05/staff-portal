import { act, fireEvent } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'

import ComponentTogglerWithForm from '.'
import renderComponent from '../../utils/tests'

type RendererProps = ComponentProps<typeof ComponentTogglerWithForm>

interface ToggleButtonProps {
  onClick: () => void
}

const render = (props: RendererProps) =>
  renderComponent(<ComponentTogglerWithForm {...props} />)

const initialFormValues = { testValue: 'test value' }
const CustomToggleButton = ({ onClick }: ToggleButtonProps) => (
  <button data-testid='customToggleButton' onClick={onClick}>
    Toggle
  </button>
)
const ComponentA = () => <span data-testid='componentA'>Component A</span>
const ComponentB = () => {
  return (
    <span data-testid='componentB'>
      Component B{' '}
      <button type='submit' data-testid='submit'>
        submit
      </button>
    </span>
  )
}

const getProps = (props = {}) => ({
  ComponentA,
  ComponentB,
  initialFormValues,
  isToggled: false,
  onToggle: () => null,
  ...props
})

describe('ComponentTogglerWithForm', () => {
  it('default render', () => {
    const { container } = render(getProps())

    expect(container).toMatchSnapshot()
  })

  it('renders with toggle button positioned left', () => {
    const { container } = render(
      getProps({
        toggleButtonPosition: 'start'
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('renders custom toggle button component', () => {
    const { container, queryByTestId } = render(
      getProps({
        ToggleButton: CustomToggleButton
      })
    )

    expect(queryByTestId('customToggleButton')).not.toBeNull()
    expect(container).toMatchSnapshot()
  })

  it('renders disabled toggle button component when disabled', () => {
    const { getByTestId } = render(
      getProps({
        disabled: true
      })
    )

    expect(getByTestId('componentTogglerWithFormButton')).toBeDisabled()
  })

  it('renders tooltip when tooltipMessage is present', () => {
    const { getByTestId } = render(
      getProps({
        tooltipMessage: 'example enabled tooltip',
        tooltipPlacement: 'bottom'
      })
    )

    expect(getByTestId('Tooltip')).toBeInTheDocument()
    expect(getByTestId('Tooltip-placement')).toContainHTML('bottom')
    expect(getByTestId('Tooltip-content')).toContainHTML(
      'example enabled tooltip'
    )
  })

  it('renders ComponentB', () => {
    const { container, queryByTestId } = render(getProps({ isToggled: true }))

    expect(queryByTestId('componentA')).toBeNull()
    expect(queryByTestId('componentB')).not.toBeNull()

    expect(container).toMatchSnapshot()
  })

  it('renders ComponentB, submits form and receives proper data', async () => {
    const mockHandleOnSubmit = jest.fn(() => null)
    const { container, getByTestId } = render(
      getProps({
        handleOnSubmit: mockHandleOnSubmit,
        isToggled: true
      })
    )

    await act(async () => {
      fireEvent.click(getByTestId('submit'))

      expect(mockHandleOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockHandleOnSubmit.mock.calls[0][0]).toEqual(initialFormValues)
      expect(container).toMatchSnapshot()
    })
  })
})
