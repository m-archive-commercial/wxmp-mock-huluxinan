import {Component} from 'react'
import {Form, Picker, Text, View} from '@tarojs/components'
import {AtButton, AtCard, AtImagePicker, AtInput} from 'taro-ui'

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import {CompDivider} from "../../components/CompDivider";
import {Bill, BillDict, BillNumbers, BillTypes} from "../../interface/bill";
import "./post.scss"
import CompInput from "../../components/CompInput";

definePageConfig({
  navigationBarTitleText: '植入单'
})

export const MAX_IMAGES = 2

export const bill: Bill = {
  hospital_area: [],
  hospital_name: "",
  user_name: "",
  user_phone: "",
  user_card: "",
  bill_date: "",
  bill_type: undefined,
  bill_number: undefined,
  images: [],
  note: "",
  submit_time: new Date(),
  bill_status: "审核中"
}

// ref: https://stackoverflow.com/a/56338833/9422455
export const RequiredBillKeys: Array<keyof Bill> = [
  "hospital_name",
  "hospital_area",
  "user_name",
  "user_phone",
  // "user_card",
  "bill_date",
  "bill_type",
  "bill_number",
  "note",
  "images"
]

export default class Post extends Component<void, Bill> {

  componentWillMount() {
    this.initBill()
  }

  updateValue(key: keyof Bill, val) {
    this.setState({...this.state, [key]: val})
    return val
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onAreaChange = e => {
    console.log(e)
    this.setState({
      hospital_area: e.detail.value
    })
  }

  initBill = () => {
    this.setState(bill)
  }

  onSubmit = () => {
    console.log("submitting...")
    console.log(this.state)
    for (let key of RequiredBillKeys) {
      console.log({key, val: this.state[key]})
      if (Array.isArray(this.state[key]) && (this.state[key] as Array<any>).length === 0 || !this.state[key]) {
        return this.onSubmitFail(BillDict[key])
      }
    }

    Taro.cloud.callFunction({name: "post-bills", data: this.state})
      .catch(async e => {
        console.error(e)
        await Taro.showToast({title: "提交失败", icon: "error"})
      })
      .then(async () => {
        console.log("submitted.")
        await Taro.showToast({title: "提交成功", icon: "success"})
        await Taro.navigateBack()
      })
  }

  onSubmitFail = (key: string) => {
    Taro.showToast({
      title: "[" + key + "]项不能为空",
      icon: "none"
    })
    console.warn("submit failed")
  }

  onReset = () => {
    console.log("resetting")
    this.initBill()
  }

  stopPropagation = function (e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    return (
      <View className='business'>

        <Form>

          {/* 患者信息 */}
          <AtCard title={"隐私声明"}>
            <View>1. 为后续与您联系，请确认填写自己的姓名</View>
            <View>2. 本小程序确保不会泄露个人隐私，仅供业务专用</View>
            <View>3. 添加联系人微信：<Text style={{color: "red"}}>ZHUANG158088</Text></View>
          </AtCard>
          <AtInput
            name={"user_name"}
            required
            // border={true}
            title={BillDict["user_name"]}
            type='text'
            placeholder='必填项'
            border={false}
            value={this.state.user_name}
            onChange={(v) => this.updateValue("user_name", v)}
          />

          <AtInput
            name={"user_phone"}
            required
            border={false}
            title={BillDict["user_phone"]}
            type='text'
            placeholder='联系用'
            value={this.state.user_phone}
            onChange={(v) => this.updateValue("user_phone", v)}
          />

          {/*<AtInput name={"银行卡号"} required border={false} type={"text"} placeholder={"收款用"}*/}
          {/*         title={"支付宝号"} value={this.state.user_card}*/}
          {/*         onChange={(v) => this.updateValue("user_card", v)}*/}
          {/*/>*/}

          <CompDivider/>

          {/* 医院信息 */}
          <Picker mode={"region"} onChange={this.onAreaChange} value={this.state.hospital_area}>
            <CompInput title={BillDict["hospital_area"]} value={this.state.hospital_area} required/>
          </Picker>

          <AtInput
            name={"hospital_name"}
            required
            border={false}
            title={BillDict["hospital_name"]}
            type='text'
            placeholder='必填项'
            value={this.state.hospital_name}
            onChange={(v) => this.updateValue("hospital_name", v)}
          />

          <CompDivider/>

          {/* 植入单信息 */}
          <Picker
            onChange={(e) => {
              console.log({v: e})
              this.updateValue("bill_date", e.detail.value)
            }}
            value={this.state.bill_date}
            mode={'date'}
          >
            <CompInput title={BillDict["bill_date"]} value={this.state.bill_date} required/>

          </Picker>

          <Picker mode={'selector'} onChange={(v) => {
            console.log(v)
            this.updateValue("bill_type", BillTypes[v.detail.value])
          }} range={BillTypes as unknown as string[]}
          >
            <CompInput title={BillDict["bill_type"]} value={this.state.bill_type} required/>
          </Picker>

          <Picker mode={"selector"} range={BillNumbers as unknown as string[]} onChange={
            (v) => this.updateValue("bill_number", BillNumbers[v.detail.value])
          }
          >
            <CompInput title={BillDict["bill_number"]} value={this.state.bill_number} required/>
          </Picker>

          <CompDivider/>

          <AtInput name={"images"} title={BillDict["images"]} required border={false}
                   onChange={() => {
                   }} placeholder={" (请上传植入回执单)"}
          >

            <view style={{paddingRight: "20px"}}>
              {this.state.images.length}/{MAX_IMAGES}
            </view>
          </AtInput>

          <AtImagePicker files={this.state.images} onChange={(images) => this.setState({images})}
                         count={MAX_IMAGES} showAddBtn={this.state.images.length < MAX_IMAGES}
                         multiple={false}
          />

          <AtInput required name={"note"} title={BillDict["note"]} placeholder={"请填写用于向您支付转账的必要信息"} value={this.state.note}
                   onChange={v => this.updateValue("note", v)}
          />


          <view className={"post-bill-operations"}>
            <AtButton className={"post-bill-operation"} type={"primary"} size={"small"}
                      onClick={this.onSubmit}>提交</AtButton>
            <AtButton className={"post-bill-operation"} type={"secondary"} size={"small"}
                      onClick={this.onReset}
            >重置</AtButton>
          </view>

        </Form>

      </View>
    )
  }
}
