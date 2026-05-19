// 焦虑症评估题目 - 基于 GAD-7 和 SAS 标准量表
// 共 30 题，全面评估焦虑症状

export const questions = [
  // GAD-7 核心题目 (1-7)
  {
    id: 1,
    content: '感觉神经紧张、焦虑或急切',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 2,
    content: '不能停止或控制担忧',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 3,
    content: '对各种各样的事情担忧过多',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 4,
    content: '很难放松下来',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 5,
    content: '由于不安而无法静坐',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 6,
    content: '变得容易烦恼或急躁',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  {
    id: 7,
    content: '感到似乎将有可怕的事情发生',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '几天' },
      { value: 2, label: '一半以上的天数' },
      { value: 3, label: '几乎每天' }
    ]
  },
  
  // 躯体化症状 (8-15)
  {
    id: 8,
    content: '心跳加速、心悸或胸闷',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 9,
    content: '呼吸急促或窒息感',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 10,
    content: '头痛、头晕或眩晕',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 11,
    content: '肌肉紧张或疼痛',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 12,
    content: '出汗、颤抖或手脚发冷',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 13,
    content: '胃部不适、恶心或腹泻',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 14,
    content: '尿频或尿急',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 15,
    content: '吞咽困难或有异物感',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  
  // 睡眠问题 (16-20)
  {
    id: 16,
    content: '入睡困难或睡眠质量差',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 17,
    content: '夜间易醒或多梦',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 18,
    content: '早醒后难以再次入睡',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 19,
    content: '白天感到疲劳或精力不足',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 20,
    content: '因担心睡眠而更加焦虑',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  
  // 认知和情绪症状 (21-25)
  {
    id: 21,
    content: '注意力难以集中或记忆力下降',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 22,
    content: '对日常活动失去兴趣或乐趣',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 23,
    content: '感到恐惧或害怕',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 24,
    content: '情绪波动大或易怒',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 25,
    content: '对未来感到悲观或绝望',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  
  // 社交和功能影响 (26-30)
  {
    id: 26,
    content: '避免社交场合或与人接触',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 27,
    content: '工作或学习效率下降',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 28,
    content: '因焦虑而影响日常生活',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 29,
    content: '过度担心自己的健康状况',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  },
  {
    id: 30,
    content: '需要他人反复安慰才能安心',
    options: [
      { value: 0, label: '完全不会' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '总是' }
    ]
  }
]

// 焦虑等级判定标准
export const anxietyLevels = {
  normal: {
    min: 0,
    max: 20,
    level: 'normal',
    name: '正常',
    color: '#52c41a',
    description: '您的焦虑水平在正常范围内',
    advice: '保持当前的生活状态，继续维持良好的心理状态'
  },
  mild: {
    min: 21,
    max: 40,
    level: 'mild',
    name: '轻度焦虑',
    color: '#faad14',
    description: '您有轻度焦虑症状',
    advice: '建议进行自我调节，改善生活方式，适当运动'
  },
  moderate: {
    min: 41,
    max: 60,
    level: 'moderate',
    name: '中度焦虑',
    color: '#ff7a45',
    description: '您有中度焦虑症状',
    advice: '建议寻求专业心理咨询，考虑心理治疗'
  },
  severe: {
    min: 61,
    max: 90,
    level: 'severe',
    name: '重度焦虑',
    color: '#f5222d',
    description: '您有重度焦虑症状',
    advice: '强烈建议尽快就医，寻求专业精神科医生的帮助'
  }
}

// 根据分数判断焦虑等级
export function getAnxietyLevel(score) {
  if (score <= 20) {
    return anxietyLevels.normal
  } else if (score <= 40) {
    return anxietyLevels.mild
  } else if (score <= 60) {
    return anxietyLevels.moderate
  } else {
    return anxietyLevels.severe
  }
}
