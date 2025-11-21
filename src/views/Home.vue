<script setup>
  // ... (保持 <script setup> 上半部分不变) ...
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useNotesStore } from '../stores/notesStore';
  import Sidebar from '../components/Sidebar.vue';

  const router = useRouter();

  const store = useNotesStore();
  // 关键变化：现在我们使用 currentNotes 来获取当前 Tab 的数据
  const { currentNotes, currentTab } = storeToRefs(store);
  const { setActiveTab, toggleLike, loadMoreNotes } = store;

  // --- Home.vue 内部状态 (保留) ---
  const leftList = ref([]);
  const rightList = ref([]);
  const leftHeight = ref(0);
  const rightHeight = ref(0);
  const isLoading = ref(false);
  const isSidebarOpen = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
    document.body.style.overflow = isSidebarOpen.value ? 'hidden' : '';
  };

  // --- 瀑布流逻辑 (保持不变) ---
  const splitItemsIntoColumns = (items) => {
    leftList.value = [];
    rightList.value = [];
    leftHeight.value = 0;
    rightHeight.value = 0;

    items.forEach(item => {
      // 使用 item.height
      const itemHeight = item.height || Math.floor(Math.random() * (200 - 150 + 1)) + 150;

      if (leftHeight.value <= rightHeight.value) {
        leftList.value.push(item);
        leftHeight.value += itemHeight;
      } else {
        rightList.value.push(item);
        rightHeight.value += itemHeight;
      }
    });
  };

  // --- 新增：文章跳转功能 ---
  const goToDetail = (id) => {
    // 关键修正：确保您的路由中定义了 /note/:id 路径
    router.push(`/note/${id}`);
  };

  // --- 处理点赞事件，阻止事件冒泡 ---
  const handleLikeClick = (event, id) => {
    event.stopPropagation(); // 阻止点击事件向上冒泡到卡片 DIV，避免触发跳转
    toggleLike(id, currentTab.value); // 传入当前 Tab 名称，确保更新正确的数据列表
  };

  // --- 加载和渲染数据 ---
  const loadInitialData = () => {
    isLoading.value = true;
    // 直接使用 currentNotes.value
    splitItemsIntoColumns(currentNotes.value);

    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  };

  // --- 监听 Tab 切换 ---
  // 监听 Pinia Store 中的 activeTab 变化时，重新加载数据
  watch(currentTab, () => {
    loadInitialData();
  }, { immediate: true });

  // --- 监听 Pinia Store 中的 currentNotes 变化，重新执行瀑布流分列 (重要！) ---
  watch(currentNotes, (newNotes) => {
    splitItemsIntoColumns(newNotes);
    // 在数据更新和分列完成后，重置加载状态
    // 由于 Pinia 的 Getter 返回的是响应式数据，此处确保数据变化时重新渲染
  }, { deep: true });

  // ... (保持 onMounted 和 handleScroll 逻辑不变) ...
  const handleScroll = () => {
    const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.offsetHeight - 100);

    if (isNearBottom && !isLoading.value) {
      isLoading.value = true;

      setTimeout(() => {
        store.loadMoreNotes();
      }, 1000);
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

</script>

<template>
  <div class="home-container">
    <Sidebar v-model:isOpen="isSidebarOpen" />

    <header class="header">
      <div class="menu-icon" @click="toggleSidebar">☰</div>
      <nav class="tabs">
        <span :class="['tab-item', { active: currentTab === 'follow' }]" @click="setActiveTab('follow')">
          关注
        </span>
        <span :class="['tab-item', { active: currentTab === 'discovery' }]" @click="setActiveTab('discovery')">
          发现
        </span>
        <span :class="['tab-item', { active: currentTab === 'nearby' }]" @click="setActiveTab('nearby')">
          附近
        </span>
      </nav>
      <div class="search-icon" @click="router.push('/search')">🔍</div>
    </header>

    <main v-if="!isLoading" class="waterfall-container">
      <div class="column">
        <div v-for="item in leftList" :key="item.id" class="card" @click="goToDetail(item.id)">
          <div class="image-wrapper" :style="{ aspectRatio: `${300}/${item.height || 400}` }">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <span v-if="currentTab === 'nearby' && item.distance" class="distance-tag">{{ item.distance }}</span>
          </div>
          <div class="card-footer">
            <p class="title">{{ item.title }}</p>
            <div class="meta">
              <span class="author">By {{ item.author }}</span>
              <span :class="['likes', { liked: item.isLiked }]" @click="handleLikeClick($event, item.id)">
                <i :class="item.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i> {{ item.likes }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div v-for="item in rightList" :key="item.id" class="card" @click="goToDetail(item.id)">
          <div class="image-wrapper" :style="{ aspectRatio: `${300}/${item.height || 400}` }">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <span v-if="currentTab === 'nearby' && item.distance" class="distance-tag">{{ item.distance }}</span>
          </div>
          <div class="card-footer">
            <p class="title">{{ item.title }}</p>
            <div class="meta">
              <span class="author">By {{ item.author }}</span>
              <span :class="['likes', { liked: item.isLiked }]" @click="handleLikeClick($event, item.id)">
                <i :class="item.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i> {{ item.likes }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-if="isLoading" class="loading-indicator">
      正在加载...
    </div>
  </div>
</template>

<style scoped>

  /* --- 顶部导航栏样式 --- */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background: rgba(255, 255, 255, 0.98);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    z-index: 999;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 600px) {
    .header {
      max-width: 600px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .menu-icon,
  .search-icon {
    font-size: 20px;
    color: #666;
    cursor: pointer;
    width: 40px;
    text-align: center;
  }

  .tabs {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 100%;
    align-items: center;
  }

  .tab-item {
    font-size: 16px;
    color: #999;
    font-weight: 600;
    transition: all 0.2s;
    position: relative;
    cursor: pointer;
    line-height: 44px;
  }

  .tab-item.active {
    color: #333;
    font-size: 17px;
    font-weight: 800;
  }

  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background-color: #ff2442;
    border-radius: 2px;
  }

  /* --- 瀑布流样式 --- */
  .waterfall-container {
    display: flex;
    padding: 6px;
    gap: 6px;
    align-items: flex-start;
    margin-top: 44px;
    /* 顶部导航栏占位 */
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  .card:active {
    transform: scale(0.98);
  }

  .image-wrapper {
    width: 100%;
    background-color: #f0f0f0;
    position: relative;
    display: block;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .distance-tag {
    position: absolute;
    bottom: 6px;
    right: 6px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
  }

  .card-footer {
    padding: 8px 10px 12px;
  }

  .title {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #666;
  }

  .author {
    font-weight: 500;
  }

  .likes {
    color: #999;
    cursor: pointer;
  }

  .likes.liked {
    color: #ff385c;
    /* 点赞后的颜色 */
  }

  .likes i {
    margin-right: 4px;
  }

  /* --- Loading 样式 --- */
  .loading-indicator {
    text-align: center;
    padding: 20px;
    color: #666;
    font-size: 14px;
  }
</style>