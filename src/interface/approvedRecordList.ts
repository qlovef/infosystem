// 已审批请假申请记录
export interface ApprovedRecord {
    Id: number | null;
    Name: string;
    JobNumber: null;
    Type: number | null;
    StartTime: string;
    EndTime: string;
    IsPermit?: number;
}
