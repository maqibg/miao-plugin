/**
 * 自定义层指令汇总
 *
 * 与 miao 的 apps/index.js 同构：每个 app 通过 v3App() 生成插件类，
 * 由 miao/index.js 合并进导出对象，Yunzai 的插件加载器就能识别。
 */
import consoleApp from './console.js'
import permissionApp from './permission.js'
import editApp from './edit.js'
import weightApp from './weight.js'
import interactiveApp from './interactive.js'

const customApps = {
  calcConsole: consoleApp.v3App(),
  calcPerm: permissionApp.v3App(),
  calcEdit: editApp.v3App(),
  calcWeight: weightApp.v3App(),
  calcInteractive: interactiveApp.v3App()
}

export { customApps }
export default customApps
