import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '五郎天赋：[报恩之守] 犬坂吠吠方圆阵的技能伤害提高[ePlus]，兽牙逐突形胜战法的技能伤害与岩晶崩破伤害提高[qPlus]',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.def) * 156 / 100,
    qPlus: ({ attr, calc }) => calc(attr.def) * 15.6 / 100
  }
},
{
  check: ({ params }) => params.Generals_Glory === true,
  title: '五郎天赋：[不畏风雨] 施放兽牙逐突形胜战法后,附近的队伍中所有角色的防御力提升[defPct]%',
  data: {
   defPct: 25
  }
},
{
  check: ({ params }) => params.Generals_War_Banner === true && !params.TruceTime,
  title: '五郎技能：[犬坂吠吠方圆阵] 为其领域内的当前场上角色赋予[defPlus]点防御力',
  data: {
    defPlus: ({ talent }) => talent.e['防御力提升']
  }
},
{
  title: '五郎技能：[犬坂吠吠方圆阵] 为其领域内的当前场上角色赋予[dmg]%元素伤害加成,提升[_interruption]%抗打断能力',
  data: {
    _interruption: ({ params }) => (params.ElementRockTeam || 0) >= 2 ? 50 : 0,
    dmg: ({ params }) => (params.ElementRockTeam || 0) >= 3 ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  title: '五郎1命：[犬奔•疾如风] 处于大将旗指物或大将威仪领域中的当前场上角色对敌人造成岩元素伤害后犬坂吠吠方圆阵冷却时间减少[_cdPlus]秒',
  cons: 1,
  data: {
    _cdPlus: 2
  }
},
{
  title: '五郎2命：[犬坐•稳如钟] 在大将威仪的持续期间,附近的当前场上角色获取结晶反应产生的晶片后,大将威仪的持续时间延长[_qSustainedPlus]秒',
  cons: 2,
  data: {
    _qSustainedPlus: 1
  }
},
{
  title: '五郎6命：[犬勇•忠如山] 施放犬坂吠吠方圆阵或兽牙逐突形胜战法后提高附近的队伍中所有角色元素伤害[cdmg]%的暴击伤害',
  cons: 6,
  data: {
    cdmg: ({ params }) => Math.min(((params.ElementRockTeam || 0) * 10 + ((params.ElementRockTeam || 0) >= 3 ? 10 : 0)), 40)
  }
}]