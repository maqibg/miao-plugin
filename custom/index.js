/**
 * 自定义层入口
 *
 * 只在 miao 的 index.js 末尾调用一次 install()，其余功能逐步挂到这里。
 * 本目录之外只应有一行接入代码，以保证上游 miao 合并时几乎不产生冲突。
 */
export { install, uninstall } from './hooks/index.js'
export { liangshiReady, overridePath, getOverride } from './lib/override.js'
export { CUSTOM_PATH, DATA_PATH, CONFIG_PATH, LS_PATH } from './lib/context.js'
export { getVersion, bumpVersion } from './lib/store.js'
