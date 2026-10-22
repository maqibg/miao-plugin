export const TeamBuff_Kujou_Sara = [
{
  check: ({ params }) => params.team === true && params.Kujou_Sara === true,
  title: '九条裟罗天赋：[御公仪] 天狗咒雷•伏命中敌人后，队伍中所有角色恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: 300 / 100 * 1.2
  }
},
{
  check: ({ params }) => params.team === true && params.Kujou_Sara === true && !params.TruceTime,
  title: '九条裟罗技能：[鸦羽天狗霆雷召咒] 天狗咒雷•伏使其范围内的当前场上当前角色获得攻击力加成[atkPlus]',
  data: {
    atkPlus: ({ cons }) => (cons >= 3 ? 91 : 77) * 674.33 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Kujou_Sara === true && !params.TruceTime,
  title: '九条6命：[我界] 提处于天狗咒雷带来的攻击力提升效果状态下的角色，其元素伤害的暴击伤害提高[cdmg]%',
  cons: 6,
  data: {
    cdmg: ({ element, params }) => ['雷'].includes(element) ? (params.phy === true ? 0 : 60) : 0
  }
}]