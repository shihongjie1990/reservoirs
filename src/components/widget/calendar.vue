<template>
  <div class="calendar">
    <div class="calendar-header">
      <span @click="operateYear(0)"><i class="fa fa-angle-left"></i></span>
      <span class="calendar-title"
            @click="changeYear"><i class="fa fa-calendar"></i> {{ year }}年</span>
      <span @click="operateYear(1)"><i class="fa fa-angle-right"></i></span>
    </div>
    <el-date-picker v-model="year"
                    type="year"
                    placeholder="选择年"
                    value-format="yyyy"
                    ref="datePicker"
                    :picker-options="pickerOptions"
                    class="show-picker">
    </el-date-picker>
    <ul class="calendar-ul">
      <li v-for="(item, index) in month"
          :key="index">
        <a @click="pressValue(item, checkedMonth.indexOf(parseInt(item)) > -1)"
           :title="item + '月'">{{ item }}
          <span>月</span>
          <i class="fa fa-check"
             v-if="checkedMonth.indexOf(parseInt(item)) > -1"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<style>
.show-picker {
  height: 35px;
  position: absolute;
  top: 0;
  z-index: -1;
  width: 60%;
  left: 10%;
}

.calendar {
  box-shadow: 2px 2px 8px 0px #9e7b7b;
  position: relative;
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

.calendar-header > .calendar-title:hover {
  cursor: pointer;
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
  position: relative;
}

ul.calendar-ul > li > a:hover {
  color: #409eff;
}

ul.calendar-ul > li > a > i {
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  font-size: 30px;
  /* color: #57ec0d; */
  color: #f72f2f;
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
  props: ['yearMonth'],
  watch: {
    yearMonth: {
      handler(curData, oldData) {
        this.getCheckedMonths(curData, this.year)
      },
      deep: true
    },
    year(curValue, oldValue) {
      this.getCheckedMonths(this.yearMonth, curValue)
    }
  },
  data() {
    return {
      year: '2019',
      month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      pickerOptions: {
        /* disabledDate(time) {
          return time.getFullYear() < '2019'
        } */
      },
      checkedMonth: []
    }
  },
  methods: {
    pressValue(value, flag) {
      let date = this.year + '-' + value
      this.$emit('clickMonth', { date: date, flag: flag })
    },
    operateYear(flag) {
      let year = parseInt(this.year)
      if (flag) {
        year++
      } else {
        year--
      }
      this.year = year + ''
    },
    changeYear() {
      this.$refs.datePicker.showPicker()
    },
    getCheckedMonths(yearMonth, year) {
      let months = yearMonth[year]
      if (months && months.length > 0) {
        this.checkedMonth = months
      } else {
        this.checkedMonth = []
      }
    }
  }
}
</script>
