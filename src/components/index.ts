import SvgIcon from './SvgIcon/index.vue'
// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents: any = {
  SvgIcon,
}
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    //将element-plus提供全部图标注册为全局组件 
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
