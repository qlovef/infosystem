<template>
    <section id="page-approved-record-list">
        <div class="row">
            <el-table
                ref="approvedRecordTable"
                border
                :data="approvedRecordList">
                <el-table-column
                    prop="Name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="JobNumber"
                    label="工号">
                </el-table-column>
                <el-table-column
                    prop="Type"
                    label="类型">
                    <template slot-scope="scope">
                        {{ vacationType[scope.row.Type] }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="StartTime"
                    label="请假开始时间">
                </el-table-column>
                <el-table-column
                    prop="EndTime"
                    label="请假结束时间">
                </el-table-column>
                <el-table-column
                    prop="IsPermit"
                    label="是否批准">
                    <template slot-scope="scope">
                        <span
                            :class="{
                                'success': scope.row.IsPermit === 1,
                                'error': scope.row.IsPermit === 2
                            }">
                            {{ scope.row.IsPermit === 1 ? '已批准' :
                                (scope.row.IsPermit === 2 ? '已拒绝' : '未审批') }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 页码 -->
        <div class="row right">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pagination.PageSize"
                :page-count="pagination.PageCount"
                :total="pagination.TotalCount"
                @current-change="onPageChange">
            </el-pagination>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Pagination } from '@/interface/public'
import { ApprovedRecord } from '@/interface/approvedRecordList'
import {
    RequestGetApprovedRecordList
} from '@/request/approvedRecordList'

@Component({})
export default class ApprovedRecordList extends Vue {
    // 请假申请已审批记录
    approvedRecordList: ApprovedRecord[] = []
    // 页码
    pagination: Pagination = {
        Page: 1,
        PageSize: 20,
        PageCount: 0,
        TotalCount: 0
    }
    // 搜索信息
    searchInfo = ''
    // 请假类型
    vacationType = [
        '事假',
        '病假',
        '婚假',
        '孕假',
        '年假',
        '调休假'
    ]

    created () {
        this.fetchApprovedRecordList()
    }
    // 页码改变时触发
    onPageChange (page: number) {
        this.pagination.Page = page
        this.fetchApprovedRecordList()
    }

    // 获取已审批请假申请记录列表
    async fetchApprovedRecordList () {
        const result: any = await RequestGetApprovedRecordList({
            Page: this.pagination.Page,
            PageSize: this.pagination.PageSize,
            Name: this.searchInfo
        })
        if (result.Code === 1) {
            this.approvedRecordList = result.Data.List
        }
    }
}
</script>

<style>

</style>
