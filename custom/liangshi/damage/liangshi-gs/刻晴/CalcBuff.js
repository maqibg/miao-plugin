import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '刻晴天赋：[玉衡之贵] 施放天街巡游时,暴击率提升[cpct]%,元素充能效率提升[recharge]%',
  data: {
    cpct: 15,
    recharge: 15
  }
},
{
  title: '刻晴1命：[雷厉] 雷楔存在期间再次施放星斗归位时，在消失与出现的位置造成雷元素范围伤害。',
  cons: 1
},
{
  title: '刻晴4命：[调律] 触发雷元素相关反应后，攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 25
  }
},
{
  title: '刻晴6命：[调律] 进行普通攻击、重击、施放元素战技或元素爆发[buff]次，获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    buff: ({ params }) => ([params.BurstUse || 0, params.SkillsUse || 1, params.ChargedUse || 0, params.NormalUse|| 1]).filter(dmg => dmg >= 1).length,
    dmg: ({ params }) => Math.min((([params.BurstUse || 0, params.SkillsUse || 1, params.ChargedUse || 0, params.NormalUse|| 1]).filter(dmg => dmg >= 1).length * 6), 24)
  }
}]