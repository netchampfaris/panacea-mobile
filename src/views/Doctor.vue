<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Doctors</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          lines="full"
          v-for="doctor in doctors"
          :key="doctor.name"
          detail="true"
        >
          <ion-label text-wrap>
            <ion-text>
              <h3>{{ doctor.full_name }}</h3>
            </ion-text>
            <ion-text color="medium">
              <p>{{ doctor.area }}</p>
            </ion-text>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="$router.push('/doctor/new')">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Doctor',
  data() {
    let doctors = [
      {
        name: 'test',
        full_name: 'Arijit Saha',
        area: 'Kurla'
      },
      {
        name: 'test2',
        full_name: 'Ashutosh Kumar',
        area: 'Sakinaka'
      },
      {
        name: 'test3',
        full_name: 'Avdesh Chaubey',
        area: 'Sakinaka'
      }
    ]

    return {
      doctors
    }
  }
}
</script>
