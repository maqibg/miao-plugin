import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '达达利亚1命：[魔王武装·遏浪] 魔王武装·狂澜的冷却时间降低[_eCd]%',
  cons: 1,
  data: {
    _eCd: 20
  }
},
{
  title: '达达利亚2命：[魔王武装·遏浪] 处于断流效果影响下的敌人被击败时，恢复[_energyevery]点元素能量。',
  cons: 2,
  data: {
    _energyevery: 4
  }
},
{
  title: '达达利亚4命：[深渊之灾·凝水盛放] 每4.0秒，场上存在施加的断流效果触发断流',
  cons: 4
},
{
  title: '达达利亚6命：[极恶技·天使灭尽] 在近战状态下施放极恶技·尽灭闪时，清除魔王武装·狂澜的冷却时间。',
  cons: 6,
  data: {
    _eCd: 100
  }
}]
