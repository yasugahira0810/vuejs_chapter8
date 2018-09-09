export default {
  created() {
    console.log(this.$store.count)
    this.$store.commit('increment')
  }
}
