// 更改用户状态信息
export const userState = (state, user) => {
  if (user) {
    state.currentUser = user
    state.isLogin = true
  } else if (user === null) {
    // 登出的时候清空sessionStorage里的东西
    sessionStorage.setItem('userName', null)
    sessionStorage.setItem('userToken', '')
    state.currentUser = null
    state.isLogin = false
    state.token = ''
  }
}

export const roleDataState = (state, roleData) => {
  state.roleData = roleData
}

export const reservoirlistState = (state, reservoirlist) => {
  state.reservoirlist = reservoirlist
}

export const regionTreeState = (state, regionTree) => {
  state.regionTree = regionTree
}

export const MenuNodesState = (state, MenuNodes) => {
  state.MenuNodes = MenuNodes
}

export const reservoirState = (state, reservoir) => {
  state.reservoir = reservoir
}

export const menuListState = (state, menuList) => {
  state.menuList = menuList
}

export const expandMenuState = (state, expandMenu) => {
  state.expandMenu = expandMenu
}

export const stepState = (state, step) => {
  state.step = step
}

export const SHOW_IMG_STATE = (state, obj) => {
  state.SHOW_IMG = obj
}
