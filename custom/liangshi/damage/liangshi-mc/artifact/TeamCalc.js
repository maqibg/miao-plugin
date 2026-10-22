export const TeamArtifact = {
  凝夜白霜: false,
  熔山裂谷: false,
  彻空冥雷: false,
  啸谷长风: false,
  浮星祛暗: false,
  沉日劫明: false,
  不绝余音: false,
  凌冽决断之心: false,
  此间永驻之光: false,
  无惧浪涛之勇: false,
  愿戴荣光之旅: false,
  隐世回光: {
    title: '队友声骸合鸣：[隐世回光] 全队攻击力提升[atkPct]%',
    data: {
      atkPct: 15
    }
  },
  轻云出月: {
    title: '队友声骸合鸣：[轻云出月] 攻击力提升[atkPct]%',
    data: {
      atkPct: 22.5
    }
  },
  幽夜隐匿之帷: {
    check: ({ element}) => element === '湮灭',
    title: '队友声骸合鸣：[幽夜隐匿之帷] 伤害加成提升[dmg]%',
    data: {
      atkPct: 22.5
    }
  },
  高天共奏之曲: {
    title: '队友声骸合鸣：[高天共奏之曲] 攻击力提升[atkPct]%',
    data: {
      atkPct: 20
    }
  },
  流云逝尽之空: {
    check: ({ element}) => element === '气动',
    title: '队友声骸合鸣：[流云逝尽之空] 伤害提升[dmg]%',
    data: {
      dmg: 15
    }
  },
  奔狼燎原之焰: {
    check: ({ element}) => element === '热熔',
    title: '队友声骸合鸣：[奔狼燎原之焰] 伤害提升[dmg]%',
    data: {
      dmg: 15
    }
  }
}
