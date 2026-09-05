/*
* 面板权重:临时评分权重记录(只存内存,不写文件)
*
* 流程:
*   1. 命令 #面板权重 角色 属性 数值 把记录写进来
*   2. 机器人立即触发该角色面板出图,评分程序在算分前读一次记录(peek)
*   3. 出图完成后,由命令调用 clear 把记录擦掉,恢复默认
* 所以只影响紧随其后的这一次出图。
* */

// 中文属性名 → 内部代号
const ATTR_KEY_MAP = {
  攻击力: 'atk', 生命值: 'hp', 防御力: 'def', 元素精通: 'mastery',
  暴击率: 'cpct', 暴击伤害: 'cdmg', 元素充能: 'recharge',
  伤害加成: 'dmg', 治疗加成: 'heal', 物理伤害: 'phy',
  攻击: 'atk', 生命: 'hp', 防御: 'def', 精通: 'mastery',
  暴击: 'cpct', 爆伤: 'cdmg', 充能: 'recharge', 伤害: 'dmg', 治疗: 'heal'
}

// 内部代号 → 图上显示的短名
const ATTR_SHOW_MAP = {
  atk: '攻击', hp: '生命', def: '防御', mastery: '精通', cpct: '暴击',
  cdmg: '爆伤', recharge: '充能', dmg: '伤害', heal: '治疗', phy: '物伤',
  speed: '速度', stance: '击破', effPct: '命中', effDef: '抵抗', joy: '欢愉'
}

// 记录表: 键 = "游戏代号:角色名", 值 = { atk: 75, recharge: 55 }
let record = {}

export default {
  ATTR_KEY_MAP,
  ATTR_SHOW_MAP,

  // 写入或累加记录
  set (key, attrPairs) {
    if (!record[key]) record[key] = {}
    for (let [attr, val] of attrPairs) {
      record[key][attr] = val
    }
  },

  // 查看记录(不擦掉)
  peek (key) {
    return record[key] || null
  },

  // 擦掉某角色的记录
  clear (key) {
    delete record[key]
  },

  // 清空全部(重启时兜底)
  clearAll () {
    record = {}
  }
}
