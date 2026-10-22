export const TeamBuff_Kirara = [
{
  check: ({ params, element }) => params.team === true && params.Kirara === true,
  title: '绮良良6命：[沿途百景会心] 施放元素战技或元素爆发后，所有角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ params }) => params.phy === true ? 0 : 12
  }
}]
