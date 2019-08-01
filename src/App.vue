<template>
  <div id="app">
    <ion-app>
      <!-- common menu for all routes -->
      <ion-menu side="start" menuId="first">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item
              v-for="item in sidebarItems"
              :key="item.label"
              @click="goToRoute(item.route)"
            >
              <ion-label :color="item.route ? '' : 'medium'">
                {{ item.label }}
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet main></ion-router-outlet>

      <!-- rendered routes -->
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sidebarItems: [
        {
          label: 'Dashboard',
          route: '/'
        },
        {
          label: 'Doctor Visit'
          // route: '/doctor-visit'
        },
        {
          label: 'Doctor',
          route: '/doctor'
        },
        {
          label: 'Pharmacy'
          // route: '/pharmacy'
        },
        {
          label: 'Institution'
          // route: '/institution'
        },
        {
          label: 'Login',
          route: '/login'
        }
      ]
    }
  },
  async mounted() {
    window.app = this
    console.log(await this.$call('ping'))
  },
  methods: {
    goToRoute(route) {
      this.$router.push(route)
      this.$ionic.menuController.close()
    }
  }
}
</script>
