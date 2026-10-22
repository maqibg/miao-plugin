export const TeamBuff_Cartethyia = [
  {
    check: ({ params }) => params.team === true && params.Cartethyia === true,
    title: '卡提希娅技能：[听骑士从心祈愿] 自身一定范围内，目标风蚀效应触发的间隔减少[buff]%，并使目标受到的风蚀效应伤害加深[erosion]%',
    data: {
      buff: 50,
      erosion: 50
    }
  },
  {
    check: ({ params, element }) => params.team === true && params.Cartethyia === true && element === '气动',
    title: '卡提希娅延奏：[听风潮为你祝颂] 对拥有【异常效应】的目标造成的伤害加深[dmg]%',
    data: {
      dmg: 17.5
    }
  }
]
