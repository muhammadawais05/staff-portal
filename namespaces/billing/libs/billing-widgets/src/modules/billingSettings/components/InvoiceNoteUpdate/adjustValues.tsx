import { AnyObject } from '@toptal/picasso-forms'

export default ({ invoiceNote, ...rest }: AnyObject) => ({
  ...rest,
  invoiceNote: invoiceNote ?? ''
})
