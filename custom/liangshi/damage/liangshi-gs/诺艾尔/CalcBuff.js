import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '护心铠：[属性 - 岩] 对所有元素伤害与物理伤害有[shieldInc]%的额外吸收效果。',
  data: {
    shieldInc: 50
  }
},
{
  check: ({ params }) => params.Sweeping_Time === true,
  title: '诺艾尔技能：[大扫除] 基于防御力,提高攻击力[atkPlus]',
  sort: 9,
  data: {
    atkPlus: ({ attr, calc, talent }) => calc(attr.def) * talent.q['攻击力提高'] / 100
  }
},
{
  title: '诺艾尔天赋：[干净利落] 普通攻击或重击累计每命中4.0次时，会减少护心铠[_ecdPlus]秒的冷却',
  data: {
    _ecdPlus: 1
  }
},
{
  title: '诺艾尔2命：[旋风女仆] 重击体力消耗降低[_a2StaminaPct]%,造成的伤害提升[a2Dmg]%',
  cons: 2,
  data: {
    _a2StaminaPct: 20,
    a2Dmg: 15
   }
},
{
  title: '诺艾尔4命：[之后会扫干净的] 护心铠在效果结束时,或因伤害破碎时,会对周围的敌人造成岩元素伤害',
  cons: 4
},
{
  check: ({ params }) => params.Sweeping_Time === true,
  title: '诺艾尔6命：[要一尘不染才行] 大扫除额外提高[atkPlus]点攻击力,在技能持续时间内,每打倒1.0个敌人,其持续时间将延长[_qSustainedPlus]秒',
  sort: 9,
  cons: 6,
  data: {
    atkPlus: ({ attr, calc }) => calc(attr.def) * 50 / 100,
    _sustainedPlus: 1
  }
}]