<template>
  <div>
		<div>
      <el-form :inline="true">
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="listQuery.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="入住日期">
          <el-date-picker placeholder="请选择入住日期" v-model="listQuery.startDate" :editable="false" :picker-options="pickerOptions" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
		</div>
    <!-- 表格渲染 -->
		<el-table border :fit="true" ref="tableData" max-height="700" style="width: 100%" :data="tableData">
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="roomNo" label="房号"></el-table-column>
			<el-table-column prop="startTime" label="入住时间" :formatter="formatCheckInTime" width="160"></el-table-column>
			<el-table-column prop="endTime" label="退房时间" :formatter="formatCheckOutTime" width="160"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="sex" label="性别" :formatter="formatSex"></el-table-column>
      <el-table-column prop="creNo" label="证件号"></el-table-column>
			<el-table-column prop="infactPrice" label="房费（元）"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
		</el-table>

  <el-row class="page-row">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-row>

  </div>
</template>

<script>
import { listHistoryRecords } from '@/views/hotelMgmt/apis'
export default {
  data () {
    return {
      tableData: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        name: undefined,
        startDate: this.getYesterday()
      },
      total: 0,
      pageSize: 20,
      currentPage: 1
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.listQuery.currentPage = this.currentPage
      this.listQuery.pageSize = this.pageSize
      listHistoryRecords(this.listQuery)
      .then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    formatSex (row) {
      if (row.sex === 0) {
        return '男'
      } else if (row.sex === 1) {
        return '女'
      } else {
        return row.sex
      }
    },
    formatCheckInTime (row) {
      if (row.startTime) {
        return timeFormatter(row.startTime)
      }
    },
    formatCheckOutTime (row) {
      if (row.endTime) {
        return timeFormatter(row.endTime)
      }
    },
    search () {
      this.loadData()
    },
    getYesterday () {
      let day = new Date()
      day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
      return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData(this.listQuery)
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.pageSize = val
      this.loadData(this.listQuery)
    }
  }
}
function timeFormatter (millionSeconds) {
  var time = new Date(millionSeconds)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}
function add0 (m) {
  return m < 10 ? '0' + m : m
}
</script>

<style lang="less" scoped>
@import "~@/views/hotelMgmt/assets/css/hotelMgmt.less";
.page-row {
  text-align: right;
  margin-top: 5px
}
</style>

