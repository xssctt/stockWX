
import {request} from "../../request/index";
import {config} from "../../request/config";

Page({
    data: {
        shipmentId:"",
        productId: "",
        shipperId: "",
        shipmentDate: "",
        quantity: "",
        price: "",
        totalAmount:"",
        amountPaid: "",
        amountDue: "",
        remarks: "",
        currentDateTime:""
    },

  
      
       /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const data = wx.getStorageSync('shipmentaddpage');
        wx.removeStorageSync('shipmentaddpage')
      console.log("data"+data);
      if(data === null){
        console.log("data null")
      }else{
   //请求后台数据
   request({
    url:'/shipments/getShipmentsByShipmentId?shipmentId='+data,
    method:'GET',
  }).then(res=>{
      //有值
   if(res.status == "success"){
       console.log(res.data)
    let shipmentId=res.data.shipmentId;
    let productId=res.data.productId;
    let  shipperId=res.data.shipperId;
    let  shipmentDate=res.data.shipmentDate;
    let quantity=res.data.quantity;
    let price=res.data.price;
   let amountPaid=res.data.amountPaid;
    let amountDue=res.data.amountDue;
    let remarks=res.data.remarks;
           //返回值
    this.setData({
        shipmentId,
        productId,
        shipperId,
        shipmentDate,
        quantity,
        price,
        amountPaid,
        amountDue,
        remarks
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


  

    getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },
    
  
    

    insertOrder() {
      var  form  = {
       
        productId: "",
        shipperId: "",
        shipmentDate: "",
        quantity: "",
        price: "", 
        totalAmount:"",
        amountPaid: "",
        amountDue: "",
        remarks: ""
      };
      
     
      form.productId=this.data.productId;
      form.shipperId=this.data.shipperId;
      form.shipmentDate= this.getCurrentDateTime();
      form.quantity=this.data.quantity;
      form.price=this.data.price;
      form.totalAmount=this.data.totalAmount;
      form.amountPaid=this.data.amountPaid;
      form.amountDue=this.data.amountDue;
      form.remarks=this.data.remarks;
      console.log(form);

      // 检查表单数据是否为空
      for (let key in form) {
        if (!form[key]) {
          wx.showToast({
            title: '请完整填写所有字段',
            icon: 'none'
          });
          return;
        }
      }
      
      request({
        url:'/shipments/add',
        method:'GET',
        data: form
      }).then(res=>{
          //有值
       if(res.status === "success"){
         wx.showToast({
            title: '添加成功',
            icon: 'success'
         });
         wx.redirectTo({
            url: '/pages/shipments/shipments'
          });
   
         }else{
            wx.showToast({
                title: '添加失败',
                icon: 'none'
            });
         }
      })


    
    }


  });
  