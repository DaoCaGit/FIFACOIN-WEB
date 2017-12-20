;
(function (window) {
    function UNTI() {
        this.init(); // init
    }

    UNTI.prototype.init = function () {

    }

    UNTI.prototype.UI = {
        /**
         * shop banner
         */
        shopBanner: function () {
            var met_prevArrow = '',
                met_nextArrow = '';

            var $banner = $('#js_shop_slider');

            if ($banner.lenght < 1) {
                return false;
            }

            $banner.slick({
                autoplay: true,
                dots: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                prevArrow: met_prevArrow,
                nextArrow: met_nextArrow,
                lazyloadPrevNext: true,
                cssEase: 'linear',
                fade: true
            });
		},
		
		showGiftCard: function (num, pw, bg, theme) {
			$('.gift-card').removeClass('theme-black');
			$('.gift-card').css('background', 'url(' + bg + ') no-repeat').addClass(theme);
			$('#card-num').html(num);
			$('#card-pw').html(pw);
			
			layer.open({
				type: 1,
				title: false,
				shade: 0.6,
				content: $('.gift-card'),
				area: ['410px', '250px'],
				skin: 'layer-gift-card',
				cancel: function(){
					console.log('cancel');
				}
			});
		}
    }

    window.Unti = new UNTI();

})(window);

(function() {
	//tabs
	$('.commodity-tabs').on('click', '.tab-link', function(){
		var data = this.rel;
		$('.tab-link').removeClass('active');
		$(this).addClass('active');

		$('.tab-pane').removeClass('active');
		setTimeout(function(){
			$('.tab-pane').removeClass('in');
		},150)	

		$('#'+data).addClass('active');
		setTimeout(function(){
			$('#'+data).addClass('in');
		},150)
		
	});

	// sidebar-toggle
	$('.sidebar-toggle').on('click', function(){
		$('.nav-sidebar').toggleClass('show');
		$(this).find('i').toggleClass('icon-er-up-copy');
	});

	$('.panel-payment').on('click', 'a', function () {
		$('.panel-payment .panel-heading').find('span').toggleClass('down');
	});

	$('.tooltip-bottom').tooltip({
		placement: 'bottom',
		viewport: {selector: 'body', padding: 2}
	});

	$('[data-toggle="popover"]').popover({
		trigger: 'hover'
	});

	$('[data-toggle="popover-danger"]').popover({
		trigger: 'hover',
		template: '<div class="popover popover-danger" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	});
})($);