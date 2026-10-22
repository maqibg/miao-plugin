import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '烈烧佑命护盾：[属性 - 火] 对火元素伤害有[_pyroShieldInc]%的额外吸收效果。',
  data: {
    _pyroShieldInc: 150
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '托马天赋：[甲衣交叠] 当前场上自己的角色获取或刷新烈烧佑命护盾时,护盾强效提升[shieldPlus]%',
  data: {
    shield: 5 * 5
  }
},
{
  title: '托马天赋：[烈火攻燔] 真红炽火之大铠的炽火崩破造成的伤害提高[qPlus]',
  sort: 9,
  data: {
    qPlus: ({ calc, attr }) => calc(attr.hp) * 2.2 / 100
  }
},
{
  title: '托马2命：[僚佐的才巧] 真红炽火之大铠的持续时间延长[_qSustainedPlus]秒。',
  cons: 2,
  data: {
    _qSustainedPlus: 3
  }
},
{
  title: '托马4命：[用臣的久计] 施放真红炽火之大铠后，恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 15
  }
},
{
  title: '托马6命：[炽烧的至心] 获取或刷新烈烧佑命护盾时,队伍中所有角色的普通攻击,重击与下落攻击造成的伤害提升[aDmg]%',
  cons: 6,
  data: {
    aDmg: 15,
    a2Dmg: 15,
    a3Dmg: 15
  }
}]