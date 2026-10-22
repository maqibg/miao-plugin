import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '珊瑚宫心海天赋：[庙算无遗] 治疗加成提升[_heal]%，暴击率提升[_cpct]%',
  data: {
    _cpct: -100,
    _heal: 25
  }
},
{
  check: ({ params }) => params.Ceremonial_Garment != false,
  title: '珊瑚宫心海天赋：[庙算无遗] 处于海人化羽的仪来羽衣状态下时普通攻击和重击造成的伤害获得额外[a2Plus]提升',
  sort: 9,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.hp) * calc(attr.heal) * 0.15 / 100,
    a2Plus: ({ attr, calc }) => calc(attr.hp) * calc(attr.heal) * 0.15 / 100
  }
},
{
  check: ({ params }) => params.Ceremonial_Garment != false,
  title: '珊瑚宫心海技能：[海人化羽] 增加普通攻击[aPlus]、重击[a2Plus]以及元素战技的「化海月」[ePlus]点伤害,抗打断能力提升[_interruption]%',
  sort: 9,
  data: {
    aPlus: ({ attr, talent, calc }) => calc(attr.hp) * talent.q['普通攻击伤害提升'] / 100,
    a2Plus: ({ attr, talent, calc }) => calc(attr.hp) * talent.q['重击伤害提升'] / 100,
    ePlus: ({ attr, talent, calc }) => calc(attr.hp) * talent.q['化海月伤害提升'] / 100,
    _interruption: 75
  }
},
{
  title: '珊瑚宫心海1命：[决水于溪] 处于海人化羽的仪来羽衣状态下时，普通攻击的最后一击会额外释放一只游鱼',
  cons: 1
},
{
  title: '珊瑚宫心海2命：[波起云海] 对生命值[buff]%的角色进行治疗的回复量获得提升,提升海月之誓的化海月[_eHealplus]点和海人化羽的普通攻击与重击[_aHealplus]点基础治疗',
  sort: 9,
  cons: 2,
  data: {
    buff: ({ params, weapon, artis }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    _eHealplus: ({ attr, calc, params, weapon, artis }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : (calc(attr.hp) * 4.5 / 100),
    _aHealplus: ({ attr, calc, params, weapon, artis }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : (calc(attr.hp) * 0.6 / 100)
  }
},
{
  check: ({ params }) => params.Ceremonial_Garment != false,
  title: '珊瑚宫心海4命：[月摄千川] 处于海人化羽的仪来羽衣状态下时，普通攻击的攻击速度提升[_aSpeed]%并会在普通攻击命中敌人时，恢复[_energyevery]元素能量',
  cons: 4,
  data: {
    _aSpeed: 10,
    _energyevery: 0.8
  }
},
{
  check: ({ params }) => params.Ceremonial_Garment != false,
  title: '珊瑚宫心海6命：[珊瑚一心] 处于海人化羽的仪来羽衣状态下时，普通攻击和重击为生命值高于或等于80.0%的角色恢复生命后，将获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 40
  }
}]