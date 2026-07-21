<template>
  <div class="home-container">
    <div class="home-content">
      <!-- 标题区域 -->
      <div class="header-section">
        <h1 class="main-title">焦虑症诊断系统</h1>
        <p class="subtitle">专业、科学的焦虑症状自我评估工具</p>
      </div>

      <!-- 主要功能卡片 -->
      <a-row :gutter="[24, 24]" class="card-row">
        <a-col :xs="24" :sm="12">
          <a-card class="feature-card start-card" hoverable :bordered="false" @click="startAssessment">
            <div class="feature-inner">
              <div class="feature-icon start-icon">📋</div>
              <div class="feature-text">
                <h3 class="feature-title">开始评估</h3>
                <p class="feature-desc">30 道专业测试题，全面评估您的焦虑状态</p>
              </div>
              <span class="feature-arrow">→</span>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-card class="feature-card history-card" hoverable :bordered="false" @click="viewHistory">
            <div class="feature-inner">
              <div class="feature-icon history-icon">📊</div>
              <div class="feature-text">
                <h3 class="feature-title">历史记录</h3>
                <p class="feature-desc">查看历史测试记录，追踪焦虑变化趋势</p>
              </div>
              <span class="feature-arrow">→</span>
            </div>
          </a-card>
        </a-col>
      </a-row>

      <!-- 说明信息 -->
      <a-card class="info-card" title="测试说明">
        <a-timeline>
          <a-timeline-item color="blue">
            本测试包含 30 道题目，预计需要 10-15 分钟完成
          </a-timeline-item>
          <a-timeline-item color="blue">
            请根据您的实际情况选择最符合的选项
          </a-timeline-item>
          <a-timeline-item color="blue">
            答题过程中可随时暂停，进度会自动保存
          </a-timeline-item>
          <a-timeline-item color="green">
            所有数据仅存储在本地，保护您的隐私
          </a-timeline-item>
        </a-timeline>
      </a-card>

      <!-- 免责声明 -->
      <a-alert
        class="disclaimer-alert"
        message="重要提示"
        description="本测试结果仅供参考，不能替代专业医疗诊断。如有严重不适，请及时就医。"
        type="warning"
        show-icon
      />

      <!-- 焦虑症科普 -->
      <a-card class="science-card" title="关于焦虑症">
        <template #extra>
          <a-button type="link" @click="showScienceDetail">了解更多</a-button>
        </template>
        <p>
          焦虑症是一种常见的心理健康问题，表现为持续的、过度的担忧和恐惧。
          早期发现和干预可以有效改善症状，提高生活质量。
        </p>
      </a-card>
    </div>

    <!-- 科普详情弹窗 -->
    <a-modal
      v-model:open="scienceVisible"
      title="关于焦虑症"
      :footer="null"
      width="600px"
    >
      <div class="science-content">
        <h3>什么是焦虑症？</h3>
        <p>
          焦虑症是以焦虑情绪为主要特征的神经症，同时伴有自主神经紊乱及运动性不安的表现。
        </p>
        
        <h3>常见症状</h3>
        <ul>
          <li>精神症状：过度担忧、紧张不安、注意力难以集中</li>
          <li>躯体症状：心悸、胸闷、出汗、颤抖、肌肉紧张</li>
          <li>睡眠障碍：入睡困难、易醒、多梦</li>
          <li>行为改变：回避某些场合、坐立不安</li>
        </ul>

        <h3>何时需要就医？</h3>
        <p>
          如果焦虑症状持续存在（超过 6 个月），且影响到日常生活、工作或社交，
          建议及时寻求专业医生的帮助。
        </p>

        <a-alert
          message="温馨提示"
          description="焦虑症是可以治疗的。通过心理治疗、药物治疗或两者结合，大多数患者都能得到有效改善。"
          type="success"
          style="margin-top: 16px;"
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '../stores/assessment'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const scienceVisible = ref(false)

// 开始评估
function startAssessment() {
  // 重置评估状态
  assessmentStore.resetAssessment()
  router.push('/assessment')
}

// 查看历史记录
function viewHistory() {
  router.push('/history')
}

// 显示科普详情
function showScienceDetail() {
  scienceVisible.value = true
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 40px 20px;
}

.home-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 48px;
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
}

.card-row {
  margin-bottom: 24px;
}

.feature-card {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.feature-inner {
  display: flex;
  align-items: center;
  gap: 20px;
}

.feature-icon {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  line-height: 1;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.start-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.history-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.feature-text {
  flex: 1;
  min-width: 0;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
  margin: 0 0 6px;
}

.feature-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
  line-height: 1.5;
}

.feature-arrow {
  flex-shrink: 0;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-arrow {
  color: #1890ff;
  transform: translateX(4px);
}

.info-card,
.science-card {
  margin-bottom: 24px;
}

.disclaimer-alert {
  margin-bottom: 24px;
}

.science-content h3 {
  color: #1890ff;
  margin-top: 24px;
  margin-bottom: 12px;
}

.science-content p,
.science-content ul {
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.85);
}

.science-content ul {
  padding-left: 20px;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .home-container {
    padding: 20px 12px;
  }
}
</style>
