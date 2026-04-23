import { palette } from '@toptal/picasso/utils'

export const statusMessageContent = `
  p:first-of-type {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
  
  .status {
    font-weight: bold;
    
    &.is-red {
      color: ${palette.red.main};
    }
    
    &.is-orange {
      color: ${palette.yellow.main};
    }
  
    &.is-green {
      color: ${palette.green.main};
    }
    
    &.is-gray {
      color: ${palette.grey.main};
    }
  
    &.is-yellow {
      color: ${palette.yellow.main};
    }
  
    &.is-red_light {
      color: ${palette.red.lighter};
    }
  }
`
