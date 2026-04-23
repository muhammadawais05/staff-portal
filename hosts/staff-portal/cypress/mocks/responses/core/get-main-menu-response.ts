export const getMainMenuResponse = () => ({
  data: {
    menus: {
      mainMenu: [
        {
          label: 'Test',
          counter: 'test',
          path: '/platform/staff/dashboard',
          items: [],
          __typename: 'MenuItem'
        }
      ],
      __typename: 'Menu'
    }
  }
})
