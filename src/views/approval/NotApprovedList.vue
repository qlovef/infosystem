<template>
    <section id="wait-approval-list">
        <div class="module">
            <!--菜单按键-->
            <div class="row">
                <div class="btns">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addLeave = true">
                        新增
                    </el-button>
                    <el-button
                        type="primary"
                        size="small">
                        修改
                    </el-button>
                    <el-button
                        type="primary"
                        size="small">
                        删除
                    </el-button>
                </div>
            </div>
            <div class="row">
                <el-table
                    border
                    :data="approvedRecordList"
                    style="width: 100%">
                    <el-table-column
                        prop="Name"
                        label="姓名"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="JobNumber"
                        label="工号"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="Type"
                        label="类型"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                            {{vacationType[scope.row.Type]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="请假原因"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="StartTime"
                        label="开始时间"
                        width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="EndTime"
                        label="结束时间"
                        width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="IsPermit"
                        label="是否审批"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                        <span
                                :class="{
                                    'success': scope.row.IsPermit === 1,
                                    'error': scope.row.IsPermit === 2
                                }">
                                {{ scope.row.IsPermit === 1 ? '已批准' :'未审批' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label=""
                        width="180"
                        align="center">
                        <div>意见</div>
                    </el-table-column>
                </el-table>
            </div>
            <div class="row right">
                <el-pagination
                    layout="prev, pager, next"
                    :page-size="pagination.PageSize"
                    :page-count="pagination.PageCount"
                    :total="pagination.TotalCount"
                    @current-change="onPageChange">
                </el-pagination>
            </div>
        </div>

        <el-dialog
            width="40%"
            title="新增"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="addLeave">
            <el-form
                label-width="100px"
                :model="notApproved">
                <el-form-item label="姓名">
                    <el-input v-model.trim="notApproved.Name" size="mini" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model.trim.number="notApproved.JobNumber" size="mini" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请假类型">
                    <el-select v-model.trim="notApproved.Type" size="small" placeholder="类型">
                        <el-option
                            size="small"
                            v-for="(item, index) of vacationType"
                            :key="index"
                            :label="item"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请假时间">
                        <el-date-picker
                            class="date-select"
                            size="small"
                            v-model="dateValue"
                            type="datetimerange"
                            align="center"
                            value-format="yyyy-MM-dd HH-mm-ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="请假原因">
                    <el-input type="textarea" autocomplete="off"></el-input>
                </el-form-item>
             </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        size="small"
                        type="primary"
                        @click="notApprovedSubmit">
                        确 定
                    </el-button>
                    <el-button
                        size="small"
                        @click="addLeave = false">
                        取 消
                    </el-button>
                </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Pagination } from '@/interface/public'
import { ApprovedRecord } from '@/interface/approvedRecordList'
import {
    RequestGetNotApprovedRecordList,
    RequestPostAddNotApproved
} from '@/request/approvedRecordList'

@Component({})
export default class NotApprovedList extends Vue {
    approvedRecordList: ApprovedRecord[] = []

    pagination: Pagination = {
        Page: 1,
        PageSize: 20,
        PageCount: 0,
        TotalCount: 0
    }

    // 新增列表时间
    dateValue = ''
    // 搜索信息
    searchInfo = ''

    notApproved: ApprovedRecord = {
        Id: null,
        Name: '',
        JobNumber: null,
        Type: null,
        StartTime: '',
        EndTime: '',
        IsPermit: 0
    }
    // 请假类型
    vacationType = [
        '事假',
        '病假',
        '婚假',
        '孕假',
        '年假',
        '调休假'
    ]

    // 是否显示对话窗口
    addLeave = false

    created () {
        this.fetchNotApprovedRecordList()
    }
    // 改变页码的时候触发
    onPageChange (page: number) {
        this.pagination.Page = page
        this.fetchNotApprovedRecordList()
    }

    // 新增确定时触发
    notApprovedSubmit () {
        this.notApproved.StartTime = this.dateValue[0]
        this.notApproved.EndTime = this.dateValue[1]
        this.addLeave = false
        this.subNotApprovedform()
    }

    async fetchNotApprovedRecordList () {
        const result: any = await RequestGetNotApprovedRecordList({
            Page: this.pagination.Page,
            PageSize: this.pagination.PageSize,
            Name: this.searchInfo
        })
        if (result.Code === 1) {
            this.approvedRecordList = result.Data.List
        }
    }

    async subNotApprovedform () {
        const { notApproved } = this
        const result: any = await RequestPostAddNotApproved(notApproved)
        if (result.Code === 1) {
            this.fetchNotApprovedRecordList()
        }
    }
}
</script>

<style lang="scss" scoped>
.date-select {
    width: 350px;
}
</style>
