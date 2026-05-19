import { defineStore } from 'pinia'
import { questions, getAnxietyLevel } from '../data/questions'
import {
  saveAssessmentProgress,
  getAssessmentProgress,
  clearAssessmentProgress,
  saveHistoryRecord,
  getHistoryRecords,
  deleteHistoryRecord
} from '../utils/storage'

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    // 当前题目索引
    currentQuestionIndex: 0,
    // 用户答案 {题目 ID: 选项分值}
    userAnswers: {},
    // 总分
    totalScore: 0,
    // 焦虑等级
    anxietyLevel: null,
    // 是否完成测试
    isCompleted: false,
    // 历史记录
    historyRecords: []
  }),

  getters: {
    // 当前题目
    currentQuestion(state) {
      return questions[state.currentQuestionIndex]
    },

    // 总题目数
    totalQuestions() {
      return questions.length
    },

    // 答题进度百分比
    progressPercentage(state) {
      return ((state.currentQuestionIndex + 1) / questions.length) * 100
    },

    // 是否已回答当前题目
    hasAnsweredCurrent(state) {
      const currentQuestion = questions[state.currentQuestionIndex]
      if (!currentQuestion) return false
      return state.userAnswers[currentQuestion.id] !== undefined
    },

    // 获取所有题目和答案
    allQuestionsWithAnswers() {
      return questions.map(q => ({
        ...q,
        userAnswer: this.userAnswers[q.id]
      }))
    }
  },

  actions: {
    // 初始化评估（从缓存恢复）
    initAssessment() {
      const progress = getAssessmentProgress()
      if (progress && progress.answers) {
        this.userAnswers = progress.answers
        this.currentQuestionIndex = progress.currentIndex || 0
      }
      // 加载历史记录
      this.historyRecords = getHistoryRecords()
    },

    // 回答题目
    answerQuestion(questionId, answerValue) {
      this.userAnswers[questionId] = answerValue
      // 自动保存进度
      saveAssessmentProgress(this.userAnswers, this.currentQuestionIndex)
    },

    // 下一题
    nextQuestion() {
      if (this.currentQuestionIndex < questions.length - 1) {
        this.currentQuestionIndex++
        saveAssessmentProgress(this.userAnswers, this.currentQuestionIndex)
      }
    },

    // 上一题
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
        saveAssessmentProgress(this.userAnswers, this.currentQuestionIndex)
      }
    },

    // 跳转到指定题目
    goToQuestion(index) {
      this.currentQuestionIndex = index
    },

    // 计算总分并判断焦虑等级
    calculateResult() {
      const score = Object.values(this.userAnswers).reduce((sum, value) => sum + value, 0)
      this.totalScore = score
      this.anxietyLevel = getAnxietyLevel(score)
      this.isCompleted = true
      
      // 保存到历史记录
      saveHistoryRecord({
        score,
        level: this.anxietyLevel.name,
        levelKey: this.anxietyLevel.level,
        color: this.anxietyLevel.color,
        answers: { ...this.userAnswers },
        questionCount: questions.length
      })

      // 清除答题进度
      clearAssessmentProgress()
      
      // 刷新历史记录
      this.historyRecords = getHistoryRecords()
    },

    // 重置评估
    resetAssessment() {
      this.currentQuestionIndex = 0
      this.userAnswers = {}
      this.totalScore = 0
      this.anxietyLevel = null
      this.isCompleted = false
      clearAssessmentProgress()
    },

    // 删除历史记录
    removeHistoryRecord(id) {
      deleteHistoryRecord(id)
      this.historyRecords = getHistoryRecords()
    },

    // 刷新历史记录
    refreshHistoryRecords() {
      this.historyRecords = getHistoryRecords()
    }
  }
})
