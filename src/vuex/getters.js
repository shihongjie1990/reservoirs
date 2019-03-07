export const currentUser = state => state.currentUser
export const isLogin = state => state.isLogin
export const roleData = state => state.roleData
export const reservoirlist = state => state.reservoirlist
export const regionTree = state => state.regionTree
export const MenuNodes = state => state.MenuNodes
export const reservoir = state => state.reservoir
export const menuList = state => state.menuList
export const expandMenu = state => state.expandMenu
export const step = state => state.step
export const getUser = state => {
  let user = ''
  let stateUser = state.user
  if (stateUser) {
    user = stateUser
  } else {
    let userString = window.localStorage.USER
    if (userString) {
      let Base64 = require('js-base64').Base64
      let localUser = JSON.parse(Base64.decode(userString))
      user = localUser
    }
  }
  return user
}
