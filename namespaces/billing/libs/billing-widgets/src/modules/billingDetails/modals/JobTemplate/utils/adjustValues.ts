import { AnyObject } from '@toptal/picasso-forms'

// TODO: remove this function, once https://toptal-core.atlassian.net/browse/GOLD-1401 resolved
const adjustValues = (values: AnyObject) => ({
  billCycle: null,
  billDay: null,
  commitment: null,
  ...values
})

export default adjustValues
