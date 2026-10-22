import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '雷泽技能：[利爪与苍雷] 积攒了[buff]个雷之印，提高[recharge]%元素充能效率',
  data: {
    buff: ({ params }) => params.Energy || 3,
    recharge: ({ params }) => (params.Energy || 3) * 20
  }
},
{
  title: '雷泽技能：[雷牙] 提高[_aSpeed]%普通攻击速度,[_electroRes]%雷元素抗性,提高[_interruption]%抗打断能力,并免疫感电反应的伤害。',
  data: {
    _aSpeed: ({ talent }) => talent.q['普通攻击速度提升'],
    _electroRes: ({ talent }) => talent.q['雷元素抗性提升'],
    _interruption: 50
  }
},
{
  title: '雷泽天赋：[觉醒] 利爪与苍雷的冷却时间减少[_ecdPct]%',
  data: {
    _ecdPct: 18
  }
},
{
  title: '雷泽天赋：[饥饿] 元素充能效率提高[recharge]%',
  data: {
    recharge: ({ params }) => params.EnergyDetermine < 50 ? 30 : 0
  }
},
{
  title: '雷泽1命：[狼性] 获得元素球后,造成的伤害提高[dmg]%',
  cons: 1,
  data: {
    dmg: 10
  }
},
{
  title: '雷泽2命：[压制] 攻击生命值[buff]%的敌人,暴击率提高[cpct]%',
  cons: 2,
  data: {
    buff: ({ params, artis, weapon }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100)),
    buff: ({ params, artis, weapon }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100)),
    cpct: ({ params, weapon, artis }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100))) >= 30 ? 10 : 0
  }
},
{
  title: '雷泽4命：[撕咬] 利爪与苍雷点按时,会使命中的敌人防御力降低[enemyDef]%',
  cons: 4,
  data: {
    enemyDef: 15
  }
},
{
  title: '雷泽6命：[天狼] 大剑会自动充能使下一次普通攻击引发落雷，造成雷元素伤害',
  cons: 6
}]
