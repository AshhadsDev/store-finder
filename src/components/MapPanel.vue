<template>
  <div class="map-panel-container">
    <gmap-map :center="mapCenter" :zoom="zoom" ref="mapInstance" @click="closePopup" style="width: 100%; height: 100vh">
      <GmapCluster :zoomOnClick="true" >
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="closePopup">
          {{infoContent}}
        </gmap-info-window>
        <gmap-marker
          v-for="(m, index) in mapMarkers"
          :position="m.position"
          :clickable="true" :draggable="true"
          @click="toggleInfoWindow(m, index)"
          :key="index"
          :visible="seletedAuthority != index"
        ></gmap-marker>
      </GmapCluster>
    </gmap-map>
    <div class="search-box">
      <input type="text" class="search-input" placeholder="Search here..." name="authority-name" @keyup="filterAuthorities($event)">
      <ul>
        <li 
          v-for="(m, index) in searchResults"
          :key="index"
          @click="onSearchResultClick(m)"
        >{{m.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import Fuse from 'fuse.js'

export default {
  data () {
    return {
      mapCenter: {lat: 52.605420, lng: -1.514367},
      zoom: 8,
      mapMarkers: null,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      seletedAuthority: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -10
        }
      },
      searchResults: [],
      markerPosisions : [
        {
          position: {
            lat: 52.631911,
            lng: 18.868079,
          },
        },
        {
          position: {
            lat: 45.939253,
            lng: 2.436476,
          },
        },
      ]
    }
  },
  computed: {
    authorities () {
      return this.$store.getters.authorities
    },
    seletedAuthority () {
      return this.$store.getters.seletedAuthority
    }
  },
  watch: {
    authorities () {
      this.addMapMarkers();
    }
  },
  methods: {
    ...mapActions(['getAuthorities', 'setSelectedAuthority']),
    // -------------------
    // events
    // -------------------
    onMapMarkerMouseOver (id) {
      const marker = this.mapMarkers[id]
      marker.animation = 1
      setTimeout(() => {
        marker.animation = 4
      }, 300)
    },
    onMapMarkerMouseOut (id) {
      const marker = this.mapMarkers[id]
      marker.animation = 4
    },
    onSearchResultClick(marker) {
      let pos = {
        lat: marker.pin_latitude,
        lng: marker.pin_longitude,
      }
      this.$refs.mapInstance.panTo(pos);
      this.zoom = 12
      this.toggleInfoWindow(marker, marker.id)
    },
    closePopup(event) {
      this.infoWinOpen = false;
      this.seletedAuthority = false;
      this.setSelectedAuthority({});

    },
    toggleInfoWindow: function(marker, idx) {
      if(!marker.position) {
        marker.position = {lat: marker.pin_latitude, lng: marker.pin_longitude};
      } 
      this.infoWindowPos = marker.position;
      this.infoContent = marker.name;
      //if different marker set infowindow to open and reset current marker index
      if (this.seletedAuthority != idx) {
        this.infoWinOpen = true;
        this.seletedAuthority = idx;
        this.setSelectedAuthority(marker);
      }
    },

    // -------------------
    // other methods
    // -------------------
    addMapMarkers () {
      // go through the stores list and add a map marker for each
      let markers = {}
      for (let i = 0; i < this.authorities.length; i++) {
        const marker = {}
        marker.id = this.authorities[i].id
        marker.name = this.authorities[i].name
        marker.title = this.authorities[i].id + '\n' + this.authorities[i].region
        marker.animation = 4
        marker.position = {
          lat: this.authorities[i].pin_latitude,
          lng: this.authorities[i].pin_longitude
        }
        // marker.icon = {url: this.mapIcons.defaultIcon, scaledSize: this.mapMarkerIconSize}
        markers[this.authorities[i].id] = marker
      }
      this.mapMarkers = markers
    },
    
    filterAuthorities: function(event) {
      let inputValue = event.target.value.toLocaleLowerCase();
      if (inputValue == '') {
        this.searchResults = [];
        return false;
      }

      let options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
        "name",
        ]
      };
      let fuse = new Fuse(this.authorities, options); // "list" is the item array
      this.searchResults = fuse.search(inputValue);
    },
  },
  beforeMount () {
    this.getAuthorities();
  },
}
</script>
<style>
  .map-panel-container {
    height: 100%;
    width: calc(100% - 250px);
    float: right;
  }
  .map {
    flex: 100% 1 1;
    height: 100%;
  }

  .search-box {
    position: fixed;
    right: 150px;
    top: 20px;
    height: 400px;
    background: white;
  }
  .search-input {
    border: 1px solid grey;
    margin-bottom: 1em;
  }
</style>
