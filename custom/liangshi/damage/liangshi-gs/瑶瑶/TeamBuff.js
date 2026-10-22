export const TeamBuff_Yao_Yao = [
{
  check: ({ params }) => params.team === true && params.Yao_Yao === true && !params.TruceTime,
  title: '瑶瑶1命：[妙受琼阁] 白玉萝卜炸裂时,处在其影响范围内的当前场上角色获得[dmg]%元素伤害加成并恢复[_stamina]点体力',
  cons: 1,
  data: {
    dmg: ({ element, params }) => ['草'].includes(element) ? (params.phy === true ? 0 : 15) : 0,
    _stamina: 15
  }
}]
