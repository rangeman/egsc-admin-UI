<template>
  <div>
    <section class="from-btns">
      <el-button type="primary" @click="addRoom">新增房间</el-button>
    </section>
    <!-- 表格渲染 -->
    <el-table border :fit="true" ref="tableData" max-height="700" style="width: 100%" :data="roomData" highlight-current-row :default-sort = "{prop: 'roomNo', order: 'ascending'}">
      <el-table-column prop="id" type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="roomNo" label="房号"></el-table-column>
      <el-table-column prop="roomType" label="类型"></el-table-column>
      <el-table-column prop="roomPrice" label="定价（元）"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="100"></el-table-column>
      <el-table-column prop="updateTime" label="更新日期" min-width="100" :formatter="formatUpdateTime"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" min-width="100" :formatter="formatCreateTime"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
          <el-button  size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增|修改房间 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="roomDialogVisible" center width="20%">
      <el-form :model="roomInfo" :rules="rules" label-width="60px" ref="roomInfo">
        <el-form-item label="房号" prop="roomNo">
          <el-input v-model="roomInfo.roomNo" placeholder="请输入房号" style="width:218px"></el-input>
        </el-form-item>
        <el-form-item label="房型">
          <el-select v-model="roomInfo.roomType">
            <el-option v-for="(item,index) in roomTypeOpt" :key="index" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定价" prop="roomPrice">
          <el-input v-model="roomInfo.roomPrice" placeholder="请输入定价" style="width:218px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roomInfo.remark" placeholder="请输入备注" style="width:218px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="roomDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRoom('roomInfo')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listRoom, insertRoom, deleteRoom, updateRoom, isRoomNoExists } from '@/views/hotelMgmt/apis'

export default {
  data () {
    var isExist = (rule, value, callback) => {
      if (this.currentRoomNo === this.roomInfo.roomNo) {
        callback()
      }
      isRoomNoExists(value).then(res => {
        if (res.data === true) {
          callback(new Error('该房号已存在！'))
        } else {
          callback()
        }
      })
    }
    var validPrice = (rule, value, callback) => {
      let reg = /^[0-9]*$/
      if (!reg.test(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    return {
      dialogTitle: '新增房间',
      roomData: [],
      roomDialogVisible: false,
      roomTypeOpt: [{'id': 0, 'value': '大床房'}, {'id': 1, 'value': '双床房'}, {'id': 2, 'value': '三床房'}, {'id': 3, 'value': '其它'}],
      roomInfo: {
        id: '',
        roomNo: '',
        roomType: '',
        roomPrice: undefined,
        remark: ''
      },
      editRoom: false,
      currentRoomNo: '',
      rules: {
        roomNo: [
          { required: true, message: '请填写房间号', trigger: 'change' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' },
          { validator: isExist, trigger: 'blur' }
        ],
        roomPrice: [
          { required: true, message: '请填写定价', trigger: 'change' },
          { validator: validPrice, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    listRoom().then(res => {
      this.roomData = res.data
    })
  },
  methods: {
    addRoom () {
      var _this = this
      _this.dialogTitle = '新增房间'
      _this.roomDialogVisible = true
      _this.editRoom = false
      _this.currentRoomNo = ''
      _this.roomInfo.roomNo = ''
      _this.roomInfo.roomType = '大床房'
      _this.roomInfo.roomPrice = 60
      _this.roomInfo.remark = ''
    },
    handleEdit (index, row) {
      var _this = this
      _this.dialogTitle = '修改房间'
      _this.roomDialogVisible = true
      _this.currentRoomNo = row.roomNo
      _this.roomInfo.id = row.id
      _this.roomInfo.roomNo = row.roomNo
      _this.roomInfo.roomType = row.roomType
      _this.roomInfo.roomPrice = row.roomPrice
      _this.roomInfo.remark = row.remark
      _this.editRoom = true
    },
    handleDelete (index, row) {
      var _this = this
      _this.$confirm('确定要删除:' + row.roomNo + ' 号房间吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoom(row.id)
        .then(response => {
          var errorcode = response.errorcode
          if (errorcode === '00000') {
            _this.$message({
              type: 'success',
              message: '删除成功！'
            })
            listRoom().then(res => {
              this.roomData = res.data
            })
          } else {
            _this.$message({
              type: 'warning',
              message: '删除失败,错误码:' + errorcode
            })
          }
        })
        .catch(
        )
      })
    },
    saveRoom (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var _this = this
          if (_this.editRoom) {
            updateRoom(_this.roomInfo).then(res => {
              let code = res.errorcode
              if (code === '00000') {
                _this.$message({
                  type: 'success',
                  message: '修改房间信息成功！'
                })
                _this.roomDialogVisible = false
                listRoom().then(res => {
                  this.roomData = res.data
                })
              } else {
                _this.$message({
                  type: 'error',
                  message: '后台错误，修改房间信息失败！'
                })
              }
            })
          } else {
            insertRoom(_this.roomInfo).then(res => {
              let code = res.errorcode
              if (code === '00000') {
                _this.$message({
                  type: 'success',
                  message: '新增房间成功！'
                })
                _this.roomDialogVisible = false
                listRoom().then(res => {
                  this.roomData = res.data
                })
              } else {
                _this.$message({
                  type: 'error',
                  message: '后台错误，新增房间失败！'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    formatCreateTime (row) {
      if (row.createTime) {
        return timeFormatter(row.createTime)
      }
    },
    formatUpdateTime (row) {
      if (row.updateTime) {
        return timeFormatter(row.updateTime)
      }
    }
  }
}
function timeFormatter (millionSeconds) {
  var time = new Date(millionSeconds)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add0(m) + '-' + add0(d)
}
function add0 (m) {
  return m < 10 ? '0' + m : m
}
</script>

<style lang="less" scoped>
@import "~@/views/hotelMgmt/assets/css/hotelMgmt.less";
</style>

