/// <reference types="vite/client" />
// ts只支持导出导入模块，但是vue不是模块，需要申明一下vue是个模块
// declare module '*.vue' {
//    import type { DefineComponent } from 'vue'
//    const component: DefineComponent<{}, {}, any>
//    export default component
// }
declare module '*.vue' {
   import type { DefineComponent } from 'vue'
   const component: ComponentOptions | ComponentOptions['setup']
   export default component
}
declare module '*.ts' {
   import type { DefineComponent } from 'ts'
   const component: ComponentOptions | ComponentOptions['setup']
   export default component
}

