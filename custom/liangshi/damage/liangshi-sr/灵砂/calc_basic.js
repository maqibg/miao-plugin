import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1222ranking = cfg.sr1222ranking
let aName = '普通攻击'
let eName = '识烟飞彩'
let eNameT = 'E'
let qName = '幔亭缭霞'
let qNameT = 'Q'
let tName = '天赋'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '肃香'
  eNameT = '识烟飞彩'
  qNameT = '幔亭缭霞'
  tName = '烟斜雾横，氛氲化生'
 } else if ( NamePath == 3 ) {
  eNameT = '识烟飞彩'
  qNameT = '幔亭缭霞'
  tName = '烟斜雾横，氛氲化生'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['c','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1222ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'h'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'h'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[灵砂] 排名规则均未命中，已选择默认排名规则')
       ranking = 'h'
      } else {
        ranking = `${rankingThreePath}`
      }
    } else {
      ranking = `${rankingTwoPath}`
    }
 } else {
  ranking = `${rankingOnePath}`
 }
} else {
 ranking = `${sr1222ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}生命恢复`,
  dmgKey: 'h',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.e['回复·百分比生命'] + talent.e['回复·固定值'])
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}生命恢复`,
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.q['回复·百分比生命'] + talent.q['回复·固定值'])
},
{
  title: '【浮元】追加伤害',
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.t['全体伤害'], 't')
},
{
  title: `${tName}生命恢复`,
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.t['回复·百分比生命'] + talent.t['回复·固定值'])
},
{
  title: `${qNameT}后${eName}-精英敌人击破`,
  dmgKey: 'r',
  params: { toughness: 10 },
  dmg: ({ params }, { reaction }) => {
    return {
      avg: reaction('fireBreak').avg * ( params.toughness + 2 ) / 4
    }
  }
}
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '角色状态：[面板属性] 当前攻击力[_atk]，防御力[_def]，生命值[_hp]，速度[_speed]，暴击率[_cpct]%，暴击伤害[_cdmg]%，充能效率[_recharge]%，击破特攻[_stance]%，效果命中[_effPct]%，效果抵抗[_effDef]%，治疗加成[_heal]%，伤害加成[_dmg]%',
  sort: 10,
  data: {
    _atk: ({ calc, attr }) => calc(attr.atk) ,
    _def: ({ calc, attr }) => calc(attr.def) ,
    _hp: ({ calc, attr }) => calc(attr.hp) ,
    _speed: ({ calc, attr }) => calc(attr.speed) ,
    _cpct: ({ calc, attr }) => calc(attr.cpct) ,
    _cdmg: ({ calc, attr }) => calc(attr.cdmg) ,
    _recharge: ({ calc, attr }) => calc(attr.recharge) ,
    _stance: ({ calc, attr }) => calc(attr.stance) ,
    _effPct: ({ calc, attr }) => calc(attr.effPct) ,
    _effDef: ({ calc, attr }) => calc(attr.effDef) ,
    _heal: ({ calc, attr }) => calc(attr.heal) ,
    _dmg: ({ calc, attr }) => calc(attr.dmg)
  }
},
{
  title: '敌人状态：[韧性] 具有[toughness]韧性上限',
  data: {
    toughness: ({ params }) => ( params.toughness || 10 )
  }
},
{
  title: '灵砂技能：[幔亭缭霞] 使敌方全体陷入【醇醉】状态，【醇醉】状态下，使目标受到的击破伤害提高[breakEnemydmg]%',
  data: {
    breakEnemydmg: ({ talent }) => talent.q['受到击破伤害提高'] * 100
  }
},
{
  title: '灵砂行迹：[兰烟] 施放普攻时额外恢复[_energyevery]点能量。',
  tree: 2,
  data: {
    _energyevery: 10
  }
},
{
  title: '灵砂行迹：[朱燎] 使自身攻击力提高[atkPct]%治疗量提高[heal]%',
  tree: 3,
  sort: 9,
  data: {
    atkPct: ({ calc, attr }) => Math.min( calc(attr.stance) * 25 / 100 , 50 ),
    heal: ({ calc, attr }) => Math.min( calc(attr.stance) * 10 / 100 , 20 )
  }
},
{
  title: '灵砂1魂：[馨气当盛，除邪避讳] 敌方单位的弱点被击破其防御力降低[enemyDef]%',
  cons: 1,
  data: {
    enemyDef: 20
  }
},
{
  title: '灵砂2魂：[欹枕垂云，烟奁红雪] 施放终结技时，使我方全体击破特攻提高[stance]%',
  cons: 2,
  data: {
    stance: 40
  }
},
{
  title: '灵砂6魂：[晓兰深藏，宿香暗贮] 【浮元】在场时，使敌方全体全属性抗性降低[kx]%',
  cons: 6,
  data: {
    kx: 20
  }
},
{title: `9.19最后修改：[9.19重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1222ranking} 更新日志:${renew} 其他信息:${information}`}]
