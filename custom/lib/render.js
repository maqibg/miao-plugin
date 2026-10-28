/**
 * 面板出图（权重、计算、引导式共用）
 *
 * 抽出来是为了让「一行式命令」和「引导式流程」改完之后用同一套方式重出图，
 * 避免两处各写一份、行为不一致。
 */
import ProfileDetail from '../../apps/profile/ProfileDetail.js'

export function panelMsg (char) {
  return char.game === 'sr' ? `#星铁${char.name}面板` : `#${char.name}面板`
}

export async function rerender (e, char) {
  const msg = panelMsg(char)
  try {
    await ProfileDetail.detail({
      ...e,
      msg,
      original_msg: msg,
      game: char.game,
      isSr: char.game === 'sr'
    })
  } catch (err) {
    console.error(`[miao-custom] 重新出图失败: ${err.message}`)
    await e.reply(`已保存，但图片生成失败，可以稍后发 #${char.name}面板 查看`)
  }
}
