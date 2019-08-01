<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <!-- <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons> -->
        <ion-title>New Doctor</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item v-for="df in fields" :key="df.fieldname">
        <ion-label :position="df.fieldtype === 'Check' ? null : 'floating'">
          {{ df.label }}
        </ion-label>

        <ion-toggle
          v-if="df.fieldtype === 'Check'"
          @ionChange="inputChange($event, df)"
          :value="doc[df.fieldname]"
          :checked="doc[df.fieldname]"
        ></ion-toggle>
        <ion-input
          v-else
          :value="doc[df.fieldname]"
          :required="Boolean(df.reqd)"
          @ionChange="inputChange($event, df)"
        ></ion-input>
      </ion-item>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="submit">
          <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button color="light" @click="$router.go(-1)">
          <ion-icon name="close"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import doctor from '@/store/doctor'

export default {
  name: 'NewDoctor',
  data() {
    return {
      fields: [],
      doc: null
    }
  },

  async mounted() {
    await doctor.fetchMeta()

    this.fields = doctor.meta.fields
    if (doctor.meta.autoname === 'Prompt') {
      this.fields = [
        {
          fieldtype: 'Data',
          fieldname: 'name',
          label: 'Name'
        },
        ...this.fields
      ]
    }

    this.doc = this.fields.reduce((doc, df) => {
      doc[df.fieldname] = null
      return doc
    }, {})
  },

  methods: {
    inputChange(e, df) {
      let value = null
      if (df.fieldtype === 'Check') {
        value = e.detail.checked
      } else {
        value = e.detail.value
      }
      this.doc[df.fieldname] = value
    },

    submit() {
      doctor.save(this.doc).then(() => {
        return this.$ionic.alertController
          .create({
            header: 'Success',
            message: 'Doctor created successfully',
            buttons: ['OK']
          })
          .then(a => a.present())
          .then(() => {
            this.$router.push('/doctor')
          })
      })
    }
  }
}
</script>
