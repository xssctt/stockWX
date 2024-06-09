//请求路径
//同时的异步请求
let ajaxTimes=0;
export const request= (params) => {
//增加一个请求
ajaxTimes++;
//出现loading等待
wx.showLoading({
  title: '加载中',
  mask:true
})
//后台数据访问path
 const baseUrl="http://localhost:8091/api";
//(resolve 成功  reject 失败)
 return new Promise( (resolve,reject) =>{
   
   wx.request({
     ...params,
     method:params.method,
     data:params.data,
    url: baseUrl+params.url,
    
    success:(result)=>{
       resolve(result.data);
     },

     fail:(err)=>{
       reject(err);
     },

     complete:()=>{
       ajaxTimes--;
       if(ajaxTimes === 0){
         wx.hideLoading({
         })
       }
     }

   })
 })

}