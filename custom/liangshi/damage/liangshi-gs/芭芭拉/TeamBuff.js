export const TeamBuff_Barbara = [
{
  check: ({ params }) => params.team === true && params.Barbara === true && !params.TruceTime,
  title: '芭芭拉天赋：[光辉的季节] 角色在演唱，开始♪的歌声之环中时，体力消耗降低[_staminaPct]%。',
  data: {
    _staminaPct: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Barbara === true && !params.TruceTime,
  title: '芭芭拉2命：[元气迸发] 演唱，开始♪技能持续期间当前场上自己的角色获得[dmg]%元素伤害加成。',
  cons: 2,
  data: {
    dmg: ({ element, params }) => ['水'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Barbara === true && !params.TruceTime,
  title: '芭芭拉6命：[将一切美好献给你] 队伍中自己的角色倒下时，则立即复苏该角色；将该角色生命值恢复至100.0％',
  cons: 6
}]