export const TeamBuff_Traveler_Dendro = [
{
  check: ({ params }) => params.team === true && params.Traveler_Dendro === true && !params.TruceTime,
  title: '旅行者天赋：[蔓生的埜草] 草灯莲将在其存在期间获得[buff]层莲光遍照效果，使其领域内的当前场上角色的元素精通提升[mastery]点元素精通。',
  data: {
    buff: 10,
    mastery: 60
  }
},
{
  check: ({ params }) => params.team === true && params.Traveler_Dendro === true,
  title: '旅行者6命：[蕴思的霜草] 处于草灯莲的莲光遍照效果影响下的角色获得[dmg]%元素伤害加成.',
  cons: 6,
  data: {
    dmg: ({ element, params }) => ['水', '雷', '草'].includes(element) ? (params.phy === true ? 0 : 12) : 0
  }
}]