import React, { ReactNode } from 'react'
// this is the only legitimate file where TestingPicasso can be imported
// eslint-disable-next-line no-restricted-imports
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { Form, FormConfigProps } from '@toptal/picasso-forms'
import { RouteContext, RouteType } from '@staff-portal/navigation'
import { DependencyInjector } from '@staff-portal/dependency-injector'

const route: RouteType = path => ({ url: path })
const formConfigOptions: FormConfigProps = { requiredVariant: 'asterisk' }

const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RouteContext.Provider value={route}>
      <Form.ConfigProvider value={formConfigOptions}>
        <TestingPicasso titleCase>
          <DependencyInjector>{children}</DependencyInjector>
        </TestingPicasso>
      </Form.ConfigProvider>
    </RouteContext.Provider>
  )
}

export default TestWrapper
