import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Lightning_Rose === true,
  title: '丽莎天赋：[静电场力] 敌人受到蔷薇的雷光攻击后，降低[enemyDef]%防御力',
  data: {
    enemyDef: 15
  }
},
{
  title: '丽莎1命：[无限的电回路] 苍雷长按时命中[buff]个敌人,恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    buff: ({ params }) => params.SkillsHit || 1,
    _energyevery: ({ params }) => Math.min((params.SkillsHit || 1) * 2, 5)
  }
},
{
  title: '丽莎2命：[空间电势结界] 防御力提升[defPlus]%,抗打断能力提升[_interruption]%',
  cons: 2,
  data: {
    defPlus: 25,
    _interruption: 50
  }
},
{
  title: '丽莎4命：[如雨的电浆] 蔷薇的雷光攻击时，放出的闪电增加至1.0~3.0道',
  cons: 4
}]