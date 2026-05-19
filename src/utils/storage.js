// localStorage 工具函数

const STORAGE_KEYS = {
  ASSESSMENT_ANSWERS: 'anxiety_assessment_answers',
  ASSESSMENT_HISTORY: 'anxiety_assessment_history'
}

/**
 * 保存答题进度
 */
export function saveAssessmentProgress(answers, currentIndex) {
  try {
    const data = {
      answers,
      currentIndex,
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_ANSWERS, JSON.stringify(data))
  } catch (error) {
    console.error('保存答题进度失败:', error)
  }
}

/**
 * 获取答题进度
 */
export function getAssessmentProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_ANSWERS)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('获取答题进度失败:', error)
  }
  return null
}

/**
 * 清除答题进度
 */
export function clearAssessmentProgress() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_ANSWERS)
  } catch (error) {
    console.error('清除答题进度失败:', error)
  }
}

/**
 * 保存历史记录
 */
export function saveHistoryRecord(record) {
  try {
    const history = getHistoryRecords()
    history.unshift({
      ...record,
      id: Date.now().toString(),
      date: new Date().toLocaleString('zh-CN')
    })
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_HISTORY, JSON.stringify(history))
  } catch (error) {
    console.error('保存历史记录失败:', error)
  }
}

/**
 * 获取历史记录
 */
export function getHistoryRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_HISTORY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('获取历史记录失败:', error)
  }
  return []
}

/**
 * 删除历史记录
 */
export function deleteHistoryRecord(id) {
  try {
    const history = getHistoryRecords()
    const filtered = history.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_HISTORY, JSON.stringify(filtered))
  } catch (error) {
    console.error('删除历史记录失败:', error)
  }
}

/**
 * 清空所有历史记录
 */
export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_HISTORY)
  } catch (error) {
    console.error('清空历史记录失败:', error)
  }
}
