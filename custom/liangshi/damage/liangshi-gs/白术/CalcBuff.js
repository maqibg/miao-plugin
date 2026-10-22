import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '白术天赋：[五运终天] 当前角色的生命值[buff]%，获得[heal]%治疗加成，[dmg]%元素伤害加成',
  passive: 1,
  data: {
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    dmg: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) >= 50 ? 25 : 0,
    heal: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) >= 50 ? 0 : 20
  }
},
{
  title: '白术天赋：[在地为化] 受到无郤气护盾治疗的角色触发的燃烧、绽放、超绽放、烈绽放反应造成的伤害提升[bloom]%，超激化、蔓激化反应带来的伤害提升提高[spread]%',
  passive: 2,
  sort: 9,
  data: {
    bloom: ({ attr, calc }) => Math.min(calc(attr.hp), 50000) / 1000 * 2,
    burgeon: ({ attr, calc }) => Math.min(calc(attr.hp), 50000) / 1000 * 2,
    hyperBloom: ({ attr, calc }) => Math.min(calc(attr.hp), 50000) / 1000 * 2,
    spread: ({ attr, calc }) => Math.min(calc(attr.hp), 50000) / 1000 * 0.8,
    aggravate: ({ attr, calc }) => Math.min(calc(attr.hp), 50000) / 1000 * 0.8
  }
},
{
  title: '白术1命：[呿吟至微] 太素诊要的可使用次数增加[_eIncreases]次。',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  title: '白术2命：[动静精明] 队伍中自己的当前场上角色在攻击命中附近的敌人时，将释放游丝徵灵·切。',
  cons: 2
},
{
  check: ({ params }) => params.BurstUse > 0,
  title: '白术4命：[法古观冥] 施放愈气全形论之后，队伍中附近的所有角色元素精通提升[mastery]点',
  cons: 4,
  data: {
    mastery: 80
  }
},
{
  title: '白术6命：[真邪合离] 愈气全形论的灵气脉造成的伤害提高[qPlus]%',
  cons: 6,
  data: {
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.08
  }
}]
