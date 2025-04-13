import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 别名配置
import path from 'path'
// 启用mock
import { UserConfigExport, ConfigEnv } from 'vite'
// 按需导入 Element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 导入 svg-icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd())
  return {
    server: {
      // host: '0.0.0.0',
      // port: 3200,
      // open: true,
      hmr: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE, // 后端服务器地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/api/, ''), // 将路径中的 /api 替换为空
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // viteMockServe({
      //   mockPath: 'mock',
      //   localEnabled: command === 'serve',
      // }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        // '@': path.resolve('./src'),
        '@': path.resolve(__dirname, './src'), // 相对路径别名配置，使用 @ 代替 src
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
