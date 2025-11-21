<script setup>
  // 这里可以放个人中心的逻辑，比如获取用户信息
</script>

<template>
  <div class="me-container">
    <div class="header-bg"></div>

    <div class="user-card">
      <div class="avatar-row">
        <img src="https://i.pravatar.cc/150?img=10" class="avatar" alt="avatar">
        <div class="edit-btn">编辑资料</div>
      </div>
      <div class="info">
        <h2 class="nickname">李</h2>
        <div class="xhs-id">小红书号：123456789</div>
        <p class="desc">点击“关注”💻</p>
      </div>
      <div class="stats">
        <div class="stat-item"><span>123</span><label>关注</label></div>
        <div class="stat-item"><span>45.6k</span><label>粉丝</label></div>
        <div class="stat-item"><span>102w</span><label>获赞与收藏</label></div>
      </div>
    </div>

    <div class="content-tabs">
      <div class="tab active">笔记</div>
      <div class="tab">收藏</div>
      <div class="tab">赞过</div>
    </div>

    <div class="empty-state">
      这里空空如也~
    </div>
  </div>
</template>

<style scoped>
  .me-container {
    background: #fff;
    min-height: 100vh;
  }

  .header-bg {
    height: 150px;
    background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    /* 模拟背景图 */
  }

  .user-card {
    position: relative;
    margin-top: -40px;
    padding: 0 20px;
  }

  .avatar-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #fff;
    background: #eee;
  }

  .edit-btn {
    border: 1px solid #ccc;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }

  .info .nickname {
    font-size: 22px;
    margin: 0 0 5px 0;
    color: #333;
  }

  .info .xhs-id {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .info .desc {
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
  }

  .stats {
    display: flex;
    gap: 20px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-item span {
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }

  .stat-item label {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }

  .content-tabs {
    display: flex;
    margin-top: 30px;
    border-bottom: 1px solid #eee;
  }

  .tab {
    padding: 10px 20px;
    color: #999;
    font-weight: bold;
  }

  .tab.active {
    color: #333;
    border-bottom: 2px solid #ff2442;
  }

  .empty-state {
    padding: 50px;
    text-align: center;
    color: #ccc;
    font-size: 14px;
  }
</style>