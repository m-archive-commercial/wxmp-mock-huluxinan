import {Image} from "@tarojs/components";
import {AtIcon} from "taro-ui";

export interface AccountItemProps {
  name: string
  value: number
  iconValue: string
  useSecret?: boolean
  customFontStyle?: object
}

export const AccountItem = (props: AccountItemProps) => {
  return (
    <view style={{padding: "10px", width: "40%", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center"}}>
      <view style={{fontSize: "30px", ...props.customFontStyle}}>{props.value}</view>
      <view style={{display: "inline-flex", justifyContent: "center", alignItems: "center", color: "gray"}}>
        <AtIcon value={props.iconValue} size='20' color='gray'/>
        {props.name}
      </view>
    </view>
  )
}

export default AccountItem
