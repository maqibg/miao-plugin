import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

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
  check: ({ params }) => params.Dewdrop === true,
  title: '旅行者技能：[水纹剑] 生命值[buff]%时长按施放，露滴造成的伤害将提高[ePlus]，并且每秒损失[_deHp]生命值。',
  data: {
    buff: ({ params, weapon, artis }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    ePlus: ({ params, weapon, artis, talent, calc, attr }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) >= 50 ? (calc(attr.hp) * talent.e['充盈伤害增加'] / 100) : 0,
    _deHp: ({ params, weapon, artis, calc, attr }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) >= 50 ? (calc(attr.hp) * 4 / 100) : 0
  }
},
{
  check: ({ params }) => params.Torrent_Surge === true,
  title: '旅行者天赋：[澄明的净水] 长按施放水纹剑时如果通过充盈消耗了生命值，则在施放结束时的喷发激流造成的伤害提高[ePlus]',
  data: {
    ePlus: ({ params, weapon, artis, calc, attr }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) >= 50 ? Math.min(5000, ((calc(attr.hp) * 50 / 100) * 45 / 100)) : 0
  }
},
{
  title: '旅行者1命：[微澜的湖水] 拾取源水之滴后，将恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    _energyevery: 2
  }
},
{
  title: '旅行者2命：[潺涓的碧水] 扬水制流的浮水泡沫移动的速度降低30.0%，持续时间延长[_qSustainedPlus]秒。',
  cons: 2,
  data: {
    _qSustainedPlus: 3
  }
}]