export const TeamBuff_Lynette = [
{
  check: ({ params }) => params.team === true && params.Lynette === true,
  title: '琳妮特天赋：[巧施协同] 施放魔术·运变惊奇后，队伍中分别存在[atkPct]种元素类型的角色,攻击力提升[atkPct]%',
  data: {
    buffCount: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementMineTeam, params.ElementFireTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].filter(elem => elem >= 1).length,
    atkPct: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementMineTeam, params.ElementFireTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].filter(elem => elem >= 1).length * 4 + 4
  }
}]
