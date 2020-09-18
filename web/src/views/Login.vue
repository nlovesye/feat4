<template>
    <div class="p_login">
        <Form
            v-if="type === 'login'"
            class="login_form"
            ref="loginForm"
            :model="loginData"
            :rules="rules"
            :label-width="0"
        >
            <h2 class="title">平台登录</h2>
            <FormItem prop="userAccount">
                <Input type="text" v-model="loginData.userAccount" placeholder="请输入用户名">
                    <Icon type="md-person" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="pwd">
                <Input type="password" v-model="loginData.pwd" placeholder="请输入密码">
                    <Icon type="md-lock" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <Button type="primary" long @click="login" :loading="loading">登录</Button>
            <p class="action_text" @click="onTypeChange">注册账号</p>
        </Form>
        <Form
            v-if="type === 'logon'"
            class="logon_form"
            ref="logonForm"
            :model="logonData"
            :rules="rules"
            :label-width="0"
        >
            <h2 class="title">账号注册</h2>
            <FormItem prop="userAccount">
                <Input type="text" v-model="logonData.userAccount" placeholder="请输入用户名">
                    <Icon type="md-person" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="pwd">
                <Input type="password" v-model="logonData.pwd" placeholder="请输入密码">
                    <Icon type="md-lock" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <Button type="primary" long @click="logon" :loading="loading">注册</Button>
            <p class="action_text" @click="onTypeChange">去登录</p>
        </Form>
    </div>
</template>

<script>
import { apiPost } from '@/utils'
import { mapActions, mapState, mapMutations } from 'vuex'

function fData () {
    return {
        userAccount: '',
        pwd: ''
    }
}

export default {
    mounted () {
        if (this.userType) {
            this.mLogout()
        }
    },
    data () {
        return {
            type: 'login',
            loginData: fData(),
            logonData: fData(),
            loading: false,
            rules: {
                userAccount: [
                    {
                        type: 'string',
                        trigger: 'change',
                        required: true,
                        message: '用户名不能为空'
                    },
                    {
                        type: 'string',
                        trigger: 'change',
                        min: 6,
                        max: 11,
                        message: '6至11个字符'
                    }
                ],
                pwd: [
                    {
                        type: 'string',
                        trigger: 'change',
                        required: true,
                        message: '密码不能为空'
                    },
                    {
                        type: 'string',
                        trigger: 'change',
                        min: 4,
                        max: 11,
                        message: '4至11个字符'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState(['userType'])
    },
    methods: {
        ...mapMutations(['mLogout']),
        ...mapActions(['loginAction']),
        onTypeChange () {
            if (this.loading) return
            if (this.type === 'login') {
                this.$refs.loginForm.resetFields()
                this.loginData = fData()
            } else {
                this.$refs.logonForm.resetFields()
                this.logonData = fData()
            }
            this.type = this.type === 'login' ? 'logon' : 'login'
        },
        // 注册
        async logon () {
            this.loading = true
            const valid = await this.$refs.logonForm.validate()
            if (!valid) {
                this.loading = false
                return
            }
            await apiPost('/user/logon', {
                data: this.logonData
            })
            this.$Message.success('注册成功！')
            this.loading = false
        },
        // 登录
        async login () {
            this.loading = true
            const valid = await this.$refs.loginForm.validate()
            if (!valid) {
                this.loading = false
                return
            }
            const isLogin = await this.loginAction(this.loginData)
            this.loading = false
            if (isLogin) {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.p_login {
    height: 100%;
    position: relative;
    background-color: #efefef;
    .login_form, .logon_form {
        padding: 30px 20px 26px;
        border-radius: 4px;
        background-color: #fff;
        width: 300px;
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
    }
    .title{
        text-align: center;
        margin-bottom: 26px;
    }
    .action_text{
        margin-top: 16px;
        text-align: right;
        font-size: 12px;
        cursor: pointer;
        text-decoration: underline;
        &:hover{
            color: #ffc20d;
        }
    }
}
</style>
