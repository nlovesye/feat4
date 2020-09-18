<template>
    <div class="c_general_config clear">
        <Card class="baseinfo" :padding="0">
            <p class="card_title">
                基础信息
            </p>
            <Form
                ref="generalForm"
                class="general_form"
                :model="baseinfo"
                :rules="generalRules"
                :label-width="60"
            >
                <FormItem label="姓名" prop="name">
                    <Input v-model="baseinfo.name" placeholder="输入姓名" :disabled="type !== 1"></Input>
                </FormItem>
                <FormItem label="阵营" prop="camp">
                    <RadioGroup v-model="baseinfo.camp">
                        <Radio label="魏国">魏国</Radio>
                        <Radio label="蜀国">蜀国</Radio>
                        <Radio label="吴国">吴国</Radio>
                        <Radio label="群雄">群雄</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="统御" prop="control">
                    <InputNumber :max="7" :min="1" v-model="baseinfo.control"></InputNumber>
                </FormItem>
                <FormItem label="星级" prop="start">
                    <Rate v-model="baseinfo.star" show-text>
                        <span>{{ baseinfo.star | toGradeColor }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="标签" prop="tags">
                    <CheckboxGroup v-model="baseinfo.tags">
                        <Checkbox
                            v-for="tag in allTags"
                            :key="tag"
                            :label="tag"
                        ></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="生平" prop="desc">
                    <Input v-model="baseinfo.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="生平简介..."></Input>
                </FormItem>
                <FormItem label="[演]" prop="descRomance">
                    <Input v-model="baseinfo.descRomance" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="演义..."></Input>
                </FormItem>
                <FormItem label="[史]" prop="descHistory">
                    <Input v-model="baseinfo.descHistory" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="史实..."></Input>
                </FormItem>
            </Form>
        </Card>
        <Card class="attr" :padding="0">
            <p class="card_title">
                成长属性
            </p>
            <Form
                ref="attrForm"
                class="attr_form"
                :model="attr"
                :rules="attrRules"
                :label-width="80"
                inline
            >
                <FormItem label="武力(成长)" prop="wl">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.wl"
                    ></InputNumber>
                </FormItem>
                <FormItem  :label-width="0" prop="wl">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.wlG"
                    ></InputNumber>
                </FormItem>
                <FormItem label="智力(成长)" prop="zl">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.zl"
                    ></InputNumber>
                </FormItem>
                <FormItem :label-width="0" prop="zlG">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.zlG"
                    ></InputNumber>
                </FormItem>
                <FormItem label="统率(成长)" prop="ts">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.ts"
                    ></InputNumber>
                </FormItem>
                <FormItem  :label-width="0" prop="tsG">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.tsG"
                    ></InputNumber>
                </FormItem>
                <FormItem label="速度(成长)" prop="sd">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.sd"
                    ></InputNumber>
                </FormItem>
                <FormItem :label-width="0" prop="sdG">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.sdG"
                    ></InputNumber>
                </FormItem>
                <FormItem label="政治(成长)" prop="zz">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.zz"
                    ></InputNumber>
                </FormItem>
                <FormItem  :label-width="0" prop="zzG">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.zzG"
                    ></InputNumber>
                </FormItem>
                <FormItem label="魅力(成长)" prop="ml">
                    <InputNumber
                        :max="200"
                        :min="1"
                        v-model="attr.ml"
                    ></InputNumber>
                </FormItem>
                <FormItem :label-width="0" prop="mlG">
                    <InputNumber
                        :max="10"
                        :min="0"
                        v-model="attr.mlG"
                    ></InputNumber>
                </FormItem>
            </Form>
        </Card>
        <Card class="arms" :padding="0">
            <p class="card_title">
                兵种适性
            </p>
            <Form
                ref="armsForm"
                class="arms_form"
                :model="arms"
                :rules="armsRules"
                :label-width="50"
                inline
            >
                <FormItem label="骑兵" prop="ride">
                    <Rate v-model="arms.ride" show-text :count="4">
                        <span style="color: #ffce3d">{{ arms.ride | toGrade }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="盾兵" prop="dong">
                    <Rate v-model="arms.dong" show-text :count="4">
                        <span style="color: #ffce3d">{{ arms.dong | toGrade }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="弓兵" prop="bow">
                    <Rate v-model="arms.bow" show-text :count="4">
                        <span style="color: #ffce3d">{{ arms.bow | toGrade }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="枪兵" prop="gun">
                    <Rate v-model="arms.gun" show-text :count="4">
                        <span style="color: #ffce3d">{{ arms.gun | toGrade }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="器械" prop="organ">
                    <Rate v-model="arms.organ" show-text :count="4">
                        <span style="color: #ffce3d">{{ arms.organ | toGrade }}</span>
                    </Rate>
                </FormItem>
            </Form>
        </Card>
        <Card class="skills" :padding="0" key="skills">
            <p class="card_title">
                战法
            </p>
            <Form
                v-for="(skill, index) in skills"
                :key="index + 'skill'"
                ref="skillForm"
                class="skill_form"
                :model="skill"
                :rules="skillRules"
                :label-width="80"
            >
                <FormItem label="战法名称" prop="title">
                    <Input v-model="skill.title"></Input>
                </FormItem>
                <FormItem label="战法类型" prop="name">
                    <Select v-model="skill.type">
                        <Option
                            v-for="type in allSkillTypes"
                            :key="type"
                            :value="type"
                            :label="type"
                        />
                    </Select>
                </FormItem>
                <FormItem label="发动概率" prop="odds">
                    <InputNumber :max="100" :min="0" v-model="skill.odds"></InputNumber>
                    <span style="margin-left: 5px;">%</span>
                </FormItem>
                <FormItem label="战法品质" prop="grade">
                    <Rate v-model="skill.grade" show-text :count="4">
                        <span style="color: #ffce3d">{{ skill.grade | toGrade }}</span>
                    </Rate>
                </FormItem>
                <FormItem label="目标" prop="target">
                    <Input v-model="skill.target"></Input>
                </FormItem>
                <FormItem label="效果" prop="effect">
                    <Input v-model="skill.effect"></Input>
                </FormItem>
                <FormItem label="战法描述" prop="desc">
                    <Input v-model="skill.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="战法描述..."></Input>
                </FormItem>
            </Form>
        </Card>
        <Card class="fates" :padding="0" dis-hover key="fates">
            <div class="card_title">
                <span>缘分</span>
                <Button type="default" @click="addFate" v-show="fates.length < 4">添加缘分</Button>
            </div>
            <Form
                v-for="(fate, index) in fates"
                :key="index + 'fate'"
                ref="fateForm"
                class="fate_form"
                :model="fate"
                :rules="fateRules"
                :label-width="50"
            >
                <FormItem :label="`缘分${index + 1}`" prop="title">
                    <Input v-model="fate.title"></Input>
                </FormItem>
                <FormItem label="武将" prop="generals">
                    <Select v-model="fate.generals">
                        <Option
                            v-for="type in allSkillTypes"
                            :key="type"
                            :value="type"
                            :label="type"
                        />
                    </Select>
                </FormItem>
                <FormItem label="效果" prop="effect">
                    <Input v-model="fate.effect"></Input>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="fate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="缘分描述..."></Input>
                </FormItem>
                <Button type="error" @click="deleteFate(index)">
                    删除
                </Button>
            </Form>
        </Card>
    </div>
</template>

<script>
import { dataDic } from '@/utils'

const fateItem = function () {
    return {
        title: '',
        generals: '',
        effect: '',
        desc: ''
    }
}

const baseinfo = function (state = {}) {
    return {
        name: '',
        camp: '魏国',
        control: 3,
        star: 3,
        tags: [],
        desc: '',
        descRomance: '',
        descHistory: '',
        ...state
    }
}

const attr = function () {
    return {
        wl: 1,
        wlG: 0.01,
        zl: 1,
        zlG: 0.01,
        ts: 1,
        tsG: 0.01,
        sd: 1,
        sdG: 0.01,
        zz: 1,
        zzG: 0.01,
        ml: 1,
        mlG: 0.01
    }
}

const arms = function () {
    return {
        ride: 1,
        dong: 1,
        bow: 1,
        gun: 1,
        organ: 1
    }
}

const initGeneral = function () {
    return {
        baseinfo: baseinfo(),
        attr: attr(),
        arms: arms(),
        skills: [
            {
                title: '',
                type: dataDic.allSkillTypes[0],
                desc: '',
                odds: 0,
                grade: 1,
                target: '',
                effect: ''
            }
        ],
        fates: []
    }
}
// console.log('initGeneral', initGeneral)

export default {
    mounted () {
        // console.log('mounted')
        this.$emit('getFn', {
            validate: this.validate,
            getData: this.getData,
            setData: this.setData,
            clearData: this.clearData
        })
    },
    beforeDestroy () {
        // console.log('beforeDestroy')
    },
    props: {
        type: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            allTags: dataDic.allTags,
            allSkillTypes: dataDic.allSkillTypes,
            ...initGeneral(),
            generalRules: {
                name: [
                    {
                        type: 'string',
                        trigger: 'change',
                        required: true,
                        message: '不能为空'
                    }
                ],
                tags: {
                    type: 'array',
                    trigger: 'change',
                    required: true,
                    message: '最少选择一个'
                }
            },
            attrRules: {},
            armsRules: {},
            skillRules: {
                title: {
                    type: 'string',
                    trigger: 'change',
                    // required: true,
                    message: '不能为空'
                }
            },
            fateRules: {
                title: {
                    type: 'string',
                    trigger: 'change',
                    required: true,
                    message: '不能为空'
                }
            }
        }
    },
    filters: {
        toGrade (val) {
            const strs = ['C', 'B', 'A', 'S']
            const i = parseInt(val, 10) - 1
            return strs[i]
        },
        toGradeColor (val) {
            const strs = ['白', '绿', '蓝', '紫', '橙']
            const i = parseInt(val, 10) - 1
            return strs[i]
        }
    },
    methods: {
        // 添加缘分
        addFate () {
            this.fates.push(fateItem())
        },
        // 删除缘分
        deleteFate (index) {
            this.fates.splice(index, 1)
        },
        async validate () {
            // console.log('refs', this.$refs)
            const tasks = [
                this.$refs.generalForm.validate(),
                this.$refs.attrForm.validate(),
                this.$refs.armsForm.validate(),
                ...(this.$refs.skillForm || []).map(c => c.validate()),
                ...(this.$refs.fateForm || []).map(c => c.validate())
            ]
            const valid = await Promise.all(tasks)
            return valid.every(flag => flag)
        },
        clearData () {
            this.$refs.generalForm.resetFields()
            this.$refs.attrForm.resetFields()
            this.$refs.armsForm.resetFields()
            ;(this.$refs.skillForm || []).map(c => c.resetFields())
            ;(this.$refs.fateForm || []).map(c => c.resetFields())
            const d = initGeneral()
            for (const key in d) {
                this[key] = d[key]
            }
        },
        getData () {
            const result = {
                ...this.baseinfo,
                attr: this.attr,
                arms: this.arms,
                skills: this.skills,
                fates: this.fates
            }
            return result
        },
        setData (d) {
            this.baseinfo = baseinfo({
                name: d.name,
                camp: d.camp,
                control: d.control,
                star: d.star,
                tags: d.tags,
                desc: d.desc,
                descRomance: d.descRomance,
                descHistory: d.descHistory
            })
            this.attr = d.attr || attr()
            this.arms = d.arms || arms()
            this.skills = d.skills || []
            this.fates = d.fates || []
        }
    }
}
</script>

<style lang="less">
.c_general_config {
    @titleHeight: 32px;
    .card_title {
        width: 100%;
        height: @titleHeight;
        line-height: @titleHeight;
        padding: 0 10px;
        border-bottom: 1px solid #e8e8e8;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .baseinfo, .attr, .arms, .skills, .fates {
        float: left;
        margin-right: 10px;
        max-height: 800px;
        overflow-y: auto;
        position: relative;
    }
    .baseinfo{
        width: 300px;
    }
    .attr {
        width: 300px;
    }
    .arms {
        width: 260px;
    }
    .skills {
        width: 300px;
    }
    .fates {
        width: 280px;
        text-align: center;
    }

    .general_form {
        padding: 8px 10px 8px 4px;
    }
    .attr_form, .arms_form, .skill_form, .fate_form {
        padding: 8px 10px;
    }
}
</style>
