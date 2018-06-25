let bankName = [
    { id: "700", name: "请选择" },
    { id: "888", name: "中金网银无卡" },
    { id: "889", name: "中金网银" },
    { id: "891", name: "金科无卡" },
    { id: "100", name: "邮储银行" },
    { id: "102", name: "工商银行" },
    { id: "103", name: "农业银行" },
    { id: "104", name: "中国银行" },
    { id: "105", name: "建设银行" },
    { id: "301", name: "交通银行" },
    { id: "302", name: "中信银行" },
    { id: "303", name: "光大银行" },
    { id: "304", name: "华夏银行" },
    { id: "305", name: "民生银行" },
    { id: "306", name: "广发银行" },
    { id: "307", name: "平安银行" },
    { id: "308", name: "招商银行" },
    { id: "309", name: "兴业银行" },
    { id: "310", name: "浦发银行" },
    { id: "313", name: "华融湘江银行" },
    { id: "316", name: "浙商银行" },
    { id: "317", name: "渤海银行" },
    { id: "321", name: "重庆三峡银行" },
    { id: "401", name: "上海银行" },
    { id: "402", name: "厦门银行" },
    { id: "403", name: "北京银行" },
    { id: "405", name: "福建海峡银行" },
    { id: "408", name: "宁波银行" },
    { id: "409", name: "齐鲁银行" },
    { id: "412", name: "温州银行" },
    { id: "413", name: "广州银行" },
    { id: "417", name: "盛京银行" },
    { id: "419", name: "辽阳银行" },
    { id: "420", name: "大连银行" },
    { id: "421", name: "苏州银行" },
    { id: "422", name: "河北银行" },
    { id: "423", name: "杭州银行" },
    { id: "424", name: "南京银行" },
    { id: "426", name: "金华银行" },
    { id: "427", name: "新疆乌鲁木齐市商业银行" },
    { id: "428", name: "绍兴银行" },
    { id: "430", name: "抚顺银行" },
    { id: "431", name: "临商银行" },
    { id: "432", name: "湖北银行" },
    { id: "433", name: "葫芦岛银行" },
    { id: "434", name: "天津银行" },
    { id: "435", name: "郑州银行" },
    { id: "436", name: "宁夏银行" },
    { id: "438", name: "齐商银行" },
    { id: "439", name: "锦州银行" },
    { id: "440", name: "徽商银行" },
    { id: "442", name: "哈尔滨银行" },
    { id: "443", name: "贵阳银行" },
    { id: "447", name: "兰州银行" },
    { id: "448", name: "南昌银行" },
    { id: "451", name: "吉林银行" },
    { id: "454", name: "九江银行" },
    { id: "457", name: "秦皇岛市商业银行" },
    { id: "458", name: "青海银行" },
    { id: "459", name: "台州市商业银行" },
    { id: "461", name: "长沙银行" },
    { id: "462", name: "潍坊银行" },
    { id: "463", name: "赣州银行" },
    { id: "464", name: "泉州银行" },
    { id: "450", name: "青岛银行" },
    { id: "465", name: "营口银行" },
    { id: "466", name: "富滇银行" },
    { id: "470", name: "嘉兴银行" },
    { id: "473", name: "浙江泰隆商业银行" },
    { id: "474", name: "内蒙古银行" },
    { id: "478", name: "广西北部湾银行" },
    { id: "479", name: "包商银行" },
    { id: "481", name: "威海市商业银行" },
    { id: "483", name: "攀枝花商行" },
    { id: "488", name: "三门峡市商业银行" },
    { id: "490", name: "张家口市商业银行" },
    { id: "491", name: "桂林银行" },
    { id: "495", name: "柳州银行" },
    { id: "496", name: "南充市商业银行" },
    { id: "497", name: "莱商银行" },
    { id: "498", name: "德阳银行" },
    { id: "500", name: "六盘水市商业银行" },
    { id: "502", name: "曲靖市商业银行" },
    { id: "701", name: "昆仑银行" },
    { id: "1401", name: "上海农商行" },
    { id: "1402", name: "昆山农村商业银行" },
    { id: "1403", name: "常熟农商银行" },
    { id: "1404", name: "深圳农村商业银行" },
    { id: "1405", name: "广州农村商业银行" },
    { id: "1408", name: "顺德农商银行" },
    { id: "1410", name: "湖北农信" },
    { id: "1412", name: "江阴农村商业银行" },
    { id: "1413", name: "重庆农村商业银行" },
    { id: "1414", name: "山东农信" },
    { id: "1415", name: "东莞农村商业银行" },
    { id: "1416", name: "张家港农村商业银行" },
    { id: "1418", name: "北京农村商业银行" },
    { id: "1420", name: "宁波鄞州农村合作银行" },
    { id: "1424", name: "江苏省农村信用社联合社" },
    { id: "1428", name: "吴江农村商业银行" },
    { id: "1433", name: "太仓农村商业银行" },
    { id: "1434", name: "临汾市尧都市农村信用联社" },
    { id: "1437", name: "无锡农商行" },
    { id: "1438", name: "湖南农村信用社" },
    { id: "1439", name: "江西农信" },
    { id: "1442", name: "陕西省农村信用社联合社" },
    { id: "1501", name: "江苏银行" },
    { id: "1502", name: "邯郸市商业银行" },
    { id: "1503", name: "邢台银行" },
    { id: "1504", name: "承德银行" },
    { id: "1505", name: "沧州银行" },
    { id: "1506", name: "晋城市商业银行" },
    { id: "1507", name: "鄂尔多斯银行" },
    { id: "1508", name: "上饶银行" },
    { id: "1509", name: "东营市商业银行" },
    { id: "1511", name: "泰安市商业银行" },
    { id: "1514", name: "漯河商行" },
    { id: "1515", name: "商丘市商业银行" },
    { id: "1517", name: "浙江民泰商业银行" },
    { id: "1518", name: "龙江银行" },
    { id: "1519", name: "浙江稠州商业银行" },
    { id: "1520", name: "安徽省农村信用社联合社" },
    { id: "1521", name: "广西壮族农村信用社联合社" },
    { id: "1522", name: "海南省农村信用社" },
    { id: "1523", name: "云南省农村信用联社" },
    { id: "1524", name: "宁夏黄河农村商业银行" },
    { id: "1526", name: "安阳市商业银行" },
    { id: "1527", name: "保定市商业银行" },
    { id: "1528", name: "成都农商银行" },
    { id: "1529", name: "广东省农村信用社" },
    { id: "1530", name: "河北省农村信用联合社" },
    { id: "1531", name: "鹤壁银行" },
    { id: "1532", name: "衡水市商业银行" },
    { id: "1534", name: "晋中市商业商行" },
    { id: "1535", name: "库尔勒市商业银行" },
    { id: "1536", name: "乐山市商业银行" },
    { id: "1537", name: "凉山州商业银行" },
    { id: "1538", name: "内蒙古农信" },
    { id: "1539", name: "山西省农村信用社联合社" },
    { id: "1540", name: "深圳福田银座村镇银行" },
    { id: "1541", name: "遂宁市商业银行" },
    { id: "1542", name: "唐山市商业银行" },
    { id: "1543", name: "天津滨海银行" },
    { id: "1544", name: "乌海银行" },
    { id: "1546", name: "许昌银行" },
    { id: "1547", name: "雅安市商业银行" },
    { id: "1548", name: "阳泉市商业银行" },
    { id: "1549", name: "宜宾市商业银行" },
    { id: "1550", name: "玉溪市商业银行" },
    { id: "1551", name: "周口市商业银行" },
    { id: "1552", name: "自贡市商业银行" },
    { id: "1553", name: "遵义市商业银行" },
    { id: "1555", name: "长安银行" },
    { id: "1562", name: "吉林省农村信用合作社" },
    { id: "1565", name: "颖淮农村商业银行" },
    { id: "1569", name: "贵州银行" },
    { id: "1570", name: "长治商行" },
    { id: "1571", name: "朝阳银行" },
    { id: "1572", name: "江苏江南农村商业银行" },
    { id: "1573", name: "宁波东海银行" },
    { id: "1574", name: "平顶山银行" },
    { id: "1575", name: "青海省农村信用社联合社" },
    { id: "1576", name: "四川省农村信用合作社" },
    { id: "1577", name: "铁岭商业银行" },
    { id: "1578", name: "武汉农村商业银行" },
    { id: "1579", name: "信阳银行" },
    { id: "1629", name: "驻马店银行" },
    { id: "3001", name: "东亚银行" },
    { id: "3007", name: "星展银行" },
    { id: "3010", name: "花旗银行" },
    { id: "3034", name: "渣打银行（中国）" },
    { id: "3036", name: "法国兴业银行（中国）" }
];

export default bankName;

