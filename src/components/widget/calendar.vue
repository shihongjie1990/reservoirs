<template>
  <div class="calendar">
    <div class="calendar-header">
      <span><i class="fa fa-angle-left"></i></span>
      <span class="calendar-title"><i class="fa fa-calendar"></i> {{ year }}年</span>
      <span><i class="fa fa-angle-right"></i></span>
    </div>
    <ul class="calendar-ul">
      <li v-for="(item, index) in month"
          :key="index">
        <a @click="pressValue(item)">{{ item }}
          <span>月</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style>
.calendar {
  box-shadow: 2px 2px 8px 0px #9e7b7b;
}

.calendar-header {
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  background: #ff5555;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #afa0a0;
}

.calendar-header > span:first-child {
  float: left;
  margin-left: 10px;
  font-size: 24px;
  cursor: pointer;
}

.calendar-header > span:last-child {
  float: right;
  margin-right: 10px;
  font-size: 24px;
  cursor: pointer;
}

ul.calendar-ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

ul.calendar-ul > li {
  width: 25%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #fff;
  font-size: 20px;
}

ul.calendar-ul > li > a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

ul.calendar-ul > li > a.active {
  background: #b6fb0a;
  border-radius: 30px;
}

ul.calendar-ul > li > a > span {
  font-size: 10px;
  color: #666;
}
</style>

<script>
export default {
  data() {
    return {
      year: '2019',
      month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    }
  },
  methods: {
    pressValue(value) {
      let date = this.year + '-' + value
      this.$emit('clickMonth', date)
    }
  }
}
</script>
