export const TeamBuff_Chevreuse = [
{
  check: ({ params }) => params.team === true && params.Chevreuse === true && [params.ElementWindTeam, params.ElementRockTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementFireTeam >= 1 && params.ElementMineTeam >= 1,
  title: '夏沃蕾天赋：[尖兵协同战法] 队伍中所有角色的元素类型均为火元素与雷元素并且至少各有一名时，角色触发超载反应后，敌人的元素抗性降低[kx]%',
  data: {
    kx: ({ element, params }) => ['火', '雷'].includes(element) ? (params.phy === true ? 0 : 40) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Chevreuse === true,
  title: '夏沃蕾天赋：[纵阵武力统筹] 发射近迫式急促拦射的「超量装药弹头」后将使队伍中所有火元素与雷元素角色的攻击力提升[atkPct]%',
  data: {
    atkPct: ({ element }) => ['火', '雷'].includes(element) ? 40 : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Chevreuse === true && [params.ElementWindTeam, params.ElementRockTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementFireTeam >= 1 && params.ElementMineTeam >= 1,
  title: '夏沃蕾1命：[稳固阵线的魄力] 当前场上处于「协同战法」状态下对敌人触发超载反应时将恢复[kx]点元素能量',
  cons: 1,
  data: {
    _energyevery: ({ element }) => ['火', '雷'].includes(element) ? 6 : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Chevreuse === true,
  title: '夏沃蕾6命：[终结罪恶的追缉] 队伍中的角色受到「近迫式急促拦射」的治疗后，获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ element, params }) => ['火', '雷'].includes(element) ? (params.phy === true ? 0 : 60) : 0
  }
}]
