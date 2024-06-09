// 在这个 JS 文件中，专门来创建 Store 的实例对象
import { observable, action } from 'mobx-miniprogram'

export const store = observable({

 
  activeTabBarIndex: 0,

  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })

  
})

