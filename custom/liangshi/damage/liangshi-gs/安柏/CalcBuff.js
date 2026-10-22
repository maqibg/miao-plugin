import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '安柏天赋：[百发百中!] 箭雨的暴击率提高[qCpct]%，影响范围扩大30.0%。',
  data: {
    qCpct: 10
  }
},
{
  check: ({ params }) => params.ChargedHit > 0,
  title: '安柏天赋：[压制射击] 瞄准射击命中弱点时，攻击力提高[atkPct]%',
  data: {
    atkPct: 15
  }
},
{
  title: '安柏1命：[一箭双丘丘!] 瞄准射击时，会连续射出2.0支箭。',
  cons: 1
},
{
  check: ({ params }) => params.ChargedProgress === true,
  title: '安柏2命：[一触即发] 蓄力完成的瞄准射击命中兔兔伯爵脚部时，能直接引爆兔兔伯爵额外造成[eDmg]%伤害。',
  cons: 2,
  data: {
    eDmg: 200
  }
},
{
  title: '安柏4命：[才不是普通的布偶] 爆弹玩偶的冷却时间减少[_ecdPct]%，并增加[_eIncreases]次可使用次数。',
  cons: 4,
  data: {
    _ecdPct: 20,
    _eIncreases: 1
  }
},
{
  check: ({ params }) => params.BurstUse > 0,
  title: '安柏6命：[疾如野火] 使用箭雨后，队伍中所有角色的移动速度提升[_jSpeed]%，攻击力提升[_eIncreases]%。',
  cons: 6,
  data: {
    _jSpeed: 15,
    atkPct: 15
  }
}]