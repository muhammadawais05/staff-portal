import { css } from 'styled-components'

export const listContainer = css`
  height: 30rem;
  overflow: auto;
`

export const tableRow = css`
  padding-left: 1rem;
  padding-right: 1rem;
`

export const occurrencesColumn = css`
  height: 2.6rem;
  padding-right: 0;

  > div {
    padding-right: 1rem;
  }
`

export const dateColumn = css`
  padding: 0;
`

export const nameColumn = css`
  padding: 0;
  padding-left: 0.8rem;

  > div {
    width: 6.5rem;
    position: relative;

    &::before {
      content: '-';
      top: 0.5rem;
      left: -0.5rem;
      line-height: 0;
      font-weight: 600;
      position: absolute;
    }
  }
`

export const descriptionColumn = (hasOcurrencies: boolean) => css`
  padding-left: 0;
  padding-right: 0 !important;

  div {
    width: ${hasOcurrencies ? '28.5rem' : '31.5rem'};
  }
`

export const description = `
  a {
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`
