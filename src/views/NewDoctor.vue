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
          @ionChange="inputChange($event, df)"
        ></ion-input>
      </ion-item>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="showSuccess">
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
export default {
  name: 'NewDoctor',
  data() {
    let fields = [
      {
        fieldtype: 'Data',
        fieldname: 'my_core',
        label: 'My Core'
      },
      {
        fieldtype: 'Data',
        fieldname: 'visit_frequency',
        label: 'Visit Frequency'
      },
      {
        fieldtype: 'Data',
        fieldname: 'patient_income',
        label: 'Patient Income'
      },
      {
        fieldtype: 'Data',
        fieldname: 'pin_code',
        label: 'Pin Code'
      },
      {
        fieldtype: 'Data',
        fieldname: 'sub_territory',
        label: 'Consultation Fee'
      },
      {
        fieldtype: 'Check',
        fieldname: 'computer_savvy',
        label: 'Computer Savvy'
      }
    ]

    let doc = fields.reduce((acc, df) => {
      acc[df.fieldname] = null
      if (df.fieldtype === 'Check') {
        acc[df.fieldname] = false
      }
      return acc
    }, {})

    return {
      fields,
      doc
    }
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

    showSuccess() {
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
    }
  }
}
</script>
