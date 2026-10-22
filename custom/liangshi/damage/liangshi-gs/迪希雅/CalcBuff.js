import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '迪希雅天赋：[不吝佑助] 施放熔铁流狱·净焰昂藏后将获得额外的[_interruption]%抗打断能力,承担来自赤鬃之血的伤害时,受到的伤害降低60%.',
  data: {
    _interruption: 100
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 生命值上限提升[hpPct]%',
  cons: 1,
  data: {
    hpPct: 20
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 熔铁流狱伤害提高[ePlus]，炎啸狮子咬伤害提高[qPlus]',
  sort: 9,
  cons: 1,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 3.6 / 100,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 6 / 100
  }
},
{
  check: ({ params }) => params.Field === true,
  title: '迪希雅2命：[净沙利刃明映万乘] 重新产生的净焰剑狱领域持续时间延长[_eSustainedPlus]秒,领域内的当前场上角色受到攻击时,净焰剑狱协同攻击造成的伤害提升[eDmg]%',
  cons: 2,
  data: {
    _eSustainedPlus: 6,
    eDmg: 50
  }
},
{
  title: '迪希雅4命：[服膺誓禁恪守无失] 炽鬃拳与焚落踢命中敌人时，恢复[_energyevery]点元素能量',
  cons: 2,
  data: {
    _energyevery: 1.5
  }
},
{
  title: '迪希雅6命：[燎燃利爪裂帛斫金] 炎啸狮子咬的暴击率提升[qCpct]%，炽鬃拳命中敌人并造成暴击后,炎啸狮子咬的暴击伤害提升[qCdmg]%,持续时间延长[_qSustainedPlus]秒',
  cons: 6,
  data: {
   qCpct: 10,
   qCdmg: ({ params }) => Math.min((params.BurstAfter * 15), 60),
   _qSustainedPlus: ({ params }) => Math.min((params.BurstAfter * 0.5), 2)
  }
}]
