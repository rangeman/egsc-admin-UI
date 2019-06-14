<template>
  <div class="wrapper">
    <egsc-Header></egsc-Header>
    <egsc-Sidebar></egsc-Sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import egscHeader from '@/components/main/Header.vue'
import egscSidebar from '@/components/main/Sidebar.vue'
import { loadData } from '@/views/UserMgmt/login/apis/'

export default {
  components: {
    egscHeader,
    egscSidebar
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      loadData().then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>