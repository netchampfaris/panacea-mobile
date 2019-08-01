<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Panacea Mobile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input formControlName="email" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input formControlName="password" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" fill="clear" @click="login">Login</ion-button>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      this.$router.replace('/')
    }
  }
}
</script>
