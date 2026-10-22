import { Data, Version } from '#miao'
import Index from './tools/index.js'
// fork 专属：自定义计算层（不改上游逻辑，只做包装），见 custom/README.md
import { install as installCustom } from './custom/index.js'

if (!global.segment)
  global.segment = (await import('oicq')).segment

if (!segment.button)
  segment.button = () => ""

// fork 专属：自定义层指令与上游指令合并导出（上游 apps 结构不变，只是多挂两个类）
import { apps as miaoApps } from './apps/index.js'
import { customApps } from './custom/apps/index.js'

export const apps = { ...miaoApps, ...customApps }

if (Bot?.logger?.info) {
  Bot.logger.info('---------^_^---------')
  Bot.logger.info(`喵喵插件${Version.version}初始化~`)
} else {
  console.log(`喵喵插件${Version.version}初始化~`)
}

installCustom()

setTimeout(Index.init, 1000)
