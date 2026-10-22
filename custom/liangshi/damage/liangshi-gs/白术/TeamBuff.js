export const TeamBuff_Bai_Zhu = [
{
  check: ({ params }) => params.team === true && params.Bai_Zhu === true,
  title: '白术4命：[法古观冥] 施放愈气全形论之后，队伍中附近的所有角色元素精通提升[mastery]点',
  cons: 4,
  data: {
    mastery: 80
  }
},
{
  check: ({ params }) => params.team === true && params.Bai_Zhu === true,
  title: '白术天赋：[在地为化] 受到无郤气护盾治疗的角色触发的燃烧、绽放、超绽放、烈绽放反应造成的伤害提升[bloom]%，超激化、蔓激化反应带来的伤害提升提高[spread]%',
  data: {
    bloom: 50000 / 1000 * 2,
    burgeon: 50000 / 1000 * 2,
    hyperBloom: 50000 / 1000 * 2,
    spread: 50000 / 1000 * 0.8,
    aggravate: 50000 / 1000 * 0.8
  }
}]
