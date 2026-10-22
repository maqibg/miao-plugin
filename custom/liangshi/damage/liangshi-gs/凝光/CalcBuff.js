import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '凝光天赋：[星移势转] 拥有星璇时,重击不会消耗体力',
  data: {
    _a2StaminaPct: 100
  }
},
{
  title: '凝光天赋：[储之千日，用之一刻] 穿过璇玑屏的角色会获得[dmg]%元素伤害加成',
  data: {
    dmg: 12
  }
},
{
  title: '凝光2命：[璇玑合璧镇昆仑] 璇玑屏碎裂时,会清除冷却时间',
  cons: 2,
  data: {
    _ecdPct: 100
  }
},
{
  title: '凝光4命：[攻守易形著神机] 璇玑屏会使周围角色的所有元素抗性提升[_res]%',
  cons: 4,
  data: {
  	_res: 10
  }
},
{
  title: '凝光6命：[七星璨璨凝流光] 施放天权崩玉时，会额外生成七枚星璇',
  cons: 6
}]