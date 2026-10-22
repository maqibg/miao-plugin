import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '嘉明天赋：[祥烟瑞气] 当前生命值[buff]%，获得[healInc]%受治疗加成。下落攻击·踏云献瑞造成的伤害提升[a3Dmg]%。',
  data: {
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    healInc: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) < 50 ? 20 : 0,
    a3Dmg: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) < 50 ? 0 : 20
  }
},
{
  title: '嘉明2命：[步踏梅花] 受到治疗回复量溢出，攻击力提升[atkPct]%',
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '嘉明4命：[云里翻山] 下落攻击·踏云献瑞命中敌人时恢复[_energyevery]点元素能量。',
  cons: 4,
  data: {
    _energyevery: 2
  }
},
{
  title: '嘉明6命：[百兽俱驯] 下落攻击·踏云献瑞的暴击率提升[a3Cpct]%，暴击伤害提升[a3Cdmg]%，攻击范围提升。',
  cons: 6,
  data: {
    a3Cpct: 20,
    a3Cdmg: 40
  }
}]
