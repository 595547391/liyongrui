/* 关卡数据：二年级上册 · 数学 + 语文 */
window.GameData = (function () {
  'use strict';

  /* ================= 科目配置 ================= */

  var SUBJECTS = [
    {
      id: 'math',
      name: '数学',
      subtitle: '二年级上册',
      color: '#4A9BF5',
      colorLight: '#D6F1FF',
      emoji: '🔢',
      bg: 'linear-gradient(135deg, #D6F1FF 0%, #EAFBF0 100%)'
    },
    {
      id: 'chinese',
      name: '语文',
      subtitle: '二年级上册',
      color: '#E8765C',
      colorLight: '#FFE4D6',
      emoji: '📖',
      bg: 'linear-gradient(135deg, #FFE4D6 0%, #FFF3D6 100%)'
    }
  ];

  /* ================= 数学章节 ================= */

  var MATH_CHAPTERS = [
    {
      id: 'm1', subject: 'math', name: '认识时间',
      concept: '时和分的认识 · 1时=60分',
      levels: [
        {
          id: 'm1-1', name: '分针小怪', concept: '5分5分地数 · 认读时间',
          monsters: 3, hp: 2, time: 14, mode: 'time_conv', boss: false,
          names: ['滴答怪', '分针怪', '闹钟怪'],
          colors: ['#63D6A6', '#4CB8A0', '#7BC96F']
        },
        {
          id: 'm1-2', name: '整时换算', concept: '1时=60分 · 求经过的时间',
          monsters: 3, hp: 2, time: 12, mode: 'time_calc', boss: false,
          names: ['沙漏怪', '钟表怪', '时光怪'],
          colors: ['#5BC7F5', '#4A9BF5', '#7AB6F5']
        }
      ]
    },
    {
      id: 'm2', subject: 'math', name: '100以内的加法',
      concept: '两位数加一位数 · 两位数加两位数',
      levels: [
        {
          id: 'm2-1', name: '加法小兵', concept: '不进位加法（口算）',
          monsters: 3, hp: 2, time: 12, mode: 'add_easy', boss: false,
          names: ['加号兵', '数字兵', '十位兵'],
          colors: ['#FFB74D', '#FFA726', '#FFCC80']
        },
        {
          id: 'm2-2', name: '进位将军', concept: '进位加法（个位满十进一）',
          monsters: 3, hp: 2, time: 14, mode: 'add_hard', boss: false,
          names: ['进位将', '满十将', '进位王'],
          colors: ['#FF8A65', '#F0715C', '#FFAB91']
        }
      ]
    },
    {
      id: 'm3', subject: 'math', name: '长度单位',
      concept: '厘米和米的认识 · 量一量',
      levels: [
        {
          id: 'm3-1', name: '厘米精灵', concept: '认识厘米 · 用尺子量长度',
          monsters: 3, hp: 2, time: 14, mode: 'length_unit', boss: false,
          names: ['厘米精', '尺子精', '线段精'],
          colors: ['#81C784', '#66BB6A', '#A5D6A7']
        },
        {
          id: 'm3-2', name: '米尺巨兽', concept: '认识米 · 1米=100厘米',
          monsters: 3, hp: 2, time: 14, mode: 'km_unit', boss: false,
          names: ['米尺兽', '身高兽', '教室兽'],
          colors: ['#7986CB', '#5C6BC0', '#9FA8DA']
        },
        {
          id: 'm3-3', name: '长度霸王龙', concept: '长度单位综合 · 比大小',
          monsters: 1, hp: 3, time: 14, mode: 'ton_unit', boss: true,
          names: ['长度霸王龙'],
          colors: ['#8D6E63']
        }
      ]
    },
    {
      id: 'm4', subject: 'math', name: '100以内的减法',
      concept: '两位数减一位数 · 退位减法',
      levels: [
        {
          id: 'm4-1', name: '减法小兵', concept: '不退位减法（口算）',
          monsters: 3, hp: 2, time: 12, mode: 'sub_easy', boss: false,
          names: ['减号兵', '差号兵', '十位兵'],
          colors: ['#4DB6AC', '#26A69A', '#80CBC4']
        },
        {
          id: 'm4-2', name: '退位法师', concept: '退位减法（个位不够减）',
          monsters: 3, hp: 2, time: 14, mode: 'sub_hard', boss: false,
          names: ['退法师', '借十师', '验算师'],
          colors: ['#BA68C8', '#9C27B0', '#CE93D8']
        }
      ]
    },
    {
      id: 'm5', subject: 'math', name: '表内乘法（一）',
      concept: '2~6的乘法口诀',
      levels: [
        {
          id: 'm5-1', name: '口诀小妖', concept: '2、3、4的乘法口诀',
          monsters: 3, hp: 2, time: 14, mode: 'times_div', boss: false,
          names: ['口诀妖', '二三妖', '四六妖'],
          colors: ['#FFB300', '#FF8F00', '#FFD54F']
        },
        {
          id: 'm5-2', name: '口诀魔王', concept: '5、6的乘法口诀',
          monsters: 1, hp: 4, time: 12, mode: 'times_mul', boss: true,
          names: ['口诀魔王'],
          colors: ['#FF6F00']
        }
      ]
    },
    {
      id: 'm6', subject: 'math', name: '表内乘法（二）',
      concept: '7、8、9的乘法口诀',
      levels: [
        {
          id: 'm6-1', name: '七巧小怪', concept: '7的乘法口诀',
          monsters: 3, hp: 2, time: 12, mode: 'mul_ten', boss: false,
          names: ['七巧怪', '一周怪', '口诀怪'],
          colors: ['#7BC96F', '#5FBF9A', '#8ED15C']
        },
        {
          id: 'm6-2', name: '八音树精', concept: '8的乘法口诀',
          monsters: 3, hp: 2, time: 14, mode: 'mul_nocarry', boss: false,
          names: ['八音树精', '藤蔓怪', '紫牙怪'],
          colors: ['#B58BE8', '#9B7BE0', '#C79AF0']
        },
        {
          id: 'm6-3', name: '九宫骑士', concept: '9的乘法口诀',
          monsters: 3, hp: 3, time: 15, mode: 'mul_carry', boss: false,
          names: ['九宫骑', '九九骑', '口诀骑'],
          colors: ['#FF7043', '#F4511E', '#FF8A65']
        },
        {
          id: 'm6-4', name: '乘法大魔王', concept: '表内乘法综合 · 乘加乘减',
          monsters: 1, hp: 5, time: 14, mode: 'mul_boss', boss: true,
          names: ['乘法大魔王'],
          colors: ['#D32F2F']
        }
      ]
    },
    {
      id: 'm7', subject: 'math', name: '角的初步认识',
      concept: '认识角 · 直角、锐角和钝角',
      levels: [
        {
          id: 'm7-1', name: '角精灵', concept: '认识角 · 角的各部分',
          monsters: 3, hp: 2, time: 14, mode: 'shape_know', boss: false,
          names: ['角精灵', '顶点精', '边精'],
          colors: ['#29B6F6', '#039BE5', '#4FC3F7']
        },
        {
          id: 'm7-2', name: '直角守卫', concept: '直角、锐角和钝角',
          monsters: 3, hp: 2, time: 16, mode: 'perimeter', boss: false,
          names: ['直角卫', '锐角卫', '钝角卫'],
          colors: ['#26A69A', '#00897B', '#4DB6AC']
        }
      ]
    },
    {
      id: 'm8', subject: 'math', name: '数学广角 · 搭配（一）',
      concept: '简单的排列和组合',
      levels: [
        {
          id: 'm8-1', name: '搭配小妖', concept: '排列 · 用数字组两位数',
          monsters: 3, hp: 2, time: 14, mode: 'frac_half', boss: false,
          names: ['排列妖', '组数妖', '两位数妖'],
          colors: ['#EC407A', '#D81B60', '#F48FB1']
        },
        {
          id: 'm8-2', name: '组合怪', concept: '组合 · 衣服搭配',
          monsters: 3, hp: 2, time: 16, mode: 'frac_calc', boss: false,
          names: ['搭配怪', '上衣怪', '裤子怪'],
          colors: ['#7E57C2', '#5E35B1', '#B39DDB']
        },
        {
          id: 'm8-3', name: '搭配魔王', concept: '排列组合综合',
          monsters: 1, hp: 4, time: 14, mode: 'frac_boss', boss: true,
          names: ['搭配魔王'],
          colors: ['#5E35B1']
        }
      ]
    }
  ];

  /* ================= 语文章节 ================= */

  var CHINESE_CHAPTERS = [
    {
      id: 'c1', subject: 'chinese', name: '生字天地',
      concept: '看拼音选汉字 · 生字认读',
      levels: [
        {
          id: 'c1-1', name: '拼音精灵', concept: '看拼音选汉字（一单元）',
          monsters: 3, hp: 2, time: 14, mode: 'pinyin', boss: false,
          unit: 1,
          names: ['拼音精', '声母怪', '韵母怪'],
          colors: ['#FF8A65', '#FF7043', '#FFAB91']
        },
        {
          id: 'c1-2', name: '生字森林', concept: '看拼音选汉字（二单元）',
          monsters: 3, hp: 2, time: 14, mode: 'pinyin', boss: false,
          unit: 2,
          names: ['生字兽', '字形兽', '笔画兽'],
          colors: ['#66BB6A', '#43A047', '#A5D6A7']
        },
        {
          id: 'c1-3', name: '难字魔王', concept: '易错字综合',
          monsters: 1, hp: 4, time: 12, mode: 'pinyin_boss', boss: true,
          unit: 0,
          names: ['难字魔王'],
          colors: ['#E53935']
        }
      ]
    },
    {
      id: 'c2', subject: 'chinese', name: '词语乐园',
      concept: '近义词 · 反义词',
      levels: [
        {
          id: 'c2-1', name: '近义小妖', concept: '找近义词',
          monsters: 3, hp: 2, time: 14, mode: 'synonym', boss: false,
          names: ['近义妖', '相似妖', '意思妖'],
          colors: ['#42A5F5', '#1E88E5', '#90CAF9']
        },
        {
          id: 'c2-2', name: '反义怪客', concept: '找反义词',
          monsters: 3, hp: 2, time: 14, mode: 'antonym', boss: false,
          names: ['反义怪', '对立怪', '颠倒怪'],
          colors: ['#AB47BC', '#8E24AA', '#CE93D8']
        }
      ]
    },
    {
      id: 'c3', subject: 'chinese', name: '多音字山谷',
      concept: '多音字辨析',
      levels: [
        {
          id: 'c3-1', name: '多音字妖', concept: '多音字选音',
          monsters: 3, hp: 2, time: 14, mode: 'duoyin', boss: false,
          names: ['多音妖', '变调妖', '多音字'],
          colors: ['#FFA726', '#FB8C00', '#FFCC80']
        },
        {
          id: 'c3-2', name: '多音字王', concept: '多音字综合挑战',
          monsters: 1, hp: 4, time: 12, mode: 'duoyin_boss', boss: true,
          names: ['多音字王'],
          colors: ['#EF6C00']
        }
      ]
    },
    {
      id: 'c4', subject: 'chinese', name: '古诗城堡',
      concept: '古诗背诵 · 名句填空',
      levels: [
        {
          id: 'c4-1', name: '古诗卫士', concept: '古诗下一句',
          monsters: 3, hp: 2, time: 16, mode: 'poem_next', boss: false,
          names: ['唐诗卫', '古诗卫', '名句卫'],
          colors: ['#8D6E63', '#6D4C41', '#BCAAA4']
        },
        {
          id: 'c4-2', name: '古诗大BOSS', concept: '古诗综合填空',
          monsters: 1, hp: 4, time: 18, mode: 'poem_boss', boss: true,
          names: ['诗仙李白'],
          colors: ['#5D4037']
        }
      ]
    },
    {
      id: 'c5', subject: 'chinese', name: '成语秘境',
      concept: '四字词语填空',
      levels: [
        {
          id: 'c5-1', name: '成语精灵', concept: '补全词语',
          monsters: 3, hp: 2, time: 16, mode: 'idiom', boss: false,
          names: ['成语精', '四字精', '词语精'],
          colors: ['#26A69A', '#00897B', '#80CBC4']
        }
      ]
    },
    {
      id: 'c6', subject: 'chinese', name: '句子工坊',
      concept: '句子通顺 · 找出病句',
      levels: [
        {
          id: 'c6-1', name: '病句猎手', concept: '找出正确的句子',
          monsters: 3, hp: 2, time: 18, mode: 'sentence', boss: false,
          names: ['病句兽', '错字兽', '标点兽'],
          colors: ['#5C6BC0', '#3949AB', '#9FA8DA']
        }
      ]
    }
  ];

  /* ================= 语文题库：生字拼音 ================= */

  var PINYIN_POOL = {
    /* 一单元：小蝌蚪找妈妈 / 我是什么 / 植物妈妈有办法 */
    1: [
      { zi: '塘', pinyin: 'táng', distractor: 'tāng' },
      { zi: '脑', pinyin: 'nǎo', distractor: 'náo' },
      { zi: '袋', pinyin: 'dài', distractor: 'dèi' },
      { zi: '灰', pinyin: 'huī', distractor: 'fēi' },
      { zi: '捕', pinyin: 'bǔ', distractor: 'pǔ' },
      { zi: '迎', pinyin: 'yíng', distractor: 'yín' },
      { zi: '宽', pinyin: 'kuān', distractor: 'kuǎn' },
      { zi: '龟', pinyin: 'guī', distractor: 'jūn' },
      { zi: '顶', pinyin: 'dǐng', distractor: 'dīng' },
      { zi: '披', pinyin: 'pī', distractor: 'pēi' },
      { zi: '鼓', pinyin: 'gǔ', distractor: 'gū' },
      { zi: '晒', pinyin: 'shài', distractor: 'sài' },
      { zi: '极', pinyin: 'jí', distractor: 'jī' },
      { zi: '溪', pinyin: 'xī', distractor: 'qī' },
      { zi: '洋', pinyin: 'yáng', distractor: 'yàng' }
    ],
    /* 二单元：场景歌 / 树之歌 / 拍手歌 / 田家四季歌 */
    2: [
      { zi: '帆', pinyin: 'fān', distractor: 'fán' },
      { zi: '艘', pinyin: 'sōu', distractor: 'shōu' },
      { zi: '舰', pinyin: 'jiàn', distractor: 'jiān' },
      { zi: '稻', pinyin: 'dào', distractor: 'dǎo' },
      { zi: '翠', pinyin: 'cuì', distractor: 'chuì' },
      { zi: '铜', pinyin: 'tóng', distractor: 'tōng' },
      { zi: '号', pinyin: 'hào', distractor: 'hǎo' },
      { zi: '梧', pinyin: 'wú', distractor: 'wǔ' },
      { zi: '枫', pinyin: 'fēng', distractor: 'fōng' },
      { zi: '松', pinyin: 'sōng', distractor: 'shōng' },
      { zi: '柏', pinyin: 'bǎi', distractor: 'bái' },
      { zi: '装', pinyin: 'zhuāng', distractor: 'zuāng' },
      { zi: '耐', pinyin: 'nài', distractor: 'nǎn' },
      { zi: '桂', pinyin: 'guì', distractor: 'guǐ' },
      { zi: '银', pinyin: 'yín', distractor: 'yíng' }
    ],
    /* 0：全册易错字综合 */
    0: [
      { zi: '曹', pinyin: 'cáo', distractor: 'zāo' },
      { zi: '称', pinyin: 'chēng', distractor: 'chèn' },
      { zi: '秤', pinyin: 'chèng', distractor: 'chēn' },
      { zi: '玲', pinyin: 'líng', distractor: 'lín' },
      { zi: '糟', pinyin: 'zāo', distractor: 'zhāo' },
      { zi: '糕', pinyin: 'gāo', distractor: 'gào' },
      { zi: '信', pinyin: 'xìn', distractor: 'xìng' },
      { zi: '睡', pinyin: 'shuì', distractor: 'shuí' },
      { zi: '察', pinyin: 'chá', distractor: 'cā' },
      { zi: '葫', pinyin: 'hú', distractor: 'fú' },
      { zi: '芦', pinyin: 'lú', distractor: 'lǔ' },
      { zi: '藤', pinyin: 'téng', distractor: 'tén' },
      { zi: '盯', pinyin: 'dīng', distractor: 'dìng' },
      { zi: '邻', pinyin: 'lín', distractor: 'líng' },
      { zi: '治', pinyin: 'zhì', distractor: 'zì' }
    ]
  };

  /* ================= 语文题库：近义词 ================= */

  var SYNONYM_POOL = [
    { word: '高兴', answer: '开心', options: ['开心', '难过', '生气', '伤心'] },
    { word: '美丽', answer: '漂亮', options: ['漂亮', '丑陋', '难看', '奇怪'] },
    { word: '仔细', answer: '认真', options: ['认真', '马虎', '粗心', '随便'] },
    { word: '忽然', answer: '突然', options: ['突然', '慢慢', '渐渐', '经常'] },
    { word: '连忙', answer: '急忙', options: ['急忙', '慢慢', '站着', '休息'] },
    { word: '明白', answer: '清楚', options: ['清楚', '糊涂', '迷惑', '混乱'] },
    { word: '经常', answer: '常常', options: ['常常', '偶尔', '很少', '从不'] },
    { word: '保护', answer: '爱护', options: ['爱护', '破坏', '伤害', '扔掉'] },
    { word: '温和', answer: '温柔', options: ['温柔', '暴躁', '严厉', '凶狠'] },
    { word: '办法', answer: '方法', options: ['方法', '结果', '问题', '原因'] },
    { word: '快乐', answer: '愉快', options: ['愉快', '悲伤', '忧愁', '烦恼'] },
    { word: '惊奇', answer: '惊讶', options: ['惊讶', '平静', '无聊', '平常'] },
    { word: '观察', answer: '察看', options: ['察看', '忽略', '闭眼', '忘记'] },
    { word: '漂亮', answer: '好看', options: ['好看', '难看', '丑陋', '破旧'] },
    { word: '干净', answer: '清洁', options: ['清洁', '肮脏', '杂乱', '破旧'] }
  ];

  /* ================= 语文题库：反义词 ================= */

  var ANTONYM_POOL = [
    { word: '高兴', answer: '难过', options: ['难过', '开心', '快乐', '欢喜'] },
    { word: '快', answer: '慢', options: ['慢', '急', '迅速', '飞快'] },
    { word: '前', answer: '后', options: ['后', '左', '上', '里'] },
    { word: '里', answer: '外', options: ['外', '内', '中', '间'] },
    { word: '高', answer: '低', options: ['低', '大', '长', '远'] },
    { word: '长', answer: '短', options: ['短', '宽', '高', '久'] },
    { word: '冷', answer: '热', options: ['热', '凉', '冰', '寒'] },
    { word: '新', answer: '旧', options: ['旧', '好', '美', '净'] },
    { word: '容易', answer: '困难', options: ['困难', '简单', '轻松', '方便'] },
    { word: '危险', answer: '安全', options: ['安全', '害怕', '紧张', '小心'] },
    { word: '保护', answer: '破坏', options: ['破坏', '爱护', '关心', '帮助'] },
    { word: '温和', answer: '暴躁', options: ['暴躁', '温柔', '和气', '亲切'] },
    { word: '亮', answer: '暗', options: ['暗', '明', '白', '光'] },
    { word: '粗心', answer: '细心', options: ['细心', '马虎', '大意', '随便'] },
    { word: '美丽', answer: '丑陋', options: ['丑陋', '漂亮', '好看', '美妙'] }
  ];

  /* ================= 语文题库：多音字 ================= */

  var DUOYIN_POOL = [
    { zi: '假', word: '放假', answer: 'jià', options: ['jiǎ', 'jià', 'jiā', 'jie'] },
    { zi: '假', word: '真假', answer: 'jiǎ', options: ['jiǎ', 'jià', 'jiā', 'jie'] },
    { zi: '长', word: '长大', answer: 'zhǎng', options: ['cháng', 'zhǎng', 'zhāng', 'chāng'] },
    { zi: '长', word: '长江', answer: 'cháng', options: ['cháng', 'zhǎng', 'zhāng', 'chāng'] },
    { zi: '兴', word: '高兴', answer: 'xìng', options: ['xīng', 'xìng', 'xìn', 'xíng'] },
    { zi: '兴', word: '兴奋', answer: 'xīng', options: ['xīng', 'xìng', 'xìn', 'xíng'] },
    { zi: '觉', word: '觉得', answer: 'jué', options: ['jué', 'jiào', 'juè', 'jiǎo'] },
    { zi: '觉', word: '睡觉', answer: 'jiào', options: ['jué', 'jiào', 'juè', 'jiǎo'] },
    { zi: '种', word: '种树', answer: 'zhòng', options: ['zhǒng', 'zhòng', 'zhōng', 'chóng'] },
    { zi: '种', word: '种子', answer: 'zhǒng', options: ['zhǒng', 'zhòng', 'zhōng', 'chóng'] },
    { zi: '干', word: '干净', answer: 'gān', options: ['gān', 'gàn', 'gǎn', 'gěn'] },
    { zi: '干', word: '干活', answer: 'gàn', options: ['gān', 'gàn', 'gǎn', 'gěn'] },
    { zi: '教', word: '教书', answer: 'jiāo', options: ['jiào', 'jiāo', 'jiǎo', 'jiǒo'] },
    { zi: '教', word: '教师', answer: 'jiào', options: ['jiào', 'jiāo', 'jiǎo', 'jiǒo'] },
    { zi: '背', word: '背包', answer: 'bēi', options: ['bèi', 'bēi', 'bēng', 'bēn'] },
    { zi: '背', word: '后背', answer: 'bèi', options: ['bèi', 'bēi', 'bēng', 'bēn'] },
    { zi: '数', word: '数一数', answer: 'shǔ', options: ['shǔ', 'shù', 'shú', 'shū'] },
    { zi: '数', word: '数学', answer: 'shù', options: ['shǔ', 'shù', 'shú', 'shū'] },
    { zi: '空', word: '天空', answer: 'kōng', options: ['kōng', 'kòng', 'kǒng', 'gōng'] },
    { zi: '空', word: '有空', answer: 'kòng', options: ['kōng', 'kòng', 'kǒng', 'gōng'] },
    { zi: '发', word: '发现', answer: 'fā', options: ['fā', 'fà', 'fá', 'fǎ'] },
    { zi: '发', word: '头发', answer: 'fà', options: ['fā', 'fà', 'fá', 'fǎ'] },
    { zi: '好', word: '好人', answer: 'hǎo', options: ['hǎo', 'hào', 'hāo', 'hè'] },
    { zi: '好', word: '爱好', answer: 'hào', options: ['hǎo', 'hào', 'hāo', 'hè'] },
    { zi: '乐', word: '快乐', answer: 'lè', options: ['yuè', 'lè', 'yào', 'le'] },
    { zi: '乐', word: '音乐', answer: 'yuè', options: ['yuè', 'lè', 'yào', 'le'] },
    { zi: '只', word: '一只鸟', answer: 'zhī', options: ['zhī', 'zhǐ', 'zhí', 'zhì'] },
    { zi: '只', word: '只有', answer: 'zhǐ', options: ['zhī', 'zhǐ', 'zhí', 'zhì'] },
    { zi: '中', word: '中间', answer: 'zhōng', options: ['zhōng', 'zhòng', 'zhǒng', 'chōng'] },
    { zi: '中', word: '打中', answer: 'zhòng', options: ['zhōng', 'zhòng', 'zhǒng', 'chōng'] }
  ];

  /* ================= 语文题库：古诗（二年级上册） ================= */

  var POEM_POOL = [
    {
      title: '登鹳雀楼', author: '王之涣',
      lines: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼'],
      mode: 'next'
    },
    {
      title: '望庐山瀑布', author: '李白',
      lines: ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天'],
      mode: 'next'
    },
    {
      title: '夜宿山寺', author: '李白',
      lines: ['危楼高百尺', '手可摘星辰', '不敢高声语', '恐惊天上人'],
      mode: 'next'
    },
    {
      title: '敕勒歌', author: '北朝民歌',
      lines: ['敕勒川，阴山下', '天似穹庐，笼盖四野', '天苍苍，野茫茫', '风吹草低见牛羊'],
      mode: 'next'
    },
    {
      title: '江雪', author: '柳宗元',
      lines: ['千山鸟飞绝', '万径人踪灭', '孤舟蓑笠翁', '独钓寒江雪'],
      mode: 'next'
    },
    {
      title: '梅花', author: '王安石',
      lines: ['墙角数枝梅', '凌寒独自开', '遥知不是雪', '为有暗香来'],
      mode: 'next'
    }
  ];

  /* ================= 语文题库：四字词语 ================= */

  var IDIOM_POOL = [
    { idiom: '五光十色', blank: 2, answer: '十', options: ['十', '石', '时', '是'] },
    { idiom: '四面八方', blank: 2, answer: '八', options: ['八', '巴', '把', '发'] },
    { idiom: '三心二意', blank: 2, answer: '二', options: ['二', '两', '再', '三'] },
    { idiom: '七上八下', blank: 2, answer: '八', options: ['八', '巴', '把', '发'] },
    { idiom: '十全十美', blank: 2, answer: '十', options: ['十', '石', '时', '是'] },
    { idiom: '一心一意', blank: 2, answer: '一', options: ['一', '以', '已', '衣'] },
    { idiom: '五颜六色', blank: 2, answer: '六', options: ['六', '陆', '流', '溜'] },
    { idiom: '千军万马', blank: 2, answer: '万', options: ['万', '方', '晚', '湾'] },
    { idiom: '无影无踪', blank: 2, answer: '无', options: ['无', '吴', '五', '午'] },
    { idiom: '大摇大摆', blank: 2, answer: '大', options: ['大', '太', '天', '犬'] },
    { idiom: '东张西望', blank: 2, answer: '西', options: ['西', '洗', '喜', '细'] },
    { idiom: '摇头摆尾', blank: 2, answer: '摆', options: ['摆', '拜', '百', '败'] }
  ];

  /* ================= 语文题库：病句/正确句 ================= */

  var SENTENCE_POOL = [
    { question: '下列句子正确的是', answer: '我每天七点起床。', options: [
      '我每天七点起床。', '我起床每天七点。', '每天我七点起床的。', '七点我每天起床。'
    ]},
    { question: '下列句子有语病的是', answer: '我们班的同学都非常很高兴。', options: [
      '我们班的同学都非常高兴。', '我们班的同学都非常很高兴。', '我们班的同学都很高兴。', '我们班的同学特别高兴。'
    ]},
    { question: '下列句子正确的是', answer: '弯弯的月亮像小船。', options: [
      '弯弯的月亮像小船。', '弯弯的小船像月亮。', '月亮弯弯的像小船小。', '弯的弯月亮像小船。'
    ]},
    { question: '下列句子正确的是', answer: '一只小鸟在树上唱歌。', options: [
      '一只小鸟在树上唱歌。', '一只小鸟唱歌在树上。', '小鸟一只在树上唱歌。', '在树上一只小鸟唱歌。'
    ]},
    { question: '下列句子有语病的是', answer: '他戴着一顶帽子，一件外套。', options: [
      '他戴着一顶帽子，穿着一件外套。', '他戴着一顶帽子，一件外套。', '他穿着一件外套。', '他戴着一顶帽子。'
    ]},
    { question: '下列句子正确的是', answer: '妈妈给我做了一顿香喷喷的饭。', options: [
      '妈妈给我做了一顿香喷喷的饭。', '妈妈给我做了一顿香喷喷。', '妈妈做给我一顿饭香喷喷的。', '妈妈给我一顿香喷喷的做饭。'
    ]},
    { question: '下列句子正确的是', answer: '下课了，同学们在操场上做游戏。', options: [
      '下课了，同学们在操场上做游戏。', '下课了，同学们做游戏在操场上。', '同学们下课了在做游戏操场上。', '在操场上同学们下课了做游戏。'
    ]},
    { question: '下列句子有语病的是', answer: '我的书包是新买的漂亮。', options: [
      '我的书包是新买的，很漂亮。', '我的书包是新买的漂亮。', '我的新书包很漂亮。', '我买了一个漂亮的新书包。'
    ]}
  ];

  /* ================= 对外接口 ================= */

  function getSubject(id) {
    for (var i = 0; i < SUBJECTS.length; i++) {
      if (SUBJECTS[i].id === id) return SUBJECTS[i];
    }
    return null;
  }

  function getChapters(subjectId) {
    var list = subjectId === 'math' ? MATH_CHAPTERS : CHINESE_CHAPTERS;
    return list.slice();
  }

  function getChapter(id) {
    var all = MATH_CHAPTERS.concat(CHINESE_CHAPTERS);
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  function getLevel(id) {
    var all = MATH_CHAPTERS.concat(CHINESE_CHAPTERS);
    for (var i = 0; i < all.length; i++) {
      var ch = all[i];
      for (var j = 0; j < ch.levels.length; j++) {
        if (ch.levels[j].id === id) {
          return { chapter: ch, level: ch.levels[j] };
        }
      }
    }
    return null;
  }

  function totalLevels() {
    var all = MATH_CHAPTERS.concat(CHINESE_CHAPTERS);
    var n = 0;
    for (var i = 0; i < all.length; i++) n += all[i].levels.length;
    return n;
  }

  return {
    SUBJECTS: SUBJECTS,
    MATH_CHAPTERS: MATH_CHAPTERS,
    CHINESE_CHAPTERS: CHINESE_CHAPTERS,
    PINYIN_POOL: PINYIN_POOL,
    SYNONYM_POOL: SYNONYM_POOL,
    ANTONYM_POOL: ANTONYM_POOL,
    DUOYIN_POOL: DUOYIN_POOL,
    POEM_POOL: POEM_POOL,
    IDIOM_POOL: IDIOM_POOL,
    SENTENCE_POOL: SENTENCE_POOL,
    getSubject: getSubject,
    getChapters: getChapters,
    getChapter: getChapter,
    getLevel: getLevel,
    totalLevels: totalLevels
  };
})();
