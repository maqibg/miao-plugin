/**
 * 钩子①：伤害计算规则文件的查找（ProfileDmg.dmgRulePath）
 *
 * 用「包装」而不是「替换」：先查自定义，未命中就原样交给 miao 原函数。
 * 这样上游 miao 调整查找顺序或新增档位时会自动继承，不会像整体替换那样冻结在上一次拷贝。
 *
 * 档位只有「基础」一种：梁氏其他档位不是独立文件，而是在 calc_basic.js 内部
 * 读条目表做二次筛选，外层重复筛选会让大量角色归零，故不在此实现。
 */
import ProfileDmg from '../../models/ProfileDmg.js'
import { normalizeCharName } from '../lib/context.js'
import { customCalcPath, liangshiCalcPath, getOverride } from '../lib/override.js'

let original = null

// 空条目回退时临时绕过，避免在回退里又命中同一个梁氏文件。
// 必须按「游戏:角色」精确标记：回退过程里有 await，全局开关会误伤同时进行的其他角色请求。
const bypassing = new Set()
const ruleKey = (name, game) => `${game}:${name}`

export function setBypass (name, game, value) {
  if (value) bypassing.add(ruleKey(name, game))
  else bypassing.delete(ruleKey(name, game))
}

/** 用户没指定方案时不接管，保证默认行为与上游完全一致 */
function resolve (name, game) {
  if (bypassing.has(ruleKey(name, game))) return null

  const userFile = customCalcPath(name, game)
  if (userFile) {
    return { path: userFile, createdBy: '自定义' }
  }

  const scheme = getOverride(name, game)?.scheme
  if (scheme === 'basic') {
    const ls = liangshiCalcPath(normalizeCharName(name), game, 'basic')
    if (ls) return { path: ls, createdBy: '梁氏·基础' }
    // 点名了基础档却没有文件，要让使用者看见，不能悄悄退回默认
    console.error(`[miao-custom] ${name}(${game}) 选择了梁氏基础档但未找到对应文件`)
  }
  return null
}

export function install () {
  if (original) return false
  original = ProfileDmg.dmgRulePath
  ProfileDmg.dmgRulePath = function (name, game = 'gs') {
    const hit = resolve(name, game)
    if (hit) return hit
    return original.call(this, name, game)
  }
  return true
}

export function uninstall () {
  if (!original) return false
  ProfileDmg.dmgRulePath = original
  original = null
  bypassing.clear()
  return true
}

export function getOriginal () {
  return original
}
