<template>
  <div class="wrap">
    <div class="detail">
      <div class="user-msg">
        <div><img :src="user.avatar_url" alt=""></div>
        <div>{{user.loginname}}</div>
      </div>
      <div class="score">{{user.score}} 积分</div>
      <div v-if="user.githubUsername" class="github"><a :href="user.github_link">github：{{user.githubUsername}}</a></div>
      <div class="create-time">注册时间{{user.create_at_txt}}</div>
    </div>

    <div class="lists">
      <div class="title">最近创建的话题</div>
      <template v-for="item in user.recent_topics">
        <div class="list--item" :key="item.id">
          <div class="avatar"><router-link :to="`/cuser/${item.author.loginname}`"><img :src="item.author.avatar_url" :alt="item.author.loginname"></router-link></div>
          <div class="tag">{{item.timeStr}}</div>
          <div class="desc">
            <div class="title"><router-link :to="`/cdetails/${item.id}`">{{item.title}}</router-link></div>
          </div>
        </div>
      </template>
    </div>

    <div class="lists">
      <div class="title">最近参与的话题</div>
      <template v-for="item in user.recent_replies">
        <div class="list--item" :key="item.id">
          <div class="avatar"><router-link :to="`/cuser/${item.author.loginname}`"><img :src="item.author.avatar_url" :alt="item.author.loginname"></router-link></div>
          <div class="tag">{{item.timeStr}}</div>
          <div class="desc">
            <div class="title"><router-link :to="`/cdetails/${item.id}`">{{item.title}}</router-link></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import * as http from '../services/apis.js'
import { timeBefore } from '../utils/format.js'
export default {
  name: 'cuser',
  data () {
    return {
      loginname: null,
      user: {},
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.loginname = this.$route.params.id;
      http.getUser(this.loginname).then(res => {
        if (res.success) {
          res.data.github_link = res.data.githubUsername ? `https://github.com/${res.data.githubUsername}` : '';
          res.data.create_at_txt = timeBefore(res.data.create_at);
          res.data.recent_topics = res.data.recent_topics.map(item => {
            item.timeStr = timeBefore(item.last_reply_at);
            return item;
          })
          res.data.recent_replies = res.data.recent_replies.map(item => {
            item.timeStr = timeBefore(item.last_reply_at);
            return item;
          })
          this.user = res.data;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail {
    padding: 40px;
  }
  .user-msg {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .user-msg img {
    width: 90px;
    height: 90px;
    margin-right: 20px;
  }
  .score {
    font-size: 24px;
    line-height: 48px;
  }
  .github a {
    text-decoration: none;
    font-size: 24px;
    color: #444444;
  }
  .github a:active {
    text-decoration: underline;
  }
  .create-time {
    line-height: 50px;
    font-size: 28px;
    color: #999;
  }

  .lists > .title {
    font-size: 24px;
    color: #444444;
    padding: 40px;
    border-bottom: 1px solid #ccc;
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
    width: 130px;
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
    width: 460px;
    overflow: hidden;
  }
  .list--item .title {
    width: 460px;
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
</style>