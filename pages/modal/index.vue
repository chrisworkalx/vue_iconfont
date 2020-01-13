<template>
  <div>
    <h1>我是modal</h1>
    <button @click="btnClick">触发modal提示</button>
    <Modal
      :isShowDialog="isShowTestDialog"
      v-on:hideDialog="isShowTestDialog = false"
      @done="afterClose"
    />
    <br>
    <br>
    <br>
    <base-input
      v-model="username"
      label="基础输入组件"
      @click.native="handleBaseInputClick"
      v-on:focus="handleBaseInputFocus"
      placeholder="请输入您的名字"
      class="username-input"
      :value="'whoareyou?'"
      @input="getinput"
    />
    <br>
    <br>
    <br>
    <p>
      <span>{{valText}}</span>
      <span>校验规则</span>
      <span>
        <input type="text" placeholder="请输入邮箱" v-model="valText">
        <span :style="msg.type === 2 ? okClass : errClass">{{msg.info}}</span>
      </span>
    </p>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div>
        <p>
          <span>{{namewww}}____{{pass}}</span>
        </p>
    </div>
    <div :style="wrapper" :class="'wrapperAll'">
      <p>
        用户名称：
        <input type="text" placeholder="请输入用户名" v-model="namewww">
      </p>
      <p>
        用户密码：
        <input type="password" placeholder="请输入密码" v-model="pass">
      </p>
      <p>
        <button @click="loginBtn">注册</button>
        <button @click="sendParams">登录</button>
      </p>
    </div>
  </div>
</template>
<script>
// import { message } from 'element-ui';
import Modal from "@/components/dialoge";
import { debounce } from "util/test";
import { JSEncrypt } from 'jsencrypt'

let encryptor = new JSEncrypt() // 新建JSEncrypt对象

let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHGBAi30CuorD71ddAY5Pj80a2
    FinTK6CJrX3LJZ5FTxJrQdzxbwDVB2mDVgspU5oz7X03TzgWFKkkJm2b4g9G00sA
    +G9oeGaR+rpFaoDr4BxW+AUd6V1Ps/OkTaLc473XOA0aYTRIwo1Ob3pTJd9Za90e
    +NRk0c07Vb/mcr0w1QIDAQAB`  //把之前生成的贴进来，实际开发过程中，可以是后台传过来的

encryptor.setPublicKey(publicKey) // 设置公钥
export default {
  name: "modal",
  data() {
    return {
      namewww: '',
      pass: '',
      valText: "",
      msg: {
        info: "",
        type: 1
      },
      isShowTestDialog: false,
      username: "",
      errClass: {
        color: "red"
      },
      okClass: {
        color: "green"
      },
      wrapper: {
        border: "solid #ccc 1px",
        padding: "20px",
        display: "inline-block"
      }
    };
  },
  created() {
    this.$watch("valText", this.getInputDebounce()); //放在这里最好
  },
  components: {
    Modal,
    "base-input": {
      inheritAttrs: false,
      props: ["label"], //如果在这里已经对props引入
      //则$attrs中就会没有
      template: `
                <label id="base-label">
                    {{label}}
                    <input v-bind="$attrs" v-on="inputListeners"/>
                </label>
            `,
      data: function() {
        return {};
      },
      computed: {
        inputListeners() {
          var vm = this;
          return Object.assign({}, this.$listeners, {
            input: function() {
              vm.$emit("input", event.target.value);
            },
            focus: function(event) {
              vm.$emit("focus", "哈哈哈，onfocus了");
            }
          });
          // return Object.assign({}, this.$listeners);
        }
      },
      mounted: function() {
        console.log(`$attrs:`);
        console.log(this.$attrs);
        console.log(`$listeners:`);
        console.log(this.$listeners); // 父级添加的所有属性都在这里
      },
      methods: {}
    }
  },
  beforeUpdate() {
    // console.log(this.username);
    // this.$watch('valText', this.getInputDebounce()) //不要放在这里
  },
  watch: {
    // valText: {
    //   handler: debounce((val, _this) => {
    //     console.log(val, "=====val");
    //     console.log(_this, "=====_this");
    //     const regexp = /^([\w-]+(\.[\w-]+)*\@([\.\w-]+))+$/;
    //     const verifyEmail = regexp.test(val);
    //     console.log(verifyEmail, '====verifyEmail')
    //     if (!verifyEmail) {
    //     // _this.EditEMailValid({ vm: _this, verifyEmail });
    //     }
    //   }, this, 500)
    // }
    // valText: {
    //   handler: this.getInputDebounce()
    // }
  },
  methods: {
    getinput(res) {
      console.log(res, "======input");
    },
    btnClick() {
      this.isShowTestDialog = true;
    },
    afterClose() {
      console.log("hello");
    },
    handleBaseInputFocus: function(ev) {
      console.log(ev, "====focus");
    },
    handleBaseInputClick: function(ev) {
      console.log(ev.type, "====click");
    },
    // EditEMailValid: debounce(({ vm, val, verifyEmail }) => {
    //   console.log(vm, '====vm')
    //   if (!verifyEmail) {
    //     vm.valText = "";
    //     vm.errMsg = "邮箱格式错误，请重新输入！";
    //   }
    // }, 1000)
    getInputDebounce() {
      var that = this;
      return debounce(
        (val, x) => {
          console.log(x === that, "====x===that ?");
          console.log(val, "=====val");
          console.log(that, "=====_this");
          const regexp = /^([\w-]+(\.[\w-]+)*\@([\.\w-]+))+$/;
          const verifyEmail = regexp.test(val);
          console.log(verifyEmail, "====verifyEmail");
          if (!verifyEmail) {
            // _this.EditEMailValid({ vm: _this, verifyEmail });
            that.msg.info = "邮箱格式错误！";
            that.msg.type = 1;
          } else {
            that.msg.info = "恭喜您！验证邮箱通过。";
            that.msg.type = 2;
          }
        },
        that,
        1000
      );
    },
    sendParams() {
      console.log("登录！！！！！");
      // console.log(this.$http)
      this.$post(
         "/login",
        {
          name: encryptor.encrypt(this.namewww),
          pass: encryptor.encrypt(this.pass)
        }
      ).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.namewww = '';
        this.pass = '';
        // console.log(res.data.msg, '=====res');
      }).catch(err => {
        console.log(err, '=====err');
         this.$message({
          message: err.msg,
          type: 'error'
        });
      });
    },
    loginBtn() {
      console.log('注册！！！')
      this.$post(
         "/reg",
        {
          name: encryptor.encrypt(this.namewww),
          pass: encryptor.encrypt(this.pass)
        }
      ).then(res => {
        console.log(res, '=====res');
        this.$message({
            message: res.msg,
            type: 'success'
          });
          this.namewww = '';
          this.pass = '';
      }).catch(err => {
        console.log(err, '=====err');
        this.$message({
          message: err.msg,
          type: 'error'
        });
      });
    }
  }
};
</script>
<style>
.wrapperAll {
  background: #f40;
  color: #fff;
}
</style>


