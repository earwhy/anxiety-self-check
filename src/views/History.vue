<template>
  <div class="history-container">
    <a-card class="history-card">
      <template #title>
        <div class="header-title">
          <span>📊 历史记录</span>
          <a-button 
            v-if="store.historyRecords.length > 0"
            danger 
            size="small"
            @click="confirmClearAll"
          >
            清空全部
          </a-button>
        </div>
      </template>

      <!-- 空状态 -->
      <a-empty 
        v-if="store.historyRecords.length === 0"
        description="暂无测试记录，开始第一次评估吧"
      >
        <template #image>
          <svg viewBox="0 0 184 130" xmlns="http://www.w3.org/2000/svg" style="width: 120px">
            <path fill="#E3E6E9" d="M59.7 33.2c0-9.9 8-17.9 17.9-17.9s17.9 8 17.9 17.9v12.5h14.3V33.2c0-17.8-14.4-32.2-32.2-32.2S45.4 15.4 45.4 33.2v12.5h14.3V33.2z"/>
            <path fill="#FFC53D" d="M92 129c19.9 0 36-16.1 36-36V64.3H56V93c0 19.9 16.1 36 36 36z"/>
            <path fill="#FFD666" d="M56 64.3h72v10.8c0 19.9-16.1 36-36 36s-36-16.1-36-36V64.3z"/>
            <circle cx="92" cy="75.1" r="10.8" fill="#FFF"/>
            <circle cx="92" cy="75.1" r="3.6" fill="#FFC53D"/>
          </svg>
        </template>
        <a-button type="primary" @click="goToAssessment">
          开始测试
        </a-button>
      </a-empty>

      <!-- 历史记录列表 -->
      <div v-else class="history-list">
        <a-timeline>
          <a-timeline-item 
            v-for="record in store.historyRecords" 
            :key="record.id"
            color="blue"
          >
            <a-card class="record-card" hoverable>
              <div class="record-header">
                <div class="record-info">
                  <div class="record-date">{{ record.date }}</div>
                  <div class="record-level" :style="{ color: record.color }">
                    {{ record.level }}
                  </div>
                </div>
                <div class="record-score">
                  <a-statistic
                    :value="record.score"
                    :value-style="{ color: record.color, fontSize: '24px' }"
                  >
                    <template #suffix>
                      <span style="font-size: 14px; color: rgba(0,0,0,0.45)">分</span>
                    </template>
                  </a-statistic>
                </div>
              </div>
              
              <a-divider style="margin: 12px 0" />
              
              <div class="record-details">
                <a-space direction="vertical" style="width: 100%">
                  <div class="detail-row">
                    <span class="detail-label">答题数量:</span>
                    <span class="detail-value">{{ record.questionCount }}题</span>
                  </div>
                  
                  <a-progress
                    :percent="(record.score / (record.questionCount * 3)) * 100"
                    :strokeColor="record.color"
                    :showInfo="false"
                  />
                  
                  <div class="detail-advice" :style="{ color: record.color }">
                    💡 {{ getAdvice(record.levelKey) }}
                  </div>
                </a-space>
              </div>

              <template #actions>
                <a-popconfirm
                  title="确定删除这条记录吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="deleteRecord(record.id)"
                >
                  <a-button type="link" danger size="small">
                    删除
                  </a-button>
                </a-popconfirm>
              </template>
            </a-card>
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '../stores/assessment'
import { Modal, message } from 'ant-design-vue'
import { anxietyLevels } from '../data/questions'

const router = useRouter()
const assessmentStore = useAssessmentStore()

// 获取建议
function getAdvice(levelKey) {
  const advices = {
    normal: '保持当前的良好状态',
    mild: '建议进行自我调节，适当放松',
    moderate: '建议寻求专业心理咨询',
    severe: '强烈建议尽快就医'
  }
  return advices[levelKey] || '保持健康生活方式'
}

// 前往评估
function goToAssessment() {
  router.push('/assessment')
}

// 删除记录
function deleteRecord(id) {
  assessmentStore.removeHistoryRecord(id)
  message.success('已删除记录')
}

// 确认清空全部
function confirmClearAll() {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空所有历史记录吗？此操作不可恢复。',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      localStorage.removeItem('anxiety_assessment_history')
      assessmentStore.refreshHistoryRecords()
      message.success('已清空所有记录')
    }
  })
}

// 兼容 Vue 2.6 语法
const store = assessmentStore
</script>

<style scoped>
.history-container {
  min-height: 100vh;
  padding: 24px;
}

.history-card {
  max-width: 800px;
  margin: 0 auto;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.record-card {
  margin-bottom: 16px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.record-info {
  flex: 1;
}

.record-date {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 4px;
}

.record-level {
  font-size: 18px;
  font-weight: 500;
}

.record-score {
  text-align: right;
}

.record-details {
  padding: 8px 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-label {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.detail-value {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.detail-advice {
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .history-container {
    padding: 16px;
  }
  
  .record-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .record-score {
    text-align: left;
    margin-top: 12px;
  }
}
</style>
