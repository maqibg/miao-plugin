import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '任务加成：[第三章 第一幕「穿越烟帷与暗林」] 在任务「近在咫尺的目标」中使用「单手剑战斗技巧•八」后，基础攻击力提升[_atkPlus]点 { 此效果暂不参与计算 }',
  data: {
    _atkPlus: 3
  }
},
{
  title: '任务加成：[磷星之章 第一幕「星与夜的低语」] 在任务「特训」中完成特训后，基础生命值提升[_hpPlus]点，基础攻击力提升[_atkPlus]点，元素精通提升[_masteryPlus] { 此效果暂不参与计算 }',
  data: {
    _hpPlus: 50,
    _atkPlus: 10,
    _masteryPlus: 15
  }
},
{
  check: ({ params }) => params.SkillsAfter > 2,
  title: '旅行者技能：[雷影剑] 吸收丰穰勾玉，在持续时间内提高元素充能效率[recharge]%。',
  data: {
    recharge: ({ attr, calc }) => calc(attr.recharge) * 10 / 100 + 20
  }
},
{
  title: '旅行者天赋：[转瞬的迅雷] 队伍中附近的其他角色获取雷影剑产生的丰穰勾玉时，雷影剑的冷却时间减少[_ecdPlus]秒。 { 该效果单人不生效 }',
  data: {
    _ecdPlus: 1.5
  }
},
{
  title: '旅行者1命：[丰穰的春雷] 释放雷影剑能产生的丰穰勾玉数量提升至3枚',
  cons: 1
},
{
  title: '旅行者2命：[震怒的苍雷] 雷轰电转的威光命中敌人后，会使敌人的雷元素抗性降低[kx]%',
  check: ({ params }) => params.Lightning_Shroud === true,
  cons: 2,
  data: {
    kx: 15
  }
},
{
  title: '旅行者6命：[撼世的神雷] 雷轰电转每引发2.0次威光落雷，就使下一次威光落雷造成的伤害提高为原本的[_qDmg]%，并为当前角色额外恢复[_energyevery]点元素能量。',
  cons: 6,
  data: {
    _qDmg: 200,
    _energyevery: 1
  }
}]
