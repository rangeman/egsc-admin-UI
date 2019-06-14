<template>
  <div>
    <!-- 表格渲染 -->
		<el-table border :fit="true" ref="tableData" max-height="750" style="width: 100%" :data="checkInData" highlight-current-row :row-class-name="tableRowClassName">
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="id" v-if="false"></el-table-column>
			<el-table-column prop="roomNo" label="房号"></el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
			<el-table-column prop="roomType" label="类型"></el-table-column>
			<el-table-column prop="startTime" label="开出时间" :formatter="formatCheckInTime" width="160"></el-table-column>
			<el-table-column prop="endTime" label="到期时间" :formatter="formatCheckOutTime" width="160"></el-table-column>
			<el-table-column prop="infactPrice" label="实收（元）"></el-table-column>
      <el-table-column prop="roomPrice" label="定价（元）"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="sex" label="性别" :formatter="formatSex"></el-table-column>
			<el-table-column prop="creNo" label="证件号" width="170"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
			<template slot-scope="scope">
				<el-button size="medium" type="text" @click="handleCheckIn(scope.$index,scope.row)" :disabled="scope.row.checkInVisible">开房</el-button>
				<el-button size="medium" type="text" @click="handleCheckOut(scope.$index,scope.row)" :disabled="scope.row.checkOutVisible">退房</el-button>
				<el-button size="medium" type="text" @click="handleChangeRoom(scope.$index,scope.row)" :disabled="scope.row.changRoomVisible">换房</el-button>
			</template>
			</el-table-column>
		</el-table>

     <!-- 开房 弹出框 -->
    <el-dialog title="录入住宿信息" :visible.sync="customerDialogVisible" center width="40%">
      <el-form :model="customerInfo" :inline="true" :rules="rules" label-width="100px" ref="customerInfo">
        <el-form-item label="房号" prop="roomNo">
          <el-input v-model="customerInfo.roomNo" style="width:218px" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="customerInfo.name" placeholder="请输入姓名" style="width:218px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="customerInfo.sex">
            <el-option v-for="item in sexOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="creNo">
          <el-autocomplete v-model="customerInfo.creNo" placeholder="请输入证件号" style="width:218px" :fetch-suggestions="querySearch"></el-autocomplete>
        </el-form-item>
        <el-form-item label="开出时间" prop="startTime">
          <el-date-picker v-model="customerInfo.startTime" placeholder="请选择开房时间" :editable="false" :picker-options="pickerOptionsS" type="datetime" style="width:218px"></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="endTime">
          <el-date-picker v-model="customerInfo.endTime" placeholder="请选择到期时间" :editable="false" :picker-options="pickerOptionsE" type="datetime" style="width:218px"></el-date-picker>
        </el-form-item>
        <el-form-item label="房费" prop="infactPrice">
          <el-input v-model="customerInfo.infactPrice" placeholder="请输入房费" style="width:218px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="customerInfo.remark" placeholder="请输入备注" style="width:218px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="customerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCustomer('customerInfo')">保存</el-button>
      </span>
    </el-dialog>

     <!-- 换房 弹出框 -->
     <el-dialog title="换房" :visible.sync="changeRoomDialogVisible" center width="500px">
      <el-form :inline="true" label-width="100px">
        <el-form-item label="从">
          <span>{{currentRoomNo}}</span>
        </el-form-item>
        <el-form-item label="换到">
          <el-select v-model="changeRoomNo" style="width: 120px">
            <el-option v-for="item in freeRoom" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="changeRoomDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmChangeRoom">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { listCheckIn, saveCustomer, deleteCheckIn, getFreeRoom, changRoom } from '@/views/hotelMgmt/apis'
  export default {
    inject: ['reload'],
    data () {
      var validPrice = (rule, value, callback) => {
        let reg = /^[0-9]*$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
      return {
        checkInData: [],
        customerDialogVisible: false,
        changeRoomDialogVisible: false,
        sexOpt: [{'value': 0, 'label': '男'}, {'value': 1, 'label': '女'}],
        customerInfo: {
          id: '',
          roomNo: '',
          name: '',
          sex: undefined,
          infactPrice: undefined,
          creNo: undefined,
          remark: '',
          startTime: new Date(),
          endTime: undefined
        },
        sels: [],
        freeRoom: [],
        currentId: undefined,
        currentRoomNo: undefined,
        changeRoomNo: undefined,
        idNumPref: [{'value': '422325'}, {'value': '421223'}, {'value': '421202'}, {'value': '421222'}, {'value': '421224'}, {'value': '421281'}, {'value': '421221'}],
        pickerOptionsS: {
          disabledDate: (time) => {
            let endTime = this.customerInfo.endTime
            if (endTime) {
              return time.getTime() > endTime - 8.64e7 || time.getTime() < Date.now() - 8.64e7
            }
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        pickerOptionsE: {
          disabledDate: (time) => {
            let startTime = this.customerInfo.startTime
            if (startTime) {
              return time.getTime() < startTime
            }
            return time.getTime() < Date.now()
          }
        },
        rules: {
          name: [
            { required: true, message: '请填写姓名', trigger: 'change' }
          ],
          startTime: [
            { required: true, message: '请选择开出时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, message: '请选择到期时间', trigger: 'change' }
          ],
          infactPrice: [
            { required: true, message: '请填写房费', trigger: 'change' },
            { validator: validPrice, trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        listCheckIn()
        .then(res => {
          if (res.errorcode === '00000') {
            var checkInData = res.data
            for (var data of checkInData) {
              data.checkInVisible = false
              data.checkOutVisible = true
              data.changRoomVisible = true
              if (data.status === 1) {
                data.checkInVisible = true
                data.checkOutVisible = false
                data.changRoomVisible = false
              }
            }
            this.checkInData = checkInData
          }
        })
      },
      handleCheckIn (index, row) {
        this.customerDialogVisible = true
        this.customerInfo.roomNo = row.roomNo
        this.customerInfo.infactPrice = row.roomPrice
        this.customerInfo.sex = 0
        this.customerInfo.name = ''
        this.customerInfo.remark = undefined
        this.customerInfo.creNo = undefined
        this.customerInfo.endTime = this.getTomorrow()
      },
      saveCustomer (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveCustomer(this.customerInfo)
            .then(res => {
              if (res.errorcode === '00000') {
                this.$message({
                  type: 'success',
                  message: '开房成功！'
                })
                this.customerDialogVisible = false
                this.loadData()
              } else {
                this.$message({
                  type: 'error',
                  message: '后台错误，操作失败！'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      handleChangeRoom (index, row) {
        getFreeRoom(row.roomNo)
        .then(res => {
          this.freeRoom = res.data
          if (this.freeRoom.length < 1) {
            this.$message({
              type: 'info ',
              message: '暂无可换的房间！'
            })
          } else {
            this.changeRoomDialogVisible = true
            this.currentRoomNo = row.roomNo
            this.changeRoomNo = undefined
            this.currentId = row.id
          }
        })
      },
      handleCheckOut (index, row) {
        deleteCheckIn(row.id)
        .then(res => {
          if (res.errorcode === '00000') {
            this.$message({
              type: 'success',
              message: '退房成功！'
            })
            this.customerDialogVisible = false
            this.loadData()
          } else {
            this.$message({
              type: 'error',
              message: '后台错误，退房失败！'
            })
          }
        })
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
      formatSex (row) {
        if (row.sex === 0) {
          return '男'
        } else if (row.sex === 1) {
          return '女'
        } else {
          return row.sex
        }
      },
      formatStatus (row) {
        if (row.status === 1) {
          return '已开出'
        } else {
          return '未开出'
        }
      },
      tableRowClassName ({row, rowIndex}) {
        if (row.endTime && row.endTime < new Date()) {
          return 'warning-row'
        }
        return ''
      },
      confirmChangeRoom () {
        changRoom(this.currentId, this.changeRoomNo)
        .then(res => {
          if (res.errorcode === '00000') {
            this.$message({
              type: 'success',
              message: '换房成功！'
            })
            this.changeRoomDialogVisible = false
            this.loadData()
          } else {
            this.$message({
              type: 'error',
              message: '换房失败，错误:' + res.errormsg
            })
          }
        })
      },
      querySearch (queryString, cb) {
        var idNumPref = this.idNumPref
        var results = queryString ? idNumPref.filter(this.createFilter(queryString)) : idNumPref
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (idNumPref) => {
          return (idNumPref.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      getTomorrow () {
        let cTime = new Date()
        cTime.setTime(cTime.getTime() + 24 * 60 * 60 * 1000)  // 明天这个点的时间
        cTime.setTime(new Date(cTime.toLocaleDateString() + ' 12:00:00').getTime()) // 明天12点的时间
        return cTime
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

<style>
  .el-table .warning-row {
    color: rgb(238, 18, 29);
  }
</style>

