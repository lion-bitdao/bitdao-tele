<template>
  <div class="mapbox-coordinate-picker">
    <div ref="geocoderContainer" class="geocoder-container"></div>
    <div ref="mapContainer" class="map-container"></div>
    <div v-if="selectedLocation" class="location-info">
      <div>经度: {{ selectedLocation.lng.toFixed(6) }}</div>
      <div>纬度: {{ selectedLocation.lat.toFixed(6) }}</div>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default {
  name: 'MapSelect',
  props: {
    accessToken: {
      type: String,
      required: true
    },
    initialCenter: {
      type: Array,
      default: () => [116.4074, 39.9042]
    },
    initialZoom: {
      type: Number,
      default: 10
    },
    mapStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/standard'
    }
  },
  data() {
    return {
      map: null,
      marker: null,
      selectedLocation: null,
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
      try {
        // 设置访问令牌
        mapboxgl.accessToken = this.accessToken
        // 初始化地图
        this.map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: this.mapStyle,
          center: this.initialCenter,
          zoom: this.initialZoom
        })

        this.map.on('style.load', () => {
          this.map.setConfigProperty('basemap', 'lightPreset', 'day')
        })
        this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        // 添加比例尺
        this.map.addControl(new mapboxgl.ScaleControl())
        // 地图加载完成后添加点击事件
        this.map.on('load', () => {
          const geocoder = new MapboxGeocoder({
            accessToken: this.accessToken,
            mapboxgl: mapboxgl
          })
          this.map.addControl(geocoder, 'top-left')

          this.map.on('click', (e) => {
            this.addMarker(e.lngLat)
            this.selectedLocation = e.lngLat
            this.$emit('coordinates-selected', {
              lat: e.lngLat.lat,
              lng: e.lngLat.lng
            })
          })
        })
      } catch (e) {
        console.log(e)
      }
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
<style>
.searchbox {
  width: 50%;
  z-index: 100;
}
.map-container {
  flex: 1;
  min-width: 400px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
}

.map-wrapper {
  width: 100%;
  height: 100%;
}
</style>
