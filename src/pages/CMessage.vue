<template>
  <div class="wrap">
    <div v-if="userMsg.id">
      <div class="card">
        <div class="title">新消息</div>
        <template v-for="item in msg.hasnot_read_messages">
          <div :key="item.id">
            <router-link :to="'/cuser/'+item.author.loginname">{{item.author.loginname}}</router-link> 在话题 <router-link :to="'/cdetails/'+item.topic.id">{{item.topic.title}}</router-link> 中 @了你
          </div>
        </template>
      </div>
      <div class="card">
        <div class="title">过往消息</div>
        <template v-for="item in msg.has_read_messages">
          <div :key="item.id" class="item">
            <router-link :to="'/cuser/'+item.author.loginname">{{item.author.loginname}}</router-link> 在话题 <router-link :to="'/cdetails/'+item.topic.id">{{item.topic.title}}</router-link> 中 @了你
          </div>
        </template>
      </div>
    </div>
    <div v-else>暂无权限</div>
  </div>
</template>

<script>
import * as http from '../services/apis.js'
import { timeBefore } from '../utils/format.js'
import '../components/markdown.css'
export default {
  name: 'cmssage',
  data () {
    return {
      userMsg: {},
      msg: {}
    }
  },
  mounted() {
    if (this.$cookies.isKey('userMsg') && this.$cookies.get('userMsg')) {
      this.userMsg = this.$cookies.get('userMsg');
    }
    this.getMsg();
  },
  methods: {
    getMsg() {
      const params = {
        accesstoken: this.userMsg.token,
        mdrender: true
      };
      http.getAllMsg(params).then(res => {
        if (res.success) {
          this.msg = res.data;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    padding: 40px;
    border-bottom: 1px solid #ccc;
  }
  .card:last-of-type {
    border: none;
  }
  .card .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .card .item {
    line-height: 50px;
  }
</style>