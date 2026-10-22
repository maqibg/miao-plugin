import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementFireTeam >= 1 && params.ElementMineTeam >= 1,
  title: '夏沃蕾天赋：[尖兵协同战法] 队伍中所有角色的元素类型均为火元素与雷元素，并且至少有一名火元素角色、一名雷元素角色时,角色触发超载反应后，受本次反应影响的敌人的元素抗性降低[kx]%',
  data: {
    kx: 40
  }
},
{
  title: '夏沃蕾天赋：[纵阵武力统筹] 发射近迫式急促拦射的「超量装药弹头」后将攻击力提升[atkPct]%',
  sort: 9,
  data: {
    atkPct: ({ calc, attr }) => Math.min(40 , calc(attr.hp) / 1000)
  }
},
{
  check: ({ params }) => [params.ElementWindTeam, params.ElementRockTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementFireTeam >= 1 && params.ElementMineTeam >= 1,
  title: '夏沃蕾1命：[稳固阵线的魄力] 当前场上处于「协同战法」状态下对敌人触发超载反应时将恢复[kx]点元素能量',
  cons: 1,
  data: {
    _energyevery: ({ element }) => ['火', '雷'].includes(element) ? 6 : 0
  }
},
{
  title: '夏沃蕾2命：[诱导殉爆的狙击] 按施放近迫式急促拦射的射击命中时将在命中位置附近引发2次连锁殉爆,造成火元素伤害',
  cons: 2
},
{
  title: '夏沃蕾4命：[多重速射的秘诀] 施放圆阵掷弹爆轰术后，长按施放近迫式急促拦射的冷却时间降低[_eCd]%',
  cons: 4,
  data: {
    _eCd: 100
  }
},
{
  title: '夏沃蕾6命：[终结罪恶的追缉] 队伍中的角色受到「近迫式急促拦射」的治疗后，获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 60
  }
}]
