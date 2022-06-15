<template>
  <a-select
      v-model:value="selectedItems"
      @change="handleChange"
      :allowClear="true"
      mode="multiple"
      placeholder="Inserted are removed"
      style="width: 100%"
      :options="filteredOptions"
  >
  </a-select>
</template>
<script>
export default {
  name: "TagSelect",
  computed: {
    filteredOptions() {
      return this.$store.getters['repo/allTags']
          .map(item => ({ value: item }))
    }
  },
  data() {
    return {
      selectedItems: this.$store.state.repo.selectTags,
    }
  },
  methods: {
    handleChange(value) {
      this.$store.commit("repo/updateSelectTags", value)
    }
  }
}
</script>

<style scoped>

</style>