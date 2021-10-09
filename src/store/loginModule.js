const loginModule = {
  state: {
    isLogged: window.localStorage.getItem('isLogged') || false
  },
  mutations: {
    setLoggedIn (state) {
      window.localStorage.setItem('isLogged', true)
      state.isLogged = true
    }
  },
  actions: {

  },
  modules: {
  }
}

export default loginModule;