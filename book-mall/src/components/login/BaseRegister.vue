<template>
  <div class="base-register">
    <el-row
      class="register-box"
      type="flex"
      justify="end"
      align="middle"
    >
      <el-col
        :span="8"
        :pull="3"
      >
        <el-row class="register-box-bg">
          <el-col
            :span="18"
            :push="3"
            :pull="3"
          >
            <el-form
              :model="ruleForm"
              :rules="registerRules"
              hide-required-asterisk
              ref="ruleForm"
            >
              <el-form-item
                label="账号"
                prop="name"
              >
                <el-input
                  @change="changeNameExist"
                  v-model="ruleForm.name"
                  autocomplete="off"
                  :class="nameExist ? 'red-border' : ''"
                ></el-input>
                <p class="name-exist" v-if="nameExist">账号已存在</p>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
              >
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="checkPass"
              >
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="submit-btn"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col
            class="go-login"
            :span="18"
            :push="3"
            :pull="3"
          >
            已有账号？<router-link
              class="login-link"
              to="/login"
            >立即登录</router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BaseRegister',
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        checkPass: ''
      },
      registerRules: {
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur'},
          { validator: (rule, value, callback) => {
            if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }, trigger: 'blur' }
        ]
      },
      nameExist: false
    }
  },
  methods: {
    changeNameExist() {
      this.nameExist = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/register', this.ruleForm)
            .then((data) => {
              console.log(data.data)
              if(data.data == '用户名已存在') {
                this.nameExist = true
              } else {
                this.$router.push({name: 'Login'})
              }
            }).catch((err) => {
              console.log(err)
            });
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.base-register {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login-bg.jpg") center center no-repeat;
  background-size: cover;
  overflow: hidden;
  .register-box {
    height: 100%;
    &-bg {
      padding: 24px 0;
      background: #fff;
      border-radius: 10px;
      .red-border {
        .el-input__inner {
          border-color: #f56c6c;
        }
      }
      .name-exist {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
      }
      .submit-btn {
        width: 100%;
      }
      .go-login {
        font-size: 12px;
        color: #646464;
        line-height: 24px;
        text-align: right;
        .login-link {
          margin-left: 6px;
          color: #ff2832;
        }
      }
    }
  }
}
</style>
