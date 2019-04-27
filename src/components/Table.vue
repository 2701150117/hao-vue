<template>
  <el-table :data="data" stripe @row-click="rowClick"  highlight-current-row>
    <el-table-column v-if="columnIndex.show" type="index"
                     :label="columnIndex.name" :width="columnIndex.width"></el-table-column>
    <el-table-column v-for="(item, index) in label" :prop="item.prop" :key="index" :label="item.name"
                     :width="item.width" :formatter="item.formatter"></el-table-column>
    <el-table-column v-if="columnOperation.show" label="操作">
      <template slot-scope="scope">
        <el-tooltip v-for="(item, key) in columnOperation.operate" :key="key"
                    v-if='item.show == null ? true : item.show'
                    :content="item.name" placement="top">
          <el-button @click="item.click(scope.row)" type="text" :icon="item.icon"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "Table",
    props: ['data', 'label', 'columnIndex', 'columnOperation'],
    methods: {
      rowClick(val) {
        this.$emit('rowClick', val);
      }
    }
  }
</script>

<style>

</style>
