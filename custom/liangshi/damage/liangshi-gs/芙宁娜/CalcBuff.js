import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Salon_Solitaire != undefined,
  title: '芙宁娜技能：[孤心沙龙] 「沙龙成员」进行攻击时,根据附近的队伍中生命值高于50.0%的角色数量,提升此次攻击造成的伤害为原本的1[_eDmg]%',
  data: {
    _eDmg: ({ params }) => params.Salon_Solitaire
  }
},
{
  check: ({ params }) => params.Fanfare != undefined,
  title: '芙宁娜技能：[万众狂欢] 持有[buffCount]层「气氛值」,附近的队伍中所有角色造成的伤害提升[dmg]%,受治疗加成提升[healInc]%',
  data: {
    buffCount: ({ params, cons }) => Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
    dmg: ({ talent, params, cons }) => talent.q['气氛值转化提升伤害比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
    phy: ({ talent, params, cons }) => talent.q['气氛值转化提升伤害比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
    healInc: ({ talent, params, cons }) => talent.q['气氛值转化受治疗加成比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0))
  }
},
{
  title: '芙宁娜天赋：[无人听的自白] 处于不同始基力属性下的孤心沙龙获得增益效果,「沙龙成员」造成的伤害提升[eDmg]%,「众水的歌者」为周围的当前场上角色恢复生命值的间隔降低[_eSpeed]%',
  data: {
    eDmg: ({ calc, attr }) => Math.min(28, (calc(attr.hp)) / 1000 * 0.7),
    _eSpeed: ({ calc, attr }) => Math.min(16, (calc(attr.hp)) / 1000 * 0.4)
  }
},
{
  check: ({ params }) => params.Fanfare != undefined,
  title: '芙宁娜1命：[爱是难驯鸟,哀乞亦无用.] 施放万众狂欢时，获得150点「气氛值」, 此外持有「气氛值」的上限提升100点.',
  cons: 1
},
{
  check: ({ params }) => params.Fanfare != undefined,
  title: '芙宁娜2命：[女人皆善变,仿若水中萍.] 基于「气氛值」超过上限[buffCount]层,使的生命值上限提升[hpPct]%',
  cons: 2,
  data: {
    buffCount: ({ params, cons }) => Math.max((params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0) - 400), 0),
    hpPct: ({ params, cons }) => Math.min(140, Math.max((params.Fanfare * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0) - 400), 0) * 0.35)
  }
},
{
  title: '芙宁娜4命：[若非处幽冥,怎知生可贵！] 孤心沙龙的「沙龙成员」命中敌人,或「众水的歌者」为周围的当前场上角色恢复生命值时,获得[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 4
  }
},
{
  check: ({ params }) => params.cons6 === true && params.jsl != undefined,
  title: '芙宁娜6命：[诸君听我颂，共举爱之杯！] 施放孤心沙龙时,芙宁娜的普通攻击、重击与下落攻击将转为无法被附魔覆盖的水元素伤害,且造成的伤害提升[_aPlus]点',
  sort: 9,
  cons: 6,
  data: {
    _aPlus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * (params.PrimordialDetermine == "pneuma" ? 1 : 0)),
    _a2Plus:({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * (params.PrimordialDetermine == "pneuma" ? 1 : 0)),
    _a3Plus:({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * (params.PrimordialDetermine == "pneuma" ? 1 : 0))
  }
}]
