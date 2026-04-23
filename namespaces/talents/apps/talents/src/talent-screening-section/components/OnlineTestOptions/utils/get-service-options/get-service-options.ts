import { OnlineTestsFragment } from '@staff-portal/talents'

type ServiceType = {
  service: string
  onlineTests: OnlineTestsFragment[]
}

export const getServiceOptions = (
  services: ServiceType[],
  serviceName: string
) =>
  services
    .find(({ service }) => service === serviceName)
    ?.onlineTests.map(({ id, name }) => ({ value: id, text: name }))
