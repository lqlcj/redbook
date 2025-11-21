// src/stores/notesStore.js

import { defineStore } from 'pinia';
import generateMockData from '../data/mockData'; // 导入生成器

export const useNotesStore = defineStore('notes', {
  state: () => ({
    // 分离三个 Tab 的数据状态
    followNotes: generateMockData(15, 'follow'),
    discoveryNotes: generateMockData(20, 'discovery'),
    nearbyNotes: generateMockData(18, 'nearby'),
    
    activeTab: 'discovery' 
  }),

  getters: {
    // 根据当前 Tab 动态返回数据列表
    currentNotes: (state) => {
        switch (state.activeTab) {
            case 'follow':
                return state.followNotes;
            case 'nearby':
                return state.nearbyNotes;
            case 'discovery':
            default:
                return state.discoveryNotes;
        }
    },
    currentTab: (state) => state.activeTab,

    // 新增 Getter：根据 ID 获取文章对象
    getNoteById: (state) => (id) => {
        // 由于您的数据分散在三个数组中，我们需要遍历查找
        const all = [...state.followNotes, ...state.discoveryNotes, ...state.nearbyNotes];
        // 注意：路由参数是字符串，需要将其转换为数字类型进行严格比较
        // 最好使用 parseFloat 或 parseInt 进行比较
        const targetId = parseFloat(id);
        
        // 查找帖子，同时添加一个模拟的正文内容
        const note = all.find(n => n.id === targetId);

        if (note) {
            // 模拟正文，因为 mockData 中没有正文
            note.content = `这是 ID 为 ${note.id} 的文章正文。欢迎来到小红书文章详情页的复刻版本！\n\n${note.title} 是一篇关于 Vue 3、Pinia 和组件优化的完美示例。我们的目标是创建一个功能完整、用户体验良好的界面。\n\n点赞、评论和收藏功能即将实现，敬请期待！`;
        }
        return note;
    },
  },

  actions: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
      // 切换 Tab 时，可以模拟重新加载数据
      console.log(`切换到 Tab: ${tabName}`);
    },

    toggleLike(noteId, tabName) {
      // 确定要修改哪个数组
      let targetArray = this.discoveryNotes;
      if (tabName === 'follow') targetArray = this.followNotes;
      if (tabName === 'nearby') targetArray = this.nearbyNotes;
      
      const note = targetArray.find(n => n.id === noteId);
      if (note) {
        if (note.isLiked) {
          note.likes -= 1;
        } else {
          note.likes += 1;
        }
        note.isLiked = !note.isLiked;
      }
    },
    
    // 模拟加载更多数据
    loadMoreNotes() {
        const newNotes = generateMockData(5, this.activeTab); // 加载当前 Tab 的数据
        
        // 将新数据添加到当前活跃的列表中
        switch (this.activeTab) {
            case 'follow':
                this.followNotes.push(...newNotes);
                break;
            case 'nearby':
                this.nearbyNotes.push(...newNotes);
                break;
            case 'discovery':
            default:
                this.discoveryNotes.push(...newNotes);
                break;
        }
    }
  },
});