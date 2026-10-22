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
  title: '旅行者2命：[革新的旋风] 元素充能效率提升[recharge]%',
  cons: 2,
  data: {
    recharge: 16
  }
},
{
  title: '旅行者4命：[眷护的和风] 风涡剑持续期间，受到的伤害降低[_reduction]%',
  cons: 4,
  data: {
    _reduction: 10
  }
},
{
  title: '旅行者6命：[纠缠的信风] 受到风息激荡伤害的目标，元素抗性下降[kx]%',
  check: ({ params }) => params.Gust_Surge === true,
  cons: 6,
  data: {
    kx: 20
  }
}]
