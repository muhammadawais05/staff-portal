// import { palette } from '@toptal/picasso/utils'

/*
* TODO: remove this class when would be added solution in the Picasso
* https://toptal-core.atlassian.net/browse/SPB-3054
*/

type Props = {
  isExpanded: boolean
  totalCount: number
}

export const investigationsSection = ({ isExpanded, totalCount }: Props) => !isExpanded && Boolean(totalCount) ? `
  > :last-child:not(:first-child) {
    display: none;
  }
  border-bottom: none;
  > div {
    border-radius: 8px;
  }
` : undefined
