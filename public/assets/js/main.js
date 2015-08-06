$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type:'DELETE',
			url:'/admin/movie/list?id='+id
		})
		.done(function(results){
			if(results.success === 1){
				if(tr.length > 0){
					tr.remove();
				}
			}
		})
	})

	$('#douban').blur(function(event) {
         var douban = $(this);
         var id = douban.val();
         if(id){
         	$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				cache:true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain:true,
				jsonp:'callback'
				})
				.done(function(data) {
					console.log("success");
					$('#inputtitle').val(data.title)
					$('#inputdoctor').val(data.directors[0].name)
					$('#inputyear').val(data.year)
					$('#inputcountry').val(data.countries[0])
					$('#inputlanguage').val()
					$('#inputposter').val(data.images.large)
					$('#inputflash').val()
					$('#inputsummary').val(data.summary)
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
         }
								
		
	});
});