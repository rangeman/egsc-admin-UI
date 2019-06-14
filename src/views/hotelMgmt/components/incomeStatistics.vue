<template>
  <div>
    <!-- 表格渲染 -->
		<el-table border :fit="true" ref="tableData" max-height="700" style="width: 30%" :data="tableData">
			<el-table-column prop="smonth" label="月份"></el-table-column>
			<el-table-column prop="totalMoney" label="金额（元）"></el-table-column>
		</el-table>
  </div>
</template>

<script>
import { getIncome } from '@/views/hotelMgmt/apis'
export default {
  data () {
    return {
      tableData: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  mounted () {
    getIncome()
    .then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/views/hotelMgmt/assets/css/hotelMgmt.less";
</style>

