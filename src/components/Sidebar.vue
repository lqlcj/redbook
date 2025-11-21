<script setup>
  import { defineProps, defineEmits } from 'vue';

  // 接收父组件传递的属性
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    }
  });

  // 定义向父组件触发的事件
  const emit = defineEmits(['update:isOpen']);

  // 关闭侧边栏的方法
  const closeSidebar = () => {
    // 通知父组件将 isOpen 状态设为 false
    emit('update:isOpen', false);
    // 恢复背景滚动 (可选，如果 App.vue 或 Home.vue 阻止了滚动)
    document.body.style.overflow = '';
  };

</script>

<template>
  <Teleport to="body">
    <Transition name="fade-mask">
      <div v-if="props.isOpen" class="sidebar-mask" @click="closeSidebar"></div>
    </Transition>

    <div class="sidebar" :class="{ 'sidebar-open': props.isOpen }">
      <div class="sidebar-header">
        <img src="https://i.pravatar.cc/150?img=6" class="user-avatar" alt="User Avatar">
        <h3>哈喽</h3>
        <p>随时随地，发现你的热爱</p>
      </div>
      <div class="sidebar-menu">
        <div class="menu-item" @click="closeSidebar">⭐ 我的收藏</div>
        <div class="menu-item" @click="closeSidebar">💬 消息通知</div>
        <div class="menu-item" @click="closeSidebar">⚙️ 设置与隐私</div>
        <div class="menu-item" @click="closeSidebar">📝 创作中心</div>
        <div class="menu-item logout" @click="closeSidebar">🚪 退出登录</div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

  /* --- 侧边栏 CSS --- */
  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明遮罩 */
    z-index: 1000;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 75%;
    /* 侧边栏宽度 */
    max-width: 300px;
    height: 100%;
    background-color: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    /* 初始状态：完全藏到左侧 */
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;
    padding: 20px;
    box-sizing: border-box;
  }

  .sidebar-open {
    /* 打开状态：滑入视野 */
    transform: translateX(0);
  }

  /* 遮罩层动画 */
  .fade-mask-enter-active,
  .fade-mask-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-mask-enter-from,
  .fade-mask-leave-to {
    opacity: 0;
  }


  .sidebar-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .sidebar-header .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .sidebar-header h3 {
    font-size: 18px;
    margin: 0 0 5px 0;
  }

  .sidebar-header p {
    font-size: 12px;
    color: #999;
    margin: 0;
  }

  .sidebar-menu .menu-item {
    padding: 12px 0;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
  }

  .sidebar-menu .logout {
    color: #ff2442;
    margin-top: 30px;
  }
</style>