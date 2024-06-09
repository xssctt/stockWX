
import {request} from "../../request/index";
import {config} from "../../request/config";

Page({
    data: {
      form: {
        product_id: '',
        shipper_id: '',
        shipment_date: '',
        quantity: '',
        price: '',
        amount_paid: '',
        amount_due: '',
        remarks: ''
      }
    },
  
    onInput(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`form.${field}`]: e.detail.value
      });
    },
  
    submitForm() {
      const { form } = this.data;
      
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
        method:'POST',
        data: form
      }).then(res=>{
          //有值
       if(res.status === "success"){
         let productList=res.data;
         wx.showToast({
            title: '添加成功',
            icon: 'success'
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
  