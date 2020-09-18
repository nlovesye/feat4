import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal, setLocal, removeLocal, apiPost } from '@/utils'

Vue.use(Vuex)

function getInitState () {
    let userType = getLocal('userType')
    userType = userType ? parseInt(userType, 10) : 0
    return {
        userType, // 当前用户类型 0：游客 1：普通用户 -1：管理员用户
        userAccount: getLocal('userAccount') || '', // 用户名称
        nickName: getLocal('nickName') || '游客',
        token: getLocal('token') || ''
    }
}

export default new Vuex.Store({
    state: getInitState(),
    mutations: {
        setLoginInfo (state, d) {
            state.userType = d.userType
            state.userAccount = d.userAccount
            state.token = d.token
            state.nickName = d.nickName
        },
        // 注销登录
        mLogout (state) {
            removeLocal('userType')
            removeLocal('userAccount')
            removeLocal('nickName')
            removeLocal('token')
            state.userType = 0
            state.userAccount = ''
            state.token = ''
            state.nickName = '游客'
        }
    },
    actions: {
        // 登录
        async loginAction ({ commit }, payload) {
            const ret = await apiPost('/user/login', { data: payload })
            if (ret) {
                setLocal('userType', 1)
                setLocal('userAccount', ret.userAccount)
                setLocal('nickName', ret.nickName)
                setLocal('token', ret.token)
                commit('setLoginInfo', {
                    userType: 1,
                    userAccount: ret.userAccount,
                    nickName: ret.nickName,
                    token: ret.token
                })
                return true
            }
            return false
        }
    },
    modules: {}
})
