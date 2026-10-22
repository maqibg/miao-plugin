export const TeamBuff_Escoffier = [
{
  check: ({ params }) => params.team === true && params.Escoffier === true,
  title: '可爱菲天赋：[灵感浸入调味] 队伍中存在[buff]位水冰元素角色, 敌人抗性降低[kx]%',
  data: {
    buff: ({ params }) => (params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0),
    kx: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) * 5 + (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) >= 4 ? 35 : 0))) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Escoffier === true && ![params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementGrassTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1),
  title: '可爱菲1命：[味蕾绽放的餐前旋舞] 队伍中所有角色的元素类型均为冰元素与水元素时，冰元素暴击伤害提升[cdmg]%',
  cons: 1,
  data: {
    cdmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Escoffier === true && !params.TruceTime,
  title: '可爱菲2命：[鲜香味腴的炖煮艺术] 附近的当前场上角色造成冰元素伤害时，提升造成的伤害[aPlus]',
  cons: 2,
  data: {
    aPlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
    a2Plus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
    a3Plus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
    ePlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
    qPlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100
  }
}]