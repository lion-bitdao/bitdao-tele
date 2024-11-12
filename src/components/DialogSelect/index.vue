<template>
  <div>
    <div v-for="row in rows" :key="row.index" class="dialog_row">
      <div v-for="item in row.row.items" :key="item.index">
        <div v-if="item.text !== ''" :class="isItemSelected(item) ? 'input_active' : 'input_normal'" :style="rowButtonStyle" @click="onChoice(item)">{{ item.text }}</div>
        <div v-if="item.text === ''" :style="rowButtonStyle" />
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
export default {
  name: 'DialogSelect',
  props: {
    dataSource: {
      type: Array,
      default: undefined
    },
    buttonWidth: {
      type: Number,
      default: 45
    },
    columnSpace: {
      type: Number,
      default: 15
    },
    selectedItems: {
      type: Array,
      default: undefined
    },
    selectedText: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 3
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rows: [],
      rowButtonStyle: '',
      itemsSelected: []
    }
  },
  watch: {},
  created() {
    this.initRows()
    this.itemsSelected = this.selectedItems
  },
  mounted() {},
  methods: {
    isItemSelected(item) {
      if (this.itemsSelected !== undefined && this.itemsSelected.length > 0) {
        var finded = this.itemsSelected.find((t) => t === item.id)
        return finded !== undefined
      }
      return false
    },
    initRows() {
      this.rowButtonStyle = `margin:${this.columnSpace}px;width:${this.buttonWidth}px`
      this.rows = []
      var rows = []
      var row = { items: [] }
      var rowIndex = 0
      var columnIndex = 0
      var currentIndex = 0
      var dataLen = this.dataSource.length
      for (currentIndex = 0; currentIndex < dataLen; currentIndex++) {
        columnIndex += 1
        row.items.push({ index: currentIndex, text: this.dataSource[currentIndex].text, id: this.dataSource[currentIndex].id })
        if (columnIndex >= this.column) {
          rows.push({ index: rowIndex, row: row })
          rowIndex += 1
          columnIndex = 0
          row = { items: [] }
        }
      }
      // fill empty
      if (columnIndex < this.column) {
        for (var j = columnIndex; j <= this.column; j++) {
          currentIndex += 1
          row.items.push({ index: currentIndex, text: '' })
        }
        rows.push({ index: rowIndex, row: row })
      }
      this.rows = rows
    },
    onChoice(item) {
      if (this.multiSelect) {
        if (this.isItemSelected(item)) {
          for (var i = 0; i < this.itemsSelected.length; i++) {
            if (this.itemsSelected[i] === item.id) {
              this.itemsSelected.splice(i, 1)
              return
            }
          }
        } else {
          this.itemsSelected.push(item.id)
        }
      } else {
        this.itemsSelected = []
        this.itemsSelected.push(item.id)
      }
      this.$nextTick(() => this.$emit('on-select', this.itemsSelected))
    }
  }
}
</script>
