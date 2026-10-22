import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Shrine_of_Maya === true,
  title: '纳西妲技能：[心景幻成] 队伍中火元素角色[_buffCountPyro]名,雷元素角色[_buffCountElectro]名,水元素角色[_buffCountPolearm]名,使元素战技「所闻遍计」的灭净三业造成的伤害提升[eDmg]%,触发的间隔时间降低[_eSpeed]秒,摩耶之殿的持续时间延长[_qSustainedPlus]秒 { 该效果单人不生效 }',
  data: {
    _buffCountPyro: ({ params }) => params.ElementFireTeam || 0,
    _buffCountElectro: ({ params }) => params.ElementMineTeam || 0,
    _buffCountPolearm: ({ params }) => params.ElementWaterTeam || 0,
    eDmg: ({ talent, params }) => (params.ElementFireTeam || 0) < 1 ? 0 : ((params.ElementFireTeam || 0) < 2 ? talent.q['火1伤害提升'] : talent.q['火2伤害提升']),
    _eSpeed: ({ talent, params }) => (params.ElementMineTeam || 0) < 1 ? 0 : ((params.ElementMineTeam || 0) < 2 ? talent.q['雷1间隔降低'] : talent.q['雷2间隔降低']) ,
    _qSustainedPlus: ({ talent, params }) => (params.ElementWaterTeam || 0) < 1 ? 0 : ((params.ElementWaterTeam || 0) < 2 ? talent.q['水1持续时间延长'] : talent.q['水2持续时间延长'])
  }
},
{
  check: ({ params }) => params.Shrine_of_Maya === true && !params.TruceTime,
  title: '纳西妲天赋：[净善摄受明论] 提高领域内当前场上角色元素精通[mastery]点',
  sort: 7,
  data: {
    mastery: ({ calc, attr }) => Math.min(250, calc(attr.mastery) * 25 / 100)
  }
},
{
  check: ({ params }) => params.Tri_Karma_Purification === true,
  title: '纳西妲天赋：[净善摄受明论] 所闻遍计的灭净三业造成的伤害提升[eDmg]%，暴击率提升[eCpct]%',
  sort: 9,
  data: {
    eDmg: ({ calc, attr }) => Math.max((Math.min(80, (calc(attr.mastery) - 200) * 0.1)), 0),
    eCpct: ({ calc, attr }) => Math.max((Math.min(24, (calc(attr.mastery) - 200) * 0.03)), 0)
  }
},
{
  check: ({ params }) => params.Shrine_of_Maya === true,
  title: '纳西妲1命：[心识蕴藏之种] 使元素战技「所闻遍计」的灭净三业造成的伤害额外提升[eDmg]%,触发的间隔时间额外降低[_eSpeed]秒,摩耶之殿的持续时间额外延长[_qSustainedPlus]秒 ',
  cons: 1,
  data: {
    eDmg: ({ talent, params }) => (params.ElementFireTeam || 0) < 1 ? talent.q['火1伤害提升'] : ((params.ElementFireTeam || 0) < 2 ? (talent.q['火2伤害提升'] - talent.q['火1伤害提升']) : 0),
    _eSpeed: ({ talent, params }) => (params.ElementMineTeam || 0) < 1 ? talent.q['雷1间隔降低'] : ((params.ElementMineTeam || 0) < 2 ? (talent.q['雷2间隔降低'] - talent.q['雷1间隔降低']) : 0),
    _qSustainedPlus: ({ talent, params }) => (params.ElementWaterTeam || 0) < 1 ? talent.q['水1持续时间延长'] : ((params.ElementWaterTeam || 0) < 2 ? (talent.q['水2持续时间延长'] - talent.q['水1持续时间延长']) : 0)
  }
},
{
  title: '纳西妲2命：[正等善见之根] 处于蕴种印状态下的敌人受到原激化、超激化、蔓激化反应影响后,防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 30
  }
},
{
  title: '纳西妲4命：[比量现行之茎] 附近处于所闻遍计的蕴种印状态下的敌人数量为[buffCount]个时,元素精通提升[mastery]点',
  cons: 4,
  data: {
    buffCount: ({ params }) => params.EnemiesNumber || 4,
    mastery: ({ params }) => Math.min(((params.EnemiesNumber || 4) * 20 + 80), 160)
  }
},
{
  title: '纳西妲6命：[大辨圆成之实] 施放心景幻成后，普通攻击或重击命中处于所闻遍计的蕴种印状态下的敌人时，将对该敌人及其所处连结中的所有敌人释放灭净三业·业障除',
  cons: 6
}]