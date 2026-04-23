import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

import {
  ORIGINAL_IMAGE_WIDTH,
  ORIGINAL_IMAGE_HEIGHT
} from '../../constants/portfolioImage'

const title = (initiallyHidden: boolean) => css`
  position: absolute;
  bottom: 0;
  /* stylelint-disable-next-line */
  visibility: ${initiallyHidden ? 'hidden' : 'visible'};
  z-index: 2;
  padding: 1rem;
`

const action = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 1rem;
`

const interactive = css`
  cursor: pointer;
`

const tileWithPlaceholder = css`
  width: 100%;

  &::before {
    opacity: 0.4;
  }
`

const tile = css`
  position: relative;
  max-width: ${ORIGINAL_IMAGE_WIDTH}px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0.71;
  }

  &.preview {
    &::before {
      background-color: ${palette.blue.dark};
    }

    .item-title {
      visibility: visible;
    }
  }

  &.default {
    &::before {
      background-color: ${palette.common.white};
    }
  }

  &.default-hovered {
    &::before {
      background-color: ${palette.blue.dark};
      opacity: 1;
    }

    .item-title {
      visibility: visible;
    }
  }

  &.highlighted {
    &::before {
      display: none;
    }
  }

  &.highlighted-hovered {
    &::before {
      display: none;
    }
  }
`

const imagePlaceholder = css`
  background-color: ${palette.blue.dark};
  padding-top: calc(${ORIGINAL_IMAGE_HEIGHT} / ${ORIGINAL_IMAGE_WIDTH} * 100%);
`

const image = css`
  display: block;
  max-width: 100%;
  height: auto;
`

export {
  interactive,
  action,
  image,
  imagePlaceholder,
  tile,
  tileWithPlaceholder,
  title
}
