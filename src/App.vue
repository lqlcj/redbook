<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  // 根据路由 meta 配置决定是否显示底栏
  const showTabBar = computed(() => route.meta.showTabBar)
</script>

<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer v-if="showTabBar" class="tabbar">
      <router-link to="/" class="tab-item" active-class="active">
        首页
      </router-link>

      <router-link to="/video" class="tab-item" active-class="active">
        视频
      </router-link>

      <div class="tab-item plus">+</div>

      <router-link to="/messages" class="tab-item" active-class="active">
        消息
      </router-link>

      <router-link to="/me" class="tab-item" active-class="active">
        我
      </router-link>
    </footer>
  </div>
</template>

<style>

  /* 全局重置 */
  body {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
    font-family: sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .app-container {
    max-width: 600px;
    margin: 0 auto;
    min-height: 100vh;
    background: #fff;
    padding-bottom: 50px;
    position: relative;
  }

  /* 底部 Tabbar 样式（保持不变） */
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    max-width: 600px;
  }

  @media (min-width: 600px) {
    .tabbar {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tab-item {
    font-size: 14px;
    color: #999;
    font-weight: 500;
    cursor: pointer;
  }

  .tab-item.active {
    color: #333;
    font-weight: bold;
  }

  .tab-item.plus {
    width: 40px;
    height: 30px;
    background: #ff2442;
    color: white;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  /* 路由切换动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>