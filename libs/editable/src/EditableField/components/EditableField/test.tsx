import { render, act } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { EditableFieldContentProps } from '../../types'
import EditableField from './EditableField'

const handleChangeMock = jest.fn()

const handleChangeDelayed = () =>
  new Promise(resolve => setTimeout(resolve, 1000))

const viewer = <span data-testid='viewer'>Viewer</span>
const icon = <span data-testid='icon'>Icon</span>
const editor = () => (
  <Form.Input
    data-testid='editor'
    inputProps={{ 'data-testid': 'editorInput' }}
  />
)
const queryValue = () => ({
  request: () => ({}),
  data: undefined,
  loading: false,
  error: undefined,
  called: true
})

type EditableInput = {
  test: string
}

interface Props
  extends Omit<
    EditableFieldContentProps<EditableInput, string, string>,
    'name' | 'onChange' | 'initialValues'
  > {
  onChange?: () => void
}

const renderComponent = (props: Props) => {
  return render(
    <TestWrapper>
      <EditableField<EditableInput, string, string>
        {...props}
        onChange={props.onChange || handleChangeMock}
        updateOnBlur
        name='test'
        initialValues={{ test: 'test' }}
      />
    </TestWrapper>
  )
}

describe('EditableField', () => {
  describe('icon', () => {
    it('displays the icon if it is provided', () => {
      const { queryByTestId } = renderComponent({
        viewer,
        editor,
        icon,
        queryValue
      })

      expect(queryByTestId('icon')).toBeInTheDocument()
    })

    it('does not display the icon if it is not provided', () => {
      const { queryByTestId } = renderComponent({
        viewer,
        editor,
        queryValue
      })

      expect(queryByTestId('icon')).not.toBeInTheDocument()
    })
  })

  it('displays the viewer component on initial render', () => {
    const { queryByTestId } = renderComponent({
      viewer,
      editor,
      queryValue
    })

    expect(queryByTestId('viewer')).toBeInTheDocument()
    expect(queryByTestId('editor')).not.toBeInTheDocument()
    expect(queryByTestId('icon')).not.toBeInTheDocument()
  })

  describe('When toggle button is clicked', () => {
    it('does not show icon', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        viewer,
        editor,
        icon,
        queryValue
      })

      getByTestId('EditableField-toggle-button-test').click()

      expect(queryByTestId('icon')).not.toBeInTheDocument()
    })
    describe('if queryData is supplied', () => {
      it('replaces the toggle button with loader', () => {
        const mockQueryValue = jest
          .fn()
          .mockReturnValue({
            request: () => {},
            data: null,
            loading: false
          })
          .mockReturnValueOnce({
            request: () => {},
            data: null,
            loading: false
          })
          .mockReturnValueOnce({
            request: () => ({ data: 'test' }),
            data: 'test',
            loading: true
          })

        const { getByTestId, queryByTestId } = renderComponent({
          viewer,
          editor,
          queryValue: mockQueryValue
        })

        expect(
          queryByTestId('EditableField-toggle-button-test')
        ).toBeInTheDocument()
        getByTestId('EditableField-toggle-button-test').click()
        expect(queryByTestId('EditableField-loader')).toBeInTheDocument()
        expect(
          queryByTestId('EditableField-toggle-button-test')
        ).not.toBeInTheDocument()
      })

      it('displays the Editor component when loading is done', () => {
        const { getByTestId, queryByTestId } = renderComponent({
          viewer,
          editor,
          queryValue
        })

        getByTestId('EditableField-toggle-button-test').click()

        expect(queryByTestId('EditableField-loader')).not.toBeInTheDocument()
        expect(queryByTestId('viewer')).not.toBeInTheDocument()
        expect(queryByTestId('editor')).toBeInTheDocument()
      })
    })

    describe('if data is supplied', () => {
      it('displays the Editor component immediately', () => {
        const { getByTestId, queryByTestId } = renderComponent({
          viewer,
          editor,
          queryValue
        })

        getByTestId('EditableField-toggle-button-test').click()

        expect(queryByTestId('EditableField-loader')).not.toBeInTheDocument()
        expect(queryByTestId('viewer')).not.toBeInTheDocument()
        expect(queryByTestId('editor')).toBeInTheDocument()
        expect(
          queryByTestId('EditableField-toggle-button-test')
        ).not.toBeInTheDocument()
      })
    })

    describe('when form has been submitted', () => {
      it('disables the editor component and shows the loader', async () => {
        const { container, getByTestId, queryByTestId } = renderComponent({
          viewer,
          editor,
          onChange: handleChangeDelayed,
          queryValue
        })

        getByTestId('EditableField-toggle-button-test').click()

        await act(async () => {
          container.querySelector('form')?.submit()
        })

        expect(queryByTestId('EditableField-loader')).toBeInTheDocument()
      })

      it('toggles back to viewer component', async () => {
        const { container, getByTestId, queryByTestId } = renderComponent({
          viewer,
          editor,
          queryValue
        })

        getByTestId('EditableField-toggle-button-test').click()

        await act(async () => {
          container.querySelector('form')?.submit()
        })

        expect(handleChangeMock).toHaveBeenCalled()
        expect(queryByTestId('editor')).not.toBeInTheDocument()
        expect(queryByTestId('viewer')).toBeInTheDocument()
      })
    })
  })
})
