sframework = function(){
	this.ws = null;
	this.server = window.location.hostname;
	this.port = '40081';
	this.uid = 0;
	this.lang = 'en';
}
sframework.prototype = {
	init: function(data){
		if(this.server.indexOf('demo') === -1 && this.server.indexOf('dev') === -1){
			var strArr = this.server.split('.');
			var server_str = '';
			for(var s in strArr){
				if(s == 0){
					server_str = 'server';
				}else{
					server_str += strArr[s];
				}

				if(s != strArr.length -1){
					server_str += '.';
				}
			}
			this.server = server_str;
		}
        var protocolFixed = (("https:" == document.location.protocol) ? "https://" : "http://");
        this.ws = io.connect(protocolFixed + this.server + ":" + this.port, {'forceNew': true, 'reconnect': true, "transports":['websocket', 'polling']});
		var parseData = JSON.parse(data);
		if(typeof parseData.uid != 'undefined'){
			this.uid = parseData.uid;
		}
		var ws = this.ws;
		this.lang = parseData.lang;
		var _this = this;
		ws.on('connect', function(){
			ws.emit('initialize', data);
		});

		ws.on('update rankings', function(data){
			var container = $('#rank_list');
			var myrank = '';
			if(container.find('li').length > 11){
				var last = container.find('li:last');
				if(last.data('uid') == _this.uid){
					myrank = last;
				}
			}
			//my rank
			var myOldRank = container.find("li[data-uid="+_this.uid+"]");
			var listHtml = '<li><span class="rank">Rank</span><span class="user">User</span><span class="value">Value</span></li>';
			for(var i in data){
				if(i == container.data('console')){
					var listArr = data[i];
					for(var j in listArr){
						var top3l = parseInt(j) > 3 ? '<span>'+ (parseInt(j) + 1) +'</span>' : '';
						var mail = listArr[j]['user_mail'];
						if(myOldRank && myOldRank.data('uid') == listArr[j]['customer_id']){
							mail = myOldRank.find('span').eq(1).html();
						}
						var top_html = parseInt(j) + 1;
						var cla = '';
						if(j <= 3) {
							cla = 'markable';
						    top_html = '<img src="/fifacoin-new/images/packs/rank'+(parseInt(j) + 1)+'.png">';	
						}
						listHtml += '<li data-uid="'+ listArr[j]['customer_id'] +'">';
						listHtml += '<span class="rank '+cla+'">'+ top_html +'</span>';
						listHtml += '<span class="user '+cla+'">'+mail+'</span>';
						listHtml += '<span class="value '+cla+'">'+ _this.numberformat(parseInt(listArr[j]['rank_coins']/1000)) +'K</span>';
						listHtml += '</li>';
					}
					container.html(listHtml);
					if(myrank.length > 0){
						container.append(myrank);
					}
				}
			}
		});
	},

	translate: function(data){
		return eval('data.' + this.lang);
	},
	numberformat:function(val){
		//alert(val);
		while(/(\d+)(\d{3})/.test(val.toString()))
		{
			val=val.toString().replace(/(\d+)(\d{3})/,'$1'+','+'$2');
		}
		return val;
	},
	delay: function(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
	            return a.apply(null, c)
	        },
        b);
    },
    now: function(){
    	return + new Date
    },
    formatMail: function(mail){
    	var arr = mail.split('@');
    	if(arr[0].length >3 && arr[0].length <= 6){
    		return mail.replace(/(.{1})(.*?)(.{1})@(.*)/, '$1***$3@$4');
    	}else if(arr[0].length <=3){
    		return mail.replace(/(.{1})(.*?)@(.*)/, '$1***@$3');
    	}
    	return mail.replace(/(.{3})(.*?)(.{3})@(.*)/, '$1***$3@$4');
    }
}

packswf = function(){
	this.fk = new sframework();
	this.oDiv = $('.swf-step-1').get(0);
	this.C = 4;
	this.R = 8;
	this.divCX = 0;
	this.divCY = 0;
	this.showNodes = 0;
	this.hideNodes = 0;
}
packswf.prototype = {
	init: function(){
		//this.step_1();
		this.playersRotate();
	},
	step_1: function(){
		var _fk = this.fk;
		_fk.delay(function(){
			$('.swf-card-container > .swf-step-1').css({animation: "fade-in-action", "animation-duration": "1.5s", 'animation-fill-mode': 'forwards'});
			hideAndShow();
		}, 300);
	},
	playersRotate: function(){
		var delay = 0;
		_this = this;
		var _fk = _this.fk;
		var packvalue = $('#cur_value_ul').data('value');
		var dataup = new CountUp("pack_value", 0, packvalue, 0, 4);
		dataup.start();
		var balance_value = $('#balance_value').data('prevalue');
		if(balance_value){
			var balanceup = new CountUp("balance_value", balance_value, balance_value + packvalue, 0, 4);
			balanceup.start();
		}
		$('#balance_value').data('prevalue', balance_value + packvalue);
		$('#show_balance').html(_fk.numberformat(balance_value + packvalue));
	},
	animateSpread: function(cb){
		var _this = this;
		_this.divCX = _this.oDiv.offsetWidth/2;
		_this.divCY = _this.oDiv.offsetHeight/2;
		_this.hideNodes = 0;
		for(var i=0;i<R;i++)
		{
			for(var j=0;j<C;j++)
			{
				var oNewDiv = document.getElementById('new_'+i+'_'+j);
				if(!oNewDiv) {
					cb('no element');
					return;
				}
				var l=oNewDiv.offsetLeft+oNewDiv.offsetWidth/2;
				var t=oNewDiv.offsetTop+oNewDiv.offsetHeight/2;
				var disX=l-_this.divCX;
				var disY=t-_this.divCY;
				(function (oNewDiv, disX, disY){
					setTimeout(function (){
						oNewDiv.style.WebkitTransform='perspective(800px) translate3d('+disX+'px, '+disY+'px, 600px) rotateY('+rnd(-180, 180)+'deg) rotateX('+rnd(-180, 180)+'deg) scale(2,2)';
						oNewDiv.style.opacity=0;

						setTimeout(function (){
							_this.oDiv.removeChild(oNewDiv);
							_this.hideNodes ++;
							if(_this.hideNodes == i * j && cb) cb();
						}, 600);
					}, rnd(1, 301));
				})(oNewDiv, disX, disY);
			}
		}
	}
}


function rnd(n, m)
{
	return parseInt(Math.random()*(m-n)+n);
}
function addClass(ele, className) {
	var oriClass = ele.className;
	if(oriClass) {
		ele.className = oriClass+' '+className;
	} else {
		ele.className = className;
	}
}
function removeClass (el, className) {
	var cls = el.className;
	if(cls.indexOf(className)>=0) {
		el.className = el.className.replace(new RegExp('(?:^|\\s)'+className+'(?=\\s|$)', 'ig'), '');
	}
}
function replaceClass (el, cls1, cls2) {
	removeClass(el, cls1);
	addClass(el, cls2);
}

delay_exec = function(elem){
	this.element = elem;
	this.working = true;
	this.inputstart = 0;
}

delay_exec.prototype = {
	run: function(callback){
		if(this.element.length == 1 || this.working == true){
			//set start time
			this.inputstart = Math.round(new Date().getTime()/1000);
			if(typeof this.int != 'undefined'){
				clearTimeout(this.int);
			}
			this.working = false;
		}else{
			var currentTime = Math.round(new Date().getTime()/1000);
			if (this.inputstart > 0 && (currentTime - this.inputstart) < 2 ) {
				this.inputstart = currentTime;
				if(typeof this.int != 'undefined'){
					clearTimeout(this.int);
				}
			}
		}
		_this = this;
		var args = Array.prototype.slice.call(arguments, 1);
		this.int = this.delay(callback, 1000, args);
	},
	delay: function(a, b) {
		if(typeof arguments[2] == 'object'){
			var c = arguments[2];
		}else{
			var c = Array.prototype.slice.call(arguments, 2);
		}
        return setTimeout(function() {
	            return a.apply(null, c)
	        },
        b);
    }
};
