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