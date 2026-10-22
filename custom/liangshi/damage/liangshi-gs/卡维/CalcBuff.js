import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '卡维技能：[繁绘隅穹] 队伍中自己的角色触发绽放反应产生的草原核，在迸发时造成的伤害提升[bloom]%,抗打断能力提升[_interruption]%',
  data: {
    bloom: ({ talent }) => talent.q['草原核迸发伤害加成'],
    _interruption: 50
  }
},
{
  check: ({ params }) => params.Painted_Dome === true,
  title: '卡维天赋：[工艺家的奇想] 在繁绘隅穹持续期间,普通攻击、重击或下落攻击命中敌人[buff]次，元素精通提升[mastery]点',
  data: {
    buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0),
    mastery: ({ params }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0)), 4) * 25
  }
},
{
  title: '卡维1命：[高门的谒礼] 施放画则巧施后,草元素抗性提升[_dendroRes]%,受治疗加成提升[healInc]%',
  cons: 1,
  data: {
  	_dendroRes: 50,
    healInc: 25
  }
},
{
  check: ({ params }) => params.Painted_Dome === true,
  title: '卡维2命：[御驿的径迹] 在繁绘隅穹持续期间,普通攻击的攻击速度提升[_aSpeed]%',
  cons: 2,
  data: {
    _aSpeed: 15
  }
},
{
  title: '卡维4命：[百柱的酣宴] 触发绽放反应产生的草原核在迸发时造成的伤害提升[bloom]%',
  cons: 4,
  data: {
    bloom: 60
  }
},
{
  title: '卡维6命：[天园的理想] 在繁绘隅穹持续期间，普通攻击、重击或下落攻击命中敌人时，将在敌人的位置释放天园之光',
  cons: 6
}]