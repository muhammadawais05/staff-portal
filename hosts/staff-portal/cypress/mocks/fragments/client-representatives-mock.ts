import { webResourceMock } from '.'

export const clientRepresentativesMock = () => ({
  representatives: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1OTY1Nzk',
        ...webResourceMock({
          text: 'Oda Wyman',
          url: 'https://staging.toptal.net/platform/staff/company_representatives/2596579'
        }),
        fullName: 'Oda Wyman',
        currentSignInAt: '2021-07-08T23:46:17+03:00',
        currentSignInIp: '24.157.23.228',
        ipLocation: {
          cityName: 'Guaynabo',
          countryName: 'Puerto Rico'
        }
      }
    ],
    totalCount: 0
  }
})
