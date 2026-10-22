import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => !params.TruceTime,
  title: '芭芭拉天赋：[光辉的季节] 角色在演唱，开始♪的歌声之环中时，体力消耗降低[_staminaPct]%。',
  data: {
    _staminaPct: 15
  }
},
{
  title: '芭芭拉天赋：[安可] 当前场上自己的角色获得元素晶球或元素微粒时，延长演唱，开始♪歌声之环的持续时间[_eSustainedPlus]秒。',
  data: {
    _eSustainedPlus: 5
  }
},
{
  title: '芭芭拉1命：[彩色歌谣] 每10.0秒恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    _energyevery: 1
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '芭芭拉2命：[元气迸发] 演唱，开始♪的冷却时间降低[_energyevery]%，当前场上自己的角色获得[dmg]%元素伤害加成。',
  cons: 2,
  data: {
    _eCd: 15,
    dmg: 15
  }
},
{
  title: '芭芭拉4命：[努力即魔法] 使用重击时命中[buff]个敌人，恢复[_energyevery]点元素能量。',
  cons: 4,
  data: {
    buff: ({ params }) => params.ChargedHit || 0,
    _energyevery: ({ params }) => Math.min((params.ChargedHit || 0), 5)
  }
},
{
  title: '芭芭拉6命：[将一切美好献给你] 队伍中自己的角色倒下时，则立即复苏该角色；将该角色生命值恢复至100.0％',
  cons: 6
}]