# custom —— fork 专属的自定义计算层

本目录不属于上游 miao-plugin，所有 fork 专属逻辑都收在这里，目的是让上游持续更新时几乎不产生冲突。

## 一、这个 fork 改了什么

对上游文件只有两处「追加」，其余全部在本目录内：

| 文件 | 改动 | 冲突时怎么处理 |
|---|---|---|
| `../index.js` | 引入 `installCustom()`；把 apps 导出改为「上游 + 自定义」合并 | 保留这两处，其余以上游为准 |
| `../package.json` | `imports` 增加 `#liangshi` 与 `#liangshi/*` | 保留这两条映射 |
| `.gitignore` | 忽略用户数据与运行时生成文件 | 可整段保留 |

## 二、三层优先级

```
用户自定义   custom/data/<游戏>/<角色>/override.json   ← 不进 git，永远最高
梁氏方案     custom/liangshi/damage/liangshi-<游戏>/   ← Action 同步，只读
miao 自带    resources/meta-<游戏>/character/            ← 上游
```

查找逻辑在 `hooks/` 里以「包装」实现：先查自定义，未命中就原样交回上游函数。上游改了查找顺序或新增档位会自动继承，不会冻结在某个旧版本。

## 三、指令

所有修改都写进 `custom/data`，绝不改动梁氏目录与上游文件。

```
#胡桃面板计算                     查看控制台（方案 / 条目 / 权重）
#胡桃面板计算 看 2                看某条的计算公式与来源
#胡桃面板计算 来源                看当前规则来自哪个文件
#胡桃面板计算 方案               查看当前方案
#胡桃面板计算 方案 基础          切到梁氏基础档
#胡桃面板计算 方案 上游          切回 miao 自带
#胡桃面板权重 暴击=80 精通=60   修改评分权重（0~100），改完自动出图
#胡桃面板权重                查看当前权重
#胡桃面板权重 清除            恢复默认权重
#面板权重帮助                 查看权重用法与可用属性
#面板计算帮助                 查看全部计算指令

引导式修改（一步步选择，适合不想记命令的用户）：

#胡桃面板权重修改             选属性 → 填数值 → 保存出图（r 恢复默认）
#胡桃面板权重修改 暴击=80     带参数则跳过引导，直接生效
#胡桃面板计算修改             选方案 / 开关条目 / 查看某条公式
#胡桃面板计算 停用 2,4            停用条目
#胡桃面板计算 启用 2              启用条目
#胡桃面板计算 撤销                回退上一次修改
#胡桃面板计算 重置                清除该角色全部自定义
```

权限（仅主人）：

```
#计算权限                    查看当前配置
#计算权限 开启 / 关闭         白名单总开关
#计算权限 添加 @某人          允许某人修改（也支持直接写 QQ 号）
#计算权限 移除 @某人
#计算权限 添加群              把当前群加进白名单
#计算权限 添加群 群号         指定群（私聊也能用）
#计算权限 移除群 [群号]
#计算权限 只读 开启 / 关闭    非白名单能否查看

权限模型：

| 配置 | 谁能改、在哪改 |
|---|---|
| 白名单启用 + 群白名单为空 | 成员白名单里的人，任何群和私聊都能改 |
| 白名单启用 + 有群白名单 | 成员白名单里的人，且只能在列出的那些群里改（私聊也不行） |
| 白名单关闭 | 只有主人能改 |

两条容易混淆的规则：

- **加群不给人权限**。群白名单只是「限定地点」，群里没在成员名单中的人照样不能改。
- **成员白名单才是给人权限**。给了之后再决定要不要用群白名单收窄地点。
```

## 四、同步机制

| 工作流 | 频率 | 作用 |
|---|---|---|
| `.github/workflows/sync-liangshi.yml` | 每天 | 拉取 liangshi-calc，同步 damage / components / config / CalcBuff 到 `custom/liangshi` |
| `.github/workflows/sync-upstream.yml` | 每天 | 合并 yoimiya-kokomi/miao-plugin，合并后跑自检 |

本地手动同步：

```bash
# 梁氏方案（默认从 plugins/liangshi-calc 读取）
node plugins/miao-plugin/custom/tools/sync-liangshi.mjs

# 或指定任意源目录
node plugins/miao-plugin/custom/tools/sync-liangshi.mjs /path/to/liangshi-calc

# 自检
node plugins/miao-plugin/custom/selfcheck.js
```

## 五、路径改写说明

梁氏代码里有两类硬编码路径，同步脚本会改写：

| 原始写法 | 改写后 | 原因 |
|---|---|---|
| `../../../../plugins/liangshi-calc/xxx` | `#liangshi/xxx` | 由本包 `package.json` 的 imports 解析 |
| `plugins/liangshi-calc/xxx`（运行时读文件） | `plugins/miao-plugin/custom/liangshi/xxx` | 相对 Yunzai 根目录的 cwd 路径 |

其余相对引用（如 `../index.js`、`../../../resources/CalcBuff`）因为目录结构是镜像复制，不需要改写。

## 六、目录说明

```
custom/
  index.js            入口，导出 install()
  hooks/              四个包装钩子 + 缓存失效
  apps/               指令（控制台 / 权限 / 修改）
  lib/                路径、读写、权限、规则解析
  tools/              梁氏同步脚本
  config/             权限白名单（不进 git）
  data/               用户自定义（不进 git）
  liangshi/           梁氏方案（Action 同步，进 git）
  selfcheck.js        自检
```
