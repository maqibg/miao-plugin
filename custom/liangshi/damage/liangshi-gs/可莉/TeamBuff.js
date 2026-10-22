export const TeamBuff_Klee = [
{
  check: ({ params }) => params.team === true && params.Klee === true,
  title: '可莉2命：[破破弹片] 蹦蹦炸弹的诡雷会使敌人防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 23
  }
},
{
  check: ({ params }) => params.team === true && params.Klee === true,
  title: '可莉6命：[火力全开] 施放轰轰火花后，队伍中所有角色获得[dmg]%元素伤害加成，每3.0秒恢复[_energyevery]点元素能量',
  cons: 6,
  data: {
    dmg: ({ element, params }) => ['火'].includes(element) ? (params.phy === true ? 0 : 10) : 0,
    _energyevery: 3
  }
},
{
  check: ({ params }) => params.team === true && params.Klee === true,
  title: '可莉天赋：[火花无限] 重击造成暴击后，为队伍中所有角色恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: 2
  }
}]
