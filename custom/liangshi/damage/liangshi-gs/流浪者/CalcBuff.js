import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Windfavored != false,
  title: '流浪者技能：[羽画·风姿华歌] 「优风倾姿」状态下,普通攻击转换为「空居·不生断」,造成伤害提高[aMulti]%,重击转换为「空居·刀风界」,造成伤害提高[a2Multi]%',
  data: {
    aMulti: ({ talent }) => talent.e['空居·不生断伤害'] - 100,
    a2Multi: ({ talent }) => talent.e['空居·刀风界伤害'] - 100
  }
},
{
  check: ({ params, cons }) => params.Windfavored != false && ((((params.ElementWaterTeam || 0) >= 1) && (((Math.min((params.ElementMineTeam || 0), 1) + Math.min((params.ElementIceTeam || 0), 1) + Math.min((params.ElementFireTeam || 0), 1)) < 2) || ((params.ElementMineTeam || 0) >= 1) && (( Math.min((params.ElementIceTeam || 0), 1) + Math.min((params.ElementFireTeam || 0), 1)) < 2))) || (((cons >= 4) && ((params.ElementFireTeam || 0) >= 1) && (params.ElementIceTeam || 0) >= 1) && (((params.ElementWaterTeam || 0) >= 1) || ((params.ElementMineTeam || 0) == 0)))),
  title: '流浪者天赋：[拾玉得花] 施放羽画·风姿华歌时,接触了水元素,在此次优风倾姿状态下获得额外20.0点空居力'
},
{
  check: ({ params, cons }) => params.Windfavored != false && ((((params.ElementMineTeam || 0) >= 1) && (Math.min((params.ElementWaterTeam || 0), 1) + Math.min((params.ElementIceTeam || 0), 1) + Math.min((params.ElementFireTeam || 0), 1) < 2)) || ((cons >= 4) && ((params.ElementMineTeam || 0) >= 1) && (Math.min((params.ElementWaterTeam || 0), 1) + Math.min((params.ElementIceTeam || 0), 1) + Math.min((params.ElementFireTeam || 0), 1) == 2))),
  title: '流浪者天赋：[拾玉得花] 施放羽画·风姿华歌时,接触了雷元素,在此次优风倾姿状态下普通攻击与重击命中敌人后,恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 0.8
  }
},
{
  check: ({ params, cons }) => params.Windfavored != false && (((params.ElementFireTeam || 0) >= 1) || ((cons >= 4) && ((Math.min((params.ElementWaterTeam || 0), 1) + Math.min((params.ElementIceTeam || 0), 1) + Math.min((params.ElementMineTeam || 0), 1)) < 3))),
  title: '流浪者天赋：[拾玉得花] 施放羽画·风姿华歌时,接触了火元素,在此次优风倾姿状态下攻击力提升[atkPct]%',
  data: {
    atkPct: 30
  }
},
{
  check: ({ params, cons }) => params.Windfavored != false && (((params.ElementIceTeam || 0) >= 1) || ((cons >= 4) && ((params.ElementFireTeam || 0) >= 1) && ((Math.min((params.ElementWaterTeam || 0), 1) + Math.min((params.ElementMineTeam || 0), 1)) < 2))),
  title: '流浪者天赋：[拾玉得花] 施放羽画·风姿华歌时,接触了冰元素,在此次优风倾姿状态下暴击率提升[cpct]%',
  data: {
    cpct: 20
  }
},
{
  check: ({ params }) => params.Windfavored != false,
  title: '流浪者1命：[初番·茂风流羽行] 在优风倾姿状态下，空居·不生断与空居·刀风界的攻击速度提升[_aSpeed]%,固有天赋「梦迹一风」发射的风矢能额外造成伤害',
  sort: 9,
  cons: 1,
  data: {
    _aSpeed: 10
  }
},
{
  check: ({ params }) => params.Windfavored != false,
  title: '流浪者2命：[二番·箙岛月白浪] 在优风倾姿状态下,当前空居力的[buff],使狂言·式乐五番造成的伤害提升[qDmg]%',
  cons: 2,
  data: {
    buff: ({ params }) => params.Kuugoryoku_Points || 44,
    qDmg: ({ params }) => Math.min(((100 - (params.Kuugoryoku_Points || 44)) * 4), 200)
  }
},
{
  check: ({ params }) => params.Windfavored != false,
  title: '流浪者4命：[四番·花月歌浮舟] 施放羽画·风姿华歌时,还将随机获得1.0种本次施放未触发的强化效果',
  cons: 4
},
{
  check: ({ params }) => params.Windfavored != false,
  title: '流浪者6命：[祝言·霞幕倾松风] 在优风倾姿状态下,主动施放的空居·不生断命中敌人时,在命中的位置额外进行一次空居·不生断',
  cons: 6
}]
