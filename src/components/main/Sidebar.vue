<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index"  :value="item">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" :value="item">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { 'icon': 'el-icon-setting', 'index': '/home', 'title': '首页', 'subs': null },
        { 'icon': 'el-icon-menu', 'index': '/hotelMgmt/checkInAndOutMgmt', 'title': '开退房管理', 'subs': null },
        { 'icon': 'el-icon-menu', 'index': '/hotelMgmt/historyRecord', 'title': '历史记录查询', 'subs': null },
        { 'icon': 'el-icon-menu', 'index': '/hotelMgmt/incomeStatistics', 'title': '收入统计汇总', 'subs': null },
        { 'icon': 'el-icon-menu', 'index': '/hotelMgmt/roomMgmt', 'title': '房间信息管理', 'subs': null }
      ]
    }
  },
  computed: {
    onRoutes () {
      console.log(this.$route.path)
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
