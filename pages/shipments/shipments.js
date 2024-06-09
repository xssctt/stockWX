// pages/goodsInfo/index.js

import {request} from "../../request/index";
import {config} from "../../request/config";
Page({


  data: {
    goodsId:0,    
    productList:[],        
    swiperList:[] ,
    commentList:[]
  },

 
  onLoad:function(){
    this.getDetail(); 
  },
 

  getDetail(){
   
    var dataQuery={
        pageNo: 1,
    }
    
    //请求后台数据
    request({
      url:'/shipments/loadDateList',
      method:'GET',
      data: dataQuery
    }).then(res=>{
        //有值
     if(res.status === "success"){
       let productList=res.data;
   
       //返回值
       this.setData({
        productList
       })
 
       }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
        })
       }
    })


  },



  search:function(e){
    var e= e.detail.value;
    var dataQuery={
        pageNo: 1,
        productName: e
    }
    
    //请求后台数据
    request({
      url:'/shipments/loadDateList',
      method:'GET',
      data: dataQuery
    }).then(res=>{
        //有值
     if(res.status == "success"){
       let productList=res.data;
   
       //返回值
       this.setData({
        productList
       })
 
       }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
        })
       }
    })


  },

  deleteOrder: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.showModal({
        content: '你是否要删除此商品',
        success: (res) => {
            if (res.confirm) {
                request({
                    url: "/shipments/deleteShipmentsByShipmentId?shipmentId="+id,
                    method: "DELETE",
                }).then(res => {
                    console.log("Delete request response:", res);  // 确认响应是否正确
                    this.getDetail();
                    if (res.status === "success") {
                        wx.showToast({
                            title: '操作成功',
                        });
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: "none"
                        });
                    }
                });
            }
        }
    });
},
    insertOrder: function(e) {
        let id = null;
        console.log("dataset"+id)
          wx.setStorageSync('shipmentaddpage', id);
        wx.navigateTo({
            url: '/pages/shipmentaddpage/shipmentaddpage'
          });
          
    },

    
    updateOrder: function(e) {
      let id = e.currentTarget.dataset.id;
      console.log("dataset"+id)
        wx.setStorageSync('shipmentaddpage', id);
        wx.navigateTo({
            url: '/pages/shipmentaddpage/shipmentaddpage'
        });
          
    }



})
