import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Flying_Cloud_Flag_Formation === true,
  title: '云堇技能：[破嶂见旌仪] 对敌人造成普通攻击伤害时，提高造成的伤害[aPlus]%',
  sort: 9,
  data: {
    aPlus: ({ attr, calc, talent }) => calc(attr.def) * talent.q['伤害值提升'] / 100
  }
},
{
  check: ({ params }) => params.Flying_Cloud_Flag_Formation === true,
  title: '云堇天赋：[莫从恒蹊] 队伍存在[buff]种元素类型的角色时「飞云旗阵」提供的普通攻击伤害提高[aPlus]点',
  sort: 9,
  data: {
    buff: ({ params }) => [params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length,
    aPlus: ({ params, attr, calc }) => calc(attr.def) * ((([params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length) * 2.5) + (([params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length) >= 4 ? 1.5 : 0)) / 100
  }
},
{
  title: '云堇1命：[飞身趟马] 旋云开相的冷却时间减少[_ecdPct]%',
  cons: 1,
  data: {
    _ecdPct: 18
  }
},
{
  check: ({ params }) => params.Flying_Cloud_Flag_Formation === true,
  title: '云堇2命：[诸般切末] 施放破嶂见旌仪后，附近队伍中所有角色普通攻击造成的伤害提升[aDmg]%',
  cons: 2,
  data: {
    aDmg: 15
  }
},
{
  title: '云堇4命：[昇堂吊云] 触发结晶反应后，防御力提升[def]%',
  cons: 4,
  data: {
    def: 20
  }
},
{
  check: ({ params }) => params.Flying_Cloud_Flag_Formation === true,
  title: '云堇6命：[庄谐并举] 处于「飞云旗阵」状态下的角色，普通攻击的攻击速度提升[_aSpeed]%',
  cons: 6,
  data: {
    _aSpeed: 12
  }
}]
