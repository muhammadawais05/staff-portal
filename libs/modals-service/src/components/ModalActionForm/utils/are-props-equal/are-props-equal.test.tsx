import React from 'react'
import { TypedDocumentNode } from '@staff-portal/data-layer-service'
import { Dictionary } from '@staff-portal/utils'

import arePropsEqual from './are-props-equal'
import { Props } from '../../ModalActionForm'

describe('arePropsEqual', () => {
  const baseProps: Props<Dictionary> = {
    title: 'title',
    children: <div />,
    initialLoading: false,
    mutation: {
      document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
      successMessage: 'success'
    },
    onClose: jest.fn()
  }

  it.each([
    {
      prevProps: {
        title: 'foo',
        mutation: {
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success'
        }
      },
      nextProps: {
        title: 'foo',
        mutation: {
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success'
        }
      },
      expectedResult: true
    },
    {
      prevProps: {
        title: 'foo',
        mutation: {
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success'
        }
      },
      nextProps: {
        title: 'foo'
      },
      expectedResult: true
    },
    {
      prevProps: {
        title: 'foo'
      },
      nextProps: {
        title: 'foo',
        mutation: {
          document: {} as TypedDocumentNode<Dictionary, { input: Dictionary }>,
          successMessage: 'success'
        }
      },
      expectedResult: true
    },
    {
      prevProps: {
        title: 'foo',
        adjustFormValues: () => Promise.resolve()
      },
      nextProps: {
        title: 'foo',
        adjustFormValues: () => Promise.resolve()
      },
      expectedResult: true
    },
    {
      prevProps: {
        title: 'foo',
        initialValues: {}
      },
      nextProps: {
        title: 'foo',
        initialValues: {}
      },
      expectedResult: false
    },
    {
      prevProps: {
        title: 'foo'
      },
      nextProps: {},
      expectedResult: false
    },
    {
      prevProps: {},
      nextProps: {
        title: 'foo'
      },
      expectedResult: false
    }
  ] as const)(
    'returns valid result',
    ({ prevProps, nextProps, expectedResult }) => {
      const result = arePropsEqual(
        {
          ...baseProps,
          ...prevProps
        },
        {
          ...baseProps,
          ...nextProps
        }
      )

      expect(result).toBe(expectedResult)
    }
  )
})
