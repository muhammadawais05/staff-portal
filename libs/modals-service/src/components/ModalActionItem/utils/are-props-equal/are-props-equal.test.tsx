import React from 'react'

import arePropsEqual from './are-props-equal'
import { Modal } from '../../../../types'

const ModalComponent: Modal<{ foo: string }> = () => <div />

describe('arePropsEqual', () => {
  it.each([
    {
      prevProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      nextProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      expectedResult: true
    },
    {
      prevProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      nextProps: {
        children: '',
        modalProps: {
          foo: '',
          bar: 'bar'
        }
      },
      expectedResult: false
    },
    {
      prevProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      nextProps: {
        children: '123',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      expectedResult: false
    },
    {
      prevProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      nextProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        },
        size: 'medium' as const
      },
      expectedResult: false
    },
    {
      prevProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        },
        size: 'medium' as const
      },
      nextProps: {
        children: '',
        modalProps: {
          foo: 'foo',
          bar: 'bar'
        }
      },
      expectedResult: false
    }
  ])('returns valid result', ({ prevProps, nextProps, expectedResult }) => {
    const result = arePropsEqual(
      {
        ...prevProps,
        modal: ModalComponent,
        componentType: 'button',
        operation: undefined
      },
      {
        ...nextProps,
        modal: ModalComponent,
        componentType: 'button',
        operation: undefined
      }
    )

    expect(result).toBe(expectedResult)
  })
})
