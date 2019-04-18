<template>
  <div class="wrap">
    <div class="header">
      <!-- 菜单 -->
      <div class="menus">
        <div @click="sideShow = true" class="menu-btn">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="logo"><img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" /></div>
      </div>
      <!-- 导航栏 -->
      <div class="tabs">
        <template v-for="(value, key) in tabs">
          <div :class="activeKey === key ? 'active' : ''" :key="key" @click="switchTab(key)">{{value}}</div>
        </template>
      </div>
    </div>
    <!-- 列表 -->
    <div class="lists">
      <template v-for="item in lists">
        <div class="list--item" :key="item.id">
          <div class="avatar"><router-link :to="`/cuser/${item.author.loginname}`"><img :src="item.author.avatar_url" :alt="item.author.loginname"></router-link></div>
          <div :class="['tag', item.tagColor]">{{item.tagTxt}}</div>
          <div class="desc">
            <div class="title"><router-link :to="`/cdetails/${item.id}`">{{item.title}}</router-link></div>
            <div class="txt">
              <div class="num"><span>{{item.reply_count}}</span>/{{item.visit_count}}</div>
              <div class="time">{{item.timeStr}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 翻页 -->
    <div v-if="lists.length" class="pagination">
      <button @click="goPre"></button>
      <button @click="goNext"></button>
    </div>
    <!-- loading -->
    <div v-else class="loading"></div>

    <div v-if="sideShow" class="side" @click="sideShow = false;isShowMenu = true;token = null">
      <div v-if="isShowMenu" @click.stop="" class="side-menu">
        <div class="side-avatar">
          <div v-if="!userMsg.id" @click="isShowMenu = false" class="login">
            <img src="../assets/user.png" alt="头像占位图">
            <p>点击登录</p>
          </div>
          <div v-else class="login">
            <img :src="userMsg.avatar_url" alt="用户头像">
            <p>{{userMsg.loginname}}</p>
          </div>
        </div>
        <div class="side-item">
          <div><router-link to="/cmessage">消息通知<span v-if="msgCount">({{msgCount}})</span></router-link></div>
          <div><router-link :to="'/cuser/'+userMsg.loginname">个人中心</router-link></div>
          <div><router-link to="/cabout">关于</router-link></div>
        </div>
      </div>

      <div v-else @click.stop="" class="side-menu">
        <div class="close">
          <div @click="isShowMenu = true;token = null" class="back"></div>
          <div class="login-title">Token 登录</div>
        </div>
        <div class="login-form">
          <div><input v-model="token" type="text" placeholder="输入accessToken"></div>
          <div><div @click="getUserMsg" class="btn">验证</div></div>
        </div>
        <div class="tips">
          <p>输入CNode账号的Access Token</p>
          <p>在个人中心获取Access Token</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from '../services/apis.js'
import { timeBefore } from '../utils/format.js'
import BetterScroll from '../components/BetterScroll'
export default {
  name: 'home',
  data () {
    return {
      token: null,
      userMsg: {},
      tabs: {all: '全部', good: '精华', share: '分享', ask: '问答', job: '招聘'},
      activeKey: 'all',
      page: 1,
      lists: [],
      maxPage: 70,
      sideShow: false,
      isShowMenu: true,
      msgCount: 0
    }
  },
  methods: {
    getUserMsg() {
      http.getUserMsg(this.token).then(res => {
        if (res.success) {
          this.userMsg = {
            avatar_url: res.avatar_url,
            id: res.id,
            loginname: res.loginname,
            token: this.token
          }
          this.$cookies.set('userMsg', JSON.stringify(this.userMsg), 7 * 24 * 60 * 60);
          this.getMsgNum();
          this.isShowMenu = true;
        }
      })
    },
    getList() {
      const params = {
        page: this.page,
        tab: this.activeKey,
        limit: 40,
        mdrender: true
      }
      this.lists = [];
      http.getTopicByType({
        ...params
      }).then(res => {
        if (res.success) {
          res.data = res.data.map(item => {
            item.tagTxt = '';
            item.tagColor = 'gray';
            if (item.top) {
              item.tagTxt = '置顶';
              item.tagColor = 'green';
            } else if (item.good) {
              item.tagTxt = '精华';
              item.tagColor = 'green';
            } else if (item.tab) {
              item.tagTxt = this.tabs[item.tab];
            }
            item.timeStr = timeBefore(item.last_reply_at);
            return item;
          })
          this.lists = res.data;
          window.scrollTo(0,0);
        }
      })
    },
    getMsgNum() {
      console.log(this.userMsg.token)
      http.getMsgNum(this.userMsg.token).then(res => {
        if (res.success) {
          this.msgCount = res.data;
        }
      })
    },
    switchTab (key) {
      this.activeKey = key;
      this.$nextTick(_ => {
        this.getList();
      })
    },
    goPre() {
      if (this.page > 1) {
        this.page --;
      }
      this.$nextTick(_ => {
        this.getList();
      })
    },
    goNext() {
      if (this.page < this.maxPage) {
        this.page ++;
      }
      this.$nextTick(_ => {
        this.getList();
      })
    },
    userCenter() {},
    about() {}
  },
  components: {
    BetterScroll
  },
  mounted () {
    if (this.$cookies.isKey('userMsg') && this.$cookies.get('userMsg')) {
      this.userMsg = this.$cookies.get('userMsg');
      this.getMsgNum();
    }
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap {
    padding: 0;
    margin: 0;
  }
  .header {
    position: sticky;
    top: 0;
    left: 0;
  }
  .menus {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    background: #444;
  }
  .menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    margin-left: 40px;
  }
  .menu-btn > div {
    width: 60px;
    height: 6px;
    background: #fff;
  }
  .logo {
    width: 550px;
    height: 70px;
    text-align: center;
  }
  .logo img {
    height: 70px;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #444;
    text-align: center;
    color: #fff;
    border-top: 1px solid #000; /* px */
  }
  .tabs > div {
    width: 20%;
    height: 80px;
    line-height: 80px;
    border-bottom: 4px solid #444; /* px */
    cursor: pointer;
  }
  .tabs > div.active {
    border-bottom: 4px solid #80bd01; /* px */
  }

  .list--item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 40px;
    border-bottom: 1px solid #ccc; /* px */
  }
  .list--item .avatar {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
  }
  .list--item .avatar img {
    width: 100%;
    height: 100%;
  }
  .list--item .tag {
    width: 70px;
    font-size: 12px;
    color: #999;
    text-align: center;
    padding: 2px 0;
    margin: 0 10px;
    -webkit-border-radius: 3px;
            border-radius: 3px;
  }
  .list--item .tag.gray {
    background-color: #e5e5e5;
    color: #999;
  }
  .list--item .tag.green {
    background-color: #80bd01;
    color: #fff;
  }
  .list--item .desc {
    width: 520px;
    overflow: hidden;
  }
  .list--item .title {
    width: 520px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #333
  }
  .list--item .title a {
    color: #333
  }
  .list--item .title a:visited {
    color: #888;
  }
  .list--item .txt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
  }
  .list--item .txt .num {
    font-size: 10px;
    color: #b4b4b4;
  }
  .list--item .txt .num span {
    color: #9e78c0;
  }
  .list--item .txt .time {
    font-size: 12px;
    color: #778087;
  }

  .pagination {
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pagination > button {
    width: 100px;
    height: 50px;
    border: 1px solid #8a8a8a;/* px */
    text-align: center;
    line-height: 60px;
    border-radius: 30px;
    background-size: 40px 32px;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: transparent;
    outline: none;
  }
  .pagination > button:first-of-type {
    background-image: url('../assets/previous.png');
  }
  .pagination > button:last-of-type {
    background-image: url('../assets/next.png');
  }
  

  .loading {
    height: calc( 100vh - 100px );
    background-image: url('../assets/loading.gif');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 64px 64px;
  }

  .side {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: transparent;
  }
  .side-menu {
    width: 400px;
    height: 100%;
    background-color: #fff;
  }
  .side-avatar {
    width: 400px;
    height: 400px;
    background: #444;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .side .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    text-align: center;
  }
  .side .login img {
    width: 140px;
    height: 140px;
  }
  .side .login p {
    font-size: 14px;
    color: #fff;
    margin-top: 20px;
  }
  .side-item > div {
    width: 360px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: 20px center;
    text-indent: 70px;
  }
  .side-item > div a {
    color: #444;
  }
  .side-item > div:nth-of-type(1) {
    background-image: url('../assets/message.png');
  }
  .side-item > div:nth-of-type(2) {
    background-image: url('../assets/user_center.png');
  }
  .side-item > div:last-of-type {
    border: none;
    background-image: url('../assets/about.png');
  }

  .close {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 80px;
  }
  .close .back {
    width: 100px;
    height: 80px;
    background-image: url('../assets/previous.png');
    background-repeat: no-repeat;
    background-size: 40px 32px;
    background-position: center center;
  }
  .login-title {
    width: 200px;
    text-align: center;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
  .login-form input {
    width: 260px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 6px 20px;
    font-size: 28px;
    outline: none;
  }
  .login-form .btn {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #80bd01;
    font-size: 24px;
    color: #fff;
    box-shadow: none;
    outline: none;
    border-radius: 3px;
  }
  .tips {
    margin-top: 40px;
    font-size: 16px;
    color: #999;
    text-align: center;
    line-height: 50px;
  }
</style>
