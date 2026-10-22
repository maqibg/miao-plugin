export const TeamBuff_Ning_Guang = [
{
  check: ({ params }) => params.team === true && params.Ning_Guang === true,
  title: '凝光天赋：[储之千日，用之一刻] 穿过璇玑屏的角色会获得[dmg]%元素伤害加成',
  data: {
    dmg: ({ element, params }) => ['岩'].includes(element) ? (params.phy === true ? 0 : 12) : 0
  }
}]