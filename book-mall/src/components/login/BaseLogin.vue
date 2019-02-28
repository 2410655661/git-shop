<template>
  <div class="base-login">
    <el-row
      class="login-box"
      type="flex"
      justify="end"
      align="middle"
    >
      <el-col
        :span="8"
        :pull="3"
      >
        <el-row class="login-box-bg">
          <el-col
            :span="18"
            :push="3"
            :pull="3"
          >
            <el-form
              :model="ruleForm"
              :rules="loginRules"
              hide-required-asterisk
              ref="ruleForm2"
            >
              <el-form-item
                label="账号"
                prop="name"
              >
                <el-input
                  v-model="ruleForm.name"
                  autocomplete="off"
                ></el-input>
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
              <el-form-item>
                <el-button
                  class="submit-btn"
                  type="primary"
                  @click="submitForm('ruleForm2')"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col
            class="go-register"
            :span="18"
            :push="3"
            :pull="3"
          >
            还没有账号？<router-link
              class="register-link"
              to="/register"
            >立即注册</router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BaseLogin',
  data() {
    return {
      lastRouth: '',
      ruleForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.lastRouth = this.$route.params.redirect
  },
  methods: {
    ...mapMutations([
      'UPDATE_USERNAME'
    ]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/login', this.ruleForm)
            .then((data) => {
              let userName = data.data[0].nickname
              if (userName == null) {
                userName = 'user' + data.data.id
              }
              // 将用户的购物车信息存储到store
              this.UPDATE_USERNAME(userName)
              if (this.lastRouth !== '') {
                this.$router.push({ name: this.lastRouth })
              }
              this.$router.push({ name: 'Home' })
            }).catch((err) => {
              console.log(err)
            });
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.base-login {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login-bg.jpg") center center no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-box {
    height: 100%;
    &-bg {
      padding: 24px 0;
      background: #fff;
      border-radius: 10px;
      .submit-btn {
        width: 100%;
      }
      .go-register {
        font-size: 12px;
        color: #646464;
        line-height: 24px;
        text-align: right;
        .register-link {
          margin-left: 6px;
          color: #ff2832;
        }
      }
    }
  }
}
</style>
