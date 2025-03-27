import vue from '@vitejs/plugin-vue'
// 别名配置
import path from 'path'
// 启用mock
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
// Element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    // server: {
    //   host: '0.0.0.0',
    //   port: 3200,
    //   open: true,
    // },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
        // "@": path.resolve(__dirname, "./src")
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
  }
}
