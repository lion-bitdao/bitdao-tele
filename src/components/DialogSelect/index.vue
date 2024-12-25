<template>
  <div>
    <div v-for="row in rows" :key="row.index" class="dialog_row">
      <div v-for="item in row.row.items" :key="item.index">
        <div v-if="item.text !== ''" :class="isItemSelected(item) ? 'dialogselect_active' : 'dialogselect_normal'" :style="item.style" @click="onChoice(item)">{{ item.text }}</div>
        <div v-if="item.text === ''" :style="item.style" />
      </div>
    </div>
  </div>
</template>
<style>
.dialogselect_normal {
  background: #fffefd;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: #b0b0b0;
}

.dialogselect_normal:hover {
  background: #ffffff;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: #2a2a2a;
}

.dialogselect_active {
  background: #ffffff;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: #2a2a2a;
}
</style>
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
        var finded = this.itemsSelected.find((t) => t.toString() === item.id.toString())
        return finded !== undefined
      }
      return false
    },
    initRows() {
      var _buttonWidth = this.buttonWidth
      if (_buttonWidth === 0) {
        var _windowWidth = window.innerWidth
        var _space = (this.column - 1) * 2 * this.columnSpace + 71
        console.log(_windowWidth)
        console.log(_space)
        _windowWidth -= _space
        console.log(_windowWidth)
        _buttonWidth = _windowWidth / this.column
        console.log(_buttonWidth)
      }
      this.rowButtonStyle = `margin:${this.columnSpace}px;width:${_buttonWidth}px`
      this.rows = []
      var rows = []
      var row = { items: [] }
      var rowIndex = 0
      var columnIndex = 0
      var currentIndex = 0
      var dataLen = this.dataSource.length
      for (currentIndex = 0; currentIndex < dataLen; currentIndex++) {
        columnIndex += 1
        var _style = columnIndex === this.column ? `margin-left:${this.columnSpace}px;width:${_buttonWidth}px` : columnIndex === 1 ? `margin-right:${this.columnSpace}px;width:${_buttonWidth}px` : `margin:${this.columnSpace}px;width:${_buttonWidth}px`
        row.items.push({ index: currentIndex, text: this.dataSource[currentIndex].text, id: this.dataSource[currentIndex].id, style: _style })
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
          var _filestyle = columnIndex === this.column ? `margin-left:${this.columnSpace}px;width:${this.buttonWidth}px` : columnIndex === 1 ? `margin-right:${this.columnSpace}px;width:${this.buttonWidth}px` : `margin:${this.columnSpace}px;width:${this.buttonWidth}px`
          row.items.push({ index: currentIndex, text: '', style: _filestyle })
        }
        rows.push({ index: rowIndex, row: row })
      }
      console.log(rows)
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
