export const TeamBuff_Gorou = [
{
  check: ({ params }) => params.team === true && params.Gorou === true,
  title: '五郎天赋：[不畏风雨] 施放兽牙逐突形胜战法后,附近的队伍中所有角色的防御力提升[defPct]%',
  data: {
   defPct: 25
  }
},
{
  check: ({ params }) => params.team === true && params.Gorou === true && !params.TruceTime,
  title: '五郎技能：[犬坂吠吠方圆阵] 为其领域内的当前场上角色赋予[defPlus]点防御力',
  data: {
    defPlus: ({ cons }) => cons >= 3 ? 438 : 371
  }
},
{
  check: ({ params }) => params.team === true && params.Gorou === true,
  title: '五郎技能：[犬坂吠吠方圆阵] 为其领域内的当前场上角色赋予[dmg]%元素伤害加成,提升[_interruption]%抗打断能力',
  data: {
    _interruption: ({ params }) => (params.ElementRockTeam || 0) >= 2 ? 50 : 0,
    dmg: ({ element, params }) => ['岩'].includes(element) ? ((params.ElementRockTeam || 0) >= 3 ? (params.phy === true ? 0 : 15)  : 0) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Shikanoin_Heizou === true,
  title: '五郎6命：[犬勇•忠如山] 施放犬坂吠吠方圆阵或兽牙逐突形胜战法后提高附近的队伍中所有角色元素伤害[cdmg]%的暴击伤害',
  cons: 6,
  data: {
    cdmg: ({ element }) => ['岩'].includes(element) ? (params.phy === true ? 0 : (Math.min(((params.ElementRockTeam || 0) * 10 + ((params.ElementRockTeam || 0) >= 3 ? 10 : 0)), 40))) : 0
  }
}]