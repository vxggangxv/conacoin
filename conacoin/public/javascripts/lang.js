/**
 * setLanguage 
 * use $.lang[currentLanguage][languageNumber]
 */


function setLanguage(currentLanguage) {
    // console.log('setLanguage', arguments);

    $('[data-langTarget]').each(function () {
        var $this = $(this);
        $this.html($.lang[currentLanguage][$this.data('langtarget')]);
        // $this.contents()[0].textContent = $.lang[currentLanguage][$this.data('langtarget')];
    });
}

// 언어 변경
$('#menuLang .lang-btn').click(function () {
    var langType = $(this).data('lang');
    // if (langType === 'ko') return window.location.href = 'http://sbt7.cafe24.com/'
    // if (langType === 'ko') return window.location.href = 'http://localhost:3030/'
    if (langType === 'ko') return window.location.href = '/'
    var lang = $(this).data('lang');
    setLanguage(lang);

    $('#navBar').removeClass('active');
});

// // SET
// localStorage.setItem('lang', 'ko');

// // GET
// localStorage.getItem('lang');

$.lang = {};

$.lang.en = {
    visualSubtitle: 'SBT is building up a cryptocurrency that<br>can be used anywhere in the world.',
    visualJoin: 'REGISTER <span class="sic"><span class="arr arr-rt"></span></span>',
    aboutSubtitle: '" We offer services through trust. "',
    aboutText1: 'The primary goals of the SBT platform and the Sunblockpay cryptography are: Incentives based on the block chain, creating a distributed platform. as a result of the expansion of the online payment industry. Solving a number of unique problems. Our goal is to reduce the risk and cost of our users. Make the online payment process easier.',
    aboutText2: 'Sunblockpay (SBP) is de-centralized using block chain technology. Password money, which is not controlled by third party agencies or central authorities. Sunblockpay is a hotel accommodation, flight, transportation, movie theater, and tour. Additional travel services that can be done in the comfort of a mobile phone Available on all online booking services, including',
    processSubtitle: '"The Sunblock Terminal consists of a structured platform and a robust process. ”',
    processCardText1: 'SBT is the most popular digital wallet. We\'re trying to develop a fair financial future. Sun Block Pay and SBT. Easily accessible from all over the world with help I\'m tracking the deal.',
    processCardText2: 'Sun block sbt the plan, and pay People and operates the currency in every corner. To provide essential services. A mission to set up a Web site and apps. Being performed.',
    processCardText3: 'Sun Block Pay and SBT worldwide Delivers fast mobile transactions from anywhere Dear Sun Block Terminal Group, Deliver innovative products.',
    processCardText4: 'Sun Block Pay and SBT Group are: It provides a number of parameters for money transactions Save money.',
    scalabilitySubtitle: '" SBT grows with flexible scalability. ”',
    scalabilityText1: 'Sun Block supports plug-ins that are installed as extensions. And even if it suggests a new type of transition structure, It\'s a solution that can be introduced that allows the structure to be fixed. You can fix the problem.',
    scalabilityText2: 'Clients without the associated plug-in installed also have this custom Transaction can be delivered, the solution is 3rd Party Developers are introducing new transformations. You can create an ecosystem like the DApp Store.',
    scalabilityCardText1: 'built-in backend Provide layer system.',
    scalabilityCardText2: 'We\'re going to need more users It\'s acceptable.',
    scalabilityCardText3: 'Pounders and developers a booking for sale',
    scalabilityCardText4: 'accurate and sound System Recovery.',
    planningBarName1: 'International, Domestic Exchange Registration of BTC, ETH, KRW, and USDT',
    planningBarName2: 'SBT Shopping Mall Open Issuing SBT Card',
    planningBarName3: 'Multi-Gaplet Development',
    planningBarName4: 'Functional construction Campaign/recommendation link/charge/gift',
    planningBarName5: 'Homepage / Shopping Mall Production Mainnet Ecosystem Establishment',
    planningBarName6: '<span class="spot-name" style="font-size: 12px; line-height: 1.3">App and<br class="hidden-sm-and-down"> App wallet development</span>',
    technologySubtitle: '"SBT with both safety and flexibility."',
    technologyText1: 'Sun Block is based on Rubidaim (RBD) network. Create a blockchain based on rubyness, such as etherium based. Build an independent ecosystem through Rubidium-based formation and GAS creation, Rubidium provides distributed applications (Dapps) that primarily provide new development time and cost.',
    // technologyText1: 'Sun Block is based on the ETH network. ETH Network It provides the ability to perform smart contracts anonymously and safely. When the contract is completed, it means that the hacker is unable to operate the system.',
    // technologyText2: 'Eder Leeum\'s second-largest share of the block chain market was the one in the world. It\'s this kind of safety and flexibility, and it\'s the right platform. I believe that building is the best option. On the ETH network, As the user grows, the user base will grow in terms. If you\'re more interested, the underlying network will improve, and you\'ll end up with more. It can be mainstream and the largest cryptocurrency currency on the market.',
    contactSubtitle: '"SBT with both safety and flexibility."',

};

$.lang.cn = {
    visualSubtitle: 'SBT在世界各地建立了隐喻性高潮。',
    visualJoin: '登记 <span class="sic"><span class="arr arr-rt"></span></span>',
    aboutSubtitle: '"我们通过信任来提供服务。 "',
    aboutText1: 'SBT平台和Sunblockpay cryptocurrency的主要目标 以积木链条为基础的激励,打造分散平台 随着在线支付产业的扩张 解决很多固有问题。 我们的目标是减少用户的风险和成本 比网上支付流程更容易。',
    aboutText2: 'Sunblockpay (SBP) 使用模块链技术的脱中央化 是密码货币,不被其他公司或中央当局控制。 Sunblockpay 酒店住宿,航班,交通,电影院,旅游旅游 在移动电话的舒适中实现的额外旅行服务. 包括在内,所有在线预约服务中都可以使用。',
    processSubtitle: '"终端是系统模块Sun的平台和坚固的进程组成的。 "',
    processCardText1: 'SBT是最受欢迎的数码钱包。 我们为了开发公平的金融未来 Sun Block Pay和SBT的 通过帮助,在全世界都很容易做到的 正在追踪交易。',
    processCardText2: 'Sun Block Pay及SBT计划 在角落里运营通话, 为了提供必需服务 建立网站和应用程序的任务 我在修行。',
    processCardText3: 'Sun Block pay及SBT是全世界 随时随地提供快速移动交易 致Sun Block Terminal集团 提供创新产品。',
    processCardText4: 'Sun Block Pay及SBT集团 提供金钱交易的各种变数 省钱。',
    scalabilitySubtitle: '"灵活的扩展是SBT性增长。 "',
    scalabilityText1: 'Sun Block支持通过扩展(Extension)安装的插头, 即使通过它提出新方式的transaction结构 通过可引进的解决方案固定结构后发生的 问题可以解决。',
    scalabilityText2: '未安装相关插头的客户端也是这种客户端 可转送Transaction,该解决方案为3rd Party 开发者们引进新的transaction 可打造与DApp Store相同的生态系。',
    scalabilityCardText1: '内藏式后台 提供层叠系统。',
    scalabilityCardText2: '更多用户 可以接受。',
    scalabilityCardText3: '文件夹及开发者 义卖预约。',
    scalabilityCardText4: '准确坚固的 恢复系统。',
    planningBarName1: '国际,国内交易所 BTC, ETH, KRW,USDT收录',
    planningBarName2: 'SBT购物中心开业 SBT发卡',
    planningBarName3: '开发多功能钱包',
    planningBarName4: '功能构建 活动/推荐链接/手续费/赠送',
    planningBarName5: '网站/购物中心制作 构建主网生态系统',
    planningBarName6: '应用程序开发',
    technologySubtitle: '"同时具备安全性和灵活性的SBT"',
    technologyText1: 'Sun Block是以Rubiduim(RBD)网络为基础的。 生成如처럼基般以红宝石为基础的块状链。 通过红宝石基础的形成和GAS的生成构成独立的生态系统, Rubidium主要提供新的开发时间和费用的分散应用项目(Dapp)。',
    // technologyText1: 'Sun Block基于ETH网络。 ETH网络 提供匿名安全履行智能合同的功能。 合同签订完成后,意味着黑客无法操作系统。',
    // technologyText2: '伊德瑞姆在积木链球市场排名第二 正是这种安全和灵活性,以及相应的平台 相信构建是最好的选择。 在ETH网络中 随着用户的增加,在侧面用户基础会变大。 有了更多的关注,基本网络得到改善,最终 可以成为主流,也可以成为市场上最大的加密通话。',
    contactSubtitle: '"同时具备安全性和灵活性的SBT"',
};