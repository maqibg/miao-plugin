import { App } from '#miao'
import { Character } from '#miao.models'
import WeightOverride from '../components/WeightOverride.js'
import ProfileDetail from './profile/ProfileDetail.js'

/*
* 面板权重 - 临时按自定义权重出一张面板图
*
* 支持两种写法(角色名/别名均可):
*   #面板权重 雷电将军 攻击力 75 元素充能 55
*   #雷电将军面板权重 攻击力 75 元素充能 55
*  #雷电将军面板权重帮助 / #面板权重帮助 查看说明
* 任何群成员可用;只影响紧随其后自动出的这一张图,出完自动恢复。
*/

let app = App.init({ id: 'profileWeight', name: '面板权重', priority: 30 })

// 解析角色名(支持别名、可选 星铁/原神 前缀),返回 { 游戏, 角色名 } 或 null
function findChar (input) {
  let text = String(input).trim()
  let game = 'gs'
  if (/星铁|崩坏|铁道/.test(text)) {
    game = 'sr'
    text = text.replace(/星铁|崩坏星穹铁道|崩坏:星穹铁道|铁道|崩坏/g, '')
  } else if (/原神/.test(text)) {
    text = text.replace(/原神/g, '')
  }
  text = text.trim()
  let char = Character.get(text, game)
  if (!char) {
    char = Character.get(text, game === 'sr' ? 'gs' : 'sr')
  }
  if (!char) return null
  return { game: char.game, name: char.name }
}

// 构造标准面板命令,星铁角色加星铁前缀
function buildPanelMsg (name, game) {
  return game === 'sr' ? `#星铁${name}面板` : `#${name}面板`
}

async function help (e) {
  const attrs = Object.keys(WeightOverride.ATTR_KEY_MAP).join(' / ')
  e.reply([
    '【面板权重使用说明】',
    '用法一:#面板权重 <角色> <属性> <数值>',
    '用法二:#<角色>面板权重 <属性> <数值>',
    '',
    '例子:#面板权重 雷电将军 攻击力 75',
    '     #雷神面板权重 攻击力 75 元素充能 55',
    '',
    '作用:发出后立刻出一张该角色面板图,',
    '     图中评分按你给的权重算(没写的属性保持原样),',
    '     只影响这一张,之后恢复默认。',
    '     任何群成员都能用,一条命令可设多个属性。',
    '',
    '可用属性:' + attrs,
    '数值范围:0 ~ 100 的整数'
  ].join('\n'))
  return true
}

async function show (e) {
  let m = /^#面板权重\s+(\S+)$/.exec(e.msg)
  if (!m) return true
  let c = findChar(m[1])
  if (!c) {
    e.reply(`没找到角色「${m[1]}」,换个名字试试`)
    return true
  }
  let r = WeightOverride.peek(`${c.game}:${c.name}`)
  if (!r) {
    e.reply(`${c.name} 当前没有待生效的设置`)
  } else {
    let s = Object.entries(r).map(([k, v]) => `${WeightOverride.ATTR_SHOW_MAP[k] || k} ${v}`).join(', ')
    e.reply(`${c.name} 待生效:${s}`)
  }
  return true
}

async function clear (e) {
  let m = /^#面板权重\s+清除\s+(\S+)$/.exec(e.msg)
  if (!m) return true
  let c = findChar(m[1])
  if (!c) {
    e.reply(`没找到角色「${m[1]}」`)
    return true
  }
  WeightOverride.clear(`${c.game}:${c.name}`)
  e.reply(`已清除 ${c.name} 的设置`)
  return true
}

// 核心:解析属性对 → 写入记录 → 立即出一张按新权重计算的面板图 → 出完擦除
async function apply (e, charInput, rest) {
  let c = findChar(charInput)
  if (!c) {
    e.reply(`没找到角色「${charInput}」,换个名字试试`)
    return true
  }

  let parts = rest.trim().split(/\s+/)
  if (parts.length % 2 !== 0) {
    e.reply('格式不对,属性要和数值成对出现,例如:攻击力 75 元素充能 55')
    return true
  }

  let pairs = []
  for (let i = 0; i < parts.length; i += 2) {
    let attrName = parts[i]
    let attr = WeightOverride.ATTR_KEY_MAP[attrName]
    if (!attr) {
      e.reply(`不认识的属性「${attrName}」,可用:${Object.keys(WeightOverride.ATTR_KEY_MAP).join(' / ')}`)
      return true
    }
    let val = Number(parts[i + 1])
    if (!Number.isInteger(val) || val < 0 || val > 100) {
      e.reply(`属性「${attrName}」的数值要是 0~100 的整数`)
      return true
    }
    pairs.push([attr, val])
  }
  if (pairs.length === 0) return true

  let key = `${c.game}:${c.name}`
  WeightOverride.set(key, pairs)
  let showText = pairs.map(([k, v]) => `${WeightOverride.ATTR_SHOW_MAP[k] || k}=${v}`).join('、')
  e.reply(`已按「${showText}」重新计算 ${c.name} 的面板,只对这一次生效`)

  // 立刻用标准角色名走一次面板渲染,整张图期间覆盖始终生效;出图后无论成功失败都擦除
  let panelMsg = buildPanelMsg(c.name, c.game)
  try {
    await ProfileDetail.detail({
      ...e,
      msg: panelMsg,
      original_msg: panelMsg,
      game: c.game,
      isSr: c.game === 'sr'
    })
  } finally {
    WeightOverride.clear(key)
  }
  return true
}

// 用法一:#面板权重 <角色> <属性> <数值> ...
async function setBySpace (e) {
  let m = /^#面板权重\s+(\S+)\s+([\s\S]+)$/.exec(e.msg)
  if (!m) return true
  return apply(e, m[1], m[2])
}

// 用法二:#<角色>面板权重 <属性> <数值> ...
async function setByName (e) {
  let m = /^#([^#\s]+)面板权重\s+([\s\S]+)$/.exec(e.msg)
  if (!m) return true
  return apply(e, m[1], m[2])
}

app.reg({
  help: {
    name: '面板权重帮助',
    fn: help,
    rule: /^#面板权重帮助$/
  },
  clear: {
    name: '清除面板权重',
    fn: clear,
    rule: /^#面板权重\s+清除\s+(\S+)$/
  },
  show: {
    name: '查看面板权重',
    fn: show,
    rule: /^#面板权重\s+(\S+)$/
  },
  setBySpace: {
    name: '设置面板权重(空格分隔)',
    fn: setBySpace,
    rule: /^#面板权重\s+(\S+)\s+([\s\S]+)$/
  },
  setByName: {
    name: '设置面板权重(角色接面板权重)',
    fn: setByName,
    rule: /^#([^#\s]+)面板权重\s+([\s\S]+)$/
  }
})

export default app
