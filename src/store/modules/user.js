const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    window.localStorage.setItem('TOKEN', token)
  },
  SET_UID: (state, uid) => {
    if (uid) {
      state.uid = uid
      window.localStorage.setItem('UID', uid)
    }
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve({ uid: 'uid', name: 'name', token: 'token' })
      /*getInfo(state.uid)
        .then((response) => {
          const { user_info } = response
          commit('SET_NAME', user_info.uid)
          commit('SET_AVATAR', user_info.avatar_url)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })*/
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      //removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
