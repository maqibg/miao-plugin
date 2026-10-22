import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => !params.TruceTime,
  title: '米卡天赋：[速射牵制] [BuffCount]层侦明,使角色处于场上时,造成的物理伤害提升[phy]%',
  data: {
    BuffCount: ({ params, cons }) => Math.min((params.Detector || 0), (cons >= 6 ? 4 : 3)),
    phy: ({ params, cons }) => Math.min(((params.Detector || 0) * 10), (cons >= 6 ? 40 : 30))
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '米卡技能：[星霜的流旋] 处于灵风状态下的角色处于场上时,攻击速度将获得[_aSpeed]%提升 ',
  data: {
    _aSpeed: ({ talent }) => talent.e['攻击速度提升']
  }
},
{
  title: '米卡1命：[遇合的因缘] 星霜的流旋产生的灵风状态能使苍翎的颂愿的鹰翎状态恢复生命值的间隔降低[_qSpeed]% ',
  cons: 1,
  data: {
    _qSpeed: ({ talent }) => talent.e['攻击速度提升']
  }
},
{
  title: '米卡4命：[晴霜的祝念] 苍翎的颂愿的鹰翎状态为队伍中的角色进行治疗时,恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 3
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '米卡6命：[依随的策援] 处于灵风状态下的当前场上角色,其物理伤害的暴击伤害提高[aCdmg]%,星霜的流旋灵风状态下的侦明效果叠加层数上限提升1.0层',
  cons: 6,
  data: {
    phyCdmg: ({ params }) => (params.Detector || 0) >= 1 ? 60 : 0
  }
}]
