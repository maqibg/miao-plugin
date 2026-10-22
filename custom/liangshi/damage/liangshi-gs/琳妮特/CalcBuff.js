import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Bogglecat_Box === true,
  title: '琳妮特天赋：[巧施协同] 施放魔术·运变惊奇后，队伍中分别存在[atkPct]种元素类型的角色,攻击力提升[atkPct]%',
  data: {
    buffCount: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementMineTeam, params.ElementFireTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].filter(elem => elem >= 1).length,
    atkPct: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementMineTeam, params.ElementFireTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].filter(elem => elem >= 1).length * 4 + 4
  }
},
{
  check: ({ params }) => params.Bogglecat_Box === true && params.BurstAfter > 0.1,
  title: '琳妮特天赋：[道具完备] 魔术·运变惊奇召唤的惊奇猫猫盒发生了元素转化后,元素爆发造成的伤害提高[qDmg]%',
  data: {
    qDmg: 15
  }
},
{
  title: '琳妮特2命：[层见叠出的谜象] 魔术·运变惊奇召唤的惊奇猫猫盒将额外发射一枚彩练术弹',
  cons: 2
},
{
  title: '琳妮特4命：[灵犀默应的配合] 谜影障身法的可使用次数增加[_eIncreases]次。',
  cons: 4,
  data: {
    _eIncreases: 1
  }
},
{
  title: '琳妮特6命：[示辨真意的眼] 施放谜影障身法的谜影突刺时,元素伤害加成提升[dmg]%',
  cons: 6,
  data: {
    dmg: 20
  }
}]
