<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Panacea Mobile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Server URL</ion-label>
        <ion-input
          formControlName="server"
          type="text"
          @ionChange="e => (server = e.detail.value)"
          :value="server"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input
          formControlName="email"
          type="text"
          @ionChange="e => (email = e.detail.value)"
          :value="email"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input
          formControlName="password"
          type="password"
          @ionChange="e => (password = e.detail.value)"
          :value="password"
        ></ion-input>
      </ion-item>
      <ion-button expand="block" fill="clear" @click="login">Login</ion-button>
      <div></div>
    </ion-content>
  </div>
</template>

<script>
import session from '@/store/session'

export default {
  name: 'Login',
  data() {
    return {
      server: '',
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      session.login(this.server, this.email, this.password)
    }
  }
}
</script>
