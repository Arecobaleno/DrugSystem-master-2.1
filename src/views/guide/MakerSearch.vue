<! -- template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list
    :cities="cities"
    :hot="hotCities"
    :letter="letter"></city-list>
    <city-alphabet
    :cities="cities"
    @change="handleLetterChange"></city-alphabet>
  </div>
</template> -->

<template>
<div>
	<div class="page-full component-home fx-column">
		<app-header :title="appHeader.title"></app-header>
		<section class="firstaid-search-box ac" >
			<city-search :cities="cities"></city-search>
		</section>
		<city-list
    		:cities="cities"
    	:hot="hotCities"
    	:letter="letter"></city-list>
    	<city-alphabet
    	:cities="cities"
    	@change="handleLetterChange"></city-alphabet>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"

import vPinyin from "../../assets/js/vue-py.js"
import CityHeader from "./components/Header"
import CitySearch from "./components/Search"
import CityList from "./components/List"
import CityAlphabet from "./components/Alphabet"
import appHeader from "../../components/app-header.vue";
export default {
  name: 'City',
  data () {
    return {
      appHeader: {title: "按制定者查询"},
      cities: {},
      hotCities: [],
      letter: '',
      // 字符串数组
      cityList: [],
      addTrafficHub: {
        spell: '',
        city: '',
        suoXie: ''
      }
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet,
    appHeader
  },
  methods: {
    getCityInfo () {
      // 获取远端信息 数据接收详见方法handleGetCityInfoSucc
      axios.get('http://localhost:10088/guide/maker')
        .then((response) => {
          console.log(response.data)
          let makers = []
          for (let maker in response.data) {
            makers.push(response.data[maker].name)
          }
          this.cityList = makers
          this.cities = this.listToPinYin(this.cityList)
        })
    },
    getSZM (name) {
      var temp = {}
      temp.name = name
      temp.spell = vPinyin.chineseToPinYin(name)
      let SX = ''
      for (var i = 0; i < temp.spell.length; i++) {
        var c = temp.spell.charAt(i)
        if (/^[A-Z]+$/.test(c)) {
          SX += c
        }
      }
      temp.suoXie = SX
      return temp
    },
    // 处理接收到的网络请求数据
    listToPinYin (list) {
      var PinYinList = {}
      console.log(list)

      for (var i = 0; i < list.length; i++) {
        const temp = vPinyin.chineseToPinYin(list[i])
        const key = temp[0]
        const value = this.getSZM(list[i])
        if (PinYinList[key] === undefined) {
          PinYinList[key] = [value]
        } else {
          PinYinList[key].push(value)
        }
        // if (PinYinList[temp[0]] !== undefined) {
        //   PinYinList[temp[0]].push(this.getSZM(list[i]))
        // }
      }
      var newList = {}
      Object.keys(PinYinList).sort().map(key => {
        newList[key] = PinYinList[key]
      })
      console.log(newList)
      return newList
    },
    handleLetterChange (letter) {
      this.letter = letter
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>


<style lang="less" scoped>
	@import "../../assets/css/common.less";


	.page-content {
		background-color: #f1f4f4;
	}

	.diseaselist-content {
		background-color: #fff;
	}

	.disease-item {
		height: .88rem;
		padding: 0 .2rem;
		font-size: .28rem;
		color: #3d4550;
		border-bottom: .01rem solid #e7ecf2;

		& .disease-type {
			width: .86*3rem;
			font-size: .2rem;
			color: #9fa1a9;

			& i {
				margin-left: .1rem;
				width: .76rem;
				height: .32rem;
				border: 1px solid #9fa1a9;
			}
		}
	}

	.history{
		font-family:"Times New Roman";
		font-size:12px;
		margin-top: 10px;
		margin-bottom: 5px;
		//color: #53575b;;
		color: #1a1b1d;;
	}
	.clear_history{
		font-family:"Times New Roman";
		font-size:10px; 
		margin-top: 4px;
		color: #676b73;;
	}
	.history_item{
		height: 23px;
		margin-top: 6px;
		margin-right: 10px;
		font-size:10px
	}
	.tip {
		margin-top:20px;
		font-size:12px;
	}
	.blank {
		height: 0.10rem;
	}
</style>