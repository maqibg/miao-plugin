/**
 * 梁氏参数释义
 *
 * 梁氏的 params 是英文驼峰命名，用户看不懂（如 Paramita_Papilio）。
 * 解释顺序：
 *   1. params.json 里人工整理/提取的专属释义（角色特有参数）
 *   2. 按命名规则拆解（SkillsUse / ElementWaterTeam / *Determine 这类有固定套路）
 *   3. 都识别不了就明确说"未收录"，不编造
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dict = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'params.json'), 'utf8'))
  } catch (e) {
    console.error(`[miao-custom] 参数字典读取失败: ${e.message}`)
    return {}
  }
})()

const ELEM = {
  Wind: '风', Rock: '岩', Mine: '雷', Fire: '火', Water: '水', Ice: '冰', Grass: '草',
  Anemo: '风', Geo: '岩', Electro: '雷', Pyro: '火', Hydro: '水', Cryo: '冰', Dendro: '草'
}

const ACTION = {
  Normal: '普通攻击', Charged: '重击', Plunge: '下落攻击', Skills: '元素战技',
  Burst: '元素爆发', Energy: '元素能量', Shield: '护盾', Heal: '治疗'
}

const STATE = {
  Freeze: '冻结', Burning: '燃烧', Shield: '护盾', Heal: '治疗',
  Primordial: '原海', Nightsoul: '夜魂', BondOfLife: '生命之契',
  Truce: '停战', Moonsign: '月兆', ElectroCharged: '感电',
  Superconduct: '超导', Swirl: '扩散', Crystalize: '结晶'
}

const SUFFIX = {
  Use: '使用次数', Hit: '命中次数', Dmg: '伤害次数', Kill: '击杀次数',
  Progress: '叠层进度', After: '施放后', Bonus: '额外加成', Plus: '额外数值',
  Count: '层数'
}

/** 按命名规则解释，识别不了返回 null（不含人工词条） */
export function explainByRule (name) {
  let m = /^Element(Wind|Rock|Mine|Fire|Water|Ice|Grass|Anemo|Geo|Electro|Pyro|Hydro|Cryo|Dendro)Team$/.exec(name)
  if (m) return `队伍中${ELEM[m[1]]}元素角色数量`

  m = /^(Normal|Charged|Plunge|Skills|Burst)(Use|Hit|Dmg|Kill|Progress|After|Bonus|Plus|Count)$/.exec(name)
  if (m) return `${ACTION[m[1]]}${SUFFIX[m[2]]}`

  m = /^(Wind|Rock|Mine|Fire|Water|Ice|Grass|Anemo|Geo|Electro|Pyro|Hydro|Cryo|Dendro)Resonance$/.exec(name)
  if (m) return `队伍有双${ELEM[m[1]]}共鸣`

  m = /^(Liyue|Fontaine|Natlan|Mondstadt|Inazuma|Sumeru|Snezhnaya)Teammate$/.exec(name)
  if (m) return `队伍中${m[1]}角色数量`

  m = /^(.+)Determine$/.exec(name)
  if (m) return `是否触发${STATE[m[1]] || m[1]}相关判定`

  m = /^(.+)Path$/.exec(name)
  if (m) return `「${m[1]}」的取值方式`

  m = /^(.+)Time$/.exec(name)
  if (m) return `「${m[1]}」持续时间`

  return null
}

/**
 * 返回一句中文说明
 *
 * 规则优先：命名有固定套路的（SkillsUse / ElementWaterTeam）由规则生成，
 * 比从 buff 标题里截取的兜底说明准确得多；规则解释不了的才查人工词条。
 */
export function explainParam (name) {
  return explainByRule(name) || dict[name] || null
}

/** 面板展示用：带数值的完整一行 */
export function formatParam (name, value) {
  const text = explainParam(name)
  return text ? `${name}=${value}（${text}）` : `${name}=${value}`
}
