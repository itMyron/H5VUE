//	主方法	获取时间
let getTime = {
	showTime : function(pdVal) {
		var trans_day = "";
		var cur_date = new Date(); /* 如果日期框内为空的话就获取系统的时间为输入框初始化赋值，如果有值（用户自己选择的时间），那就获取用户自己选择的时间 */
		var cur_year = cur_date.getFullYear();

		var cur_month = cur_date.getMonth() + 1;
		var real_date = cur_date.getDate();
		cur_month = cur_month > 9 ? cur_month : "0" + cur_month;
		real_date = real_date > 9 ? real_date : "0" + real_date;
		var eT = cur_year + "-" + cur_month + "-" + real_date;
		if (pdVal > 0) {
		trans_day = getTime.addByTransDate(eT, pdVal);
		} else if (pdVal < 0) {
		trans_day = getTime.reduceByTransDate(eT, Math.abs(pdVal));
		} else {
		trans_day = eT;
		}
		//处理
		return trans_day;
	},
	addByTransDate : function (dateParameter, num) {
		var translateDate = "",
			dateString = "",
			monthString = "",
			dayString = "";
		translateDate = dateParameter.replace("-", "/").replace("-", "/");
		var newDate = new Date(translateDate);
		newDate = newDate.valueOf();
		newDate = newDate + num * 24 * 60 * 60 * 1000;
		newDate = new Date(newDate);
		//如果月份长度少于2，则前加 0 补位     
		if((newDate.getMonth() + 1).toString().length == 1) {
			monthString = 0 + "" + (newDate.getMonth() + 1).toString();
		} else {
			monthString = (newDate.getMonth() + 1).toString();
		}
		//如果天数长度少于2，则前加 0 补位     
		if(newDate.getDate().toString().length == 1) {
			dayString = 0 + "" + newDate.getDate().toString();
		} else {
			dayString = newDate.getDate().toString();
		}
		dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
		return dateString;
	},
	reduceByTransDate : function (dateParameter, num) {
		var translateDate = "",
			dateString = "",
			monthString = "",
			dayString = "";
		translateDate = dateParameter.replace("-", "/").replace("-", "/");
		var newDate = new Date(translateDate);
		newDate = newDate.valueOf();
		newDate = newDate - num * 24 * 60 * 60 * 1000;
		newDate = new Date(newDate);
		//如果月份长度少于2，则前加 0 补位     
		if((newDate.getMonth() + 1).toString().length == 1) {
			monthString = 0 + "" + (newDate.getMonth() + 1).toString();
		} else {
			monthString = (newDate.getMonth() + 1).toString();
		}
		//如果天数长度少于2，则前加 0 补位     
		if(newDate.getDate().toString().length == 1) {
			dayString = 0 + "" + newDate.getDate().toString();
		} else {
			dayString = newDate.getDate().toString();
		}
		dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
		return dateString;
	}
};
export default getTime;






