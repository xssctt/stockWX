// pages/addpage/addorupdate.js

import {request} from "../../request/index";
import {config} from "../../request/config";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:"",
        productId:"",
        productName:"",
        productCode:"",
        productType:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      const data = wx.getStorageSync('updateId');
      wx.removeStorageSync('updateId')
    console.log("data"+data);
    if(data === null){

    }else{
 //请求后台数据
 request({
  url:'/products/getProductsByProductId?productId='+data,
  method:'GET',
}).then(res=>{
    //有值
 if(res.status == "success"){
  let productId=res.data.productId;
  let productName=res.data.productName;
 let productCode=res.data.productCode;
  let productType=res.data.productType;
         //返回值
  this.setData({
     productId,
     productName,
     productCode,
     productType
   })

   }else{
  wx.showToast({
    title: res.msg,
    icon:'none'
    })
   }
})
    }
   
    },




    bindInput: function(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
          [field]: e.detail.value
      });
  },


    insertOrder: function(e) {
// 关闭当前页面，跳转到目标页面，不能返回到当前页面


console.log(this.data.productId);
console.log(this.data.productName);
console.log(this.data.productCode);
console.log(this.data.productType);


var dataQuery={
  productId: this.data.productId,
  productName: this.data.productName,
  productCode: this.data.productCode,
  productType: this.data.productType
}

//请求后台数据
request({
url:'/products/add',
method:'GET',
data: dataQuery
}).then(res=>{
  //有值
if(res.status === "success"){
  wx.showToast({
    title: "新增成功",
    icon:'none'
    })
 }else{
wx.showToast({
  title: res.msg,
  icon:'none'
  })
 }
})




    wx.redirectTo({
    url: '/pages/product/product'
  });
    },
    updateOrder: function(e) {
        

console.log(this.data.productId);
console.log(this.data.productName);
console.log(this.data.productCode);
console.log(this.data.productType);


var dataQuery={
  productId: this.data.productId,
  productName: this.data.productName,
  productCode: this.data.productCode,
  productType: this.data.productType
}

//请求后台数据
request({
url:'/products/updateProductsByProductId',
method:'GET',
data: dataQuery
}).then(res=>{
  //有值
if(res.status === "success"){
  wx.showToast({
    title: "更新新成功",
    icon:'none'
    })
 }else{
wx.showToast({
  title: res.msg,
  icon:'none'
  })
 }
})





      
        wx.redirectTo({
            url: '/pages/product/product'
          });
    },




    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})