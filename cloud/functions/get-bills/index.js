// 云函数入口文件
const { LOADIPHLPAPI } = require('dns')
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const getCount = event.getCount

    if(openid){
        // 获得全部 TODO: 分批
        let result;
        if(!getCount){
            result = await db.collection("hlxa_bills")
            .where({openid})
            .get()
            console.log({result});
            return result.data
        }
        // 统计数量
        else {
            result =  await db.collection("hlxa_bills").where({openid}).count()
            console.log({result});
            return result.total
        }

    } else {
        console.warn("no openid");
        if (!getCount) return []
        return 0
    }
    
}