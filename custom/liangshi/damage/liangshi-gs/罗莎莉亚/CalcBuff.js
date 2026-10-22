import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '罗莎莉亚天赋：[聆听忏悔的幽影] 噬罪的告解从技能目标的背后攻击时，暴击率提升[cpct]%',
  data: {
    cpct: 12
  }
},
{
  title: '罗莎莉亚1命：[罪之导引] 攻击造成暴击后,攻击速度提升[_aSpeed]%,普通攻击造成的伤害提升[aDmg]%',
  cons: 1,
  data: {
    _aSpeed: 10,
    aDmg: 10
  }
},
{
  title: '罗莎莉亚2命：[无福之地] 终命的圣礼创造的冰枪持续时间延长[_qSustainedPlus]秒',
  cons: 2,
  data: {
    _qSustainedPlus: 4
  }
},
{
  title: '罗莎莉亚4命：[苦痛恩典] 噬罪的告解造成暴击时,恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 5
  }
},
{
  title: '罗莎莉亚6命：[代行裁判] 终命的圣礼的攻击会使敌人的物理抗性降低[phyKx]%',
  cons: 6,
  data: {
    phyKx: 20
  }
}]