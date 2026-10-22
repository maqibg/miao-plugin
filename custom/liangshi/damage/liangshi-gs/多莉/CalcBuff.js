import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '多莉技能：[卡萨扎莱宫的无微不至] 与灯中幽精相连的角色持续获得[_energyevery]点元素能量。',
  data: {
    _energyevery: ({ talent }) => talent.q['元素能量恢复']
  }
},
{
  title: '多莉天赋：[披沙沥金] 与灯中幽精相连的角色在触发感电、超导、超载、原激化、超激化、超绽放、雷元素扩散或雷元素结晶反应后，镇灵之灯·烦恼解决炮的冷却时间缩短[_eCdPlus]秒。',
  data: {
    _eCdPlus: 1
  }
},
{
  title: '多莉天赋：[利上加利] 镇灵之灯·烦恼解决炮的断除烦恼炮或售后服务弹命中敌人时，恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: ({ attr, calc }) => Math.min(15, (calc(attr.recharge) / 100 * 5))
  }
},
{
  title: '多莉1命：[追加投资] 断除烦恼炮命中后产生的售后服务弹增加1.0枚。',
  cons: 1
},
{
  title: '多莉2命：[特许经营] 当灯中幽精为相连的角色进行治疗时，将从该角色处发射一枚镇灵炮，造成雷元素伤害。',
  cons: 2
},
{
  title: '多莉4命：[酌盈剂虚] 当前生命值[buffHp]%，元素能量[buffRec]%，提升[healInc]%受治疗加成；提升[recharge]%元素充能效率。',
  cons: 4,
  data: {
    buffHp: ({ params, artis }) => params.OwnHp || ((artis['战狂'] === 4) ? 30 : 100),
    buffRec: ({ params }) => params.EnergyDetermine || 100,
    healInc: ({ params, artis }) => (params.OwnHp || ((artis['战狂'] === 4) ? 30 : 100)) >= 50 ? 0 : 50,
    recharge: ({ params }) => (params.EnergyDetermine || 100) >= 50 ? 0 : 30
  }
}]