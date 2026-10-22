import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '鹿野院平藏1命：[称名少年事件簿] 场后普通攻击的攻击速度提升[_aSpeed]%',
  cons: 6,
  data: {
    _aSpeed: 15
  }
},
{
  title: '鹿野院平藏2命：[不羁型贝特] 聚风蹴产生的缉拿风穴的牵引效果获得提升，并将持续时间延长至[_qSustainedPlus]秒',
  cons: 2,
  data: {
    _qSustainedPlus: 1
  }
},
{
  title: '鹿野院平藏4命：[虚言假说百物语] 在一次聚风蹴中,「聚风真眼」爆发将恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 13.5
  }
},
{
  title: '鹿野院平藏6命：[奇想天开捕物帐] [_energyevery]层「变格」,提高本次勠心拳[eCpct]%暴击率,[eCdmg]%%暴击伤害',
  cons: 6,
  data: {
    _energyevery: ({ params }) => params.Declension || 0,
    eCpct: ({ params }) => (params.Declension || 0) * 4,
    eCdmg: ({ params }) => (params.Declension || 0) >= 4 ? 32 : 0
  }
}]