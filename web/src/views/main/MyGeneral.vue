<template>
    <div class="m_mygeneral">
        <div class="tb_header">
            <Button
                type="primary"
                style="margin-right: 10px;"
                @click="add"
            >
                录入武将
            </Button>
            <!-- <Button
                type="primary"
                :loading="loading"
                @click="getList"
            >
                查询
            </Button> -->
        </div>
        <Table
            :columns="columns"
            :data="list"
            :loading="loading"
            border
        >
            <div slot="tags" slot-scope="{ row }">
                <Tag v-for="tag in row.tags" :key="tag">
                    {{ tag }}
                </Tag>
            </div>
            <div slot="action" slot-scope="{ row }">
                <Button type="primary" style="margin-right: 10px;" @click="editGeneral(row)">修改</Button>
                <Poptip
                    confirm
                    title="是否确定删除？"
                    @on-ok="deleteGeneral(row)"
                    placement="top-end"
                    :disabled="deleteLoading"
                >
                    <Button type="error" :disabled="deleteLoading">删除</Button>
                </Poptip>
            </div>
        </Table>
        <Modal
            v-model="modalVisible"
            title="武将配置"
            fullscreen
            :closable="false"
            @on-visible-change="onVisibleChange"
        >
            <GeneralConfig
                :type="modalType"
                @getFn="getFn"
            />
            <div slot="footer">
                <Button type="text" @click="modalVisible = false">取消</Button>
                <Button
                    type="primary"
                    :loading="configLoading"
                    @click="onModalOk"
                >
                    确定
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { apiGet, grade, apiPost, apiPut, apiDelete, dataDic } from '@/utils'
import { mapState } from 'vuex'
import { GeneralConfig } from '@/components'

export default {
    name: 'Home',
    components: { GeneralConfig },
    mounted () {
        this.getList()
    },
    data () {
        const columns = [
            {
                title: '姓名',
                key: 'name',
                width: 90,
                align: 'center',
                fixed: 'left'
            },
            {
                title: '阵营',
                key: 'camp',
                width: 80,
                filters: dataDic.camps.map(s => ({ label: s, value: s })),
                // filterMultiple: false,
                filterMethod (value, row) {
                    return value === row.camp
                }
            },
            {
                title: '统御',
                key: 'control',
                width: 70,
                align: 'center'
            },
            {
                title: '星级',
                key: 'star',
                width: 70,
                align: 'center'
            },
            {
                title: '标签',
                key: 'tags',
                width: 160,
                slot: 'tags'
            },
            {
                title: '武力',
                key: 'wl',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'wl')
            },
            {
                title: '智力',
                key: 'zl',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'zl')
            },
            {
                title: '统率',
                key: 'ts',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'ts')
            },
            {
                title: '速度',
                key: 'sd',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'sd')
            },
            {
                title: '政治',
                key: 'zz',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'zz')
            },
            {
                title: '魅力',
                key: 'ml',
                width: 130,
                sortable: true,
                render: (h, params) => this.attrCell(h, params, 'ml')
            },
            {
                title: '骑兵',
                key: 'ride',
                width: 80,
                align: 'center',
                sortable: true,
                render: (h, params) => this.armsCell(h, params, 'ride')
            },
            {
                title: '盾兵',
                key: 'dong',
                width: 80,
                align: 'center',
                sortable: true,
                render: (h, params) => this.armsCell(h, params, 'dong')
            },
            {
                title: '弓兵',
                key: 'bow',
                width: 80,
                align: 'center',
                sortable: true,
                render: (h, params) => this.armsCell(h, params, 'bow')
            },
            {
                title: '枪兵',
                key: 'gun',
                width: 80,
                align: 'center',
                sortable: true,
                render: (h, params) => this.armsCell(h, params, 'gun')
            },
            {
                title: '器械',
                key: 'organ',
                width: 80,
                align: 'center',
                sortable: true,
                render: (h, params) => this.armsCell(h, params, 'organ')
            },
            {
                title: '战法',
                key: 'skills',
                width: 100,
                render: (h, { row }) => {
                    return h('span', row.skills.map(item => item.title).join('，'))
                }
            },
            {
                title: '缘分',
                key: 'fates',
                width: 180,
                render: (h, { row }) => {
                    return h('span', row.fates.map(item => item.title).join('，'))
                }
            },
            {
                title: '操作',
                width: 160,
                fixed: 'right',
                slot: 'action',
                align: 'center'
            }
        ]
        return {
            loading: false,
            columns,
            list: [],
            modalVisible: false,
            validate: null,
            getGeneralConfig: null,
            setGeneralConfig: null,
            clearData: null,
            configLoading: false,
            modalType: 1,
            deleteLoading: false
        }
    },
    computed: {
        ...mapState(['userAccount'])
    },
    methods: {
        async getList () {
            const params = { userAccount: this.userAccount }
            this.loading = true
            const ret = await apiGet('/mygeneral', { params })
            this.loading = false
            this.list = ret || []
        },
        attrCell (h, { row }, key) {
            const attr = row.attr
            const g = `（+${attr[`${key}G`].toFixed(2)}）`
            return h('span', [
                attr[key].toFixed(2),
                h('span', g)
            ])
        },
        armsCell (h, { row }, key) {
            const arms = row.arms
            return h('span', grade(arms[key]))
        },
        onVisibleChange (visible) {
            if (!visible) {
                this.clearData()
            }
        },
        add () {
            this.modalType = 1
            this.modalVisible = true
        },
        editGeneral (d) {
            this.modalType = 2
            this.modalVisible = true
            this.setGeneralConfig(d)
        },
        async deleteGeneral (d) {
            this.deleteLoading = true
            const ret = await apiDelete('/mygeneral', { params: { userAccount: this.userAccount, name: d.name } })
            this.deleteLoading = false
            if (ret) {
                this.$Message.success('操作成功')
                this.getList()
            }
        },
        // 弹窗确定
        async onModalOk () {
            const valid = await this.generalValid()
            if (!valid) return
            const data = {
                userAccount: this.userAccount,
                general: this.getGeneralConfig()
            }
            this.configLoading = true
            let ret
            if (this.modalType === 1) {
                ret = await apiPost('/mygeneral', { data })
            } else if (this.modalType === 2) {
                ret = await apiPut('/mygeneral', { data })
            }
            this.configLoading = false
            if (ret) {
                this.$Message.success('操作成功')
                this.getList()
                this.modalVisible = false
            }
        },
        getFn (fn = {}) {
            this.generalValid = fn.validate
            this.getGeneralConfig = fn.getData
            this.setGeneralConfig = fn.setData
            this.clearData = fn.clearData
        }
    }
}
</script>

<style lang="less">
.m_mygeneral {
    .tb_header {
        height: 40px;
        align-items: center;
        line-height: 40px;
        padding: 0 12px;
    }
}
</style>
