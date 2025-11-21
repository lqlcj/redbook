// src/data/mockData.js

const generateMockData = (count = 10, type = 'discovery') => {
    const mockPosts = [];
    const titles = {
        follow: ['[关注] 我关注的博主更新了', '[关注] 老朋友的日常', '[关注] 关注列表里的宝藏', '[关注] 特别关注提醒'],
        discovery: ['[发现] 夏日限定！海边日落拍摄指南', '[发现] 一周健康食谱，告别外卖生活', '[发现] 周末探店：发现城市里的宝藏咖啡馆', '[发现] Vue框架入门与实战'],
        nearby: ['[附近] 距离你 100m 的美食', '[附近] 附近健身房折扣活动', '[附近] 同城吃喝玩乐', '[附近] 步行五分钟的咖啡']
    };
    const distances = ['100m', '500m', '1km', '2km', '附近'];
    const authors = ['Aiden', 'Bella', 'Charlie', 'Daisy', 'Ethan'];

    const typeTitles = titles[type] || titles.discovery;

    for (let i = 1; i <= count; i++) {
        const id = Date.now() + i + Math.random(); // 使用随机数确保 ID 唯一
        const width = 300;
        const height = Math.floor(Math.random() * (450 - 250 + 1)) + 250; 
        
        mockPosts.push({
            id: id,
            // 使用对应 Tab 的标题
            title: typeTitles[i % typeTitles.length] + ' (' + i + ')', 
            author: authors[i % authors.length],
            image: `https://picsum.photos/${width}/${height}?random=${id}`, 
            // 只有附近 Tab 显示距离
            distance: type === 'nearby' ? distances[i % distances.length] : null, 
            likes: Math.floor(Math.random() * 500) + 10,
            isLiked: false,
            height: height // 保留高度用于瀑布流分列
        });
    }

    return mockPosts;
};

// 导出生成器，而不是一个固定数组
export default generateMockData;