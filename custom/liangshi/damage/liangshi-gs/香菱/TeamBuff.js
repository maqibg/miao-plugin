export const TeamBuff_Xiang_Ling = [
{
  check: ({ params }) => params.team === true && params.Xiang_Ling === true,
  title: '香菱1命：[外酥里嫩] 受到锅巴攻击的敌人,元素抗性降低[kx]%',
  cons: 1,
  data: {
    kx: ({ element, params }) => ['火'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Xiang_Ling === true,
  title: '香菱6命：[大龙卷旋火轮] 旋火轮持续期间,队伍中所有角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ element, params }) => ['火'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
}]