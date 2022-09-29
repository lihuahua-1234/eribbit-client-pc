<!--登录-表单组件-->
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!--
    :validation-schema="schema" 定义校验规则
    v-slot="{errors}"提示用户错误--->
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
          </div>
          <!--错误提示-->
          <div
          class="error"
          v-if="errors.account">
          <i class="iconfont icon-warning" />
          {{errors.account}}
          </div>
        </div>

        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
           <div
           class="error"
           v-if="errors.password">
           <i class="iconfont icon-warning" />
           {{errors.password}}
           </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.mobile}"  v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
        <div
          class="error"
          v-if="errors.mobile">
          <i class="iconfont icon-warning" />
          {{errors.mobile}}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{error:errors.code}" v-model="form.code" name="code" type="text" placeholder="请输入验证码" />
            <span class="code">发送验证码</span>
          </div>
        <div
          class="error"
          v-if="errors.code">
          <i class="iconfont icon-warning" />
          {{errors.code}}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
          <div
           class="error"
           v-if="errors.isAgree">
           <i class="iconfont icon-warning" />
           {{errors.isAgree}}
           </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登 录</a>
    </Form>

    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
export default ({
  components: { Form, Field },
  name: 'LoginForm',
  setup () {
    // 1. 切换登录方式
    const isMsgLogin = ref(false)
    // 2.表单数据对象
    const form = reactive({
      isAgree: true, // 勾选状态
      account: null, // 用户名
      password: null, // 密码
      mobile: null, // 手机
      code: null// 验证码
    })

    // 3.vee-validate 校验基本步骤
    // 3.1 导入 Form Field 组件 将 form 和 input 进行替换， 需要加上name 用来指定将来的校验规则函数的 <Form> <Field v-model="form.account" name="account"/> </Form
    // 3.2 Field 需要进行数据绑定，字段名称最好和后台接口需要的一致  双向绑定: v-model="form.account"
    // 3.3 定义 Field 的 name 属性指定的校验规则函数, Form 的 validation-schema 接收定义好的校验规则是对象 <Form :validation-schema="schema"> <Field v-model="form.account" name="account"/> </Form
    // 3.4 自定义组件需要校验必须先支持v-model 然后再 Field 使用 as 指定为组件名称
    const mySchema = {
      // 校验函数规则： 返回true就是校验成功, 返回一个字串发就是失败,字串发就是错误提升 <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    // 4.监听 isMsgLogin 重置表单(数据+清除校验结果)
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      form.isAgree = true
      form.account = null // 用户名
      form.password = null // 密码
      form.mobile = null // 手机
      form.code = null// 验证码
      // 如果是没有销毁Field组件,之前的校验结果是不会消除 例如：v-show切换的
      // Form组件提供了一个 resetForm 函数清除校验结果
      // <Form res="formCom">
      // const formCom = ref(null)
      // return formCom
      // formCom.value.resetForm()
      // 补充校验效果清除，Form组件提供resetForm()
      // formCom.value.resetForm()
    })

    // 5.需要在点击登录的时候对整体表单进行校验
    const login = async () => {
      // Form组件提供了一个 validate 函数作为整体表单校验，但是返回的是一个promise
      const valid = await formCom.value.validate()
      console.log(valid)
    }
    return { isMsgLogin, form, schema: mySchema, formCom, login }
  }
})
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
