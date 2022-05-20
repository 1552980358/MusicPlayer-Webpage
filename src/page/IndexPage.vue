<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    download_page() {
      this.$router.push('/download');
    },
    upload_page() {
      this.$router.push('/upload');
    },
    player_page() {
      this.$router.push('/player');
    }
  },
}
</script>

<style scoped>

</style>