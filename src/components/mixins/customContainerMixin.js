export default {
  methods: {
    createIds (data) {
      let id = 0

      for (id; id < data.length; id++) {
        data[id].id = id
      }

      return data
    }
  }
}
