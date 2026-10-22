export const TeamBuff_Zhong_Li = [
{
  check: ({ params }) => params.team === true && params.Zhong_Li === true,
  title: '钟离天赋：[悬岩宸断] 玉璋护盾受到伤害时提升护盾强效5.0%,至多提高[shield]%',
  data: {
    shield: 25
  }
},
{
  check: ({ params }) => params.team === true && params.Zhong_Li === true,
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有抗性降低[kx]%',
  data: {
    kx: 20
  }
}]