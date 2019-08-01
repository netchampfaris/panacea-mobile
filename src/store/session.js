import Vue from 'vue'
import router from '../router'

export default new Vue({
  data() {
    return {
      loggedIn: false
    }
  },
  watch: {
    loggedIn(newValue) {
      let route
      if (newValue) {
        route = '/'
      } else {
        route = '/login'
      }
      console.log(route)
      router.replace(route)
    }
  },
  methods: {
    async ping() {
      return await this.$call('ping')
    },

    login(server, usr, pwd) {
      return this.$call('login', {
        server,
        usr,
        pwd
      }).then(() => {
        this.setLoggedIn(true)
      })
    },

    setLoggedIn(flag) {
      this.loggedIn = flag
    }
  }
})
