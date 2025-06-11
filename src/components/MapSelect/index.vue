<template>
  <div class="mapbox-coordinate-picker">
    <div ref="mapContainer" class="map-container"></div>

    <div class="controls-overlay">
      <div class="map-control-btn" title="街道视图" @click="setMapStyle('streets')">
        <i class="fas fa-road"></i>
      </div>
      <div class="map-control-btn" title="卫星视图" @click="setMapStyle('satellite')">
        <i class="fas fa-satellite"></i>
      </div>
      <div class="map-control-btn" title="户外视图" @click="setMapStyle('outdoors')">
        <i class="fas fa-tree"></i>
      </div>
      <div class="map-control-btn" title="暗黑模式" @click="setMapStyle('dark')">
        <i class="fas fa-moon"></i>
      </div>
    </div>

    <div v-if="selectedLocation" class="location-info">
      <div>经度: {{ selectedLocation.lng.toFixed(6) }}</div>
      <div>纬度: {{ selectedLocation.lat.toFixed(6) }}</div>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: 'MapSelect',
  props: {
    accessToken: {
      type: String,
      required: true
    },
    initialCenter: {
      type: Array,
      default: () => [0, 0]
    },
    initialZoom: {
      type: Number,
      default: 10
    },
    mapStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/streets-v11'
    }
  },
  data() {
    return {
      map: null,
      marker: null,
      selectedLocation: null,
      mapContainer: null,
      mapStyles: {
        streets: 'mapbox://styles/mapbox/streets-v11',
        satellite: 'mapbox://styles/mapbox/satellite-v9',
        outdoors: 'mapbox://styles/mapbox/outdoors-v11',
        dark: 'mapbox://styles/mapbox/dark-v10'
      }
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    initMap() {
      // 设置访问令牌
      mapboxgl.accessToken = this.accessToken

      // 初始化地图
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: this.mapStyle,
        center: this.initialCenter,
        zoom: this.initialZoom
      })

      // 添加导航控件
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // 添加比例尺
      this.map.addControl(new mapboxgl.ScaleControl())

      // 地图加载完成后添加点击事件
      this.map.on('load', () => {
        // 添加点击事件监听器
        this.map.on('click', (e) => {
          this.addMarker(e.lngLat)
          this.selectedLocation = e.lngLat
          this.$emit('coordinates-selected', {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
          })
        })
      })
    },

    addMarker(lngLat) {
      // 移除之前的标记
      if (this.marker) {
        this.marker.remove()
      }

      // 创建新标记
      this.marker = new mapboxgl.Marker({
        color: '#5ab9ea',
        draggable: true
      })
        .setLngLat(lngLat)
        .addTo(this.map)

      // 监听标记拖动事件
      this.marker.on('dragend', () => {
        const newLngLat = this.marker.getLngLat()
        this.selectedLocation = newLngLat
        this.$emit('coordinates-selected', {
          lat: newLngLat.lat,
          lng: newLngLat.lng
        })
      })
    },

    setMapStyle(styleKey) {
      if (this.mapStyles[styleKey]) {
        this.map.setStyle(this.mapStyles[styleKey])
      }
    }
  }
}
</script>
