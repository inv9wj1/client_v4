const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
}

export const changeState = (state = initialState, { type, ...rest }) => {
  // console.log('changeState received type: ' + type);
  // console.log('changeState received rest: ' + JSON.stringify(rest));
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
