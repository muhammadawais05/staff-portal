import '@storybook/addon-actions/register'
import '@storybook/addon-console'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Main']
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  storysource: {
    rule: {
      test: [/\.stories\.(jsx|tsx)$/]
    }
  },
  viewport: {
    defaultViewport: 'pageContent',
    viewports: {
      pageContent: {
        name: 'SP page content width',
        styles: {
          width: '912px',
          height: '100%'
        }
      },
      noLayout: {
        name: 'No layout',
        styles: {
          width: '100%',
          height: '100%'
        }
      }
    }
  }
}
