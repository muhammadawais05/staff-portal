import { ComponentProps } from 'react'
import styled from 'styled-components'
import ReactImageCrop from 'react-image-crop'
import { palette } from '@toptal/picasso/utils'

export const PreviewContainer = styled.div<{
  error?: boolean
  previewWidth: number
  previewHeight: number
}>`
  /* stylelint-disable value-keyword-case, declaration-colon-newline-after */
  position: relative;
  display: flex;
  overflow: visible;
  width: ${props => props.previewWidth}px;
  height: ${props => props.previewHeight}px;
  align-items: center;
  justify-content: center;
  background: ${palette.grey.light};
  box-shadow: 0 0 0 1px
    ${props => (props.error ? palette.red.main : palette.grey.light2)};
  /* stylelint-enable */
`

export const Cropper = styled(ReactImageCrop)<
  ComponentProps<typeof ReactImageCrop> & {
    width: number
    height: number
  }
>`
  /* stylelint-disable selector-class-pattern */
  && {
    overflow: visible;
    user-select: none;

    .ReactCrop__crop-selection {
      box-shadow: 0 0 0 9999em rgb(255 255 255 / 50%);
    }

    .ReactCrop__child-wrapper {
      max-width: ${props => props.width}px;
      max-height: ${props => props.height}px;
    }

    .ReactCrop__drag-handle::after {
      background-color: ${palette.blue.main};
      border: none;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    }
  }
  /* stylelint-enable */
`
