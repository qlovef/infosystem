<template>
    <section id="wait-approval-list">
        <div class="row">
            <el-table
                border
                :data="approvedRecordList"
                style="width: 100%">
                <el-table-column
                    prop="Name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="JobNumber"
                    label="工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Type"
                    label="类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="StartTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="EndTime"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="IsPermit"
                    label="是否审批"
                    width="180">
                    <template slot-scope="scope">
                        {{scope.row.IsPermit}}
                    </template>
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
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Pagination } from '@/interface/public'
import { ApprovedRecord } from '@/interface/approvedRecordList'
import {
    RequestGetNotApprovedRecordList
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
}
</script>

<style lang="scss" scoped>
</style>
