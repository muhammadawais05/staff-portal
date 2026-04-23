import { OnlineTestsFragment } from '@staff-portal/talents'

export const groupOnlineTests = (onlineTests: OnlineTestsFragment[]) => {
  const result = new Map<string, OnlineTestsFragment[]>()

  onlineTests.forEach(onlineTest => {
    const collection = result.get(onlineTest.service)

    if (collection) {
      collection.push(onlineTest)
    } else {
      result.set(onlineTest.service, [onlineTest])
    }
  })

  return Array.from(result).map(([service, tests]) => ({
    service,
    onlineTests: tests
  }))
}
