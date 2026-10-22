import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '莱欧斯利技能：[冰牙突驰] 提高抗打断能力[_interruption]%，当前生命值[buff]%，强化「普通攻击·迅烈倾霜拳」的斥逐拳，使其造成的伤害提升[aMulti]%',
  data: {
    _interruption: 50,
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    aMulti: ({ talent, params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) >= 50 ? (talent.e['强化斥逐拳伤害'] - 100) : 0
  }
},
{
  title: '莱欧斯利天赋：[公理终有辩诉之日] 当前生命值[buff]%，将使下次普通攻击·迅烈倾霜拳的重击体力消耗降低[_a2Stamina]%，造成的伤害提升[a2Dmg]%',
  data: {
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    _a2Stamina: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) < 60 ? 100 : 0,
    a2Dmg: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) < 60 ? 50 : 0
  }
},
{
  title: '莱欧斯利天赋：[罪业终有报偿之时] 当前生命值提升或降低[buffCount]次，使攻击力提升[atkPct]%',
  data: {
    buffCount: ({ params }) => (params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0),
    atkPct: ({ params }) => Math.min((((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)) * 6), 30)
  }
},
{
  title: '莱欧斯利1命：[予行恶者以惩惧] 惩戒·凌跃拳造成的伤害提升进一步提升[a2Dmg]%，命中时惩裁状态持续期间延长[_eSustainedPlus]秒',
  cons: 1,
  data: {
    a2Dmg: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) < 60 ? 150 : 0,
    _eSustainedPlus: 4
  }
},
{
  title: '莱欧斯利2命：[予骄暴者以镣锁] 施放黑金狼噬时，拥有[buffCount]层「检偿之敕」效果，都将使造成的伤害提升[qDmg]%',
  cons: 2,
  data: {
    buffCount: ({ params }) => (params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0),
    qDmg: ({ params }) => Math.min((((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)) * 40), 200)
  }
},
{
  title: '莱欧斯利4命：[予贞苦者以拯赎] 惩戒·凌跃拳恢复生命值的回复量提升，此外受到治疗时治疗回复量溢出，攻击速度提升[_aSpeed]%',
  cons: 4,
  data: {
    _aSpeed: 20
  }
},
{
  title: '莱欧斯利6命：[予无罪者以念抚] 惩戒·凌跃拳的暴击率提升[a2Cpct]%暴击伤害提升[a2Cdmg]%，并能够额外生成冰锥',
  cons: 6,
  data: {
    a2Cpct: 10,
    a2Cdmg: 80
  }
}]
