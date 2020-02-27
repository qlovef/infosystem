// 已审批请假申请记录
export interface ApprovedRecord {
    Id: number;
    Name: string;
    JobNumber: number;
    Type: number;
    StartTime: string;
    EndTime: string;
    IsPermit: number;
}
