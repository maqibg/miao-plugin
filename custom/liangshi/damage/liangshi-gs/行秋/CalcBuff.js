import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '行秋天赋：[虚实工笔] 获得[_dmg]％元素伤害加成',
  data: {
    _dmg: 20
  }
},
{
  title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
  data: {
    _interruption: 70,
    _reduction: ({ talent, attr, calc }) => talent.e['减伤比例'] + Math.min(24, calc(attr.dmg) * 0.2)
  }
},
{
  check: ({ params }) => params.Rainbow_Bladework === true,
  title: '行秋2命：[天青现虹] 古华剑·裁雨留虹的持续时间延长[_qSustainedPlus]秒,受到剑雨攻击的敌人元素抗性降低[kx]%',
  cons: 2,
  data: {
    _qSustainedPlus: 3,
    kx: 15
  }
},
{
  check: ({ params }) => params.Rainbow_Bladework === true,
  title: '行秋4命：[孤舟斩蛟] 在古华剑·裁雨留虹效果持续期间，古华剑·画雨笼山造成的伤害提升[eMulti]%',
  cons: 4,
  data: {
    eMulti: 50
  }
},
{
  check: ({ params }) => params.Rainbow_Bladework === true,
  title: '行秋6命：[万文集此] 古华剑·裁雨留虹每发动二次剑雨攻击,就大幅增强下一次剑雨攻击,并在命中敌人时恢复[_energyevery]点元素能量',
  cons: 6,
  data: {
    _energyevery: 3
  }
}]