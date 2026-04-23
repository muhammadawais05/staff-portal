import { Container, Tabs } from '@toptal/picasso'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from '@staff-portal/navigation'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { RequestsList, CreateRequest } from '../../components'
import { REQUESTS_TITLE } from '../../config'

const tabs = ['mine', 'all']

const getActiveTabIndex = (hash: string) => {
  const index = tabs.indexOf(hash.replace(/#/, ''))

  return Math.max(index, 0)
}

const PublicationRequests = () => {
  const history = useHistory()
  const location = useLocation()
  const { hash } = location
  const pageTitle = REQUESTS_TITLE
  const [tabNumber, setTabNumber] = useState(getActiveTabIndex(hash))

  useEffect(() => {
    setTabNumber(getActiveTabIndex(hash))

    // Keeps compatibility with native browser history navigation
    return history.listen(({ hash: locationHash }) => {
      setTabNumber(getActiveTabIndex(locationHash))
    })
  }, [hash, history])

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabNumber(newValue)
    history.push({
      ...location,
      hash: tabs[newValue]
    })
  }

  return (
    <ContentWrapper title={pageTitle} actions={<CreateRequest />}>
      <Container top='medium'>
        <Tabs value={tabNumber} onChange={handleTabChange}>
          <Tabs.Tab label='My Requests' />
          <Tabs.Tab label='All Requests' />
        </Tabs>
      </Container>
      <Container top='medium'>
        <RequestsList showAllRequests={tabNumber === 1} />
      </Container>
    </ContentWrapper>
  )
}

export default PublicationRequests
