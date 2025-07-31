// 性能优化：全局变量和缓存
let charts = {};
let isInitialized = false;
let chartQueue = [];

// 数据定义（使用更紧凑的格式）
const data = {
    healthTrendData: [
        { date: '2024-01', value: 82 }, { date: '2024-02', value: 84 },
        { date: '2024-03', value: 83 }, { date: '2024-04', value: 85 },
        { date: '2024-05', value: 87 }, { date: '2024-06', value: 86.5 }
    ],
    businessData: [
        { name: '客户信息', value: '156', trend: '+2.3%', trendClass: 'trend-up' },
        { name: '营销资源', value: '98', trend: '-1.5%', trendClass: 'trend-down' },
        { name: '财务管理', value: '187', trend: '-3.2%', trendClass: 'trend-down' },
        { name: '营收资金管理', value: '132', trend: '+1.8%', trendClass: 'trend-up' },
        { name: '信贷欠票与发票管理', value: '211', trend: '+4.5%', trendClass: 'trend-up' },
        { name: '资金支出管理', value: '176', trend: '-2.1%', trendClass: 'trend-down' }
    ],
    businessTrendData: [
        { name: '客户信息', score: 85, trend: 2.3 },
        { name: '营销资源', score: 78, trend: -1.5 },
        { name: '财务管理', score: 92, trend: -3.2 },
        { name: '营收资金管理', score: 88, trend: 1.8 },
        { name: '信贷欠票与发票管理', score: 95, trend: 4.5 },
        { name: '资金支出管理', score: 82, trend: -2.1 }
    ],
    businessDetails: [
        { name: '财务管理', count: '187', trend: '-3.2%', trendClass: 'trend-down', projects: 45 },
        { name: '营收资金管理', count: '132', trend: '+1.8%', trendClass: 'trend-up', projects: 28 }
    ],
    mapData: [
        { name: '广州市', value: 92.3, warnings: 156 },
        { name: '深圳市', value: 91.7, warnings: 198 },
        { name: '珠海市', value: 89.2, warnings: 234 },
        { name: '汕头市', value: 87.8, warnings: 167 },
        { name: '佛山市', value: 85.4, warnings: 145 },
        { name: '韶关市', value: 83.1, warnings: 123 },
        { name: '湛江市', value: 81.6, warnings: 98 },
        { name: '肇庆市', value: 79.3, warnings: 87 },
        { name: '江门市', value: 88.5, warnings: 134 },
        { name: '茂名市', value: 86.2, warnings: 112 },
        { name: '惠州市', value: 84.7, warnings: 156 },
        { name: '梅州市', value: 82.9, warnings: 89 },
        { name: '汕尾市', value: 80.4, warnings: 67 },
        { name: '河源市', value: 78.6, warnings: 78 },
        { name: '阳江市', value: 85.1, warnings: 95 },
        { name: '清远市', value: 83.8, warnings: 103 },
        { name: '东莞市', value: 90.2, warnings: 178 },
        { name: '中山市', value: 88.9, warnings: 145 },
        { name: '潮州市', value: 81.3, warnings: 76 },
        { name: '揭阳市', value: 79.8, warnings: 82 },
        { name: '云浮市', value: 77.5, warnings: 54 }
    ],
    cityRankingData: [
        { rank: 1, city: '广州市', health: '92.3', warnings: '156' },
        { rank: 2, city: '深圳市', health: '91.7', warnings: '198' },
        { rank: 3, city: '东莞市', health: '90.2', warnings: '178' },
        { rank: 4, city: '珠海市', health: '89.2', warnings: '234' },
        { rank: 5, city: '中山市', health: '88.9', warnings: '145' },
        { rank: 6, city: '江门市', health: '88.5', warnings: '134' },
        { rank: 7, city: '汕头市', health: '87.8', warnings: '167' },
        { rank: 8, city: '阳江市', health: '85.1', warnings: '95' }
    ],
    productData: [
        { name: '和教育', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
        { name: '物联网', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
        { name: '云视讯', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
        { name: '短彩信', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
        { name: '移动云', value: '156', trend: '-2.3%', trendClass: 'trend-down' }
    ],
    projectStats: {
        warnings: '838', warningsTrend: '+0%', warningsTrendClass: 'trend-stable',
        projects: '763', projectsTrend: '+0%', projectsTrendClass: 'trend-stable',
        customers: '733', customersTrend: '+0%', customersTrendClass: 'trend-stable'
    },
    riskStructureData: [
        { name: '售前', value: 252, percentage: 30.1 },
        { name: '售中', value: 586, percentage: 69.9 },
        { name: '售后', value: 0, percentage: 0.0 }
    ],
    riskIndicators: [
        { name: '项目立项风险', warnings: 156, trend: '+2.3%', projects: 45, customers: 38 },
        { name: '合同履约风险', warnings: 234, trend: '-1.5%', projects: 67, customers: 52 },
        { name: '实施交付风险', warnings: 189, trend: '+3.2%', projects: 54, customers: 41 },
        { name: '验收结算风险', warnings: 167, trend: '-0.8%', projects: 48, customers: 35 },
        { name: '资金拨付风险', warnings: 92, trend: '+1.2%', projects: 28, customers: 22 }
    ],
    eventTrendData: [
        { month: '1月', value: 180 }, { month: '2月', value: 220 },
        { month: '3月', value: 195 }, { month: '4月', value: 240 },
        { month: '5月', value: 280 }, { month: '6月', value: 320 }
    ],
    eventSourceData: [
        { name: '专家事件', value: 45 },
        { name: '事件排查', value: 35 },
        { name: '系统监控', value: 20 }
    ],
    eventStatusData: [
        { name: '已处理', value: 75 },
        { name: '待处理', value: 25 }
    ]
};

// 广东省地图数据（改进版）
const guangdongMapData = {
    type: 'FeatureCollection',
    features: [
        { 
            type: 'Feature', 
            properties: { name: '广州市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.1, 23.0], [113.4, 23.0], [113.4, 23.3], [113.1, 23.3], [113.1, 23.0]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '深圳市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.9, 22.4], [114.2, 22.4], [114.2, 22.7], [113.9, 22.7], [113.9, 22.4]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '珠海市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.4, 22.1], [113.7, 22.1], [113.7, 22.4], [113.4, 22.4], [113.4, 22.1]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '汕头市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [116.5, 23.2], [116.8, 23.2], [116.8, 23.5], [116.5, 23.5], [116.5, 23.2]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '佛山市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.0, 22.9], [113.3, 22.9], [113.3, 23.2], [113.0, 23.2], [113.0, 22.9]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '韶关市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.4, 24.7], [113.7, 24.7], [113.7, 25.0], [113.4, 25.0], [113.4, 24.7]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '湛江市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [110.2, 21.1], [110.5, 21.1], [110.5, 21.4], [110.2, 21.4], [110.2, 21.1]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '肇庆市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [112.3, 22.9], [112.6, 22.9], [112.6, 23.2], [112.3, 23.2], [112.3, 22.9]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '江门市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [112.9, 22.4], [113.2, 22.4], [113.2, 22.7], [112.9, 22.7], [112.9, 22.4]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '茂名市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [110.8, 21.5], [111.1, 21.5], [111.1, 21.8], [110.8, 21.8], [110.8, 21.5]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '惠州市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [114.3, 23.0], [114.6, 23.0], [114.6, 23.3], [114.3, 23.3], [114.3, 23.0]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '梅州市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [116.0, 24.1], [116.3, 24.1], [116.3, 24.4], [116.0, 24.4], [116.0, 24.1]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '汕尾市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [115.2, 22.6], [115.5, 22.6], [115.5, 22.9], [115.2, 22.9], [115.2, 22.6]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '河源市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [114.5, 23.6], [114.8, 23.6], [114.8, 23.9], [114.5, 23.9], [114.5, 23.6]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '阳江市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [111.8, 21.7], [112.1, 21.7], [112.1, 22.0], [111.8, 22.0], [111.8, 21.7]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '清远市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [112.9, 23.5], [113.2, 23.5], [113.2, 23.8], [112.9, 23.8], [112.9, 23.5]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '东莞市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.6, 22.9], [113.9, 22.9], [113.9, 23.2], [113.6, 23.2], [113.6, 22.9]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '中山市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [113.2, 22.4], [113.5, 22.4], [113.5, 22.7], [113.2, 22.7], [113.2, 22.4]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '潮州市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [116.5, 23.5], [116.8, 23.5], [116.8, 23.8], [116.5, 23.8], [116.5, 23.5]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '揭阳市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [116.2, 23.4], [116.5, 23.4], [116.5, 23.7], [116.2, 23.7], [116.2, 23.4]
                ]]
            } 
        },
        { 
            type: 'Feature', 
            properties: { name: '云浮市' }, 
            geometry: { 
                type: 'Polygon', 
                coordinates: [[
                    [111.9, 22.8], [112.2, 22.8], [112.2, 23.1], [111.9, 23.1], [111.9, 22.8]
                ]]
            } 
        }
    ]
};

// 工具函数
const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const getTrendClass = trend => trend.includes('+') ? 'trend-up' : trend.includes('-') ? 'trend-down' : 'trend-stable';
const getColorByName = name => {
    const colorMap = {
        '售前': '#409eff', '售中': '#67c23a', '售后': '#909399',
        '专家事件': '#409eff', '事件排查': '#67c23a', '系统监控': '#e6a23c',
        '已处理': '#67c23a', '待处理': '#e6a23c'
    };
    return colorMap[name] || '#409eff';
};

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：懒加载图表
function lazyLoadCharts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (chartQueue.includes(chartId)) {
                    initChartById(chartId);
                    chartQueue = chartQueue.filter(id => id !== chartId);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // 观察所有图表容器
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        observer.observe(container);
    });
}

// 根据ID初始化图表
function initChartById(chartId) {
    switch(chartId) {
        case 'healthTrendChart': initHealthTrendChart(); break;
        case 'businessTrendChart': initBusinessTrendChart(); break;
        case 'riskMap': initRiskMap(); break;
        case 'riskStructureChart': initRiskStructureChart(); break;
        case 'eventTrendChart': initEventTrendChart(); break;
        case 'eventSourceChart': initEventSourceChart(); break;
        case 'eventStatusChart': initEventStatusChart(); break;
    }
}

// 初始化函数
function initDashboard() {
    if (isInitialized) return;
    
    console.log('开始初始化政企风控平台...');
    
    // 立即渲染静态内容
    renderBusinessCards();
    renderBusinessDetails();
    renderCityRanking();
    renderProductCards();
    renderProjectStats();
    renderRiskIndicators();
    
    // 确保ECharts已加载后再初始化图表
    function initChartsWhenReady() {
        if (typeof echarts !== 'undefined') {
            console.log('ECharts已加载，开始初始化图表...');
            
            // 立即初始化关键图表
            initRiskMap();
            initHealthTrendChart();
            initBusinessTrendChart();
            
            // 延迟初始化其他图表
            setTimeout(() => {
                initCharts();
                lazyLoadCharts();
            }, 300);
            
            initEventListeners();
            isInitialized = true;
            console.log('政企风控平台初始化完成');
        } else {
            console.log('等待ECharts加载...');
            setTimeout(initChartsWhenReady, 100);
        }
    }
    
    // 开始检查ECharts是否加载
    setTimeout(initChartsWhenReady, 100);
}

// 渲染函数（优化版本）
function renderBusinessCards() {
    const container = document.getElementById('businessCards');
    if (!container) return;
    
    container.innerHTML = data.businessData.map(item => 
        `<div class="business-item">
            <div class="business-name">${item.name}</div>
            <div class="business-value">${item.value}</div>
            <div class="business-trend ${item.trendClass}">${item.trend}</div>
        </div>`
    ).join('');
}

function renderBusinessDetails() {
    const container = document.getElementById('businessDetails');
    if (!container) return;
    
    container.innerHTML = data.businessDetails.map(item => 
        `<div class="business-detail-item">
            <div class="detail-header">
                <span class="detail-name">${item.name}</span>
                <span class="detail-count">${item.count}</span>
            </div>
            <div class="detail-trend ${item.trendClass}">${item.trend}</div>
            <div class="detail-projects">涉及项目: ${item.projects}</div>
        </div>`
    ).join('');
}

function renderCityRanking() {
    const container = document.getElementById('cityRankingTable');
    if (!container) {
        console.error('城市排名容器未找到');
        return;
    }
    
    try {
        console.log('开始渲染城市排名...');
        container.innerHTML = `<table>
            <thead><tr><th>排名</th><th>地市</th><th>健康度</th><th>预警量</th></tr></thead>
            <tbody>${data.cityRankingData.map(item => 
                `<tr><td>${item.rank}</td><td>${item.city}</td><td>${item.health}</td><td>${item.warnings}</td></tr>`
            ).join('')}</tbody>
        </table>`;
        console.log('城市排名渲染完成');
    } catch (error) {
        console.error('城市排名渲染失败:', error);
    }
}

function renderProductCards() {
    const container = document.getElementById('productCards');
    if (!container) return;
    
    container.innerHTML = data.productData.map(item => 
        `<div class="product-item">
            <div class="product-info">
                <div class="product-name">${item.name}</div>
                <div class="product-value">${item.value}</div>
                <div class="product-trend ${item.trendClass}">${item.trend}</div>
            </div>
            <button>看趋势</button>
        </div>`
    ).join('');
}

function renderProjectStats() {
    const container = document.getElementById('projectStats');
    if (!container) return;
    
    container.innerHTML = `<div class="stat-item">
        <div class="stat-label">预警量</div>
        <div class="stat-value">${data.projectStats.warnings}</div>
        <div class="stat-trend ${data.projectStats.warningsTrendClass}">${data.projectStats.warningsTrend}</div>
    </div>
    <div class="stat-item">
        <div class="stat-label">涉及项目</div>
        <div class="stat-value">${data.projectStats.projects}</div>
        <div class="stat-trend ${data.projectStats.projectsTrendClass}">${data.projectStats.projectsTrend}</div>
    </div>
    <div class="stat-item">
        <div class="stat-label">涉及客户</div>
        <div class="stat-value">${data.projectStats.customers}</div>
        <div class="stat-trend ${data.projectStats.customersTrendClass}">${data.projectStats.customersTrend}</div>
    </div>`;
}

function renderRiskIndicators() {
    const container = document.getElementById('riskIndicators');
    if (!container) return;
    
    container.innerHTML = `<table>
        <thead><tr><th>指标名称</th><th>预警量</th><th>环比</th><th>涉及项目</th><th>涉及客户</th></tr></thead>
        <tbody>${data.riskIndicators.map(item => 
            `<tr><td>${item.name}</td><td>${item.warnings}</td><td class="${getTrendClass(item.trend)}">${item.trend}</td><td>${item.projects}</td><td>${item.customers}</td></tr>`
        ).join('')}</tbody>
    </table>`;
}

// 图表初始化函数（优化版本）
function initCharts() {
    // 将图表ID加入队列，等待懒加载
    chartQueue = [
        'healthTrendChart', 'businessTrendChart', 'riskMap',
        'riskStructureChart', 'eventTrendChart', 'eventSourceChart', 'eventStatusChart'
    ];
}

function initHealthTrendChart() {
    const chartDom = document.getElementById('healthTrendChart');
    if (!chartDom || charts.healthTrend) return;

    const chart = echarts.init(chartDom);
    const option = {
        grid: { top: 5, right: 5, bottom: 5, left: 5, containLabel: false },
        xAxis: { type: 'category', show: false, data: data.healthTrendData.map(item => item.date) },
        yAxis: { type: 'value', show: false },
        series: [{
            data: data.healthTrendData.map(item => item.value),
            type: 'line', smooth: true, symbol: 'none',
            lineStyle: { color: '#409eff', width: 2 },
            areaStyle: {
                color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: '#409eff40' }, { offset: 1, color: '#409eff10' }]
                }
            }
        }]
    };
    chart.setOption(option);
    charts.healthTrend = chart;
}

function initBusinessTrendChart() {
    const chartDom = document.getElementById('businessTrendChart');
    if (!chartDom || charts.businessTrend) return;

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: { data: ['得分', '环比'], top: 10, textStyle: { fontSize: 12 } },
        grid: { top: 50, right: 20, bottom: 30, left: 60, containLabel: true },
        xAxis: { type: 'category', data: data.businessTrendData.map(item => item.name), axisLabel: { fontSize: 12, rotate: 45 } },
        yAxis: [
            { type: 'value', name: '得分', position: 'left', axisLabel: { fontSize: 12 } },
            { type: 'value', name: '环比(%)', position: 'right', axisLabel: { fontSize: 12 } }
        ],
        series: [
            {
                name: '得分', type: 'bar', data: data.businessTrendData.map(item => item.score),
                itemStyle: { color: '#409eff' }, barWidth: '40%'
            },
            {
                name: '环比', type: 'line', yAxisIndex: 1, data: data.businessTrendData.map(item => item.trend),
                itemStyle: { color: '#67c23a' }, lineStyle: { width: 2 }, symbol: 'circle', symbolSize: 6
            }
        ]
    };
    chart.setOption(option);
    charts.businessTrend = chart;
}

function initRiskMap() {
    const chartDom = document.getElementById('riskMap');
    if (!chartDom) {
        console.error('地图容器未找到');
        return;
    }
    if (charts.riskMap) {
        console.log('地图已初始化，跳过');
        return;
    }

    try {
        console.log('开始初始化广东省地图...');
        
        // 确保ECharts已加载
        if (typeof echarts === 'undefined') {
            console.error('ECharts未加载');
            return;
        }
        
        // 注册地图数据
        echarts.registerMap('guangdong', guangdongMapData);
        console.log('地图数据注册成功');
        
        // 初始化图表
        const chart = echarts.init(chartDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        console.log('ECharts实例创建成功');
        
        // 准备地图数据
        const mapData = data.mapData.map(item => ({
            name: item.name,
            value: item.value,
            warnings: item.warnings
        }));
        console.log('地图数据准备完成:', mapData.length, '个城市');
        
        const option = {
            backgroundColor: '#ffffff',
            title: {
                text: '广东省风险健康度分布',
                left: 'center',
                top: 10,
                textStyle: { 
                    fontSize: 16, 
                    color: '#333',
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: { color: '#333' },
                formatter: function(params) {
                    const cityData = data.mapData.find(item => item.name === params.name);
                    if (cityData) {
                        return `<div style="padding: 8px;">
                            <div style="font-weight: bold; margin-bottom: 5px;">${params.name}</div>
                            <div>健康度: <span style="color: #409eff; font-weight: bold;">${cityData.value}分</span></div>
                            <div>预警量: <span style="color: #e6a23c; font-weight: bold;">${cityData.warnings}</span></div>
                        </div>`;
                    }
                    return params.name;
                }
            },
            visualMap: {
                type: 'continuous',
                min: 70,
                max: 100,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                calculable: true,
                inRange: {
                    color: ['#d5e8fc', '#2171b5']
                },
                textStyle: { 
                    color: '#333',
                    fontSize: 12
                },
                itemWidth: 20,
                itemHeight: 120
            },
            series: [{
                name: '风险健康度',
                type: 'map',
                map: 'guangdong',
                roam: true,
                zoom: 1.2,
                center: [113.5, 23.5],
                emphasis: {
                    label: { 
                        show: true,
                        fontSize: 12,
                        color: '#333'
                    },
                    itemStyle: {
                        areaColor: '#ffd700',
                        borderColor: '#333',
                        borderWidth: 2
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    areaColor: '#f0f0f0'
                },
                data: mapData,
                label: {
                    show: true,
                    fontSize: 10,
                    color: '#333'
                }
            }]
        };
        
        console.log('地图配置准备完成');
        chart.setOption(option);
        charts.riskMap = chart;
        
        // 添加窗口大小变化监听
        window.addEventListener('resize', function() {
            if (charts.riskMap) {
                charts.riskMap.resize();
            }
        });
        
        console.log('广东省地图初始化完成');
        
        // 强制重绘
        setTimeout(() => {
            if (charts.riskMap) {
                charts.riskMap.resize();
            }
        }, 100);
        
    } catch (error) {
        console.error('地图初始化失败:', error);
        console.error('错误详情:', error.message);
        console.error('错误堆栈:', error.stack);
    }
}

function initRiskStructureChart() {
    const chartDom = document.getElementById('riskStructureChart');
    if (!chartDom || charts.riskStructure) return;

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', top: 'middle', textStyle: { fontSize: 12 } },
        series: [{
            name: '风险结构', type: 'pie', radius: ['40%', '70%'], center: ['60%', '50%'],
            avoidLabelOverlap: false, label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: '18', fontWeight: 'bold' } },
            labelLine: { show: false },
            data: data.riskStructureData.map(item => ({
                name: item.name, value: item.value, itemStyle: { color: getColorByName(item.name) }
            }))
        }]
    };
    chart.setOption(option);
    charts.riskStructure = chart;
}

function initEventTrendChart() {
    const chartDom = document.getElementById('eventTrendChart');
    if (!chartDom || charts.eventTrend) return;

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        grid: { top: 20, right: 20, bottom: 30, left: 40, containLabel: true },
        xAxis: { type: 'category', data: data.eventTrendData.map(item => item.month), axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        series: [{
            data: data.eventTrendData.map(item => item.value), type: 'line', smooth: true,
            symbol: 'circle', symbolSize: 4, lineStyle: { color: '#409eff', width: 2 },
            itemStyle: { color: '#409eff' },
            areaStyle: {
                color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: '#409eff40' }, { offset: 1, color: '#409eff10' }]
                }
            }
        }]
    };
    chart.setOption(option);
    charts.eventTrend = chart;
}

function initEventSourceChart() {
    const chartDom = document.getElementById('eventSourceChart');
    if (!chartDom || charts.eventSource) return;

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', top: 'middle', textStyle: { fontSize: 10 } },
        series: [{
            name: '事件来源', type: 'pie', radius: '50%', center: ['60%', '50%'],
            data: data.eventSourceData.map(item => ({
                name: item.name, value: item.value, itemStyle: { color: getColorByName(item.name) }
            })),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }]
    };
    chart.setOption(option);
    charts.eventSource = chart;
}

function initEventStatusChart() {
    const chartDom = document.getElementById('eventStatusChart');
    if (!chartDom || charts.eventStatus) return;

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', top: 'middle', textStyle: { fontSize: 10 } },
        series: [{
            name: '事件状态', type: 'pie', radius: '50%', center: ['60%', '50%'],
            data: data.eventStatusData.map(item => ({
                name: item.name, value: item.value, itemStyle: { color: getColorByName(item.name) }
            })),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }]
    };
    chart.setOption(option);
    charts.eventStatus = chart;
}

// 事件监听器（优化版本）
function initEventListeners() {
    // 标签切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 时间模式切换
    document.querySelectorAll('input[name="timeMode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('时间模式切换:', this.value);
        });
    });

    // 搜索功能（防抖）
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            console.log('搜索关键词:', this.value);
        }, 300));
    }

    // 窗口大小变化时重新调整图表（防抖）
    window.addEventListener('resize', debounce(function() {
        Object.values(charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }, 250));
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保ECharts已加载
    setTimeout(initDashboard, 50);
    console.log('政企风控平台初始化完成');
}); 