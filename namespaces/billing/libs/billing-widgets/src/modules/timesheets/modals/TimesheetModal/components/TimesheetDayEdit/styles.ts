import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

interface FakeInputProps {
  isDisabled?: boolean
  isFocus: boolean
  isError: boolean
}

const getBackgroundColor = ({ isDisabled }: FakeInputProps) =>
  isDisabled ? palette.grey.lighter : palette.common.white

const getBorderColor = ({ isError, isFocus }: FakeInputProps) =>
  isError ? palette.red.main : isFocus ? palette.blue.main : palette.grey.light

const getColor = ({ isDisabled }: { isDisabled?: boolean }) =>
  isDisabled ? palette.grey.main2 : palette.common.black

const fakeInput = (input: FakeInputProps) => css`
  max-width: 3.5rem;
  width: 3.25rem;
  height: 1.5rem;
  background: ${getBackgroundColor(input)};
  border: 1px solid ${getBorderColor(input)};
  border-radius: 4px;
`

const divider = css`
  pointer-events: none;
  font-size: 12px;
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: 'arial';
  width: 4px;
`

const baseInputStyle = ({ isDisabled = false, inputOverride = '' }) => css`
  && {
    height: 100%;
    background: transparent;
    margin: 0;
    padding: 0.225rem 0;
    border: none;
    font-size: 12px;
    cursor: default;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: 'arial';
    color: ${getColor({ isDisabled })};
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-appearance: textfield;
    ${inputOverride}

    /* stylelint-disable-next-line property-no-vendor-prefix */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      outline: none;
    }
  }
`

const inputHr = (isDisabled?: boolean) => css`
  && {
    ${baseInputStyle({
      isDisabled,
      inputOverride: `
        text-align: right;
        padding-left: 0.5rem;
      `
    })}
  }
`

const inputMin = (isDisabled?: boolean) => css`
  && {
    ${baseInputStyle({
      isDisabled,
      inputOverride: `
        text-align: left;
        padding-right: 0.5rem;
      `
    })}
  }
`

export { fakeInput, divider, inputHr, inputMin }
