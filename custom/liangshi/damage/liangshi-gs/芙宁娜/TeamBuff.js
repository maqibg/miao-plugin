export const TeamBuff_Furina = [
{
  check: ({ params }) => params.team === true && params.Furina === true,
  title: '芙宁娜技能：[万众狂欢] 持有[buffCount]层「气氛值」,附近的队伍中所有角色造成的伤害提升[dmg]%,受治疗加成提升[healInc]%',
  data: {
    buffCount: ({ cons }) => 300 + (cons >= 1 ? 100 : 0),
    dmg: ({ cons }) => (300 + (cons >= 1 ? 100 : 0)) * (cons >= 3 ? 0.31 : 0.25),
    phy: ({ cons }) => (300 + (cons >= 1 ? 100 : 0)) * (cons >= 3 ? 0.31 : 0.25),
    healInc: ({ cons }) => (300 + (cons >= 1 ? 100 : 0)) * (cons >= 3 ? 0.13 : 0.1)
  }
},
{
  check: ({ params }) => params.team === true && params.Furina === true,
  title: '芙宁娜1命：[爱是难驯鸟,哀乞亦无用.] 施放万众狂欢时，持有「气氛值」的上限提升100点.',
  cons: 1
}]
