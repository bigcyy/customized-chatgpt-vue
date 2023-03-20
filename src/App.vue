<template>
  <div class="page">
    <div class="chatBox">
      <div class="k" v-show="setKeyDialog">
        <div class="title">key</div>
        <input type="text" v-model="key"/>
        <div class="yes" @click="doSetKey()">确认</div>
      </div>
      <div class="files" v-show="uploadDialog">
        <input type="file" ref="file"/>
        <div class="yes2" @click="doUpload()">确认</div>
      </div>
      <div class="fence">
        <div class="head">
          <img src="./assets/2.webp" alt="" />
        </div>
        <ul>
          <li class="iconfont icon-icon_shezhi" @click="showSetKeyDialog()"></li>
          <li class="iconfont icon-wenjian" @click="showUploadDialog()"></li>
        </ul>
      </div>
      <div class="face">
        <div class="one">聊天</div>
        <div class="two">
          <ul class="answer">
            <li v-for="(item, index) in information" :key="index"><span :class="{ ans2: index % 2 ? 1 : 0 }" v-html="item"></span></li>
          </ul>
        </div>
        <div class="three">
          <div>
            <textarea cols="70" rows="2" placeholder="say hello..." v-model="sub" :disabled="isDisabled"></textarea>
            <div class="center iconfont icon-fasong" @click="submitt()" @keyup.enter="submitt()" :disabled="isDisabled"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/chatApi'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      setKeyDialog: false,
      uploadDialog: false,
      key: '',
      sub: '',
      isDisabled: false,
      information: ['请先设置APIKey，并且上传您的PDF文档，我的回答将会基于该文档。']
    }
  },
  methods: {
    showSetKeyDialog() {
      this.setKeyDialog = true
      this.uploadDialog = false
    },
    showUploadDialog() {
      this.uploadDialog = true
      this.setKeyDialog = false
    },
    doSetKey() {
      api.saveKey('Bearer '+this.key).then(resp=>{
        console.log(resp)
      })
      this.setKeyDialog = false
    },
    doUpload() {
      if(this.$refs.file.files.length){
        let doc = this.$refs.file.files[0]
        axios.post(
        '/api/api/upload',
        {
          file: doc
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
          }
        }).then(resp=>{
          this.uploadDialog = false
        })
      }else{
        this.uploadDialog = false
      }
    },
    submitt() {
      if (this.sub != '') {
        this.information.push(this.sub)
        this.isDisabled = true
        api.chat(this.sub).then(resp => {
          if(resp){
            this.information.push(resp.data)
          }
          this.isDisabled = false
        })
        this.sub = ''
      }
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.page {
  margin: 0;
  padding-top: 50px;
  background: url(./assets/1.webp);
  background-size: cover;
  height: 670px;
}
.chatBox {
  position: relative;
  margin: auto;
  width: 700px;
  height: 500px;
  background-color: rgba(1, 1, 1, 0.3);
  overflow: hidden;
  border-radius: 5px;
  .k {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 75px;
    border-radius: 10px;
    border: 1px solid rgba(1, 1, 1, 0.4);
    .title {
      text-align: center;
      background-color: rgba(1, 1, 1, 0.4);
      border-radius: 10px 10px 0 0;
      color: aliceblue;
    }
    input {
      width: 330px;
      height: 30px;
      border: none;
      outline: none;
      padding: 0 10px;
    }
    .yes {
      height: 25px;
      text-align: center;
      background-color: rgba(1, 1, 1, 0.4);
      border-radius: 0 0 10px 10px;
      color: antiquewhite;
    }
    .yes:hover {
      cursor: pointer;
      background-color: rgba(1, 1, 1, 0.6);
    }
  }
  .files {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 50px;
    background-color: rgba(1, 1, 1, 0.4);
    color: aliceblue;
    border-radius: 5px;
    input {
      border-radius: 5px 5px 0 0;
      outline: none;
    }
    .yes2 {
      height: 26px;
      text-align: center;
      color: antiquewhite;
      border-radius: 0 0 5px 5px;
    }
    .yes2:hover {
      background-color: rgba(1, 1, 1, 0.3);
    }
  }
  .fence {
    float: left;
    width: 60px;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.4);
    .head {
      width: 100%;
      height: 100px;
      margin-bottom: 270px;
      padding: 5px 0 0 5px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        text-align: center;
        color: aliceblue;
        line-height: 60px;
        font-size: 25px;
        width: 100%;
        height: 60px;
      }
      li:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .face {
    float: right;
    width: 640px;
    .one {
      height: 40px;
      text-align: center;
      background-color: rgba(1, 1, 1, 0.6);
      color: aliceblue;
      line-height: 40px;
    }
    .two {
      height: 420px;
      .answer {
        height: 100%;
        padding: 10px 0;
        width: 100%;
        list-style: none;
        overflow: scroll;
        li {
          float: left;
          width: 100%;
          margin-bottom: 10px;
          span {
            background-color: rgba(1, 1, 1, 0.3);
            display: inline-block;
            padding: 5px;
            margin: 0 10px;
            border-radius: 5px;
            color: aliceblue;
          }
        }
        .ans2 {
          float: right;
        }
      }
      .answer::-webkit-scrollbar {
        width: 6px;
        background-color: #f8f8f800;
      }
    }
    .three {
      height: 40px;
      background-color: white;
      textarea {
        resize: none;
        padding: 5px;
        border: none;
        outline: none;
      }
      .center {
        width: 35px;
        float: right;
        line-height: 40px;
        font-size: 25px;
        text-align: center;
      }
      .center:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
