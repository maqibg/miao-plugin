import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '可莉天赋：[砰砰礼物] 施放重击时不消耗体力，造成的伤害提升[a2Dmg]％',
  data: {
    _a2StaminaPct: 100,
    a2Dmg: 50
  }
},
{
  title: '可莉天赋：[火花无限] 重击造成暴击后，为队伍中所有角色恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: 2
  }
},
{
  title: '可莉1命：[连环轰隆] 攻击与施放技能时，有几率召唤火花轰击敌人',
  cons: 1
},
{
  title: '可莉2命：[破破弹片] 蹦蹦炸弹的诡雷会使敌人防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 23
  }
},
{
  title: '可莉4命：[一触即发] 如果在轰轰火花持续期间内退场，会引发爆炸，造成火元素范围伤害。',
  cons: 4
},
{
  title: '可莉6命：[火力全开] 施放轰轰火花后，队伍中所有角色获得[dmg]％元素伤害加成。',
  cons: 6,
  data: {
    dmg: 10
  }
}]
