export const TeamBuff_Rosaria = [
{
  check: ({ params }) => params.team === true && params.Rosaria === true,
  title: '罗莎莉亚天赋：[暗中支援的黯色] 施放终命的圣礼时，提高附近的队伍中所有角色[cpct]%的暴击率',
  data: {
    cpct: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Rosaria === true,
  title: '罗莎莉亚6命：[代行裁判] 终命的圣礼的攻击会使敌人的物理抗性降低[phyKx]%',
  cons: 6,
  data: {
    phyKx: 20
  }
}]