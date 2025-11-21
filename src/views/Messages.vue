<template>
  <div class="placeholder-page">
    <h1 class="page-title">💬 消息页</h1>
    <p>这里用于显示私信、评论、点赞和系统通知。</p>
    <div class="message-list">
      <div class="message-item" v-for="i in 4" :key="i">
        通知 #{{ i }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .placeholder-page {
    padding: 20px;
    padding-top: 60px;
    text-align: center;
    min-height: 100vh;
    background-color: #f6f6f6;
  }

  .page-title {
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
  }

  .message-list {
    margin-top: 20px;
    border-top: 1px solid #eee;
  }

  .message-item {
    padding: 15px;
    background: white;
    margin-bottom: 8px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
</style>