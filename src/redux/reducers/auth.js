const initialState = {
  isAuthenticated: false,
}
// payload to be implmented with JWT token
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'login':
      return { isAuthenticated: true }
    case 'logout':
      return { isAuthenticated: false }
    default:
      return state
  }
}
