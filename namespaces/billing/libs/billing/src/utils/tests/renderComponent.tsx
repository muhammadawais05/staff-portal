import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { RouteContext } from '@topkit/router'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { identicalPath } from '.'
import i18n from '../i18n'

const renderComponent = (node: ReactElement) =>
  render(
    <I18nextProvider i18n={i18n}>
      <RouteContext.Provider value={identicalPath}>
        <BrowserRouter>
          <TestingPicasso titleCase>{node}</TestingPicasso>
        </BrowserRouter>
      </RouteContext.Provider>
    </I18nextProvider>
  )

export default renderComponent
