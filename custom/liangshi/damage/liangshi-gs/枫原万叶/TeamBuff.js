export const TeamBuff_Kaedehara_Kazuha = [
{
  check: ({ params }) => params.team === true && params.Kaedehara_Kazuha === true,
  title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野持续期间内，元素精通提升[mastery]',
  cons: 2,
  data: {
    mastery: 200
  }
},
{
  check: ({ params }) => params.team === true && params.Kaedehara_Kazuha === true,
  title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后，会为队伍中所有角色提供[dmg]%元素伤害加成',
  data: {
    dmg: ({ element, params }) => ['水', '冰', '雷', '火'].includes(element) ? (params.phy === true ? 0 : (1000 * 0.04)) : 0
  }
}]
