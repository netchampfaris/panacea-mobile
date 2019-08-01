<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="itemGroup in itemGroups" :key="itemGroup.title">
        <ion-item lines="full">
          <ion-label color="medium">{{ itemGroup.title }}</ion-label>
        </ion-item>

        <ion-list v-if="itemGroup.items.length > 0">
          <ion-item
            lines="none"
            v-for="row in itemGroup.items"
            :key="row.label"
          >
            <ion-label>{{ row.label }}</ion-label>
          </ion-item>
        </ion-list>
        <ion-card-content v-else>
          <ion-label>{{ itemGroup.emptyMessage }}</ion-label>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    let itemGroups = [
      {
        title: "Today's Plan",
        items: [
          {
            label: 'Leave'
          }
        ],
        emptyMessage: 'No Upcoming Plan'
      },
      {
        title: "Today's Events",
        items: [],
        emptyMessage: 'No Events Found'
      },
      {
        title: 'Upcoming Events',
        items: [],
        emptyMessage: 'No Events Found'
      },
      {
        title: 'Pending Doctor Approval',
        items: [
          {
            label: 'Jaydeep Date - Thergaon'
          },
          {
            label: 'Amit Reddy - Sakinaka'
          },
          {
            label: 'Arijit Saha - Sakinaka'
          },
          {
            label: 'Avdhut Kadam - Sakinaka'
          }
        ],
        emptyMessage: 'No Pending Approvals'
      }
    ]

    return {
      itemGroups
    }
  }
}
</script>
