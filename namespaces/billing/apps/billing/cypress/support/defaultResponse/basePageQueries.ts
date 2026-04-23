export default {
  GetStatusMessages: {
    data: {
      viewer: {
        me: {
          id: 'VjEtU3RhZmYtMTAwMDEw',
          __typename: 'Staff'
        },
        statusMessages: {
          nodes: [
            {
              severity: 'WARNING',
              sticky: false,
              storeKey: 'wrong_time_zone_Europe/Moscow_Europe/Madrid',
              tag: 'WRONG_TIME_ZONE',
              text: "The time zone in your profile is set to (UTC+03:00) Europe - Moscow, but we've detected a change to Europe/Madrid. <a href='#' class='js-action' data-action='save_local'>Save local time zone</a>.",
              data: [
                {
                  key: 'current',
                  value: '(UTC+03:00) Europe - Moscow',
                  __typename: 'StatusMessageDataEntry'
                },
                {
                  key: 'detected',
                  value: 'Europe/Madrid',
                  __typename: 'StatusMessageDataEntry'
                },
                {
                  key: 'text',
                  value:
                    "<a href='#' class='js-action' data-action='save_local'>Save local time zone</a>.",
                  __typename: 'StatusMessageDataEntry'
                }
              ],
              __typename: 'StatusMessage'
            }
          ],
          __typename: 'StatusMessageConnection'
        },
        __typename: 'Viewer'
      }
    }
  },
  GetExpiredCallTimers: {
    data: {
      viewer: {
        me: {
          id: 'VjEtU3RhZmYtMTAwMDEw',
          __typename: 'Staff'
        },
        expiredCallTimers: {
          nodes: [],
          __typename: 'ExpiredCallTimerConnection'
        },
        __typename: 'Viewer'
      }
    }
  }
}
