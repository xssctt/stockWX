// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'



Component({
  //重置样式
  options: {
    styleIsolation: 'shared'
  },
  //
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
    },
  },
 
 
     //监听
     observers: {
      'totalNump': function (val) {
        this.setData({
          'list[3].info': val
        })
      }
    },
 
  /**
   * 组件的属性列表
   */
  properties: {

  },
  onShow:function(){
 
  },


  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
                "pagePath": "pages/product/product",
                "text": "product",
                "iconPath": "icons/category.png",
                "selectedIconPath": "icons/category-o.png"
            },
            {
                "pagePath": "pages/shippers/shippers",
                "text": "ship",
                "iconPath": "icons/cart.png",
                "selectedIconPath": "icons/cart-o.png"
            },
            {
                "pagePath": "pages/shipments/shipments",
                "text": "shippers",
                "iconPath": "icons/my.png",
                "selectedIconPath": "icons/_my.png"
            },
            {
                "pagePath": "pages/type/type",
                "text": "shipments",
                "iconPath": "icons/my.png",
                "selectedIconPath": "icons/_my.png"
            }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail })
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
