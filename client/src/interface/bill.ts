export interface Area {
  province: string
  city: string
}

export interface Image {
  url: string
}

export const BillTypes = ["新植入", "更换"] as const
export const BillNumbers = [
  "LD300S",
  "LD300SR",
  "LD300D",
  "LD200D",
  "LD100DR"
] as const

export const BillStatuses = [
  "审核中",
  "已通过",
  "已完成",
  "未通过"
] as const

export type BillType = typeof BillTypes[number]
export type BillNumber = typeof BillNumbers[number]
export type BillStatus = typeof BillStatuses[number]

export interface Bill {
  hospital_area: string[]
  hospital_name: string

  user_name: string
  user_phone: string
  user_card: string

  bill_date: string
  bill_type: BillType | undefined,
  bill_number: BillNumber | undefined

  bill_status: BillStatus | undefined

  images: Image[]
  note: string

  submit_time: Date
}

export const BillDict: Record<keyof Bill, string> = {
  hospital_area: "医院位置",
  hospital_name: "医院名称",

  user_name: "患者姓名",
  user_phone: "手机号码",
  user_card: "银行卡号",

  bill_date: "植入日期",
  bill_type: "植入类型",
  bill_number: "植入型号",
  bill_status: "进度",

  images: "上传图片",
  note: "备注",
  submit_time: "上传时间"
}
