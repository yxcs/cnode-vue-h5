<template>
  <div class="wrap">
    <div class="title">{{detail.title}}</div>
    <div class="desc">
      <div class="txt">
        <div><div>发布于 <span>{{detail.create_at_txt}}</span></div><div>作者 <span>{{detail.author.loginname}}</span></div></div>
        <div><div><span>{{detail.visit_count}}</span> 次浏览</div><div>来自 {{detail.tagTxt}}</div></div>
      </div>
      <template v-if="!!userMsg.id">
        <div v-if="detail.is_collect" @click="collect" class="collect">取消</div>
        <div v-else @click="collect" class="collect">收藏</div>
      </template>
    </div>
    <div class="content">
      <div v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
import * as http from '../services/apis.js'
import { timeBefore } from '../utils/format.js'
import '../components/markdown.css'
export default {
  name: 'cdetails',
  data () {
    return {
      tabs: {all: '全部', good: '精华', share: '分享', ask: '问答', job: '招聘'},
      id: null,
      detail: {
        author: {},
        replies: []
      },
      userMsg: {}
    }
  },
  mounted() {
    if (this.$cookies.isKey('userMsg') && this.$cookies.get('userMsg')) {
      this.userMsg = this.$cookies.get('userMsg');
    }
    this.geDetail();
  },
  methods: {
    geDetail() {
      this.id = this.$route.params.id;
      const params = {
        mdrender: true
      }
      if (this.userMsg.id) {
        params.accesstoken = this.userMsg.token;
      }
      http.getTopicDetail(this.id, params).then(res => {
        if (res.success) {
          res.data.create_at_txt = timeBefore(res.data.create_at)
          res.data.tagTxt = this.tabs[res.data.tab]
          this.detail = res.data;
        }
      });
    },
    collect() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap {
    padding: 20px 40px;
  }
  .title {
    font-size: 44px;
    font-weight: 700;
    display: inline-block;
    vertical-align: bottom;
    line-height: 130%;
    margin: 8px 0;
  }
  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .txt {
    color: #838383;
  }
  .txt > div {
    display: flex;
    justify-content: flex-start;
  }
  .txt > div > div {
    width: 250px;
    font-size: 20px;
  }
  .txt > div > div a {
    text-decoration: none;
    color: #838383;
  }
  .txt > div > div a:active {
    text-decoration: underline;
  }
  .collect {
    padding: 10px 20px;
    background: #80bd01;
    border-radius: 6px;
    color: #fff;
  }
  .content {
    margin-top: 40px;
    border-top: 1px solid #ddd;
    padding: 20px 0;
  }
</style>