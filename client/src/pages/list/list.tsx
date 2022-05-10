import {AtButton, AtCard, AtTag} from "taro-ui";
import {Navigator} from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import "./list.scss"
import {Bill, BillStatuses} from "../../interface/bill";
import BillItemView from "../../components/BillItemView";
import { useDidShow } from "@tarojs/taro";

export const Tags = ['全部', ...BillStatuses] as const;
export type Tag = typeof Tags[number]

export const ListPage = () => {

  const [curTag, setCurTag] = useState<Tag>("全部");

  const [bills, setBills] = useState<Bill[]>([]);

  const getBills = async () => {
    console.log("getting bills")
    const bills = await Taro.cloud.callFunction({name: "get-bills"})
    console.log({bills})
    setBills(bills.result as Bill[])
  }

  /**
   * 每次重新进入该页就要刷新
   */

  useDidShow(getBills)

  return (
    <view style={{width: "100%"}}>

      <view className={"container-header"}>
        <view className={"container-title"}>我的植入</view>
        <view className={"container-extra"}>
          <Navigator url={"../post/post"} style={{color: "blueviolet"}}>新建植入</Navigator>
        </view>
      </view>

      <view id={"tags"}>
        {
          Tags.map((tag) => (
            <AtTag type={'primary'} size={'normal'} circle active={tag === curTag}
                   onClick={() => {
                     setCurTag(tag)
                   }}
            >{tag}</AtTag>
          ))
        }
      </view>

      {bills.map(bill => ((curTag === "全部" || bill.bill_status === curTag) && <BillItemView bill={bill}/>))}

      {/*<view>*/}
      {/*  <AtButton type={"primary"} size={"small"} onClick={getBills}>刷新</AtButton>*/}
      {/*</view>*/}
    </view>
  )
}

export default ListPage
