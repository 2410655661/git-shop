<template>
  <div class="base-header">
    <el-row
      class="base-header-top"
      type="flex"
      justify="space-between"
    >
      <el-col :push="2">
        <p class="welcome-tips">
          欢迎光临华鲁书店，
          <span
            class="user-name"
            v-if="userName"
            key="userName"
          >{{ userName }}</span>
          <router-link
            class="login-link"
            to="/login"
            v-else
            key="userLogin"
          >请登录</router-link>
          <span
            class="user-edit-btn"
            v-if="userName"
            key="userEdit"
            @click="editUser"
          >退出</span>
          <router-link
            class="register-link"
            to="/register"
            v-else
            key="userRegister"
          >注册</router-link>
        </p>
      </el-col>
      <el-col
        class="head-link-box"
        :pull="2"
      >
        <router-link
          class="head-link"
          v-for="headNavItem in headNavLists"
          :to="headNavItem.link"
          :key="headNavItem.title"
        >{{ headNavItem.title }}</router-link>
      </el-col>
    </el-row>
    <el-row
      class="base-header-bot"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <el-col
        class="logo-box"
        :span="5"
        :push="2"
      >
        <img
          class="logo"
          src="../../assets/images/logo.png"
          alt="华鲁书店"
        >
      </el-col>
      <el-col :span="10">
        <el-autocomplete
          class="seach-input"
          v-model="seachVal"
          :trigger-on-focus="false"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ><i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="handleIconClick(seachVal)"
          >
          </i>
        </el-autocomplete>
        <ul class="search-nav-box">
          <li class="search-tips">
            <p>热搜: </p>
          </li>
          <li
            class="search-nav"
            v-for="searchNavItem in searchNavLists"
            :key="searchNavItem.title"
          >
            <router-link
              class="search-nav-title"
              :to="searchNavItem.link"
            >{{ searchNavItem.title }}</router-link>
          </li>
        </ul>
      </el-col>
      <el-col
        class="shop-car-box"
        :span="5"
        :pull="2"
      >
        <el-button
          v-if="shopCarLists.length == 0"
          type="primary"
        >购物车 <b class="shop-car-num">{{ shopNum }}</b></el-button>
        <el-dropdown v-else>
          <el-button type="primary">
            购物车 <b class="shop-car-num">{{ shopNum }}</b>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="shopCarItem in shopCarLists"
              :key="shopCarItem.title"
            >{{shopCarItem.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="nav-lists">
      <el-col
        :offset="2"
        :span="3"
      >
        <h2 class="all-categories"><i class="all-categories-tips el-icon-menu"></i>全部分类</h2>
      </el-col>
      <el-col
        :span="15"
      >
        <el-row
          type="flex"
          justify="start"
          align="middle"
        >
          <el-col
            class="nav-box"
            v-for="navItem in navLists"
            :key="navItem.title"
          >
            <router-link class="nav" :to="navItem.link">{{ navItem.title }}</router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BaseHeader',
  data() {
    return {
      userName: '',
      headNavLists: [
        {
          title: '个人中心',
          link: '/userinfo'
        }, {
          title: '我的订单',
          link: ''
        }, {
          title: '购物车',
          link: ''
        }, {
          title: '帮助',
          link: ''
        }
      ],
      restaurants: [],
      seachVal: '',
      timeout: null,
      searchNavLists: [
        {
          title: '快乐读书吧',
          link: ''
        }, {
          title: '米米没问题',
          link: ''
        }, {
          title: '末那大叔',
          link: ''
        }, {
          title: '杨澜',
          link: ''
        }, {
          title: '骆驼祥子',
          link: ''
        }
      ],
      shopNum: '0',
      shopCarLists: [],
      navLists: [
        {
          link: '/index',
          title: '首页'
        }, {
          link: '/login',
          title: '电子书'
        }, {
          link: '',
          title: '图书'
        }, {
          link: '',
          title: '有声读物'
        }, {
          link: '',
          title: '专题'
        }, {
          link: '',
          title: '活动会场'
        }
      ]
    }
  },
  mounted() {
    const userName = JSON.parse(sessionStorage.getItem('userName'));
    if (userName !== '') {
      this.userName = userName;
    };
  },
  methods: {
    ...mapMutations([
      'EDIT_USER'
    ]),
    editUser() {
      this.userName = ''
      this.EDIT_USER()
    },
    querySearchAsync(queryString, callback) {
      this.$axios.get('/api/search', {
        params: {
          "searchObj": queryString
        }
      }).then((data) => {
        const findResult = data.data ? data.data : [];
        for (let key of findResult) {
          key.value = key.bookName + ' -- ' + key.bookAuthor + ' (' + key.bookDescript + ')';
        };
        callback(findResult);
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSelect(item) {
      console.log(item.value)
    },
    handleIconClick(searchObj) {
      // 拦截无效或非法搜索
      if (searchObj == '') return;
      // 传递参数至搜索结果页
      this.$router.push({ name: 'Login', params: { seachVal: searchObj } });
      console.log(searchObj);
    }
  }
}
</script>

<style lang="scss" scoped>
.base-header {
  height: 136px;
  &-top {
    height: 36px;
    background: #f9f9f9;
    .welcome-tips {
      font-size: 14px;
      color: #646464;
      line-height: 36px;
      .user-name {
        color: #ff2832;
        cursor: pointer;
      }
      .user-edit-btn {
        cursor: pointer;
        &:hover {
          color: #ff2832;
        }
      }
      .login-link {
        color: #ff2832;
      }
      .register-link {
        color: #646464;
        &:hover {
          color: #ff2832;
        }
      }
    }
    .head-link-box {
      text-align: right;
      .head-link {
        margin: 0 12px;
        font-size: 14px;
        color: #646464;
        line-height: 36px;
        &:hover {
          color: #ff2832;
        }
      }
    }
  }
  &-bot {
    height: 100px;
    .logo-box {
      height: 50%;
      .logo {
        height: 100%;
      }
    }
    .seach-input {
      width: 100%;
    }
    .search-nav-box {
      margin: 4px 0;
      .search-tips {
        display: inline-block;
        font-size: 12px;
        color: #999;
        line-height: 12px;
      }
      .search-nav {
        display: inline-block;
        margin-left: 12px;
        &-title {
          font-size: 12px;
          color: #666;
          line-height: 12px;
          &:hover {
            color: #ff2832;
          }
        }
      }
    }
    .shop-car-box {
      text-align: right;
      .el-button {
        background: #ff2832;
        border: 0;
      }
      .shop-car-num {
        margin-left: 8px;
        font-size: 14px;
      }
    }
  }
  .nav-lists {
    .all-categories {
      font-size: 16px;
      color: #fff;
      line-height: 40px;
      text-align: center;
      background: #ff2832;
      &-tips {
        margin-right: 12px;
      }
    }
    .nav-box {
      text-align: center;
      .nav {
        font-size: 14px;
        color: #333;
        line-height: 40px;
        font-weight: bold;
        &:hover {
          color: #ff2832;
        }
      }
    }
  }
}
</style>
