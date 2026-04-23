import { CareerPageConnection } from '@staff-portal/graphql/staff'

export const careerPagesMock: CareerPageConnection = {
  nodes: [
    {
      id: '1',
      primary: true,
      url: 'http://test1.url'
    },
    {
      id: '2',
      primary: false,
      url: 'http://test2.url'
    },
    {
      id: '3',
      primary: false,
      url: 'http://test3.url'
    },
    {
      id: '4',
      primary: false,
      url: 'http://test4.url'
    }
  ],
  totalCount: 4
}
