import { AnyObject } from '@toptal/picasso-forms'

const adjustValues = ({ attachTimesheetsToInvoices, ...rest }: AnyObject) => ({
  ...rest,
  attachTimesheetsToInvoices:
    attachTimesheetsToInvoices === 'nil'
      ? undefined
      : Boolean(attachTimesheetsToInvoices)
})

export default adjustValues
