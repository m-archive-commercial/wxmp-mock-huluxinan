import {Text, View} from "@tarojs/components";
import "./CompInput.scss"

export interface CompInputProps {
  title: string
  placeholder?: string
  required?: boolean
  clickable?: boolean
  value: any
  border?: boolean
}

export const isNotEmpty = (v: any) => {
  if(Array.isArray(v)) {
    return v.length > 0
  }
  return v
}

export const CompInput = (props: CompInputProps) => {
  return (
    <View className={"comp-input"}>
      <View className={"comp-input-left"}>
        {
          props.required &&
          <Text className={"comp-input-left-star"}>*</Text>
        }
        <Text className={"comp-input-left-title"}>
        {
          props.title
        }
        </Text>
      </View>

      <View className={"comp-input-right"}>
        {isNotEmpty(props.value)
          ? <View className={"comp-input-right-value"}>{props.value}</View>
          : <View className={"comp-input-right-placeholder"}>{props.placeholder || "必填项"}</View>
        }
      </View>

      {
        props.border && <View style={{borderBottom: "1px solid gray"}}/>
      }

    </View>
  )
}

export default CompInput

