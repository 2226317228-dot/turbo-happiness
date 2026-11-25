/* BDSM 属性测试 · 脚本
   数据（QUESTIONS / RESULTS / MIX_TEXT / KW）在文件前段，逻辑在后段 */
/* ============================================================
   数据层：50 题 × 选项权重
   维度键：dom 掌控 / sad 施与 / sub 交付 / mas 承重
   ============================================================ */
var DIMS = ['dom','sad','sub','mas'];
var DIM_LABEL = {dom:'Dom', sad:'S', sub:'Sub', mas:'M'};
var DIM_FULL  = {dom:'掌控倾向', sad:'施与倾向', sub:'交付倾向', mas:'承重倾向'};
var DIM_COLOR = {dom:'#d9b36c', sad:'#c88d9b', sub:'#a9a3d6', mas:'#8fb0a9'};

var QUESTIONS = [
  {q:'周五晚上突然空出一整晚，他在电话那头问：今晚想怎么过？', o:[
    {t:'地点、时间、几点结束，你一句话就定了', w:{dom:2}},
    {t:'「你定」——然后你开始想今晚该穿哪一件', w:{sub:2}},
    {t:'你只透露一半，剩下的让他猜一整晚', w:{dom:1,sad:1}},
    {t:'谁也别约，你想一个人慢慢耗到深夜', w:{sub:1,mas:1}}
  ]},
  {q:'排队时，有人的手臂直接插到你前面：', o:[
    {t:'你轻声制止，语气很软，但没有商量的余地', w:{dom:2,sad:1}},
    {t:'你往后让了半步，心里闷了一下', w:{sub:2,mas:1}},
    {t:'你笑着提醒一句，还替他留了个台阶', w:{dom:1}},
    {t:'你不说话，只用眼神把他钉回队尾', w:{sad:2,dom:1}}
  ]},
  {q:'他搬家，叫你去搭把手，衬衫领口开了两颗扣：', o:[
    {t:'你先问清楼层和电梯，然后准时站在他门口', w:{dom:2}},
    {t:'「你说几点就几点」，你全程听他指挥', w:{sub:2,mas:1}},
    {t:'你一边搬一边重新规划箱子怎么码', w:{sad:1,dom:1}},
    {t:'你专挑最重的那几趟，喘着也比他稳', w:{mas:2}}
  ]},
  {q:'衣柜里，最藏起来的那一格是：', o:[
    {t:'分区清楚，连「只穿给他看」那几件都归好类', w:{dom:2}},
    {t:'常穿的就那几件，别的懒得动', w:{sub:1}},
    {t:'有几件只在该出现的场合才拿出来，保养很仔细', w:{sad:2}},
    {t:'越旧越软越好穿，起球了也舍不得换', w:{mas:1,sub:1}}
  ]},
  {q:'电影里最容易让你坐直的桥段：', o:[
    {t:'谈判、布局，一个人把整个场子攥在手里', w:{dom:2}},
    {t:'被看穿了，还是被抱住了', w:{sub:2}},
    {t:'审讯、逼问，空气一寸一寸收紧', w:{sad:2}},
    {t:'被反复折磨，最后还能站起来', w:{mas:2}}
  ]},
  {q:'半夜手机亮了一下，是他：', o:[
    {t:'通知全关，什么时候回由你决定', w:{dom:2}},
    {t:'响一下就看，怕漏掉他的消息', w:{sub:2}},
    {t:'他先撩你，你就把话往上再添一把', w:{sad:1}},
    {t:'常年静音，睡不着也不回', w:{sub:1,mas:1}}
  ]},
  {q:'健身房里，他的手扶上你的腰，说「这里要收紧」：', o:[
    {t:'你自己调，顺便告诉他该按哪个角度', w:{dom:2}},
    {t:'你说好，让他带着你做完这一组', w:{sub:2}},
    {t:'你故意做错一点，看他会不会再靠近', w:{sad:1,dom:1}},
    {t:'越酸越上瘾，第二天起不来还有点爽', w:{mas:2}}
  ]},
  {q:'刚认识一个人，他的眼神在你身上多停了两秒：', o:[
    {t:'你先观察一阵，确认靠谱才肯往下走', w:{dom:2}},
    {t:'你很快把自己的事说出去，希望被懂', w:{sub:2}},
    {t:'你用玩笑去碰他的边界，看他怎么接', w:{sad:2}},
    {t:'他怎么调侃，你都接得住', w:{mas:2}}
  ]},
  {q:'连着加班到深夜，他最该说的是：', o:[
    {t:'把明天的任务重排一遍，让局面回到你手里', w:{dom:2}},
    {t:'「辛苦了，别撑了，过来」', w:{sub:2}},
    {t:'越累越要做完，你享受压榨自己那口气', w:{sad:1,mas:2}},
    {t:'安静熬完，不需要谁安慰', w:{mas:1,sub:1}}
  ]},
  {q:'两个人在家点外卖，沙发上只够一个半人的位置：', o:[
    {t:'固定那几家那几样，连先吃什么都有顺序', w:{dom:1,sub:1}},
    {t:'他点什么你吃什么，连辣度都跟着', w:{sub:2}},
    {t:'你专点最辣的，看他能陪你吃到哪一步', w:{sad:1,mas:1}},
    {t:'只挑评分最高的，你不想扫兴', w:{dom:1}}
  ]},
  {q:'一桌人讨论去哪吃，僵在那儿，他看了你一眼：', o:[
    {t:'「就这家，现在走」，一句话结束讨论', w:{dom:3}},
    {t:'「你们定，我都吃」', w:{sub:2}},
    {t:'故意留两个互相看不上的选项，看他们吵', w:{sad:2}},
    {t:'都行，但干等太久你会烦', w:{sub:1,mas:1}}
  ]},
  {q:'他忽然凑近，说「你今天有点不一样」：', o:[
    {t:'你平静接住，心里默默记了一笔', w:{dom:1}},
    {t:'有点不好意思，但很想他再多说两句', w:{sub:2,mas:1}},
    {t:'你把话题绕回他身上，看他怎么接', w:{sad:1}},
    {t:'你不太会接，只低头笑了一下', w:{mas:1,sub:1}}
  ]},
  {q:'你最受不了哪一种人：', o:[
    {t:'做事没章法、一临场就掉链子', w:{dom:2}},
    {t:'说话很硬，一句都不让别人插', w:{sub:2}},
    {t:'怎么撩都没反应，一点脾气都没有', w:{sad:2}},
    {t:'一点苦都吃不了，动不动就喊停', w:{mas:2}}
  ]},
  {q:'聚会散场，只剩你们两个还在门口：', o:[
    {t:'「我送你」，然后你走在前面，他跟着', w:{dom:2}},
    {t:'「你送我」，然后你等他开口', w:{sub:2}},
    {t:'你偏要说「那你敢不敢再待一会儿」', w:{sad:1}},
    {t:'你站着没动，等他先决定去哪', w:{mas:2}}
  ]},
  {q:'他让你帮忙拿个主意，人靠得很近：', o:[
    {t:'你直接给结论，还顺手说清为什么', w:{dom:2}},
    {t:'「你想怎样都行，我陪你」', w:{sub:2}},
    {t:'你给他两个都很刺激的选项，让他自己挑', w:{sad:2}},
    {t:'其实你更希望有人替你做决定', w:{sub:1,mas:1}}
  ]},
  {q:'被当面撂下一句重话：', o:[
    {t:'先问依据，站得住就当场反驳', w:{dom:2}},
    {t:'先道歉，回头自己难受很久', w:{sub:2,mas:1}},
    {t:'表面接受，暗地里把话拆开看', w:{sad:1}},
    {t:'不反驳，先忍着', w:{mas:2}}
  ]},
  {q:'一段亲密关系里，你更像：', o:[
    {t:'定节奏、定分寸的那个人', w:{dom:2}},
    {t:'等对方安排、被照顾的那个人', w:{sub:2}},
    {t:'把气氛推到临界点的那个人', w:{sad:2}},
    {t:'被推到临界点的那个人', w:{mas:2}}
  ]},
  {q:'有人在你面前哭了：', o:[
    {t:'先给方案，告诉他下一步做什么', w:{dom:1}},
    {t:'陪着他，让他靠一会儿', w:{sub:2}},
    {t:'想知道他能哭到什么程度', w:{sad:2}},
    {t:'你也想哭，共情到快撑不住', w:{sub:1,mas:1}}
  ]},
  {q:'你对「规矩」的真实态度：', o:[
    {t:'规矩由你定，但你会讲清为什么', w:{dom:2}},
    {t:'有清楚的规矩，你反而安心', w:{sub:2,mas:1}},
    {t:'规矩就是用来一点点试探的', w:{sad:2}},
    {t:'再严你也能忍，忍完还挺爽', w:{mas:1,sub:1}}
  ]},
  {q:'合影时他站在你身后，手搭在你腰侧：', o:[
    {t:'你反手把他的手按稳，顺便调整站位', w:{dom:2}},
    {t:'他摆哪儿你就哪儿，站得笔直', w:{sub:2}},
    {t:'你抓他没防备那一瞬，故意逗他', w:{sad:1}},
    {t:'你僵了一下，但没躲开', w:{mas:1,sub:1}}
  ]},
  {q:'焦虑上来的时候，你：', o:[
    {t:'列清单，先把能控的部分处理掉', w:{dom:2}},
    {t:'想找人抱着，什么都别让你想', w:{sub:2}},
    {t:'故意把焦虑放大，熬到筋疲力尽才睡', w:{sad:1,mas:2}},
    {t:'硬扛，不说', w:{mas:1}}
  ]},
  {q:'关于「疼」这件事：', o:[
    {t:'先评估风险，再决定要不要继续', w:{dom:2}},
    {t:'疼了就停，不留下后患', w:{sub:1}},
    {t:'你会留意别人忍痛的样子，那很有意思', w:{sad:2}},
    {t:'小伤而已，还能继续', w:{mas:2}}
  ]},
  {q:'你更怕哪一种处境：', o:[
    {t:'失控——事情不在你手里', w:{dom:2}},
    {t:'被抛下——突然没人管你了', w:{sub:2}},
    {t:'无聊——一点张力都没有', w:{sad:2}},
    {t:'被看穿——其实你快撑不住了', w:{mas:2}}
  ]},
  {q:'他贴着你耳朵说「你今天真靠谱」：', o:[
    {t:'你受着，还顺手把下一件事也安排了', w:{dom:2}},
    {t:'你有点心虚，也希望有人来照顾你', w:{sub:2,mas:1}},
    {t:'你更想被夸「有意思、很会玩」', w:{sad:1}},
    {t:'「能忍」两个字最受用', w:{mas:2}}
  ]},
  {q:'深夜最容易把你带到哪里：', o:[
    {t:'复盘白天的对话，想哪里该更主动', w:{dom:1}},
    {t:'翻聊天记录，等一个回复', w:{sub:2}},
    {t:'找点带危险感的东西看或听', w:{sad:1}},
    {t:'把自己累到倒头就睡', w:{mas:2}}
  ]},
  {q:'和他较劲，他离你很近却一句话不说：', o:[
    {t:'你先开口，把话挑明', w:{dom:2}},
    {t:'你一直等他先说话', w:{sub:2}},
    {t:'你享受这种无声的对峙', w:{sad:2}},
    {t:'憋着，越憋越觉得自己在承受', w:{mas:1,sub:1}}
  ]},
  {q:'他发来一条明显在撩你的消息：', o:[
    {t:'回一条更有分量的，把场子收回来', w:{dom:2}},
    {t:'先不回，怕回错', w:{sub:1,mas:1}},
    {t:'顺着他的话往上加码', w:{sad:2}},
    {t:'有点兴奋，想看他还能推多远', w:{mas:2}}
  ]},
  {q:'事情完全脱离计划：', o:[
    {t:'当场重排，先止血', w:{dom:2}},
    {t:'会慌，希望有人直接给你指令', w:{sub:2,mas:1}},
    {t:'反而兴奋，干脆不按计划走', w:{sad:1}},
    {t:'就这么受着，反正也改不了', w:{mas:1}}
  ]},
  {q:'你更享受哪一种「被需要」：', o:[
    {t:'他离不开你的判断', w:{dom:2}},
    {t:'有人愿意被你照顾到底', w:{dom:1,sub:1}},
    {t:'他在你手里失控', w:{sad:2}},
    {t:'你被需要到没有退路', w:{mas:1,sub:1}}
  ]},
  {q:'你对「界限」的看法：', o:[
    {t:'界限要清楚，而且由你来划', w:{dom:2}},
    {t:'有清楚的界限，你才敢放开', w:{sub:2}},
    {t:'界限就是用来一点点试探的', w:{sad:2}},
    {t:'边界被推的时候，你反而更清醒', w:{mas:2}}
  ]},
  {q:'他的手从你后颈慢慢滑到肩胛：', o:[
    {t:'反手扣住他的手腕，把手换了个方向', w:{dom:2}},
    {t:'同样一条路线还回去，指尖压得更重', w:{sad:2}},
    {t:'整个人软下来，等他的下一步', w:{sub:2}},
    {t:'屏住呼吸，心里希望他别停', w:{mas:2}}
  ]},
  {q:'他贴着你耳朵低声说「今晚听我的」：', o:[
    {t:'这句话轮不到他——你原样还回去', w:{dom:2}},
    {t:'偏偏反问一句，看他敢不敢再说一遍', w:{sad:2}},
    {t:'安静下来，把接下来的事交给他', w:{sub:2}},
    {t:'耳朵先红了，但没打算拒绝', w:{mas:2}}
  ]},
  {q:'灯只留一盏，他开始解第一颗扣子：', o:[
    {t:'坐在对面，等他自己把剩下的解决掉', w:{dom:2}},
    {t:'走过去替他解开，然后退开半步', w:{sad:2}},
    {t:'伸手帮他，手有点抖', w:{sub:2}},
    {t:'不敢直视，只听见自己的心跳', w:{mas:2}}
  ]},
  {q:'比起「被碰到哪里」，你更在意：', o:[
    {t:'他能不能碰，要你点头', w:{dom:2}},
    {t:'你碰他的时候，他有没有躲', w:{sad:2}},
    {t:'他碰到哪里，你就跟着热到哪里', w:{sub:2}},
    {t:'后颈和耳后被碰到的那一下，最守不住', w:{mas:2}}
  ]},
  {q:'有人要你跪下来：', o:[
    {t:'让他跪，然后慢慢踱到他面前', w:{dom:2}},
    {t:'跪下去，但下巴抬着', w:{sad:2}},
    {t:'跪得很快，心里甚至有点期待', w:{sub:2}},
    {t:'膝盖落地的那一下，反而踏实了', w:{mas:2}}
  ]},
  {q:'他用很轻的声音说了你一个「乖」字：', o:[
    {t:'这个字你只说给真的听话的人', w:{dom:2}},
    {t:'故意不乖，看他还能不能笑着再说一遍', w:{sad:2}},
    {t:'立刻照做，连呼吸都放轻', w:{sub:2}},
    {t:'低下头，耳根发烫', w:{mas:2}}
  ]},
  {q:'眼睛被遮住之后，你最清楚的是：', o:[
    {t:'你在数他的呼吸，算第几秒开始乱', w:{dom:2}},
    {t:'伸手试探，想看他会不会躲开', w:{sad:2}},
    {t:'把全部注意力交到他手上', w:{sub:2}},
    {t:'黑暗里，每一次触碰都被放大', w:{mas:2}}
  ]},
  {q:'关于「留下痕迹」：', o:[
    {t:'挑一个只有你们两个人知道的位置', w:{dom:2}},
    {t:'挑一个领口遮不住的位置', w:{sad:2}},
    {t:'求他轻一点，但没有真的拦', w:{sub:2}},
    {t:'第二天反复照镜子，确认它还在', w:{mas:2}}
  ]},
  {q:'关于「罚」，你真正在意的是：', o:[
    {t:'规矩是你定的，罚也是', w:{dom:2}},
    {t:'更享受他说「求你了」的那一刻', w:{sad:2}},
    {t:'怕的不是罚，是被晾在一边不理', w:{sub:2}},
    {t:'故意犯一次小错，看看会怎样', w:{mas:2}}
  ]},
  {q:'一切结束之后，你最想要：', o:[
    {t:'把对方捞进怀里，问一句「还撑得住吗」', w:{dom:2}},
    {t:'替他擦掉汗，顺手再掐他一下', w:{sad:2}},
    {t:'贴着他不动，想被多抱一会儿', w:{sub:2}},
    {t:'连说话的力气都没有，但很满足', w:{mas:2}}
  ]},
  {q:'片单里你更常点开的是：', o:[
    {t:'权力博弈、谈判，一个人掌控局面', w:{dom:2}},
    {t:'互相救赎、被接住的那种', w:{sub:2}},
    {t:'悬疑、审讯、逼供式的张力', w:{sad:2}},
    {t:'受苦、忍耐、最后站起来', w:{mas:2}}
  ]},
  {q:'微醺之后，你更想听的是：', o:[
    {t:'结构严谨的古典或电子', w:{dom:1}},
    {t:'低频、包裹感强的氛围乐', w:{sub:2}},
    {t:'工业、噪音，越吵越清醒', w:{sad:2}},
    {t:'慢一点的，能疼进去的那种', w:{mas:1}}
  ]},
  {q:'他第一次进你的房间：', o:[
    {t:'一切都在固定位置，你让他坐哪他就坐哪', w:{dom:2}},
    {t:'乱一点反而放松，你随他看', w:{sub:1}},
    {t:'有些只在特定时候才拿出来的东西，你没打算收', w:{sad:2}},
    {t:'有点乱，习惯了，你也懒得解释', w:{mas:1,sub:1}}
  ]},
  {q:'看到有人被当众为难：', o:[
    {t:'先判断这是不是必要的', w:{dom:1}},
    {t:'不舒服，想上去帮', w:{sub:2}},
    {t:'觉得有意思，甚至想看完', w:{sad:2}},
    {t:'会代入，你也经历过', w:{mas:1}}
  ]},
  {q:'你更想被人记住的是：', o:[
    {t:'有原则、靠得住', w:{dom:2}},
    {t:'好相处、贴心', w:{sub:2}},
    {t:'有意思、有点危险', w:{sad:1}},
    {t:'能忍、能撑', w:{mas:2}}
  ]},
  {q:'他送你一件带点暗示的小物：', o:[
    {t:'你收下，说下次要看他怎么用', w:{dom:1}},
    {t:'你收下，脸有点热，但还是收了', w:{sub:2}},
    {t:'你当场拆开，故意问他什么意思', w:{sad:1}},
    {t:'你把它收进抽屉，等一个被安排好的时机', w:{mas:1,sub:1}}
  ]},
  {q:'他手把手教你，胸口贴着你后背：', o:[
    {t:'你先搭框架，按自己的节奏往下学', w:{dom:2}},
    {t:'你跟着他一步一步来，手有点不听使唤', w:{sub:2}},
    {t:'你直接上强度，边错边试', w:{sad:1,mas:1}},
    {t:'你反复练同一个动作，直到熟练', w:{mas:1}}
  ]},
  {q:'深夜一个人，你会想起：', o:[
    {t:'接下来几天要怎么安排', w:{dom:2}},
    {t:'某个人的消息，还没等到', w:{sub:2}},
    {t:'一些带危险感的画面', w:{sad:1}},
    {t:'什么都不想，让身体记住那种累', w:{mas:2}}
  ]},
  {q:'他说你「有点难搞，但很上头」：', o:[
    {t:'你认，你就是有标准', w:{dom:2}},
    {t:'你会自责，怕自己不够好', w:{sub:2}},
    {t:'你挺高兴，说明你不好拿捏', w:{sad:2}},
    {t:'你被说也受着', w:{mas:1}}
  ]},
  {q:'最后一题——你希望它告诉你：', o:[
    {t:'你确实适合掌控', w:{dom:1}},
    {t:'你确实适合跟随', w:{sub:1}},
    {t:'你确实享受张力', w:{sad:1}},
    {t:'你确实很能承', w:{mas:1}}
  ]}
];

/* ============================================================
   结果文案
   ============================================================ */
var RESULTS = {
  dom:{
    letter:'DOM', name:'暗室的指挥官', en:'THE ARCHITECT · DOM',
    quote:'我不急着让你听话。我只要你在我看着的时候，慢慢忘了怎么反抗。',
    quoteNote:'— 掌控型 · 你的准许就是命令 —',
    traits:[
      '默认自己定方向，也真的会为后面每一步负责',
      '对"讲清楚"有洁癖：规则、界限、后果，都要说到能执行',
      '危机里反而冷静，越是混乱越能看见结构',
      '不轻易把权力借出去，但一旦借了，会先确认对方接得住'
    ],
    reason:'你在多数情境里把"定方向、划界限、承担结果"选成了默认项。真正让你上瘾的不是控制本身，而是<b>对方在你面前一点点松开</b>的那个过程——你享受的是准许，不是命令。你偏向把权力当作责任的另一种写法：能让人放心交出来的，才配拿着。',
    strength:'你能给别人一种很稀缺的东西：<b>确定性</b>。在所有人都含糊的时候，你能把话说到可执行的程度；更难得的是，你能让人在你面前卸下防备，而不是竖起防线。',
    egg:'你手机里有一个只有自己看得懂的清单，里面存着"万一出事怎么办"的预案——从未派上用场，你还是每年更新一次。另外还有一条从没发出去的消息，开头两个字是「过来」。'
  },
  sad:{
    letter:'S', name:'张力的编织者', en:'THE WEAVER · S',
    quote:'我不破坏你。我只是想看看，你被我看着的时候，会露出哪一种表情。',
    quoteNote:'— 施与型 · 你的反应就是我的回礼 —',
    traits:[
      '对空气的变化极敏感，气氛一散你就想动手',
      '享受"对方撑不住却还没喊停"的那一秒，那是你确认连接的时刻',
      '玩笑、挑逗、试探，都是你量距离的尺',
      '不喜欢真伤害，但喜欢真反应'
    ],
    reason:'你在题目里反复选择"把气氛再往前推一点""看看他会怎么反应"。这指向的是<b>施与倾向</b>：你的快感来自反馈——一次呼吸变浅、一句没说完的话，比任何表白都实在。你更像导演，不是狱卒；你要的不是他疼，是他诚实。',
    strength:'你是把人从"礼貌的僵局"里拽出来的那种人。<b>你能让平淡的场合迅速有了温度</b>，也能先一步打破假客气。这种张力，是很多亲密关系最缺的燃料。',
    egg:'你大概试过用一句话让整个房间安静两秒，然后若无其事地继续喝水——那一小口水，是你给自己颁的奖。'
  },
  sub:{
    letter:'SUB', name:'交出钥匙的人', en:'THE DEVOTED · SUB',
    quote:'你把方向盘拿走的时候，我才敢把眼睛闭上。',
    quoteNote:'— 交付型 · 被接管才是休息 —',
    traits:[
      '愿意让渡决定权，但前提是对方真的接得住',
      '被明确安排的时候，反而更放松、更能专注',
      '对"被认可"敏感，一句"做得对"能撑你很久',
      '善于读空气，常比对方更早察觉他需要什么'
    ],
    reason:'你在很多题上选了"你定，我都行""希望有人给我指令"。这不是没主见，而是<b>你愿意用控制权换取确定感</b>：方向由可信的人给出，你就能把全部力气放在"做好"上。你要的不是被支配，是被一个靠谱的人接管——然后可以什么都不用想。',
    strength:'你有一种罕见的能力：<b>让另一个人感到自己被需要、被托住</b>。你给出去的不是顺从，是把自己的安全感押在对方身上——这会让人不敢轻慢你。',
    egg:'你其实有一套自己的评估系统：一次点菜、一次迟到、一次他接电话的语气，你已经在心里打完分了，而且从不说破。'
  },
  mas:{
    letter:'M', name:'承重的人', en:'THE ENDURER · M',
    quote:'别急着停。我想知道自己能到哪一步——也想看看，你会不会拦我。',
    quoteNote:'— 承重型 · 撑住的那一刻最清醒 —',
    traits:[
      '忍耐阈值高，而且享受那个"还能再一点"的过程',
      '不太喊停，更多时候是怕扫兴，也怕被看轻',
      '对强度和真实感有需求，太平顺反而让你空',
      '习惯把情绪自己消化，很少现场崩'
    ],
    reason:'你的选择集中在"还能继续""越紧越清醒""累到虚脱但满足"。这指向<b>承重倾向</b>：你需要通过承担强度来获得存在感与边界感——痛、累、紧张，对你不是损耗，是坐标。你未必喜欢被伤害，但你需要被"确认"：有人看着你，知道你撑到哪了。',
    strength:'你的耐受是真实资源：<b>你能在长期压力里保持运转，而多数人早就退场</b>。这种韧性在创业、创作、长期照护里几乎不可替代。',
    egg:'你有一种奇怪的骄傲：受伤之后先不看医生，先观察它自己怎么好——还会为"恢复得比想象中快"偷偷高兴。'
  }
};

/* 副属性短语 */
var MIX_TEXT = {
  'dom-sad':'你的掌控带着一点玩心：不只要局面在我手里，还要看它在手里怎么变。',
  'dom-sub':'你其实可以来回切换——需要时接住方向盘，安全时愿意被带着走。',
  'dom-mas':'你用承担强度来证明自己的位置：越难的局面，越像你的主场。',
  'sad-sub':'你会先建立张力，再把自己交出去——搅动水面的人，也想被浪推着走。',
  'sad-mas':'你既想推，也想被推：对强度的胃口，比对权力的胃口更大。',
  'sub-mas':'你把交付和承受绑在了一起：被安排，还要被推到边界，才算完整。'
};

/* ============================================================
   状态与工具
   ============================================================ */
/* 属性关键词（分享卡用） */
var KW = {
  dom:['秩序','责任','边界'],
  sad:['张力','反应','分寸'],
  sub:['信任','交付','读懂'],
  mas:['耐受','坐标','沉默']
};
var state = { idx:0, answers:[], lock:false };
var CATS = ['日常习惯','处事方式','社交模式','亲密与边界','情绪与偏好'];
/* 各维度在全部选项中可获得的总权重：用于校正题目数量/权重分配差异 */
var WSUM = {dom:0, sad:0, sub:0, mas:0};
(function computeWeight(){
  QUESTIONS.forEach(function(item){
    item.o.forEach(function(opt){
      DIMS.forEach(function(d){ WSUM[d] += (opt.w[d] || 0); });
    });
  });
})();

/* 选项顺序固定随机化：避免"总选 A 就指向同一属性"的位置偏差 */
var ORDER = (function(){
  var seed = 20261125;
  function rand(){ seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
  return QUESTIONS.map(function(q){
    var arr = q.o.map(function(_, k){ return k; });
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(rand() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  });
})();

function $(id){ return document.getElementById(id); }
function clamp(n,a,b){ return Math.max(a, Math.min(b,n)); }
function showView(name){
  ['intro','quiz','result'].forEach(function(v){
    $('view-'+v).classList.toggle('active', v===name);
  });
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ============================================================
   答题流程
   ============================================================ */
function startQuiz(){
  state.idx = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  $('counter').style.visibility = 'visible';
  $('track').style.visibility = 'visible';
  showView('quiz');
  renderQuestion();
}

function renderQuestion(){
  var i = state.idx;
  var item = QUESTIONS[i];
  $('qNow').textContent = String(i+1);
  $('fill').style.width = ((i / QUESTIONS.length) * 100) + '%';
  $('qIndex').textContent = 'QUESTION ' + String(i+1).padStart(2,'0');
  $('qCat').textContent = CATS[Math.min(CATS.length-1, Math.floor(i/10))];
  $('backBtn').disabled = (i === 0);

  var html = '<p class="q-text"><span class="mark">/</span>' + item.q + '</p><div class="opts">';
  var order = ORDER[i];
  order.forEach(function(k, pos){
    var opt = item.o[k];
    var picked = state.answers[i] === k ? ' picked' : '';
    html += '<button class="opt'+picked+'" data-k="'+k+'">'
         +   '<span class="tag">'+ 'ABCD'[pos] +'</span>'
         +   '<span>'+ opt.t +'</span>'
         + '</button>';
  });
  html += '</div>';

  var body = $('qBody');
  body.innerHTML = html;
  body.classList.remove('view-fade');
  void body.offsetWidth;
  body.classList.add('view-fade');

  Array.prototype.forEach.call(body.querySelectorAll('.opt'), function(btn){
    btn.addEventListener('click', function(){ choose(parseInt(btn.dataset.k,10)); });
  });
  state.lock = false;
}

function choose(k){
  if(state.lock) return;
  state.lock = true;
  var i = state.idx;
  state.answers[i] = k;

  var opts = $('qBody').querySelectorAll('.opt');
  Array.prototype.forEach.call(opts, function(b){
    b.classList.toggle('picked', parseInt(b.dataset.k,10) === k);
  });

  setTimeout(function(){
    if(i+1 < QUESTIONS.length){
      state.idx = i+1;
      renderQuestion();
    } else {
      $('fill').style.width = '100%';
      setTimeout(computeResult, 260);
    }
  }, 300);
}

function goBack(){
  if(state.lock) return;
  if(state.idx > 0){ state.lock = true; state.idx--; renderQuestion(); }
}

/* ============================================================
   评分
   ============================================================ */
function computeResult(){
  var raw = {dom:0, sad:0, sub:0, mas:0};
  state.answers.forEach(function(k, i){
    if(k === null) return;
    var w = QUESTIONS[i].o[k].w || {};
    DIMS.forEach(function(d){ raw[d] += (w[d] || 0); });
  });

  // 先按各维度可获得的总权重归一，再折算成合计 100% 的构成比
  var norm = {}, sumNorm = 0;
  DIMS.forEach(function(d){
    norm[d] = WSUM[d] > 0 ? raw[d] / WSUM[d] : 0;
    sumNorm += norm[d];
  });
  var pct = {}, maxV = -1, top = null, second = null;
  DIMS.forEach(function(d){
    pct[d] = sumNorm > 0 ? (norm[d] / sumNorm) * 100 : 0;
    if(pct[d] > maxV){ maxV = pct[d]; top = d; }
  });

  var sorted = DIMS.slice().sort(function(a,b){ return pct[b] - pct[a]; });
  top = sorted[0]; second = sorted[1];
  var gap = pct[top] - pct[second];
  state.pct = pct;
  renderResult(top, second, gap);
}

/* ============================================================
   结果渲染
   ============================================================ */
function renderResult(top, second, gap){
  var r = RESULTS[top];
  showView('result');

  $('counter').style.visibility = 'hidden';
  $('track').style.visibility = 'hidden';

  $('resBadge').textContent = 'RESULT · ' + DIM_FULL[top].toUpperCase();
  $('resLetter').textContent = r.letter;
  $('resLetter').style.fontSize = r.letter.length > 1 ? '30px' : '44px';
  $('resLetter').style.letterSpacing = r.letter.length > 1 ? '.08em' : '.06em';
  $('resName').textContent = r.name;
  $('resEn').textContent = r.en;
  $('resQuote').innerHTML = r.quote + '<span>' + r.quoteNote + '</span>';

  var traits = '';
  r.traits.forEach(function(t){ traits += '<li>' + t + '</li>'; });
  $('resTraits').innerHTML = traits;
  $('resSwitches').innerHTML = (r.switches || []).map(function(t){ return '<li>' + t + '</li>'; }).join('');
  $('resReason').innerHTML = r.reason;
  $('resStrength').innerHTML = r.strength;
  $('resEgg').innerHTML = r.egg;

  // 四维光谱
  var bars = '', scBars = '';
  DIMS.slice().sort(function(a,b){ return state.pct[b]-state.pct[a]; }).forEach(function(d){
    var v = Math.round(state.pct[d]);
    var cls = d === top ? ' bar-row top' : ' bar-row';
    bars += '<div class="'+cls.trim()+'"><div class="k">'+DIM_LABEL[d]+'</div>'
         +  '<div class="bar-track"><div class="bar-fill" data-w="'+v+'" style="background:linear-gradient(90deg,'+DIM_COLOR[d]+'44,'+DIM_COLOR[d]+')"></div></div>'
         +  '<div class="v">'+v+'%</div></div>';
    scBars += '<div class="'+cls.trim()+'" style="grid-template-columns:36px 1fr 34px;gap:8px"><div class="k" style="font-size:10px">'+DIM_LABEL[d]+'</div>'
           +  '<div class="bar-track" style="height:4px"><div class="bar-fill" data-w="'+v+'" style="background:'+DIM_COLOR[d]+'"></div></div>'
           +  '<div class="v" style="font-size:9.5px">'+v+'%</div></div>';
  });
  $('bars').innerHTML = bars;
  $('scBars').innerHTML = scBars;

  // 副属性 / 混合
  var key1 = top + '-' + second;
  var key2 = second + '-' + top;
  var mixLine = MIX_TEXT[key1] || MIX_TEXT[key2] || '';
  var gapR = Math.round(state.pct[top]) - Math.round(state.pct[second]);
  var box = '';
  if(gapR < 8){
    box = '<div class="mix"><span>双属性</span><p>'+DIM_LABEL[top]+' × '+DIM_LABEL[second]+' 几乎并列——'+mixLine+'</p></div>';
  } else if(mixLine && state.pct[second] >= 20){
    box = '<div class="mix"><span>副属性 '+DIM_LABEL[second]+'</span><p>'+mixLine+'</p></div>';
  }
  $('mixBox').innerHTML = box;

  // 分享卡
  $('scName').textContent = r.name;
  $('scLine').textContent = r.quote;

  // 进度条动画
  setTimeout(function(){
    Array.prototype.forEach.call(document.querySelectorAll('.bar-fill'), function(el){
      el.style.width = el.dataset.w + '%';
    });
  }, 120);

  state.result = {
    top: DIM_LABEL[top], second: DIM_LABEL[second],
    dim: top, dimSecond: second,
    name: r.name, en: r.en, quote: r.quote, letter: r.letter,
    pct: {dom:Math.round(state.pct.dom), sad:Math.round(state.pct.sad), sub:Math.round(state.pct.sub), mas:Math.round(state.pct.mas)}
  };
}

/* ============================================================
   分享 / 重测
   ============================================================ */
function copyShare(){
  var s = state.result;
  if(!s) return;
  var txt = '我的 BDSM 属性测试结果：' + s.name + '（' + s.en + '）\n'
          + '「' + s.quote + '」\n'
          + 'Dom ' + s.pct.dom + '% · S ' + s.pct.sad + '% · Sub ' + s.pct.sub + '% · M ' + s.pct.mas + '%\n'
          + '—— 50 题生活化取向测试，仅供自我观察。';
  var done = function(){ toast('文案已复制，去粘贴吧'); };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done).catch(function(){ legacyCopy(txt, done); });
  } else { legacyCopy(txt, done); }
}
function legacyCopy(txt, cb){
  var ta = document.createElement('textarea');
  ta.value = txt; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); cb(); }catch(e){ toast('复制失败，可截图保存'); }
  document.body.removeChild(ta);
}
function toast(msg){
  var t = $('toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(t._tid);
  t._tid = setTimeout(function(){ t.classList.remove('on'); }, 2000);
}

/* ============================================================
   分享海报
   ============================================================ */
function openPoster(){
  var s = state.result;
  if(!s) return;
  $('pLetter').textContent = s.letter;
  $('pLetter').style.fontSize = s.letter.length > 1 ? '38px' : '56px';
  $('pName').textContent = s.name;
  $('pEn').textContent = s.en;
  $('pQuote').textContent = s.quote;

  var rows = '';
  DIMS.slice().sort(function(a,b){ return s.pct[b] - s.pct[a]; }).forEach(function(d){
    var v = s.pct[d];
    rows += '<div class="p-bar"><div class="k">' + DIM_LABEL[d] + '</div>'
         +  '<div class="t"><div class="f" style="width:' + v + '%;background:' + DIM_COLOR[d] + '"></div></div>'
         +  '<div class="v">' + v + '%</div></div>';
  });
  $('pTag').textContent = '主属性 ' + s.top + ' · 副属性 ' + s.second;
  $('pBars').innerHTML = rows;

  var kws = KW[s.dim] || [];
  $('pKw').innerHTML = kws.map(function(k){ return '<span>' + k + '</span>'; }).join('');

  $('posterMask').classList.add('on');
  $('posterTip').style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closePoster(){
  $('posterMask').classList.remove('on');
  $('posterTip').style.display = 'none';
  document.body.style.overflow = '';
}

/* ============================================================
   绑定
   ============================================================ */
$('adultOk').addEventListener('change', function(){
  $('startBtn').disabled = !this.checked;
});
$('startBtn').addEventListener('click', function(){
  if($('startBtn').disabled) return;
  startQuiz();
});
$('backBtn').addEventListener('click', goBack);
$('againBtn').addEventListener('click', startQuiz);
$('copyBtn').addEventListener('click', copyShare);
$('posterBtn').addEventListener('click', openPoster);
$('posterClose').addEventListener('click', closePoster);
$('posterMask').addEventListener('click', function(e){
  if(e.target === $('posterMask')) closePoster();
});
$('homeBtn').addEventListener('click', function(){ showView('intro'); });

document.addEventListener('keydown', function(e){
  if(!$('view-quiz').classList.contains('active')) return;
  if(['1','2','3','4'].indexOf(e.key) >= 0){
    var pos = parseInt(e.key,10)-1;
    var order = ORDER[state.idx];
    if(pos < order.length) choose(order[pos]);
  } else if(e.key === 'ArrowLeft'){ goBack(); }
});
