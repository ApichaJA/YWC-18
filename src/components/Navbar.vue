<template>
  <div>
    <nav class="navbar">
      <a class="navbar-brand" href="/">
        <img
          src="@/assets/klk.png"
          width="60px"
          height="40px"
        />
        <i class="logo-klk-text">คนละครึ่ง</i>
      </a>
      <div class="search-bar">
        <div class="input-group">
          <div class="input-group-prepend" v-on:click="pullProvinces()" >
               <div class="dropdown">
              <button
                class="btn drop-location input-group-text"
                type="button"
                data-toggle="dropdown"
              >
                <span class="label-mouse-over"><i class="fas fa-map-marker-alt"></i>{{provincesSelect}}<i class="fas fa-angle-down" style="position:absolute; right:0; color: gray"></i></span>
              </button>
              <div class="dropdown-menu dropdown-menu-overflow">
                <a class="dropdown-item" v-on:click="provincesSelect = 'พื้นที่ใกล้ฉัน'"><i class="fas fa-map-marker-alt" style="margin-right:.7em"></i>พื้นที่ใกล้ฉัน</a>
                <a class="dropdown-item" v-on:click="provincesSelect = 'สถานที่ทั้งหมด'"><i class="fas fa-map-marker-alt" style="margin-right:.7em"></i>สถานที่ทั้งหมด</a>
                <a  v-for="provincestype in provinces"
              :key="provincestype" class="dropdown-item" v-on:click="provincesSelect = provincestype">{{provincestype}}</a>
              </div>
            </div>
          </div>

          <input
            type="text"
            placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
            class="form-control focussearch"
            v-model="message"
            :change="search()"
          />
          <div class="input-group-append">
            <button class="btn input-group-text"><i class="fas fa-search"></i></button>
          </div>
        </div>
      </div>
      <span class="filter-text"><i class="fas fa-filter"></i></span>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      provincesSelect: 'พื้นที่ใกล้ฉัน',

    provinces: [],

    };
  },

  methods: {
    search: function () {
      this.$store.dispatch("searching", this.message);
    },

    pullProvinces: function(){
      this.provinces = this.$store.getters.getProvinces;
    }
  },

   mounted(){
  }
  
};
</script>

<style scoped>
.navbar{
  padding: .3em 5vw;
  display: flex;
  align-items: center;
}

.navbar-brand{
  width: 4vw;
  text-align: center;
  margin-right: 10vw;
}

.navbar-brand img{
  margin-right: .5em;
}

.logo-klk-text{
  color: #28387b;
  font-size: 18px;
  font-weight: bold;
}

.filter-text{
  display: none;
  color: #28387b;
}

@media only screen and (max-width: 1000px) {
  .logo-klk-text {
    display: none;
  }
  .navbar-brand{
  margin-right: 40px;
  display: inline-block;
}
.search-bar{
  transform: scale(.9);
}

.input-group-prepend .input-group-text{
  font-size: 12px!important;
}


}

@media only screen and (max-width: 640px) {
  .input-group-prepend .input-group-text{
  padding-right: 1em!important;
}
.filter-text{
  display: inline-flex;
  font-size: 12px!important;
  color: #28387b;
}

.input-group-prepend{
  display: none!important;
}

.form-control{
  margin-left: 1em;
    border-top-left-radius: 8px!important;
    border-bottom-left-radius: 8px!important;
}
}

@media only screen and (max-width: 350px) {
  .navbar {
    transform: scale(.9);
    padding: 0;
}

}

.navbar{
  justify-content: center;
}

.search-bar{
  display: flex;
  width: 70vw;
}

.label-mouse-over{
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 7em;
}

.dropdown-menu-overflow{
  height: 20vw;
  width: 100%;
  overflow-y: scroll;
}

.form-control{
  font-size: 14px;
}

.dropdown-item{
  font-weight: bold;
  cursor: pointer;
}

.input-group-prepend .input-group-text{
  font-weight: bold;
  font-size: 14px;
  background-color: #fff;
  border-radius: 8px 0 0 8px;
  padding-right: 5em;
  height: 100%;
}
.input-group-prepend .input-group-text i{
  padding-right:.3rem;
}

.input-group-text{
  background-color: whitesmoke;
  border-radius: 0 8px 8px 0;
}

.fa-search{
  font-size: 10px;
  margin: 0 .5vw;
}
</style>