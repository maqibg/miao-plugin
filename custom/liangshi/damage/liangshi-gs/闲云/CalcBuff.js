import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '闲云天赋：[霜翎高逐祥风势] 朝起鹤云的闲云冲击波命中[buffCount]个敌人,使角色的下落攻击的暴击率提升[a3Cpct]%',
  data: {
    buffCount: ({ params }) => params.PlungingHit || 0,
    a3Cpct: ({ params }) => Math.min(10, (params.PlungingHit || 0) * 2 + ((params.PlungingHit || 0) == 0 ? 0 : 2))
  }
},
{
  check: ({ params }) => !params.TruceTime && params.Starwicker != false,
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  sort: 9,
  data: {
    a3Plus: ({ attr, calc }) => Math.min(calc(attr.atk) * 200 / 100, 9000)
  }
},
{
  title: '闲云1命：[借风洗尘缘] 朝起鹤云的可用次数增加[_eIncreases]次。',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  title: '闲云2命：[鹤唳远人间] 施放朝起鹤云后,攻击力提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  check: ({ params }) => !params.TruceTime && params.Starwicker != false,
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  sort: 9,
  cons: 2,
  data: {
    a3Plus: ({ attr, calc }) => Math.min(calc(attr.atk) * 200 / 100, 9000)
  }
},
{
  title: '闲云6命：[知是留云僊] 在一次朝起鹤云的鹤云幻化期间施展了[buffCount]次步天梯后,该次鹤云幻化期间的闲云冲击波的暴击伤害提升[a3Cdmg]%,若暮集竹星的竹星拥有仙力助推,则朝起鹤云不进入冷却',
  cons: 6,
  data: {
    buffCount: ({ params }) => params.SkillsUse || 1,
    a3Cdmg: ({ params }) => (5 / 3) * Math.pow((params.SkillsUse || 1), 3) - (5 / 2) * Math.pow((params.SkillsUse || 1), 2) + (95 / 6) * (params.SkillsUse || 1)
  }
}]
