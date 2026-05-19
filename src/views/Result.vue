<template>
  <div class="result-container">
    <a-card class="result-card">
      <!-- 结果标题 -->
      <div class="result-header" :style="{ borderColor: store.anxietyLevel?.color }">
        <div class="level-icon">{{ levelIcon }}</div>
        <h1 class="result-title">{{ store.anxietyLevel?.name }}</h1>
        <p class="result-desc">{{ store.anxietyLevel?.description }}</p>
      </div>

      <!-- 分数展示 -->
      <div class="score-section">
        <a-statistic
          title="测试总分"
          :value="store.totalScore"
          :value-style="{ color: store.anxietyLevel?.color }"
        >
          <template #suffix>
            <span style="font-size: 24px; color: rgba(0,0,0,0.45)"> / 90</span>
          </template>
        </a-statistic>
        
        <a-divider />
        
        <div class="level-bars">
          <div 
            v-for="(levelData, key) in levels" 
            :key="key"
            class="level-bar-item"
            :class="{ 'active': store.anxietyLevel?.level === key }"
          >
            <div class="level-info">
              <span class="level-dot" :style="{ background: levelData.color }"></span>
              <span class="level-name">{{ levelData.name }}</span>
              <span class="level-range">{{ levelData.min }}-{{ levelData.max }}分</span>
            </div>
            <a-progress
              :percent="calculateLevelPercent(key)"
              :strokeColor="store.anxietyLevel?.level === key ? levelData.color : '#e8e8e8'"
              :showInfo="false"
            />
          </div>
        </div>
      </div>

      <!-- 建议区域 -->
      <div class="advice-section">
        <h2 class="section-title">📋 专业建议</h2>
        
        <!-- 就医建议 -->
        <a-alert
          class="advice-card medical-advice"
          :type="medicalAlertType"
          show-icon
        >
          <template #message>
            <span class="advice-title">🏥 就医建议</span>
          </template>
          <template #description>
            <p>{{ medicalAdvice }}</p>
          </template>
        </a-alert>

        <!-- 用药建议 -->
        <a-alert
          class="advice-card medicine-advice"
          type="info"
          show-icon
        >
          <template #message>
            <span class="advice-title">💊 用药建议（仅供参考）</span>
          </template>
          <template #description>
            <div class="medicine-content">
              <p><strong>重要提示：</strong>以下药物信息仅供参考，具体用药必须咨询专业医生。</p>
              <ul>
                <li v-if="store.anxietyLevel?.level === 'moderate' || store.anxietyLevel?.level === 'severe'">
                  • SSRIs 类抗抑郁药（如舍曲林、帕罗西汀等）
                </li>
                <li v-if="store.anxietyLevel?.level === 'moderate' || store.anxietyLevel?.level === 'severe'">
                  • SNRIs 类药物（如文拉法辛、度洛西汀等）
                </li>
                <li v-if="store.anxietyLevel?.level === 'mild'">
                  • 轻度焦虑通常不需要药物治疗
                </li>
                <li>
                  • 苯二氮䓬类药物仅用于短期缓解严重焦虑（需医生处方）
                </li>
                <li>
                  • β受体阻滞剂可用于缓解躯体症状（如心悸、颤抖）
                </li>
              </ul>
              <a-alert
                message="警告"
                description="请勿自行购买或服用精神类药物，必须在医生指导下使用。"
                type="warning"
                style="margin-top: 12px;"
                show-icon
              />
            </div>
          </template>
        </a-alert>

        <!-- 生活建议 -->
        <a-card class="advice-card life-advice" title="🌿 生活注意事项">
          <ul class="advice-list">
            <li>
              <strong>规律作息：</strong>
              保持规律的睡眠时间，每天保证 7-8 小时充足睡眠
            </li>
            <li>
              <strong>均衡饮食：</strong>
              多摄入富含维生素 B、镁的食物，减少咖啡因和酒精摄入
            </li>
            <li>
              <strong>适量运动：</strong>
              每周进行 3-5 次有氧运动，如快走、游泳、瑜伽等
            </li>
            <li>
              <strong>放松训练：</strong>
              学习深呼吸、渐进性肌肉放松、冥想等放松技巧
            </li>
            <li>
              <strong>社交支持：</strong>
              与家人朋友保持联系，参加社交活动，不要孤立自己
            </li>
            <li>
              <strong>压力管理：</strong>
              学习时间管理，合理安排工作和休息，避免过度劳累
            </li>
            <li>
              <strong>培养爱好：</strong>
              发展个人兴趣爱好，如阅读、音乐、绘画等
            </li>
            <li>
              <strong>限制刺激：</strong>
              减少使用电子设备时间，避免过度浏览负面信息
            </li>
          </ul>
        </a-card>

        <!-- 心理治疗建议 -->
        <a-card 
          v-if="store.anxietyLevel?.level === 'moderate' || store.anxietyLevel?.level === 'severe'"
          class="advice-card therapy-advice" 
          title="🧠 心理治疗建议"
        >
          <p>专业的心理治疗对焦虑症有很好的疗效，推荐考虑：</p>
          <ul class="advice-list">
            <li>
              <strong>认知行为疗法（CBT）：</strong>
              帮助识别和改变消极思维模式和行为
            </li>
            <li>
              <strong>暴露疗法：</strong>
              逐步面对恐惧情境，减少回避行为
            </li>
            <li>
              <strong>正念疗法：</strong>
              培养觉察当下的能力，减少对未来的担忧
            </li>
            <li>
              <strong>支持性心理治疗：</strong>
              提供情感支持和理解，增强应对能力
            </li>
          </ul>
        </a-card>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a-button @click="exportReport" icon="download">
          导出报告
        </a-button>
        <a-button @click="retakeTest">
          重新测试
        </a-button>
        <a-button type="primary" @click="goHome">
          返回首页
        </a-button>
      </div>

      <!-- 免责声明 -->
      <a-divider />
      <a-alert
        class="disclaimer"
        message="免责声明"
        description="本测试结果仅供参考，不能作为医学诊断依据。如有严重不适或持续症状，请及时就医并咨询专业医生。"
        type="warning"
        show-icon
      />
    </a-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '../stores/assessment'
import { anxietyLevels } from '../data/questions'
import html2canvas from 'html2canvas'
import { message } from 'ant-design-vue'

const router = useRouter()
const assessmentStore = useAssessmentStore()

// 等级图标
const levelIcon = computed(() => {
  const icons = {
    normal: '😊',
    mild: '😐',
    moderate: '😟',
    severe: '😰'
  }
  return icons[assessmentStore.anxietyLevel?.level] || '😐'
})

// 等级数据
const levels = anxietyLevels

// 计算等级百分比
function calculateLevelPercent(levelKey) {
  const level = levels[levelKey]
  if (!level) return 0
  
  const range = level.max - level.min + 1
  const position = Math.min(Math.max(assessmentStore.totalScore - level.min + 1, 0), range)
  return (position / range) * 100
}

// 就医建议
const medicalAdvice = computed(() => {
  const advices = {
    normal: '您的焦虑水平正常，无需特殊就医。继续保持良好的生活习惯和心理状态即可。',
    mild: '建议进行自我调节，如果症状持续或加重，可考虑咨询心理咨询师。',
    moderate: '建议尽快寻求专业心理咨询师或精神科医生的帮助，进行评估和干预。',
    severe: '强烈建议立即前往医院精神科或心理科就诊，接受专业评估和治疗。'
  }
  return advices[assessmentStore.anxietyLevel?.level] || advices.normal
})

// 医疗警报类型
const medicalAlertType = computed(() => {
  const types = {
    normal: 'success',
    mild: 'info',
    moderate: 'warning',
    severe: 'error'
  }
  return types[assessmentStore.anxietyLevel?.level] || 'info'
})

// 导出报告
async function exportReport() {
  try {
    message.loading('正在生成报告...', 1)
    
    const element = document.querySelector('.result-card')
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: '#ffffff'
    })
    
    const link = document.createElement('a')
    link.download = `焦虑症评估报告_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    
    message.success('报告已下载')
  } catch (error) {
    console.error('导出失败:', error)
    message.error('导出失败，请重试')
  }
}

// 重新测试
function retakeTest() {
  assessmentStore.resetAssessment()
  router.push('/assessment')
}

// 返回首页
function goHome() {
  router.push('/')
}

// 兼容 Vue 2.6 语法
const store = assessmentStore
</script>

<style scoped>
.result-container {
  min-height: 100vh;
  padding: 24px;
}

.result-card {
  max-width: 800px;
  margin: 0 auto;
}

.result-header {
  text-align: center;
  padding: 32px 0;
  border-bottom: 4px solid;
  margin-bottom: 32px;
}

.level-icon {
  font-size: 72px;
  margin-bottom: 16px;
}

.result-title {
  font-size: 32px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 12px;
}

.result-desc {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
}

.score-section {
  margin-bottom: 32px;
}

.level-bars {
  margin-top: 24px;
}

.level-bar-item {
  margin-bottom: 16px;
}

.level-bar-item.active {
  opacity: 1;
}

.level-info {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 14px;
}

.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.level-name {
  flex: 1;
  font-weight: 500;
}

.level-range {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}

.advice-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 20px;
}

.advice-card {
  margin-bottom: 16px;
}

.advice-title {
  font-weight: 500;
  font-size: 16px;
}

.medicine-content p {
  line-height: 1.8;
  margin-bottom: 12px;
}

.medicine-content ul {
  padding-left: 20px;
  line-height: 2;
}

.advice-list {
  padding-left: 0;
  list-style: none;
}

.advice-list li {
  padding: 12px 0;
  line-height: 1.8;
  border-bottom: 1px solid #f0f0f0;
}

.advice-list li:last-child {
  border-bottom: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
}

.disclaimer {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .result-container {
    padding: 16px;
  }
  
  .result-title {
    font-size: 24px;
  }
  
  .level-icon {
    font-size: 48px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .ant-btn {
    width: 100%;
  }
}
</style>
