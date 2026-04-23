import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Container, Link, Menu, Button } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'

import TaskCardLayout from '../components/TaskCardLayout'
import * as S from './styles'

export default {
  title: 'TaskCardLayout',
  component: TaskCardLayout,
  subcomponents: {
    Actions: TaskCardLayout.Actions,
    Content: TaskCardLayout.Content,
    Description: TaskCardLayout.Description,
    Header: TaskCardLayout.Header,
    Loading: TaskCardLayout.Loading,
    MoreButton: TaskCardLayout.MoreButton,
    RowItem: TaskCardLayout.RowItem,
    Summary: TaskCardLayout.Summary,
    SummaryItem: TaskCardLayout.SummaryItem,
    Tag: TaskCardLayout.Tag,
    Tags: TaskCardLayout.Tags,
    Title: TaskCardLayout.Title
  }
}

export const Default = () => (
  <Picasso>
    <Container padded='medium' css={S.container}>
      <TaskCardLayout>
        <TaskCardLayout.Header>
          <TaskCardLayout.Title title='Kellye Kuvalis' icon={undefined}>
            <Link href='#' target='_blank'>
              Developer
            </Link>
          </TaskCardLayout.Title>

          <TaskCardLayout.Actions>
            <Button size='small'>Send Email</Button>

            <TaskCardLayout.MoreButton>
              <Menu.Item>Contact talent</Menu.Item>
              <Menu.Item>Approve talent</Menu.Item>
            </TaskCardLayout.MoreButton>
          </TaskCardLayout.Actions>
        </TaskCardLayout.Header>

        <TaskCardLayout.Summary>
          <TaskCardLayout.SummaryItem
            label='Status'
            value='Active'
            variant='value-green'
          />
          <TaskCardLayout.SummaryItem label='Rate' value='$40.00/h' />
          <TaskCardLayout.SummaryItem label='Jobs' value='0 / 0 / 0' />
          <TaskCardLayout.SummaryItem
            label='Engagement Rate'
            value={undefined}
          />
        </TaskCardLayout.Summary>

        <TaskCardLayout.Content items={CONTENT_ITEMS} />

        <TaskCardLayout.Description title='Details'>
          <TaskCardLayout.DescriptionFormatter
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla
sodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla eros
arcu, mattis vitae congue cursus, tincidunt sed turpis. Curabitur non enim diam, eget elementum dolor. Vivamus enim
tortor, tempor at vehicu'
          />
        </TaskCardLayout.Description>
      </TaskCardLayout>
    </Container>
  </Picasso>
)

export const Loading = () => (
  <Picasso>
    <Container padded='medium' style={{ width: 800 }}>
      <TaskCardLayout loading>Loading ...</TaskCardLayout>
    </Container>
  </Picasso>
)

const CONTENT_ITEMS = [
  {
    key: 0,
    label: 'Email',
    value: 'test@email.com'
  },
  {
    key: 1,
    label: 'Phone',
    value: '0123456789'
  },
  {
    key: 2,
    label: 'Skype ID',
    value: 'kelley_1234'
  },
  {
    key: 3,
    label: 'Current Location',
    value: 'San Mateo, CA, United States'
  },
  {
    key: 4,
    label: 'Promary Skill',
    value: 'Java'
  },
  {
    key: 5,
    label: 'Specializations',
    value: 'Quality Assurance'
  }
]
