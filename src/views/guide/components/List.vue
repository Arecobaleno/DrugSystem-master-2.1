<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area"
      v-for="(item, key) of cities"
      :key="key"
      :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <ul class="item-list">
          <li class="border-bottom"
          v-for="innerItem of item"
          :key="innerItem.id"
          @click="handleCityClick(innerItem.name)">{{innerItem.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
import { mapState, mapMutations } from "vuex"
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  data () {
    return {

    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  },
  methods: {
    handleCityClick (city) {
      console.log('router push:' + city)
      this.$router.push({name: "MakerDetail", query: {maker: city}})
    },
    ...mapMutations(['changeCity'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/layout.scss";
@import "../../../assets/styles/varibles.scss";

.border-topbottom {
  &:before {
    border-color: #ccc;
  }
  &:after {
    border-color: #ccc;
  }
}
.border-bottom {
  &:before {
    border-color: #ccc;
  }
}
.list {
  overflow: hidden;
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  .title {
    line-height: 30px;
    background: #eee;
    color: $font666;
    padding-left: 20px;
    font-size: 16px;
  }
}
.button-list {
  padding: 10px 60px 10px 10px;
  overflow: hidden;
  .button-wrapper {
    float: left;
    width: 33.33%;
    .button {
      margin: 10px;
      padding: 10px 0;
      border-radius: 3px;
      text-align: center;
      border: 2px solid #ccc;
    }
  }
}
.item-list {
  li {
    line-height: 46px;
    color: #666;
    padding-left: 20px;
    cursor: pointer;
  }
}
</style>
