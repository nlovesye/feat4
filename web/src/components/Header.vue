<template>
    <div class="c_header">
        <Menu
            mode="horizontal"
            theme="light"
            :active-name="activeName"
            class="header_menu"
            @on-select="onMenuSelect"
        >
            <template v-for="item in menus">
                <MenuItem :name="item.path" :key="item.path" v-if="!item.children">
                    <Icon v-show="!!item.menu.icon" :type="item.menu.icon" />
                    {{ item.menu.title }}
                </MenuItem>
                <Submenu :name="item.path" :key="item.path" v-else>
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </template>
        </Menu>
        <Poptip
            trigger="hover"
            width="150px"
            padding='0px'
            placement='bottom-end'
            :transfer='false'
            popper-class='user_popper'
        >
            <div slot='title' class="username">
                <Icon type='md-man' size='16' style='margin-right: 5px;' />
                {{ nickName }}
            </div>
            <div slot='content' class="actionbtn" @click.stop="onAction">
                <Icon :type="userType === 0 ? 'md-plane' : 'md-exit'" size='16' style="margin-right: 5px;" />
                {{ actionText }}
            </div>
            <Avatar icon="md-person" style="background-color: #ffc20d;" />
        </Poptip>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

const routerFilter = routes => {
    return routes.filter(r => r.path !== '*')
}

export default {
    name: 'Header',
    data () {
        const activeName = this.$route.path
        // console.log('d', this.$route, this.$router, menus, activeName)
        return {
            activeName
        }
    },
    computed: {
        ...mapState(['userType', 'nickName']),
        actionText () {
            return this.userType === 0 ? '登录' : '注销登录'
        },
        menus () {
            return routerFilter(this.$router.options.routes[1].children || []).filter(r => r.menu && r.menu.power ? r.menu.power.indexOf(this.userType) > -1 : true)
        }
    },
    methods: {
        ...mapMutations(['mLogout']),
        onMenuSelect (name) {
            if (this.activeName === name) return
            this.activeName = name
            this.$router.push(name)
        },
        onAction () {
            if (this.userType === 0) {
                this.$router.push('/login')
            } else {
                this.mLogout()
                if (this.activeName !== '/') {
                    this.$router.push('/')
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
@headerHeight: 42px;
@headerBgc: #242424;

.c_header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: @headerHeight;
    box-shadow: 0 1px 1px rgba(0,0,0, 0.08);
    background-color: @headerBgc;
    // color: #fff;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header_menu{
        color: #fff;
        background-color: @headerBgc;
        height: 100%;
        line-height: @headerHeight;

        &::after{
            display: none;
        }

        .ivu-menu-item, .ivu-menu-submenu{
            color: #fff;
        }
        .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item{
            color: #515a6e;
        }
    }

    .user_popper{
        .username{
            padding: 8px 16px;
        }
        .actionbtn{
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 0px 0px 4px 4px;
            &:hover{
                background-color: rgba(0, 0, 0, 0.08);
            }
        }
    }
}
</style>
