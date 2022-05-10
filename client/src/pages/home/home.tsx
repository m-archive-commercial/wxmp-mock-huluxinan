import {AtAvatar, AtButton} from "taro-ui";
import {useState} from "react";
import * as Taro from "@tarojs/taro";
import AccountItem from "../../components/AccountItem";

import "./home.scss"
import { useDidShow } from "@tarojs/taro";

/**
 * ref: 记Taro开发小程序与发布过程 - 爱码帮™分享编程知识和开发经验, https://www.icodebang.com/article/307873
 * @constructor
 */

export const Home = () => {

  const [count, setCount] = useState(0)

  const [userInfo, setUserInfo] = useState<Taro.UserInfo>({
    nickName: "",
    avatarUrl: "",
    city: "",
    country: "",
    gender: 0,
    language: "zh_CN",
    province: ""
  })

  useDidShow(async () => {
    const response = await Taro.cloud.callFunction({name: "get-bills", data: {getCount: true}})
    console.log({response})
    setCount(response.result as unknown as number)
  })

  return (
    <view>

      {/* user */}
      <view className={"user-bg"}>
        <view className={"user-info"}>

          {
            userInfo.avatarUrl ?
              <><AtAvatar className={"user-avatar"} image={userInfo.avatarUrl} circle size={'large'}/>
                <view className={"user-name"}>
                  {userInfo.nickName}
                </view>
              </>
              :
              <AtButton className={"user-name"} openType={"getUserInfo"} onClick={() => {
                Taro.getUserProfile({
                  desc: '获取用户个人信息',
                  success: function (res) {
                    console.log({success2: res.userInfo})
                    setUserInfo(res.userInfo)
                  },
                  fail: res => {
                    console.error(res)
                  }
                })
              }}
              >授权信息</AtButton>
          }

        </view>
      </view>

    {/*  account */}
    <view style={{display: "flex", justifyContent: "center", width: "100%", borderBottom: "1px solid #ccc"}}>
      <AccountItem name={"总台数"} value={count} iconValue={"bullet-list"}/>
      <AccountItem name={"总收入"} value={0} iconValue={"sketch"}/>
    </view>



    </view>
  )
}

export default Home
