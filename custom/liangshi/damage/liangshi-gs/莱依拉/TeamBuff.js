export const TeamBuff_Layla = [
{
  check: ({ params }) => params.team === true && params.Layla === true,
  title: '莱依拉天赋：[如光骤现] 安眠帷幕护盾在存在期间，处于安眠帷幕护盾庇护下的角色，护盾强效提升[shield]%',
  data: {
    shield: 6 * 4
  }
},
{
  check: ({ params }) => params.team === true && params.Layla === true,
  title: '莱依拉4命：[星示昭明] 垂裳端凝之夜开始发射一轮飞星时，将使附近的队伍中所有角色普通攻击与重击造成的伤害提升[aPlus]',
  cons: 4,
  data: {
    aPlus: 32000 * 5 / 100,
    a2Plus: 32000 * 5 / 100
  }
}]
