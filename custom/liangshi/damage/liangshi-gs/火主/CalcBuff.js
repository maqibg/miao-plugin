import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '任务加成：[第三章 第一幕「穿越烟帷与暗林」] 在任务「近在咫尺的目标」中使用「单手剑战斗技巧•八」后，基础攻击力提升[_atkPlus]点 { 此效果暂不参与计算 }',
  data: {
    _atkPlus: 3
  }
},
{
  title: '任务加成：[磷星之章 第一幕「星与夜的低语」] 在任务「特训」中完成特训后，基础生命值提升[_hpPlus]点，基础攻击力提升[_atkPlus]点，元素精通提升[_masteryPlus] { 此效果暂不参与计算 }',
  data: {
    _hpPlus: 50,
    _atkPlus: 10,
    _masteryPlus: 15
  }
},
{
  title: '旅行者天赋：[未烬的余火] 当前场上处于焰烈之槛或灼火之槛中的角色触发火元素反应后，恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 5
  }
},
{
  title: '旅行者1命：[流光的星火] 焰烈之槛或灼火之槛存在期间，造成的伤害提升[dmg]%',
  cons: 1,
  data: {
    dmg: ({ params }) => (params.Nightsoul == true ? 9 : 0) + 6
  }
},
{
  title: '旅行者4命：[燎灼的烈火] 施放元素爆发后，获得[dmg]%元素伤害加成',
  cons: 4,
  data: {
    dmg: 20
  }
},
{
  check: ({ params }) => params.Nightsoul == true,
  title: '旅行者6命：[永燃的圣火] 处于夜魂加持状态下时普通攻击、重击与下落攻击将转为具有夜魂性质且无法被附魔覆盖的火元素伤害，这些攻击的暴击伤害提升[aCdmg]%',
  cons: 6,
  data: {
    aCdmg: 40,
    a2Cdmg: 40,
    a3Cdmg: 40
  }
}]