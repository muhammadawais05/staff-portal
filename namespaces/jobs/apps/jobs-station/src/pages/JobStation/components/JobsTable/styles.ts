import { css } from 'styled-components'

// https://toptal-core.atlassian.net/browse/CRT-2911
// https://share.goabstract.com/acb3aabf-1385-46f4-a84a-add5c5590467?collectionLayerId=81496dd6-4774-4d7b-bd7d-75d902344b0b&mode=design
export const tableRow = css`
  td {
    height: 3.75rem;
  }

  th:not(:first-of-type),
  td:not(:first-of-type) {
    padding-left: 0;
    padding-right: 1rem;
  }
`
