import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1223ranking = cfg.sr1223ranking
let aName = '普通攻击'
let eName = '迅羽掠袭'
let eNameT = 'E'
let qName = '锋入幽渺，影出凌厉'
let qNameT = 'Q'
let tName = '天赋'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '飞铙'
  eNameT = '迅羽掠袭'
  qNameT = '锋入幽渺，影出凌厉'
  tName = '伸天卑飞，折翅为芒'
 } else if ( NamePath == 3 ) {
  eNameT = '迅羽掠袭'
  qNameT = '锋入幽渺，影出凌厉'
  tName = '伸天卑飞，折翅为芒'
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
  tName = 'T'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f','c','e','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1223ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[貊泽] 排名规则均未命中，已选择默认排名规则')
       ranking = 'z'
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
 ranking = `${sr1223ranking}`
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
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${tName}附加伤害`,
  dmgKey: 't',
  dmg: ({ talent }, dmg) => dmg(talent.t['附加伤害'], '')
},
{
  title: `${tName}追加伤害`,
  dmgKey: 'z',
  dmg: ({ talent , cons }, dmg) => dmg(talent.t['追加攻击伤害'] + (cons >= 6 ? 0.25 : 0), 't')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

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
  check: ({ params }) => params.technique >= 1,
  title: '貊泽秘技：[胁翼匿迹] 在隐身状态下攻击敌人进入战斗时伤害提高[dmg]',
  data: {
    dmg: 30
  }
},
{
  title: '貊泽行迹：[墨毫绣衣] 施放天赋的追加攻击后，恢复[skillPoints]个战技点',
  tree: 1,
  data: {
    skillPoints: 1
  }
},
{
  title: '貊泽行迹：[不折镆干] 施放终结技造成伤害时，被视为发动了追加攻击。【猎物】受到的追加攻击伤害提高[tDmg]%',
  tree: 3,
  data: {
    tDmg: 25
  }
},
{
  title: '貊泽1魂：[矢志] 进入战斗后，恢复[_energyevery]点能量。每触发1次天赋的附加伤害，恢复[_energyevery2]点能量。',
  cons: 1,
  data: {
    _energyevery: 20,
    _energyevery2: 2
 }
},
{
  title: '貊泽2魂：[惩膺] 对成为【猎物】的敌方目标造成伤害时，暴击伤害提高[cdmg]%',
  cons: 2,
  data: {
    cdmg: 40
 }
},
{
  title: '貊泽4魂：[逐薮] 施放终结技时，造成的伤害提高[dmg]%',
  cons: 4,
  data: {
    dmg: 30
 }
},
{
  title: '貊泽6魂：[丹心] 天赋的追加攻击的伤害倍率提高[_tPlus]%',
  cons: 6,
  data: {
    _tPlus: 25
 }
},
 { title: `10.11最后修改：[9.25重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1223ranking} 更新日志:${renew} 其他信息:${information}` }]
