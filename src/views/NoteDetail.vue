<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useNotesStore } from '../stores/notesStore';

  const route = useRoute();
  const router = useRouter();
  const store = useNotesStore();

  // --- 状态 ---
  const noteId = ref(route.params.id);
  const commentText = ref('');
  const isFollowing = ref(false); // 模拟关注状态

  // --- 计算属性：获取当前文章数据 ---
  const currentNote = computed(() => store.getNoteById(noteId.value));

  // --- 模拟评论数据 (硬编码，待Pinia优化) ---
  const comments = ref([
    { id: 1, author: '用户A', content: '图片拍得真好！是什么相机呀？', time: '5分钟前', likes: 12 },
    { id: 2, author: '用户B', content: '楼上的，这可能是 iPhone 15 Pro Max 拍的吧！', time: '3分钟前', likes: 5 },
    { id: 3, author: '用户C', content: '我非常喜欢这篇文章的结构和内容！', time: '1分钟前', likes: 2 },
  ]);

  // --- 方法 ---

  // 1. 关注/取关
  const toggleFollow = () => {
    isFollowing.value = !isFollowing.value;
    alert(isFollowing.value ? `已关注 ${currentNote.value.author}` : `已取消关注 ${currentNote.value.author}`);
  };

  // 2. 点赞 (复用 Home.vue 的 Pinia Action)
  const handleLike = () => {
    // 切换点赞状态，注意这里只需要 ID，不需要 tabName
    store.toggleLike(currentNote.value.id, 'discovery'); // 简化处理，使用 discovery tab 的数据进行修改
  };

  // 3. 发表评论
  const postComment = () => {
    if (commentText.value.trim() === '') return;

    // 模拟评论新增
    comments.value.unshift({
      id: Date.now(),
      author: '我 (User)',
      content: commentText.value,
      time: '刚刚',
      likes: 0
    });

    commentText.value = ''; // 清空输入框
    alert('评论成功！');
  };

  // 4. 监听路由变化 (如果用户从一个详情页跳转到另一个)
  watch(() => route.params.id, (newId) => {
    noteId.value = newId;
  }, { immediate: true });

  onMounted(() => {
    // 模拟初始关注状态（根据实际应用逻辑）
    isFollowing.value = Math.random() > 0.5;
  });

</script>

<template>
  <div v-if="currentNote" class="note-detail-container">
    <header class="detail-header">
      <div class="back-icon" @click="router.back()">←</div>
      <span class="header-title">笔记详情</span>
      <div class="share-icon">...</div>
    </header>

    <main class="note-content">
      <div class="image-display">
        <img :src="currentNote.image" :alt="currentNote.title" class="note-image" />
      </div>

      <section class="user-bar">
        <div class="user-info">
          <img src="https://picsum.photos/40/40" alt="Avatar" class="user-avatar" />
          <span class="user-name">{{ currentNote.author }}</span>
        </div>
        <button :class="['follow-btn', { followed: isFollowing }]" @click="toggleFollow">
          {{ isFollowing ? '已关注' : '+ 关注' }}
        </button>
      </section>

      <section class="text-content">
        <h1 class="note-title">{{ currentNote.title }}</h1>
        <p v-for="(line, index) in currentNote.content.split('\n')" :key="index" class="note-body">
          {{ line }}
        </p>
        <div class="meta-info">
          <span>{{ currentNote.distance ? `📍 ${currentNote.distance}` : '📍 默认位置' }}</span>
          <span>2025年11月21日</span>
        </div>
      </section>

      <section class="comment-section">
        <h2>评论 ({{ comments.length }})</h2>
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <img src="https://picsum.photos/30/30" alt="Commenter" class="comment-avatar" />
          <div class="comment-body">
            <div class="comment-meta">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
            <div class="comment-actions">
              <span>回复</span>
              <span class="comment-likes">👍 {{ comment.likes }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bottom-bar">
      <input v-model="commentText" @keyup.enter="postComment" placeholder="点赞、评论、收藏..." class="comment-input" />
      <div class="action-icons">
        <span @click="handleLike" :class="{ 'liked': currentNote.isLiked }">
          <i :class="currentNote.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
          {{ currentNote.likes }}
        </span>
        <span>
          <i class="far fa-star"></i> 收藏
        </span>
      </div>
    </footer>
  </div>
  <div v-else class="loading-message">
    文章加载中...
  </div>
</template>

<style scoped>

  /* 容器和布局 */
  .note-detail-container {
    padding-bottom: 60px;
    /* 留出底部操作栏的空间 */
    background: #fff;
    min-height: 100vh;
  }

  /* 顶部导航栏 */
  .detail-header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #fff;
    z-index: 100;
    border-bottom: 1px solid #eee;
  }

  .back-icon,
  .share-icon {
    font-size: 20px;
    cursor: pointer;
    color: #333;
  }

  .header-title {
    font-weight: bold;
    font-size: 16px;
  }

  /* 内容区 */
  .note-content {
    padding: 0 15px;
  }

  .image-display {
    margin: 10px 0;
  }

  .note-image {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  /* 用户信息栏 */
  .user-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    font-weight: bold;
    color: #333;
    font-size: 15px;
  }

  .follow-btn {
    background: #ff2442;
    color: #fff;
    border: none;
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .follow-btn.followed {
    background: #f0f0f0;
    color: #666;
  }

  /* 标题和正文 */
  .text-content {
    margin-bottom: 30px;
  }

  .note-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.4;
  }

  .note-body {
    font-size: 15px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 10px;
  }

  .meta-info {
    font-size: 12px;
    color: #999;
    margin-top: 15px;
    display: flex;
    gap: 15px;
  }

  /* 评论区 */
  .comment-section h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .comment-item {
    display: flex;
    margin-bottom: 15px;
  }

  .comment-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .comment-body {
    flex-grow: 1;
  }

  .comment-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-author {
    font-size: 13px;
    color: #666;
    font-weight: bold;
  }

  .comment-time {
    font-size: 11px;
    color: #aaa;
  }

  .comment-content {
    font-size: 14px;
    margin: 4px 0;
    line-height: 1.5;
  }

  .comment-actions {
    font-size: 12px;
    color: #999;
    display: flex;
    gap: 10px;
  }

  .comment-likes {
    cursor: pointer;
  }

  /* 底部操作栏 */
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
    z-index: 100;
  }

  .comment-input {
    flex-grow: 1;
    border: none;
    background: #f5f5f5;
    border-radius: 25px;
    padding: 8px 15px;
    margin-right: 15px;
    font-size: 14px;
    outline: none;
  }

  .action-icons {
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: #666;
  }

  .action-icons span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .action-icons span i {
    font-size: 18px;
    margin-right: 5px;
  }

  .action-icons .liked i {
    color: #ff2442;
  }

  /* 移动端最大宽度限制 */
  @media (min-width: 600px) {

    .detail-header,
    .bottom-bar {
      max-width: 600px;
      left: 50%;
      transform: translateX(-50%);
    }

    .note-detail-container {
      max-width: 600px;
      margin: 0 auto;
    }
  }
</style>