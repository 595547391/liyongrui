/* 关卡数据：三年级上册 · 数学 + 语文 */
window.GameData = (function () {
  'use strict';

  /* ================= 科目配置 ================= */

  var SUBJECTS = [
    {
      id: 'math',
      name: '数学',
      subtitle: '三年级上册',
      color: '#4A9BF5',
      colorLight: '#D6F1FF',
      emoji: '🔢',
      bg: 'linear-gradient(135deg, #D6F1FF 0%, #EAFBF0 100%)'
    },
    {
      id: 'chinese',
      name: '语文',
      subtitle: '三年级上册',
      color: '#E8765C',
      colorLight: '#FFE4D6',
      emoji: '📖',
      bg: 'linear-gradient(135deg, #FFE4D6 0%, #FFF3D6 100%)'
    }
  ];

  /* ================= 数学章节 ================= */

  var MATH_CHAPTERS = [
    {
      id: 'm1', subject: 'math', name: '时、分、秒',
      concept: '时间单位换算与计算',
      levels: [
        {
          id: 'm1-1', name: '秒针小怪', concept: '认识秒 · 1分=60秒',
          monsters: 3, hp: 2, time: 14, mode: 'time_conv', boss: false,
          names: ['滴答怪', '秒针怪', '闹钟怪'],
          colors: ['#63D6A6', '#4CB8A0', '#7BC96F']
        },
        {
          id: 'm1-2', name: '时间换算', concept: '时、分、秒互换',
          monsters: 3, hp: 2, time: 12, mode: 'time_calc', boss: false,
          names: ['沙漏怪', '钟表怪', '时光怪'],
          colors: ['#5BC7F5', '#4A9BF5', '#7AB6F5']
        }
      ]
    },
    {
      id: 'm2', subject: 'math', name: '万以内的加法',
      concept: '两位数加两位数 · 几百几十加几百几十',
      levels: [
        {
          id: 'm2-1', name: '加法小兵', concept: '两位数加两位数（口算）',
          monsters: 3, hp: 2, time: 12, mode: 'add_easy', boss: false,
          names: ['加号兵', '数字兵', '进位兵'],
          colors: ['#FFB74D', '#FFA726', '#FFCC80']
        },
        {
          id: 'm2-2', name: '进位将军', concept: '几百几十加几百几十（进位）',
          monsters: 3, hp: 2, time: 14, mode: 'add_hard', boss: false,
          names: ['百位将', '千位将', '进位王'],
          colors: ['#FF8A65', '#F0715C', '#FFAB91']
        }
      ]
    },
    {
      id: 'm3', subject: 'math', name: '测量',
      concept: '毫米、分米、千米、吨的认识',
      levels: [
        {
          id: 'm3-1', name: '长度精灵', concept: '毫米、厘米、分米、米',
          monsters: 3, hp: 2, time: 14, mode: 'length_unit', boss: false,
          names: ['毫米精', '厘米精', '分米精'],
          colors: ['#81C784', '#66BB6A', '#A5D6A7']
        },
        {
          id: 'm3-2', name: '千米巨兽', concept: '千米的认识 · 1千米=1000米',
          monsters: 3, hp: 2, time: 14, mode: 'km_unit', boss: false,
          names: ['千米兽', '里程兽', '长途兽'],
          colors: ['#7986CB', '#5C6BC0', '#9FA8DA']
        },
        {
          id: 'm3-3', name: '吨级霸王龙', concept: '吨的认识 · 1吨=1000千克',
          monsters: 1, hp: 3, time: 14, mode: 'ton_unit', boss: true,
          names: ['吨级霸王龙'],
          colors: ['#8D6E63']
        }
      ]
    },
    {
      id: 'm4', subject: 'math', name: '万以内的减法',
      concept: '退位减法 · 验算',
      levels: [
        {
          id: 'm4-1', name: '减法小兵', concept: '两位数减两位数（口算）',
          monsters: 3, hp: 2, time: 12, mode: 'sub_easy', boss: false,
          names: ['减号兵', '退号兵', '借位兵'],
          colors: ['#4DB6AC', '#26A69A', '#80CBC4']
        },
        {
          id: 'm4-2', name: '退位法师', concept: '几百几十减几百几十（退位）',
          monsters: 3, hp: 2, time: 14, mode: 'sub_hard', boss: false,
          names: ['退法师', '借位师', '验算师'],
          colors: ['#BA68C8', '#9C27B0', '#CE93D8']
        }
      ]
    },
    {
      id: 'm5', subject: 'math', name: '倍的认识',
      concept: '求一个数是另一个数的几倍 · 求一个数的几倍是多少',
      levels: [
        {
          id: 'm5-1', name: '倍数小妖', concept: '求一个数是另一个数的几倍',
          monsters: 3, hp: 2, time: 14, mode: 'times_div', boss: false,
          names: ['倍数妖', '翻倍妖', '几倍妖'],
          colors: ['#FFB300', '#FF8F00', '#FFD54F']
        },
        {
          id: 'm5-2', name: '几倍魔王', concept: '求一个数的几倍是多少',
          monsters: 1, hp: 4, time: 12, mode: 'times_mul', boss: true,
          names: ['几倍魔王'],
          colors: ['#FF6F00']
        }
      ]
    },
    {
      id: 'm6', subject: 'math', name: '多位数乘一位数',
      concept: '口算乘法 · 笔算乘法',
      levels: [
        {
          id: 'm6-1', name: '口诀小怪', concept: '整十整百乘一位数（口算）',
          monsters: 3, hp: 2, time: 12, mode: 'mul_ten', boss: false,
          names: ['整十怪', '整百怪', '口算怪'],
          colors: ['#7BC96F', '#5FBF9A', '#8ED15C']
        },
        {
          id: 'm6-2', name: '乘法树精', concept: '两三位数乘一位数（不进位）',
          monsters: 3, hp: 2, time: 14, mode: 'mul_nocarry', boss: false,
          names: ['树精怪', '藤蔓怪', '紫牙怪'],
          colors: ['#B58BE8', '#9B7BE0', '#C79AF0']
        },
        {
          id: 'm6-3', name: '进位骑士', concept: '两三位数乘一位数（进位）',
          monsters: 3, hp: 3, time: 15, mode: 'mul_carry', boss: false,
          names: ['进位骑', '连续骑', '叠进骑'],
          colors: ['#FF7043', '#F4511E', '#FF8A65']
        },
        {
          id: 'm6-4', name: '乘法大魔王', concept: '多位数乘一位数综合',
          monsters: 1, hp: 5, time: 14, mode: 'mul_boss', boss: true,
          names: ['乘法大魔王'],
          colors: ['#D32F2F']
        }
      ]
    },
    {
      id: 'm7', subject: 'math', name: '长方形和正方形',
      concept: '四边形认识 · 周长计算',
      levels: [
        {
          id: 'm7-1', name: '四边形精灵', concept: '认识四边形 · 长方形正方形特征',
          monsters: 3, hp: 2, time: 14, mode: 'shape_know', boss: false,
          names: ['方形精', '长方精', '正方精'],
          colors: ['#29B6F6', '#039BE5', '#4FC3F7']
        },
        {
          id: 'm7-2', name: '周长守卫', concept: '长方形和正方形的周长',
          monsters: 3, hp: 2, time: 16, mode: 'perimeter', boss: false,
          names: ['周长卫', '边长卫', '围墙卫'],
          colors: ['#26A69A', '#00897B', '#4DB6AC']
        }
      ]
    },
    {
      id: 'm8', subject: 'math', name: '分数的初步认识',
      concept: '几分之一 · 几分之几 · 简单计算',
      levels: [
        {
          id: 'm8-1', name: '分数小妖', concept: '认识几分之一',
          monsters: 3, hp: 2, time: 14, mode: 'frac_half', boss: false,
          names: ['半分妖', '三分之一妖', '四分之一妖'],
          colors: ['#EC407A', '#D81B60', '#F48FB1']
        },
        {
          id: 'm8-2', name: '分数魔法师', concept: '几分之几 · 简单加减',
          monsters: 3, hp: 2, time: 16, mode: 'frac_calc', boss: false,
          names: ['分魔法师', '分子师', '分母师'],
          colors: ['#7E57C2', '#5E35B1', '#B39DDB']
        },
        {
          id: 'm8-3', name: '分数终结者', concept: '分数综合 · 比大小',
          monsters: 1, hp: 4, time: 14, mode: 'frac_boss', boss: true,
          names: ['分数终结者'],
          colors: ['#5E35B1']
        }
      ]
    }
  ];

  /* ================= 语文章节 ================= */

  var CHINESE_CHAPTERS = [
    {
      id: 'c1', subject: 'chinese', name: '生字天地',
      concept: '看拼音写汉字 · 生字认写',
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
      concept: '近义词 · 反义词 · 词语搭配',
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
          names: ['唐诗卫', '宋词卫', '名句卫'],
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
      concept: '四字成语填空',
      levels: [
        {
          id: 'c5-1', name: '成语精灵', concept: '补全成语',
          monsters: 3, hp: 2, time: 16, mode: 'idiom', boss: false,
          names: ['成语精', '四字精', '典故精'],
          colors: ['#26A69A', '#00897B', '#80CBC4']
        }
      ]
    },
    {
      id: 'c6', subject: 'chinese', name: '句子工坊',
      concept: '病句修改 · 关联词',
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
    1: [
      { zi: '晨', pinyin: 'chén', distractor: 'chénɡ' },
      { zi: '绒', pinyin: 'rónɡ', distractor: 'yónɡ' },
      { zi: '扮', pinyin: 'bàn', distractor: 'fēn' },
      { zi: '凤', pinyin: 'fènɡ', distractor: 'fēn' },
      { zi: '洁', pinyin: 'jié', distractor: 'jí' },
      { zi: '摔', pinyin: 'shuāi', distractor: 'suāi' },
      { zi: '荒', pinyin: 'huānɡ', distractor: 'fānɡ' },
      { zi: '笛', pinyin: 'dí', distractor: 'yóu' },
      { zi: '裳', pinyin: 'shɑnɡ', distractor: 'chánɡ' },
      { zi: '罚', pinyin: 'fá', distractor: 'fǎ' },
      { zi: '假', pinyin: 'jià', distractor: 'jiǎ' },
      { zi: '臂', pinyin: 'bì', distractor: 'bèi' },
      { zi: '扬', pinyin: 'yánɡ', distractor: 'yán' },
      { zi: '读', pinyin: 'dú', distractor: 'dǔ' },
      { zi: '静', pinyin: 'jìnɡ', distractor: 'jìn' }
    ],
    2: [
      { zi: '铺', pinyin: 'pū', distractor: 'pù' },
      { zi: '晶', pinyin: 'jīnɡ', distractor: 'jīn' },
      { zi: '迟', pinyin: 'chí', distractor: 'cí' },
      { zi: '洼', pinyin: 'wā', distractor: 'wà' },
      { zi: '凌', pinyin: 'línɡ', distractor: 'lín' },
      { zi: '增', pinyin: 'zēnɡ', distractor: 'zèn' },
      { zi: '靴', pinyin: 'xuē', distractor: 'xiē' },
      { zi: '钥', pinyin: 'yào', distractor: 'yuè' },
      { zi: '匙', pinyin: 'shi', distractor: 'chí' },
      { zi: '缤', pinyin: 'bīn', distractor: 'bīnɡ' },
      { zi: '梅', pinyin: 'méi', distractor: 'měi' },
      { zi: '残', pinyin: 'cán', distractor: 'chán' },
      { zi: '犹', pinyin: 'yóu', distractor: 'yǒu' },
      { zi: '傲', pinyin: 'ào', distractor: 'áo' },
      { zi: '君', pinyin: 'jūn', distractor: 'jùn' }
    ],
    0: [
      { zi: '乘', pinyin: 'chénɡ', distractor: 'chèn' },
      { zi: '爽', pinyin: 'shuǎnɡ', distractor: 'suǎnɡ' },
      { zi: '棕', pinyin: 'zōnɡ', distractor: 'zhōnɡ' },
      { zi: '腹', pinyin: 'fù', distractor: 'fǔ' },
      { zi: '缩', pinyin: 'suō', distractor: 'sōu' },
      { zi: '悲', pinyin: 'bēi', distractor: 'pēi' },
      { zi: '宣', pinyin: 'xuān', distractor: 'xüān' },
      { zi: '诱', pinyin: 'yòu', distractor: 'xiù' },
      { zi: '舔', pinyin: 'tiǎn', distractor: 'tiān' },
      { zi: '轴', pinyin: 'zhóu', distractor: 'yóu' },
      { zi: '愁', pinyin: 'chóu', distractor: 'qiú' },
      { zi: '盲', pinyin: 'mánɡ', distractor: 'mǎn' },
      { zi: '蝇', pinyin: 'yínɡ', distractor: 'yǐn' },
      { zi: '揭', pinyin: 'jiē', distractor: 'xiē' },
      { zi: '获', pinyin: 'huò', distractor: 'hù' }
    ]
  };

  /* ================= 语文题库：近义词 ================= */

  var SYNONYM_POOL = [
    { word: '鲜艳', answer: '艳丽', options: ['漂亮', '美丽', '艳丽', '新鲜'] },
    { word: '打扮', answer: '装扮', options: ['打扮', '装扮', '服装', '饰演'] },
    { word: '敬爱', answer: '尊敬', options: ['亲爱', '可爱', '尊敬', '爱护'] },
    { word: '摇晃', answer: '摇摆', options: ['晃动', '摇摆', '摆动', '摇动'] },
    { word: '飘扬', answer: '飘荡', options: ['飞扬', '飘荡', '漂浮', '漂流'] },
    { word: '安静', answer: '宁静', options: ['冷静', '宁静', '静止', '平静'] },
    { word: '热闹', answer: '喧闹', options: ['热烈', '喧闹', '吵闹', '热情'] },
    { word: '好奇', answer: '奇怪', options: ['惊奇', '奇怪', '新鲜', '奇特'] },
    { word: '招引', answer: '吸引', options: ['招手', '吸引', '引起', '引用'] },
    { word: '粗壮', answer: '健壮', options: ['粗大', '健壮', '强壮', '壮实'] },
    { word: '忽然', answer: '突然', options: ['果然', '突然', '居然', '竟然'] },
    { word: '仔细', answer: '认真', options: ['详细', '认真', '细心', '用心'] },
    { word: '凉爽', answer: '凉快', options: ['清凉', '凉快', '清爽', '寒冷'] },
    { word: '叮咛', answer: '叮嘱', options: ['叮问', '叮嘱', '告诉', '吩咐'] },
    { word: '辽阔', answer: '广阔', options: ['宽阔', '广阔', '广大', '宽大'] },
    { word: '饱满', answer: '丰满', options: ['充满', '丰满', '饱和', '充足'] }
  ];

  /* ================= 语文题库：反义词 ================= */

  var ANTONYM_POOL = [
    { word: '鲜艳', answer: '暗淡', options: ['漂亮', '暗淡', '灰暗', '黑暗'] },
    { word: '热闹', answer: '安静', options: ['冷静', '安静', '平静', '静止'] },
    { word: '粗壮', answer: '细小', options: ['细小', '瘦弱', '瘦小', '细微'] },
    { word: '安静', answer: '喧闹', options: ['吵闹', '喧闹', '热闹', '喧哗'] },
    { word: '古老', answer: '年轻', options: ['新鲜', '年轻', '新颖', '现代'] },
    { word: '洁白', answer: '乌黑', options: ['漆黑', '乌黑', '黑暗', '黑夜'] },
    { word: '湿润', answer: '干燥', options: ['干枯', '干燥', '干旱', '干巴'] },
    { word: '清楚', answer: '模糊', options: ['糊涂', '模糊', '含糊', '朦胧'] },
    { word: '仔细', answer: '马虎', options: ['粗心', '马虎', '大意', '疏忽'] },
    { word: '凉爽', answer: '炎热', options: ['闷热', '炎热', '酷热', '火热'] },
    { word: '辽阔', answer: '狭窄', options: ['狭小', '狭窄', '窄小', '狭隘'] },
    { word: '饱满', answer: '干瘪', options: ['干瘪', '干枯', '干瘦', '瘦小'] },
    { word: '温柔', answer: '粗暴', options: ['暴躁', '粗暴', '凶恶', '凶狠'] },
    { word: '可爱', answer: '讨厌', options: ['可恨', '讨厌', '厌恶', '烦'] },
    { word: '飞快', answer: '缓慢', options: ['慢慢', '缓慢', '迟缓', '迟钝'] }
  ];

  /* ================= 语文题库：多音字 ================= */

  var DUOYIN_POOL = [
    { zi: '假', word: '放假', answer: 'jià', options: ['jiǎ', 'jià', 'jiā', 'jie'] },
    { zi: '假', word: '真假', answer: 'jiǎ', options: ['jiǎ', 'jià', 'jiā', 'jie'] },
    { zi: '铺', word: '铺路', answer: 'pū', options: ['pù', 'pū', 'pú', 'fǔ'] },
    { zi: '铺', word: '店铺', answer: 'pù', options: ['pù', 'pū', 'pú', 'fǔ'] },
    { zi: '盛', word: '盛开', answer: 'shèng', options: ['chéng', 'shèng', 'chén', 'shèn'] },
    { zi: '盛', word: '盛饭', answer: 'chéng', options: ['chéng', 'shèng', 'chén', 'shèn'] },
    { zi: '好', word: '爱好', answer: 'hào', options: ['hǎo', 'hào', 'hāo', 'he'] },
    { zi: '好', word: '好人', answer: 'hǎo', options: ['hǎo', 'hào', 'hāo', 'he'] },
    { zi: '相', word: '相信', answer: 'xiāng', options: ['xiàng', 'xiāng', 'xián', 'xāng'] },
    { zi: '相', word: '相片', answer: 'xiàng', options: ['xiàng', 'xiāng', 'xián', 'xāng'] },
    { zi: '行', word: '行走', answer: 'xíng', options: ['háng', 'xíng', 'xín', 'hán'] },
    { zi: '行', word: '银行', answer: 'háng', options: ['háng', 'xíng', 'xín', 'hán'] },
    { zi: '乐', word: '快乐', answer: 'lè', options: ['yuè', 'lè', 'yào', 'le'] },
    { zi: '乐', word: '音乐', answer: 'yuè', options: ['yuè', 'lè', 'yào', 'le'] },
    { zi: '教', word: '教书', answer: 'jiāo', options: ['jiào', 'jiāo', 'jiǎo', 'jiǒo'] },
    { zi: '教', word: '教师', answer: 'jiào', options: ['jiào', 'jiāo', 'jiǎo', 'jiǒo'] }
  ];

  /* ================= 语文题库：古诗 ================= */

  var POEM_POOL = [
    {
      title: '所见', author: '袁枚',
      lines: ['牧童骑黄牛', '歌声振林樾', '意欲捕鸣蝉', '忽然闭口立'],
      mode: 'next'
    },
    {
      title: '山行', author: '杜牧',
      lines: ['远上寒山石径斜', '白云生处有人家', '停车坐爱枫林晚', '霜叶红于二月花'],
      mode: 'next'
    },
    {
      title: '赠刘景文', author: '苏轼',
      lines: ['荷尽已无擎雨盖', '菊残犹有傲霜枝', '一年好景君须记', '最是橙黄橘绿时'],
      mode: 'next'
    },
    {
      title: '夜书所见', author: '叶绍翁',
      lines: ['萧萧梧叶送寒声', '江上秋风动客情', '知有儿童挑促织', '夜深篱落一灯明'],
      mode: 'next'
    },
    {
      title: '望天门山', author: '李白',
      lines: ['天门中断楚江开', '碧水东流至此回', '两岸青山相对出', '孤帆一片日边来'],
      mode: 'next'
    },
    {
      title: '饮湖上初晴后雨', author: '苏轼',
      lines: ['水光潋滟晴方好', '山色空蒙雨亦奇', '欲把西湖比西子', '淡妆浓抹总相宜'],
      mode: 'next'
    },
    {
      title: '望洞庭', author: '刘禹锡',
      lines: ['湖光秋月两相和', '潭面无风镜未磨', '遥望洞庭山水翠', '白银盘里一青螺'],
      mode: 'next'
    },
    {
      title: '早发白帝城', author: '李白',
      lines: ['朝辞白帝彩云间', '千里江陵一日还', '两岸猿声啼不住', '轻舟已过万重山'],
      mode: 'next'
    },
    {
      title: '采莲曲', author: '王昌龄',
      lines: ['荷叶罗裙一色裁', '芙蓉向脸两边开', '乱入池中看不见', '闻歌始觉有人来'],
      mode: 'next'
    }
  ];

  /* ================= 语文题库：成语 ================= */

  var IDIOM_POOL = [
    { idiom: '春华秋实', blank: 2, answer: '秋', options: ['冬', '秋', '夏', '春'] },
    { idiom: '一叶知秋', blank: 1, answer: '知', options: ['知', '之', '只', '直'] },
    { idiom: '五谷丰登', blank: 1, answer: '五', options: ['三', '五', '四', '六'] },
    { idiom: '果实累累', blank: 2, answer: '累', options: ['雷', '泪', '累', '类'] },
    { idiom: '金桂飘香', blank: 2, answer: '飘', options: ['漂', '飘', '票', '瓢'] },
    { idiom: '层林尽染', blank: 2, answer: '尽', options: ['近', '进', '尽', '紧'] },
    { idiom: '天高云淡', blank: 2, answer: '云', options: ['雨', '云', '雪', '雾'] },
    { idiom: '秋高气爽', blank: 2, answer: '气', options: ['汽', '气', '乞', '七'] },
    { idiom: '五彩缤纷', blank: 2, answer: '缤', options: ['宾', '滨', '缤', '兵'] },
    { idiom: '争先恐后', blank: 2, answer: '先', options: ['显', '鲜', '先', '仙'] },
    { idiom: '七上八下', blank: 2, answer: '八', options: ['八', '发', '巴', '拔'] },
    { idiom: '四面八方', blank: 2, answer: '八', options: ['八', '巴', '把', '爸'] }
  ];

  /* ================= 语文题库：病句/正确句 ================= */

  var SENTENCE_POOL = [
    { question: '下列句子正确的是', answer: '我们要爱惜粮食。', options: [
      '我们要爱惜粮食。', '我们要爱惜粮食的。', '我们爱惜要粮食。', '我们爱惜粮食要。'
    ]},
    { question: '下列句子正确的是', answer: '他每天都坚持锻炼身体。', options: [
      '他每天都坚持锻炼身体。', '他每天都坚持锻炼的身体。', '他每天坚持都锻炼身体。', '他每天锻炼身体都坚持。'
    ]},
    { question: '下列句子有语病的是', answer: '他的看法是对的，正确的。', options: [
      '他的看法是对的，正确的。', '他的看法是正确的。', '他的看法很对。', '我同意他的看法。'
    ]},
    { question: '下列句子正确的是', answer: '秋天的北京是个美丽的地方。', options: [
      '秋天的北京是个美丽的地方。', '北京的秋天是个美丽的地方。', '秋天北京是美丽的一个地方。', '北京秋天美丽是个地方。'
    ]},
    { question: '下列句子正确的是', answer: '我断定这件事是他做的。', options: [
      '我断定这件事是他做的。', '我大概断定这件事是他做的。', '我断定大概这件事是他做的。', '我断定这件事大概是他做的。'
    ]},
    { question: '下列句子有语病的是', answer: '他穿着一件蓝色的上衣，一顶红色的帽子。', options: [
      '他穿着一件蓝色的上衣，戴着一顶红色的帽子。',
      '他穿着一件蓝色的上衣，一顶红色的帽子。',
      '他戴着一顶红色的帽子。',
      '他穿了一件蓝色的上衣。'
    ]},
    { question: '下列句子正确的是', answer: '通过这次活动，我学到了很多。', options: [
      '通过这次活动，我学到了很多。',
      '通过这次活动，使我学到了很多。',
      '通过使这次活动我学到了很多。',
      '这次活动通过使我学到了很多。'
    ]},
    { question: '下列句子正确的是', answer: '我们要养成认真写字的好习惯。', options: [
      '我们要养成认真写字的好习惯。',
      '我们要认真写字的好习惯养成。',
      '我们要养成认真写字。',
      '我们要认真写字养成好习惯。'
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
