/**
 * 自定义层的路径与命名约定
 *
 * 约束：本层只读上游 miao 目录与梁氏方案目录，所有用户改动只写入 DATA_PATH。
 * 这样上游同步与梁氏同步都不会碰到用户数据，用户数据也不会被覆盖。
 */
import { miaoPath } from '../../tools/path.js'

// 自定义层根目录
export const CUSTOM_PATH = `${miaoPath}/custom`
// 用户改动（不进 git，由 .gitignore 排除）
export const DATA_PATH = `${CUSTOM_PATH}/data`
// 层自身配置（权限白名单等）
export const CONFIG_PATH = `${CUSTOM_PATH}/config`
// 梁氏方案（由 Action 同步，只读）
export const LS_PATH = `${CUSTOM_PATH}/liangshi`

// 目前支持的游戏代号：原神 / 星铁 / 鸣潮
export const GAMES = ['gs', 'sr', 'mc']

/**
 * 角色名规范化
 *
 * 星铁主角在梁氏目录里叫「开拓者」，而 miao 侧可能带「星·」「穹·」前缀，
 * 不统一就永远查不到文件，且是静默失败，所以这里必须先归一。
 */
export function normalizeCharName (name) {
  const text = String(name || '')
  if (/^(星|穹)·/.test(text)) {
    return text.replace(/^(星|穹)·/, '开拓者')
  }
  return text
}

/**
 * 生成用户数据的相对目录名
 *
 * 旅行者在 miao 中是「旅行者/元素」的两级路径，落到文件系统上要拍平成
 * 「旅行者-元素」，避免创建嵌套目录后难以枚举。
 */
export function dataDirName (name) {
  return normalizeCharName(name).replace(/\//g, '-')
}
