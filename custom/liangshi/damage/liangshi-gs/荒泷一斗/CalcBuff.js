import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Raging_Oni_King === true,
  title: '荒泷一斗技能：[最恶鬼王·一斗轰临！！] 提高普通攻击的攻击速度[_aSpeed]%，并提高攻击力[atkPlus]%，所有抗性提升[_res]%',
  data: {
    _aSpeed: 10,
    atkPlus: ({ attr, calc, talent }) => talent.q['攻击力提高'] * calc(attr.def) / 100,
    _res: -20
  }
},
{
  title: '荒泷一斗天赋：[荒泷第一] 施展连续[buff]次「荒泷逆袈裟」，斩击攻击速度提升[_a2Speed]%,提升抗打断能力[_interruption]%',
  data: {
    buff: ({ params }) => params.ChargedUse || 0,
    _a2Speed: ({ params }) => Math.min((params.ChargedUse || 0) * 10, 30),
    _interruption: 100
  }
},
{
  title: '荒泷一斗天赋：[赤鬼之血] 「荒泷逆袈裟」造成的伤害提高[a2Plus]',
  data: {
    a2Plus: ({ attr, calc }) => calc(attr.def) * 0.35
  }
},
{
  title: '荒泷一斗2命：[纠集众人，斗倒御岳] 施放最恶鬼王•一斗轰临！！后，队伍中[buff]个岩元素角色，冷却时间减少[_qcdPlus]秒，元素能量恢复[_energyevery]点',
  cons: 2,
  data: {
    buff: ({ params }) => params.ElementRockTeam || 0,
    _qcdPlus: ({ params }) => Math.min((params.ElementRockTeam || 0) * 1.5, 4.5),
    _energyevery: ({ params }) => Math.min((params.ElementRockTeam || 0) * 6, 18)
  }
},
{
  check: ({ params }) => params.Raging_Oni_King !== true,
  title: '荒泷一斗4命：[纠集众人，斗倒御岳] 最恶鬼王•一斗轰临！！施加的「怒目鬼王」状态结束后，附近的队伍中所有角色的防御力提升[defPct]%，攻击力提升[atkPct]%',
  cons: 4,
  data: {
    defPct: 20,
    atkPct: 20
  }
},
{
  title: '荒泷一斗6命：[在下荒泷一斗是也] 重击的暴击伤害提高[a2Cdmg]%',
  cons: 6,
  data: {
    a2Cdmg: 70
  }
}]
