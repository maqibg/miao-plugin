import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '枫原万叶1命：[千山红遍] 千早振的冷却时间减少[_eCd]%,施放万叶之一刀时，重置千早振的冷却时间。',
  cons: 1,
  data: {
    _eCd: 10,
    _ecdPlus: 9
  }
},
{
  title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野持续期间内，元素精通提升[mastery]',
  cons: 2,
  data: {
    mastery: 200
  }
},
{
  title: '枫原万叶4命：[大空幻法] 当元素能量低于45.0点时，长按施放千早振时将恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 4
  }
},
{
  title: '枫原万叶6命：[血赤叶红] 施放千早振或万叶之一刀后，获得风元素附魔，并且普通攻击、重击、下落攻击造成的伤害提高[a3Dmg]%',
  cons: 6,
  sort: 9,
  data: {
    aDmg: ({ calc, attr }) => calc(attr.mastery) * 0.2,
    a2Dmg: ({ calc, attr }) => calc(attr.mastery) * 0.2,
    a3Dmg: ({ calc, attr }) => calc(attr.mastery) * 0.2
  }
}]
