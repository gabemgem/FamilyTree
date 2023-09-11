<script>
import Tree from '../components/Tree.vue'
import { loadData } from '../scripts/dataService'

export default {
  components: {
    Tree
  },
  data() {
    return {
      rawData: {}
    }
  },
  mounted() {
    this.loadAllData()
  },
  methods: {
    async loadAllData() {
      loadData().then((data) => this.rawData=data);
    }
  }
}
</script>

<template>
  <main>
    <Tree :rawData="rawData" />
  </main>
</template>
