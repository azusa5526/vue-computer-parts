<template>
  <nav class="d-none d-md-block bg-light">
    <button @click="clearAll">clear all</button>

    <div id="accordion">
      <div class="card" v-if="cateFilter === 'cpu'">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseCpuBrand"
              aria-expanded="true"
              aria-controls="collapseCpuBrand"
            >CPU Brand</button>
          </h5>
        </div>

        <div
          id="collapseCpuBrand"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body">
            <div>
              <input type="checkbox" id="intel" value="intel" v-model="prodsFilter" />
              <label for="intel">Intel</label>
            </div>
            <div>
              <input type="checkbox" id="amd" value="amd" v-model="prodsFilter" />
              <label for="amd">AMD</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="cateFilter === 'cpu'">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >Socket type</button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div class="card-body">
            <div>
              <input type="checkbox" id="socket-1151" value="socket-1151" v-model="prodsFilter" />
              <label for="socket-1151">Socket-1151</label>
            </div>
            <div>
              <input type="checkbox" id="socket-AM4" value="socket-AM4" v-model="prodsFilter" />
              <label for="socket-AM4">Socket-AM4</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="cateFilter === 'motherboard'">
      <div class="card-header">
        <h5 class="mb-0">
          <button
            class="btn btn-link"
            data-toggle="collapse"
            data-target="#collapseMohterboardBrand"
            aria-expanded="true"
            aria-controls="collapseMohterboardBrand"
          >Motherboard Brand</button>
        </h5>
      </div>

      <div id="collapseMohterboardBrand" class="collapse show" data-parent="#accordion">
        <div class="card-body">
          <div>
            <input type="checkbox" id="asus" value="asus" v-model="prodsFilter" />
            <label for="asus">ASUS</label>
          </div>
          <div>
            <input type="checkbox" id="msi" value="msi" v-model="prodsFilter" />
            <label for="msi">MSI</label>
          </div>
          <div>
            <input type="checkbox" id="asrock" value="asrock" v-model="prodsFilter" />
            <label for="asrock">AsRock</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="cateFilter === 'motherboard'">
      <div class="card-header">
        <h5 class="mb-0">
          <button
            class="btn btn-link collapsed"
            data-toggle="collapse"
            data-target="#collapseMotherboardSocket"
            aria-expanded="false"
            aria-controls="collapseMotherboardSocket"
          >Motherboard Socket</button>
        </h5>
      </div>
      <div id="collapseMotherboardSocket" class="collapse" data-parent="#accordion">
        <div class="card-body">
          <div>
            <input
              type="checkbox"
              id="motherboardSocket-1151"
              value="motherboardSocket-1151"
              v-model="prodsFilter"
            />
            <label for="motherboardSocket-1151">Socket-1151</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="motherboardSocket-AM4"
              value="motherboardSocket-AM4"
              v-model="prodsFilter"
            />
            <label for="motherboardSocket-AM4">Socket-AM4</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="cateFilter === 'ram'">
      <div class="card-header">
        <h5 class="mb-0">
          <button
            class="btn btn-link collapsed"
            data-toggle="collapse"
            data-target="#collapseRamBrand"
            aria-expanded="false"
            aria-controls="collapseRamBrand"
          >RAM Brand</button>
        </h5>
      </div>
      <div id="collapseRamBrand" class="collapse show" data-parent="#accordion">
        <div class="card-body">
          <div>
            <input type="checkbox" id="crucial-ram" value="crucial" v-model="prodsFilter" />
            <label for="crucial-ram">Crucial</label>
          </div>
          <div>
            <input type="checkbox" id="kingston-ram" value="kingston" v-model="prodsFilter" />
            <label for="kingston-ram">Kingston</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="cateFilter === 'ram'">
      <div class="card-header">
        <h5 class="mb-0">
          <button
            class="btn btn-link collapsed"
            data-toggle="collapse"
            data-target="#collapseRamCapacity"
            aria-expanded="false"
            aria-controls="collapseRamCapacity"
          >RAM Capacity</button>
        </h5>
      </div>
      <div id="collapseRamCapacity" class="collapse" data-parent="#accordion">
        <div class="card-body">
          <div>
            <input type="checkbox" id="8GB-ram" value="8GB" v-model="prodsFilter" />
            <label for="8GB-ram">8 GB</label>
          </div>
          <div>
            <input type="checkbox" id="16GB-ram" value="16GB" v-model="prodsFilter" />
            <label for="16GB-ram">16 GB</label>
          </div>
          <div>
            <input type="checkbox" id="32GB-ram" value="32GB" v-model="prodsFilter" />
            <label for="32GB-ram">32 GB</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="cateFilter === 'ram'">
      <div class="card-header">
        <h5 class="mb-0">
          <button
            class="btn btn-link collapsed"
            data-toggle="collapse"
            data-target="#collapseRamFrequency"
            aria-expanded="false"
            aria-controls="collapseRamFrequency"
          >RAM Frequency</button>
        </h5>
      </div>
      <div id="collapseRamFrequency" class="collapse" data-parent="#accordion">
        <div class="card-body">
          <div>
            <input type="checkbox" id="1600Hz-ram" value="1600Hz" v-model="prodsFilter" />
            <label for="8GB-ram">1600 Hz</label>
          </div>
          <div>
            <input type="checkbox" id="2400Hz-ram" value="2400Hz" v-model="prodsFilter" />
            <label for="16GB-ram">2400 Hz</label>
          </div>
          <div>
            <input type="checkbox" id="3600Hz-ram" value="3600Hz" v-model="prodsFilter" />
            <label for="3600Hz-ram">3600 Hz</label>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['cateFilter'],

  data() {
    return {
      prodsFilter: [],
    };
  },

  watch: {
    prodsFilter: function() {
      const vm = this;
      vm.$emit("filterUpdate", vm.prodsFilter);
      //console.log('prodsFilter in FS', vm.prodsFilter)
      console.log("prodsFilter watch active");
    },

    cateFilter: {
      immediate: true,
      handler() {
        this.clearAll();
      }
    }
  },

  methods: {
    clearCheckbox() {
      const vm = this;
      let checkbox = document.getElementsByTagName('input');
      for(let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
      }
      console.log('clearCheckbox active');
    },

    clearProdsFilter() {
      const vm = this;
      vm.prodsFilter = [];
      console.log('clearProdsFilter active');
    },

    clearAll() {
      this.clearCheckbox();
      this.clearProdsFilter();
    }

  },

};
</script>