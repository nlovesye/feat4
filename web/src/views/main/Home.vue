<template>
    <div class="home">
        <Table
            :columns="columns"
            :data="list"
            border
        ></Table>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { apiGet, grade } from '@/utils'

export default {
    name: 'Home',
    mounted () {
        this.getList()
    },
    data () {
        return {
            columns: [
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
                    width: 70,
                    render: (h, params) => {
                        const camps = ['魏国', '蜀国', '吴国', '群雄']
                        return h('span', camps[(params.row.camp - 1) || 0])
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
                    width: 220,
                    render: (h, { row }) => {
                        return row.tags.split('，').map(str => h('Tag', {
                            props: 'default'
                        }, str))
                    }
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
                    title: '自身战法',
                    key: 'skill',
                    width: 100,
                    render: (h, { row }) => {
                        return h('span', row.skill.title || '')
                    }
                },
                {
                    title: '传承战法',
                    key: 'inheritSkill',
                    width: 100,
                    render: (h, { row }) => {
                        return h('span', row.inheritSkill.title || '')
                    }
                },
                {
                    title: '缘分',
                    key: 'fate',
                    width: 180,
                    render: (h, { row }) => {
                        return h('span', row.fate.map(item => item.title).join('，'))
                    }
                }
            ],
            list: []
        }
    },
    // computed: {

    // },
    methods: {
        async getList () {
            const ret = await apiGet('/library/generals')
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
        }
    }
}
</script>
