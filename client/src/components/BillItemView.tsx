import {Bill} from "../interface/bill";
import {AtButton, AtIcon} from "taro-ui";
import {Text} from "@tarojs/components";

import "./BillItemView.scss"

export interface BillItemViewProps {
  bill: Bill
}

export const BillItemView = ({bill}: BillItemViewProps) => {
  return (
    <view className={"bill-item-view"}>
      <view className={"bill-item-view-left"}>
        <view className={"bill-item-view-left-date"}>
          <AtIcon value={"clock"} className={"bill-item-view-left-date-icon"}/>
          <Text className={"bill-item-view-left-date-text"}>{bill.bill_date}</Text>
        </view>
        <view className={"bill-item-view-left-user"}>患者：{bill.user_name}</view>
        <view className={"bill-item-view-left-bill-type"}>植入：{bill.bill_type}</view>
      </view>

      <view className={"bill-item-view-right"}>
        <AtButton type={"primary"} size={'small'}>{bill.bill_status}</AtButton>
      </view>
    </view>
  )
}

export default BillItemView

