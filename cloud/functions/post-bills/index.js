// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID;
    const data = {
        openid,
        ...event
    }

    console.log({event, context, data});
    db.collection("hlxa_bills")
    .add({data})
    .then({
        success: res => {console.log({res});},
        fail: e => {console.error({e});}
    })

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}