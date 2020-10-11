export const setToken = () => {
  const token = window.localStorage.getItem('ohb-jwt-token')
  return { headers: { Authorization: token } }
}
