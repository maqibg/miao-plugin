export const TeamBuff_Hu_Tao = [
{
  check: ({ params }) => params.team === true && params.Hu_Tao === true,
  title: '胡桃4命：[伴君眠花房] 处于血梅香状态影响下的敌人被击败时，附近的队伍中所有角色的暴击率提高[cpct]%',
  cons: 4,
   data: {
    cpct: 12
   }
},
{
  check: ({ params }) => params.team === true && params.Hu_Tao === true,
  title: '胡桃天赋：[蝶隐之时] 蝶引来生施加的彼岸蝶舞状态结束后，队伍中所有角色的暴击率提高[cpct]%',
  data: {
    cpct: 12
  }
}]