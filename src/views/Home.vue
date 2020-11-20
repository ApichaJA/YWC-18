<template>
  <div class="containier-fluid">
    <div class="navbar-page">
      <span class="navbar-page-text" v-on:click="selectpage = true" :class="{'selectunderline':selectpage}" >หน้าแรก</span>
      <span class="navbar-page-text" >/</span>
      <span class="navbar-page-text" v-on:click="selectpage = false, findFocus()" :class="{'selectunderline':!selectpage}">ค้นหา</span>
    </div>
    <div class="main-home">
      <div class="main-text">
        <span style="font-size: 18px"
          >ผลการค้นหา ร้านอาหารและเครื่องดื่มทั้งหมด</span
        >
      </div>
      <div class="main-section">
        <div class="search-box">
          <span class="main-text">ประเภทร้านค้า</span>
          <div class="side-search-box typeshop-radio">
            <div class="shop-radio" v-on:click="subcategoriesSelect = 0">
              <label class="label-mouse-over"
                ><input type="radio" name="typeshop-radio" checked class="typeshop-radio-main"/><span class="radio-text">ทั้งหมด</span></label
              >
            </div>
            <div
              class="shop-radio"
              v-for="(shoptype, index) in categories"
              :key="shoptype.name"
               v-on:click="subcategoriesSelect = (index+1)"
            >
              <label class="label-mouse-over">
                <input class="radio-text" type="radio" name="typeshop-radio" />
                <span class="radio-text">{{ shoptype.name }}</span></label
              >
            </div>
          </div>
          <span class="main-text">จังหวัด/ใกล้ฉัน</span>
          <div class="searchSelect mt-2 mb-4">
            <div class="dropdown">
              <button
                class="btn drop-location"
                type="button"
                data-toggle="dropdown"
              >
                <span class="label-mouse-over"><i class="searchSelect-text fas fa-map-marker-alt"></i>{{provincesSelect}}<i class="fas fa-angle-down" style="position:absolute; right:10px; color:lightgray"></i></span>
              </button>
              <div class="dropdown-menu dropdown-menu-overflow">
                <a class="dropdown-item" v-on:click="provincesSelect = 'พื้นที่ใกล้ฉัน'"><i class="fas fa-map-marker-alt" style="margin-right:.7em"></i>พื้นที่ใกล้ฉัน</a>
                <a class="dropdown-item" v-on:click="provincesSelect = 'สถานที่ทั้งหมด'"><i class="fas fa-map-marker-alt" style="margin-right:.7em"></i>สถานที่ทั้งหมด</a>
                <a  v-for="provincestype in provinces"
              :key="provincestype" class="dropdown-item" v-on:click="provincesSelect = provincestype">{{provincestype}}</a>
              </div>
            </div>
          </div>
           <span class="main-text">ราคา</span>
          <div class="searchSelect mt-2 mb-4">
            <div class="dropdown">
              <button
                class="btn drop-location"
                type="button"
                data-toggle="dropdown"
              >
                <span class="searchSelect-text label-mouse-over" style="font-size: 14px;color:lightgray" v-bind:class="{'searchSelect-text-color-black': priceRangeSelect !== 'กรุณาเลือก'}">{{priceRangeSelect}}<i class="fas fa-angle-down" style="position:absolute; right:10px; color:lightgray"></i></span>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" v-on:click="priceRangeSelect = 'ทั้งหมด'">ทั้งหมด</a>
                <a  v-for="priceRangetype in priceRange"
              :key="priceRangetype" class="dropdown-item" v-on:click="priceRangeSelect = priceRangetype">{{priceRangetype}}</a>
              </div>
            </div>
          </div>

          <span class="main-text">ประเภทร้านอาหารและเครื่องดื่ม</span>
          <div class="side-search-box typeshop-radio">
            <div class="shop-radio">
              <label class="label-mouse-over"
                ><input type="radio" name="allcategories-radio" checked class="typeshop-radio-main" /><span class="radio-text">ทั้งหมด</span></label
              >
            </div>
            <div
              class="shop-radio"
              v-for="(allCategories) in subcategories[subcategoriesSelect]"
              :key="allCategories.name"
            >
              <label class="label-mouse-over">
                <input class="radio-text" type="radio" name="allcategories-radio" />
                <span class="radio-text">{{ allCategories }}</span></label
              >
            </div>
          </div>
        </div>
        
        <div class="showorder-box">
          <div v-show="foundOrder" style="font-size:5vw; align-item:center; margin: 5em 0">ไม่พบรายการ</div>
          <div v-show="!foundOrder && searchingOrder(merchantOrder.shopNameTH, merchantOrder.addressProvinceName)" class="order-box" v-for="merchantOrder in merchants"
              :key="merchantOrder.shopNameTH">
              <div class="filter-order">
              <img :src="merchantOrder.coverImageId" class="order-img" alt="" width="100px" height="100px">
              <div class="order-box-content">
                <div class="order-top-content">
                {{merchantOrder.shopNameTH}}
                <div :class="{
                  'notOpen' : merchantOrder.isOpen === 'N',
                  'isOpen' : merchantOrder.isOpen === 'Y'                
                }">
                  {{checkisOpen(merchantOrder.isOpen)}}
                </div>
                </div>
                <div class="order-sec-top-content mt-1">
                <span>{{merchantOrder.subcategoryName}}</span>
                <span class="find-rateprice">
                |<span class="rateprice">{{priceLevel(merchantOrder.priceLevel)}}</span><span class="rateprice-markup">฿฿฿฿</span>|
                <span class="ml-1 mr-2">{{merchantOrder.addressDistrictName}}</span><span>{{merchantOrder.addressProvinceName}}</span>
                </span>
                </div>
                <div class="order-middle-content mt-3">
                  <span class="order-middle-highlight mb-2" v-html="merchantOrder.highlightText">{{merchantOrder.highlightText}}</span>
                  <span class="recommand-text">เมนูแนะนำ: {{dearray(merchantOrder.recommendedItems)}}</span>
                </div>
                <div class="order-bottom-content mt-3">
                  <div class="facilities">
                    <div class="facilities" v-for="facilities in merchantOrder.facilities" :key="facilities">
                      <span class="facilities-icon" v-if="facilities === 'ที่จอดรถ'"><i class="fas fa-car"></i></span>
                      <span class="facilities-icon" v-if="facilities === 'รับจองล่วงหน้า'"><i class="fas fa-pen-square"></i></span>
                      <span class="facilities-icon" v-if="facilities === 'สามารถนำสัตว์เลี้ยงเข้าได้'"><i class="fas fa-paw"></i></span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>

          <div v-show="!foundOrder" class="show-more mt-5">
            <button class="show-more-btn">ดูเพิ่มเติม</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      subcategories: [],
      provinces: [],
      priceRange: [],
      merchants: [],


      provincesSelect: 'พื้นที่ใกล้ฉัน',
      priceRangeSelect: 'กรุณาเลือก',
      subcategoriesSelect: 0,
      searching: '',
      foundOrder: false,

      selectpage: true,
    };
  },


  methods:{
    checkisOpen(data){
      if(data === 'Y'){
        return 'เปิดอยู่'
      }
      else if(data === 'N'){
        return 'ปิดแล้ว'
      }
    },
    priceLevel(price){
      var many = ''
      for (let index = 0; index < price; index++) {
        many += '฿'
        }
        return many
    },

    dearray(arr){
      var stock = ''
      arr.forEach((ary, index) =>{
        if(index != arr.length && index > 0){
          stock+=", "
        }
        stock+=ary
      })
      return stock
    },

    findFocus(){
      document.querySelector('.focussearch').focus();
    },

    searchingOrder(shopName, province){
      if(this.$store.getters.getOrder === ''){
        if(this.provincesSelect === 'สถานที่ทั้งหมด'|| this.provincesSelect === 'พื้นที่ใกล้ฉัน'){
          this.foundOrder = false
          return true
      }
        else if(this.provincesSelect === province){
          this.foundOrder = false
          return true
        }
        else{
          this.foundOrder = true
        }
      }
      else if(this.$store.getters.getOrder !== ''){
        this.provincesSelect = 'สถานที่ทั้งหมด'
        document.querySelector('.typeshop-radio-main').checked = true;
        for (let index = 0; index < this.$store.getters.getOrder.length; index++) {
          if(this.$store.getters.getOrder[index].toLowerCase() === shopName[index].toLowerCase()){
            return true
          }
        }
        
      }
      //if(this.$store.getters.getOrder === ''){
      //  return false
      //} || this.provincesSelect === province
      //if(e === "Kanysorn Cafe"){
        //return false
      //}
      //this.provinces = this.$store.getters.getOrder;
    }
  },

  computed: {
  
  },

  async mounted() {
    let fetch = await axios.get("https://panjs.com/ywc18.json");
    var subcategories = []
    fetch.data.categories.forEach((element) => {
      this.categories.push(element);
      this.subcategories.push(element.name)
        subcategories.push(element.subcategories)
 
    });
    this.subcategories = subcategories


    fetch.data.provinces.forEach((element) => {
      this.provinces.push(element);
    });
      this.$store.dispatch("stackProvinces", this.provinces);

    for (let index = 0; index < fetch.data.priceRange.length; index++) {
      this.priceRange.push(fetch.data.priceRange[index]);
    }

        fetch.data.merchants.forEach((element) => {
      this.merchants.push(element);
    });
  },
};
</script>

<style scoped>
.main-home {
      background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  padding: 1rem 1rem;
}

.navbar-page {
  text-align: left;
  background-color: #28387b;
  padding: 0.7rem 6vw;
}

.navbar-page-text {
  cursor: pointer;
  color: #fff;
  margin: 0 0.3vw;
}

.selectunderline{
  text-decoration: underline;
}

.main-section {
  display: flex;
  margin-top: 2rem;
}

.main-text {
  text-align: left;
  font-weight: bold;
  font-size: 16px;
}

.search-box {
  background-color: #fff;
  width: 22rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  padding: 1rem;
  text-align: left;
}

.side-search-box {
  padding: 1.2em 0;
}

.label-mouse-over {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.drop-location{
  text-align: left;
  font-weight: bold;
  padding: 0;
  border: 1px solid #e2e8f0;
  width: 100%;
}

.radio-text{
  font-size: 14px;
}

.searchSelect-text{
  margin: .5em .7em;
}

.dropdown-menu-overflow{
  overflow: hidden;
  height: 20em;
  overflow-y: scroll;
  width: 100%;
}

.dropdown-menu{
  width: 100%;
}

.dropdown-item{
  font-weight: bold;
  cursor: pointer;
}
.searchSelect-text-color-black{
  color: #000!important;
}

.showorder-box{
  margin-left: 1.5rem!important;
  width: 100%;
}
.filter-order{
  display: flex;
}

.order-box{
  background-color: #fff;
  display: flex;
  border: 1px solid #e2e8f0;
  margin-bottom: .3em;
  height: 14em;
  padding: .3em;
  text-align: left;
}

@media only screen and (max-width: 745px) {
  .order-box{
    height: 15em;
  }
}

@media only screen and (max-width: 640px) {
  .search-box{
    display: none;
  }
  .showorder-box{
    width: unset;
    margin-left: 0!important;
  }
  .order-box{
    margin-top: 5vw;
    padding: 0;
    display: inline-block;
    width: 100%;
  }
  .order-img{
  object-fit: cover;
  height: 300px!important;
  width: 100%!important;
}
.main-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.order-box-content{
  background-color: #fff;
  border: 1px solid lightgray;
  margin-bottom: 10em;
}

.show-more-btn{
  width: 25em!important;
  height: 3em;
}

.filter-order{
  display: block;
}
}


.order-img{
  object-fit: cover;
  border-radius: 2px;
  height: 100%;
  width: 200px;
}

.order-box-content{
  font-weight: bold;
  padding: .5em 1em;
  font-size: 18px;
}

.order-top-content{
  display: flex;
  align-items: center;
}

.notOpen{
  color: #fff;
  margin-left: 1.5em;
  font-size: 12px;
  align-items: center;
  font-weight: 100;
  background-color: rgb(151, 151, 151);
  width: fit-content;
  height: fit-content;
  padding: .2em .8em;
  border-radius: 3px;
}

.isOpen{
  color: #fff;
  margin-left: 1.5em;
  font-size: 12px;
  align-items: center;
  font-weight: 100;
background-color: rgb(0, 185, 83);
width: fit-content;
  height: fit-content;
  padding: .2em .8em;
  border-radius: 3px;
}

.order-sec-top-content{
  width: 40vw;
  border-bottom: 1px solid lightgray;
  padding: 0 0 1.3em 0;
  font-size: 12px;
  color: gray;
}

.rateprice-markup{
  margin: 0 1em;
  color: lightgray;
}

.rateprice{
  margin: 0 1em;
  position: absolute;
  color: #000;
}

.find-rateprice{
  margin: 0 .5em;
}

.order-middle-content{
  font-size: 12px;
  color: gray;
}
.order-middle-highlight{
  display: block;
}

.recommand-text{
  color: #000;
  font-size: 14px;
}

.facilities{
  display: flex;
  font-size: 14px;
}

.facilities-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0, 185, 83);
  font-size: 18px;
  border:2px solid rgb(0, 185, 83);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-right: .5em;
}

.show-more-btn{
  background-color: #fff;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 30em;
  height: 3em;
}
</style>