export const TeamBuff_Tighnari = [
{
  check: ({ params }) => params.team === true && params.Tighnari === true,
  title: '提纳里4命：[由片叶管窥枯荣] 施放造生缠藤箭时,队伍中附近的所有角色的元素精通提升[mastery]点',
  cons: 4,
  data: {
    mastery: ({ params }) => ((params.ElementFireTeam || 0) + (params.ElementWaterTeam || 0) + (params.ElementMineTeam || 0)) > 1 ? 120 : 60
  }
}]
