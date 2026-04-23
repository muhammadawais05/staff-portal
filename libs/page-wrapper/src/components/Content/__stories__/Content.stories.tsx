import React, { useState, ChangeEvent } from 'react'
import { Container, Tabs, Button } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'

import Content from '../Content'

export default {
  title: 'Content',
  component: Content
}

export const WithPageTitleOnly = () => (
  <Picasso>
    <Content title='Page Title'>Page content</Content>
  </Picasso>
)

export const WithActions = () => {
  const actions = (
    <>
      <Button onClick={() => {}} size='small'>
        Action 1
      </Button>
      <Button onClick={() => {}} size='small'>
        Action 2
      </Button>
    </>
  )

  return (
    <Picasso>
      <Content title='Page Title' actions={actions}>
        Page content
      </Content>
    </Picasso>
  )
}

export const WithTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const tabs = (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label 1' />
        <Tabs.Tab label='Label 2' />
        <Tabs.Tab label='Label 3' />
      </Tabs>
    </>
  )

  return (
    <Picasso>
      <Content title='Page Title' tabs={tabs}>
        <Container padded='medium'>
          {value === 0 && <>Content for the first tab</>}
          {value === 1 && <>Content for the second tab</>}
          {value === 2 && <>Content for the third tab</>}
        </Container>
      </Content>
    </Picasso>
  )
}
