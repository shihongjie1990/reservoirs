// 应用mutation
export const setUser = ({
  commit
}, user) => {
  commit('userStatus', user)
}

export const setRoleData = ({
  commit
}, roleData) => {
  commit('roleDataState', roleData)
}

export const setReservoirList = ({
  commit
}, reservoirlist) => {
  commit('reservoirlistState', reservoirlist)
}

export const setRegionTree = ({
  commit
}, regionTree) => {
  commit('regionTreeState', regionTree)
}

export const setMenuNodes = ({
  commit
}, MenuNodes) => {
  commit('MenuNodesState', MenuNodes)
}

export const setReservoir = ({
  commit
}, reservoir) => {
  commit('reservoirState', reservoir)
}

export const setMenuList = ({
  commit
}, menuList) => {
  commit('menuListState', menuList)
}

export const setExpandMenu = ({
  commit
}, expandMenu) => {
  commit('expandMenuState', expandMenu)
}

export const setStep = ({
  commit
}, step) => {
  commit('stepState', step)
}

export const setShowImg = ({
  commit
}, obj) => {
  commit('SHOW_IMG_STATE', obj)
}
