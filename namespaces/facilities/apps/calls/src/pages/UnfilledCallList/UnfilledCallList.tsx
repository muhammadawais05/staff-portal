import React from 'react'

import CallTablePage from '../../components/CallTablePage'

const UnfilledCallList = () => {
  const pageTitle = 'Calls with Missing information'

  return <CallTablePage pageTitle={pageTitle} unfilled />
}

export default UnfilledCallList
