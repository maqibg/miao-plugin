export const TeamBuff_Yae_Miko = [
{
  check: ({ params }) => params.team === true && params.Yae_Miko === true,
  title: '八重神子4命：[绯樱引雷章] 杀生樱的落雷命中敌人后，队伍中附近的所有角色获得[dmg]%元素伤害加成。',
  cons: 4,
  data: {
    dmg: ({ element, params }) => ['雷'].includes(element) ? (params.phy === true ? 0 : 20) : 0
  }
}]
