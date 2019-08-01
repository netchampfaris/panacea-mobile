import Vue from 'vue'

export default new Vue({
  data() {
    return {
      doctors: [],
      meta: null,
      fetched: false
    }
  },
  methods: {
    async fetch() {
      if (this.fetched) return

      this.doctors = await this.$call('frappe.client.get_list', {
        doctype: 'Doctor',
        fields: 'name, area'
      })
      this.fetched = true
    },

    async fetchMeta() {
      this.meta = await this.$call('frappe.client.get', {
        doctype: 'DocType',
        name: 'Doctor'
      })
    },

    async save(doc) {
      doc.doctype = 'Doctor'
      await this.$call('frappe.client.insert', {
        doc
      })

      this.fetched = false
      this.fetch()
    }
  }
})
