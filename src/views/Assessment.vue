<template>
  <div class="assessment-container">
    <a-card class="assessment-card">
      <!-- 顶部退出栏 -->
      <div class="assessment-header">
        <a-button class="exit-btn" @click="handleExit">
          <template #icon><CloseOutlined /></template>
          退出
        </a-button>
      </div>

      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-text">答题进度</span>
          <span class="progress-number">{{ store.currentQuestionIndex + 1 }} / {{ store.totalQuestions }}</span>
        </div>
        <a-progress 
          :percent="store.progressPercentage" 
          :strokeColor="{
            '0%': '#108ee9',
            '100%': '#87d068'
          }"
          :showInfo="false"
        />
      </div>

      <!-- 题目卡片 -->
      <div class="question-section">
        <a-card class="question-card" :bordered="false">
          <div class="question-number">第 {{ store.currentQuestionIndex + 1 }} 题</div>
          <div class="question-content">{{ store.currentQuestion?.content }}</div>
          
          <!-- 选项列表 -->
          <div class="options-list">
            <a-radio-group 
              v-model:value="selectedAnswer" 
              class="options-group"
              @change="onAnswerChange"
            >
              <a-space direction="vertical" style="width: 100%">
                <a-radio 
                  v-for="option in store.currentQuestion?.options" 
                  :key="option.value"
                  :value="option.value"
                  class="option-item"
                >
                  <span class="option-label">{{ option.label }}</span>
                </a-radio>
              </a-space>
            </a-radio-group>
          </div>
        </a-card>
      </div>

      <!-- 导航按钮 -->
      <div class="navigation-section">
        <div class="nav-side nav-left">
          <a-button 
            v-if="store.currentQuestionIndex > 0" 
            @click="handlePrevious"
          >
            上一题
          </a-button>
        </div>

        <div class="question-dots">
          <span
            v-for="(answered, index) in answeredStatus"
            :key="index"
            class="dot"
            :class="{ 
              'dot-answered': answered, 
              'dot-current': index === store.currentQuestionIndex 
            }"
            @click="goToQuestion(index)"
          />
        </div>

        <div class="nav-side nav-right">
          <a-button 
            v-if="store.currentQuestionIndex < store.totalQuestions - 1"
            type="primary"
            @click="handleNext"
            :disabled="!store.hasAnsweredCurrent"
          >
            下一题
          </a-button>
          
          <a-popconfirm
            v-else
            title="确定要提交答案吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="submitAssessment"
          >
            <a-button 
              type="primary"
              :disabled="!store.hasAnsweredCurrent"
            >
              完成测试
            </a-button>
          </a-popconfirm>
        </div>
      </div>

      <!-- 侧边答题卡 -->
      <div class="answer-sheet-toggle">
        <a-button @click="showAnswerSheet = !showAnswerSheet">
          {{ showAnswerSheet ? '隐藏' : '显示' }}答题卡
        </a-button>
      </div>
    </a-card>

    <!-- 答题卡弹窗 -->
    <a-drawer
      :open="showAnswerSheet"
      title="答题卡"
      placement="right"
      :width="300"
      @close="showAnswerSheet = false"
    >
      <div class="answer-sheet">
        <div 
          v-for="(answered, index) in answeredStatus" 
          :key="index"
          class="answer-grid"
          :class="{ 'answered': answered, 'current': index === store.currentQuestionIndex }"
          @click="goToQuestion(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useAssessmentStore } from '../stores/assessment'
import { questions } from '../data/questions'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const selectedAnswer = ref(undefined)
const showAnswerSheet = ref(false)

// 初始化
onMounted(() => {
  assessmentStore.initAssessment()
})

// 已答题状态数组
const answeredStatus = computed(() => {
  return questions.map((q, index) => {
    return assessmentStore.userAnswers[q.id] !== undefined
  })
})

// 答案变化时保存
function onAnswerChange(e) {
  const currentQuestion = assessmentStore.currentQuestion
  assessmentStore.answerQuestion(currentQuestion.id, e.target.value)
}

// 下一题
function handleNext() {
  if (store.currentQuestionIndex < store.totalQuestions - 1) {
    assessmentStore.nextQuestion()
    selectedAnswer.value = undefined
  }
}

// 跳转到指定题目
function goToQuestion(index) {
  assessmentStore.goToQuestion(index)
  const currentQuestion = assessmentStore.currentQuestion
  selectedAnswer.value = assessmentStore.userAnswers[currentQuestion.id]
  // 不在这里关闭答题卡，仅当用户点击 X 或非答题卡区域时才收起
}

// 提交评估
function submitAssessment() {
  assessmentStore.calculateResult()
  router.push('/result')
}

// 上一题
function handlePrevious() {
  assessmentStore.previousQuestion()
  const currentQuestion = assessmentStore.currentQuestion
  selectedAnswer.value = assessmentStore.userAnswers[currentQuestion.id]
}

// 退出答题，返回首页
function handleExit() {
  router.push('/')
}

// 兼容 Vue 2.6 语法
const store = assessmentStore
</script>

<style scoped>
.assessment-container {
  min-height: 100vh;
  padding: 24px;
}

.assessment-card {
  max-width: 800px;
  margin: 0 auto;
}

.assessment-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.exit-btn {
  font-size: 14px;
  color: #ff4d4f;
  border-color: #ff4d4f;
  background: rgba(255, 77, 79, 0.06);
  transition: all 0.3s;
}

.exit-btn:hover {
  color: #fff;
  border-color: #ff4d4f;
  background: #ff4d4f;
}

.progress-section {
  margin-bottom: 32px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.progress-number {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}

.question-section {
  margin-bottom: 32px;
}

.question-card {
  background: #fafafa;
}

.question-number {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
  margin-bottom: 12px;
}

.question-content {
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 24px;
  line-height: 1.6;
}

.options-list {
  padding: 8px 0;
}

.options-group {
  width: 100%;
}

.option-item {
  display: block;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.3s;
  border: 1px solid #e8e8e8;
}

.option-item:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.option-label {
  font-size: 16px;
}

.navigation-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
}

.nav-side {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  min-width: 0;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.question-dots {
  flex: 0 1 auto;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 400px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
}

.dot-answered {
  background: #52c41a;
}

.dot-current {
  background: #1890ff;
  transform: scale(1.2);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
}

.answer-sheet-toggle {
  text-align: center;
  margin-top: 24px;
}

.answer-sheet {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.answer-grid {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.75);
  user-select: none;
}

.answer-grid:hover {
  background: #e6f7ff;
}

.answer-grid.answered {
  background: #52c41a;
  color: #fff;
}

.answer-grid.current {
  background: #1890ff;
  color: #fff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.5);
}

/* 隐藏答题卡抽屉区域的滚动条，保持界面整洁 */
:deep(.ant-drawer-body) {
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

:deep(.ant-drawer-body)::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

@media (max-width: 768px) {
  .assessment-container {
    padding: 16px;
  }
  
  .question-content {
    font-size: 16px;
  }
  
  .question-dots {
    display: none;
  }
}
</style>
