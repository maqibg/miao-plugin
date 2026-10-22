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
  title: '旅行者天赋：[破碎的绝岩] 星陨剑的冷却时间减少[_ecdPlus]秒',
  data: {
    _ecdPlus: 2
  }
},
{
  title: '旅行者1命：[巍然的青岩] 队伍中角色处于岩潮叠嶂的岩嶂包围中时，暴击率提升[cpct]%，并提高抗打断能力[_interruption]%。',
  check: ({ params }) => params.Wake_of_Earth === true && !params.TruceTime,
  cons: 1,
  data: {
    cpct: 10,
    _interruption: 70
  }
},
{
  title: '旅行者4命：[巍然的青岩] 岩潮叠嶂引发的震荡波击中敌人，会恢复[_energyevery]点元素能量。',
  cons: 4,
  data: {
    _energyevery: 25
  }
},
{
  title: '旅行者6命：[永世的磐岩] 岩潮叠嶂的岩嶂持续时间延长[_qSustainedPlus]秒；星陨剑的荒星持续时间延长[_eSustainedPlus]秒。',
  cons: 6,
  data: {
    _qSustainedPlus: 5,
    _eSustainedPlus: 10
  }
}]