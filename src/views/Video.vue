<template>
  <div class="placeholder-page">
    <h1 class="page-title">🎬 视频页</h1>
    <p>这里将展示短视频内容，但目前仅作为路由占位。页面内容应该设计为全屏滑动模式。</p>
    <img src="https://picsum.photos/400/700?random=video" alt="Video Placeholder" class="placeholder-img">
  </div>
</template>

<style scoped>
  .placeholder-page {
    padding-top: 50px;
    text-align: center;
    background-color: #0f0f1a;
    min-height: 100vh;
    color: white;
  }

  .page-title {
    font-size: 28px;
    color: #4CAF50;
  }

  .placeholder-img {
    margin-top: 20px;
    max-width: 90%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
</style>