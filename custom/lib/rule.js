/**
 * 规则读取：把「这个角色当前用哪份规则、有哪些条目、权重多少」集中成一个对象，
 * 供控制台 / 详情 / 来源 / 修改指令共同使用（避免每处各写一遍解析）。
 */
import ProfileDmg from '../../models/ProfileDmg.js'
import { Character } from '../../models/index.js'
import { LS_PATH } from './context.js'
import { getOverride } from './override.js'
import { readJSON } from './store.js'

const GAME_WORDS = [
  { game: 'sr', reg: /星铁|崩坏|铁道|星穹/g },
  { game: 'gs', reg: /原神/g },
  { game: 'mc', reg: /鸣潮|明朝/g }
]

/**
 * 解析角色：支持别名、可带游戏前缀
 * 例：胡桃 / 原神胡桃 / 星铁希儿
 */
export function resolveChar (input, forceGame = '') {
  let text = String(input || '').trim()
  if (!text) return null
  let game = forceGame
  for (const w of GAME_WORDS) {
    if (w.reg.test(text)) {
      game = w.game
      text = text.replace(w.reg, '')
    }
    w.reg.lastIndex = 0
  }
  text = text.trim()
  if (!text) return null
  const games = game ? [game] : ['gs', 'sr', 'mc']
  for (const g of games) {
    const c = Character.get(text, g)
    if (c) return c
  }
  return null
}

/**
 * 用户数据的键名
 *
 * 旅行者在 miao 里是「旅行者」+ 元素两级身份，若直接用 char.name 存覆盖，
 * 七个元素会共用同一份配置；这里统一成「旅行者/元素」，与 dmgRulePath 保持一致。
 */
export function charKey (char) {
  return char.isTraveler ? `旅行者/${char.elem}` : char.name
}

/** 当前实际使用的规则文件（已包含自定义层优先级） */
export function getRulePath (char) {
  return ProfileDmg.dmgRulePath(charKey(char), char.game)
}

/** 读取规则文件内容，附带来源说明 */
export async function getRule (char) {
  const info = getRulePath(char)
  if (!info) return null
  const mod = await import(`file://${info.path}`)
  const isCustom = /\/custom\/data\//.test(info.path)
  const isLiang = /\/custom\/liangshi\//.test(info.path)

  // 停用的条目只做标记、不过滤：控制台要显示完整列表，编号才能长期稳定，
  // 否则每停用一条，后面的编号都会前移，用户按旧编号操作会改错条目。
  const rawDetails = Array.isArray(mod.details) ? mod.details : []
  const entries = getOverride(charKey(char), char.game)?.entries || {}
  const details = rawDetails.map((d, i) => {
    const patch = entries[String(i)]
    return patch && patch.enabled === false ? { ...d, _disabled: true } : d
  })

  return {
    path: info.path,
    createdBy: mod.createdBy || info.createdBy || '喵喵',
    source: isCustom ? '用户自定义' : isLiang ? '梁氏方案' : 'miao 自带',
    details,
    mainAttr: mod.mainAttr || 'atk,cpct,cdmg',
    buffs: mod.buffs || [],
    defParams: mod.defParams || {},
    defDmgIdx: Number.isInteger(mod.defDmgIdx) ? mod.defDmgIdx : -1
  }
}

/** 用户对该角色的覆盖（没有则 null） */
export function getCharOverride (char) {
  return getOverride(charKey(char), char.game)
}

/** 梁氏方案同步版本，用于在控制台和图底部标明来源 */
export function getLiangshiVersion () {
  const v = readJSON(`${LS_PATH}/VERSION`, null)
  if (!v) return null
  return typeof v === 'string' ? v : [v.version, v.syncedAt].filter(Boolean).join(' / ')
}

/**
 * 只保留「基础」一档
 *
 * 梁氏的极简/队伍/开发并不是独立文件：它们是在 calc_basic.js 内部读
 * data/*.json 条目表做二次筛选。再在外层按同一张表筛一次会造成双重筛选，
 * 而 BasicCalc.json 里 113 个角色有 90 个是空数组，会导致大面积角色归零。
 * 所以这里只承认文件级真实存在的基础档。
 */
export const BASIC_SCHEME = 'basic'
