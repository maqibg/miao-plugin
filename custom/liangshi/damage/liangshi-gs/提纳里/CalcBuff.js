import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '提纳里天赋：[眼识殊明] 发射花筥箭后，元素精通提升[mastery]点',
  sort: 1,
  data: {
    mastery: 50
  }
},
{
  title: '提纳里天赋：[诸叶辨通] 重击与造生缠藤箭造成的伤害提升[a2Dmg]%',
  sort: 9,
  data: {
    a2Dmg: ({ calc, attr }) => Math.min(60, calc(attr.mastery) * 0.06),
    qDmg: ({ calc, attr }) => Math.min(60, calc(attr.mastery) * 0.06)
  }
},
{
  title: '提纳里1命：[由根须断定肇始] 重击的暴击率提高[a2Cpct]%',
  cons: 1,
  data: {
    a2Cpct: 15
  }
},
{
  title: '提纳里2命：[由茎干剖析来缘] 当识果种雷的识蕴领域中存在[buff]个敌人，获得[dmg]%元素伤害加成',
  cons: 2,
  data: {
    buff: ({ params }) => params.EnemiesNumber || 4,
    dmg: ({ params }) => (params.EnemiesNumber || 4) > 0 ? 20 : 0
  }
},
{
  check: ({ params }) => params.BurstProgress === true,
  title: '提纳里4命：[由片叶管窥枯荣] 施放造生缠藤箭时,队伍中附近的所有角色的元素精通提升[mastery]点',
  cons: 4,
  data: {
    mastery: ({ params }) => Math.min(((params.ReactionDmg || 0) * 60 + 60), 120)
  }
},
{
  title: '提纳里6命：[由硕实品论应果] 花筥箭所需的蓄力时间减少[_a2Speed]秒,并在命中后能产生1枚额外的藏蕴花矢',
  cons: 6,
  data: {
    _a2Speed: 0.9
  }
}]