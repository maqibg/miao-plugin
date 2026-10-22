export const TeamBuff_Xin_Yan = [
{
  check: ({ params }) => params.team === true && params.Xin_Yan === true,
  title: '辛焱天赋：[这才是摇滚!] 处于热情拂扫的护盾保护下的角色造成的物理伤害提高[phy]%',
  data: {
    phy: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Xin_Yan === true,
  title: '辛焱4命：[节奏的传染] 热情拂扫的伤害，会使敌人的物理抗性降低[kx]%',
  cons: 4,
  data: {
    phyKx: 15
  }
}]