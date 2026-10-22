import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%元素抗性',
  data: {
    kx: 15
  }
},
{
  title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: 8
  }
},
{
  title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
  cons: 2,
  data: {
    _cd: 15
  }
},
{
  check: ({ params }) => params.FireAttachment != true && params.MineAttachment != true && params.WindAttachment != true,
  title: '重云4命：[浮云霜天] 攻击命中受到元素影响的敌人时回复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1
  }
},
{
  title: '重云6命：[四灵捧圣] 自身生命值[buffz]%,敌人生命值[buffz]%,元素爆发伤害提升[qDmg]%，灵刃增加一柄',
  cons: 6,
  data: {
    buffz: ({ params, weapon, artis }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    buffd: ({ params, weapon, artis }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100)),
    qDmg: ({ params, weapon, artis }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > (params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100))) ? 15 : 0
  }
}]
