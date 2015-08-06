$(function(){
	$('.comment').click(function(e) {
		var target = $(this)
		var toId = target.data('tid');
		var commentId = target.data('cid');

		if($('#tId').length>0){
			$('#tId').val(toId);
		}
		else{
			$('<input>').attr({
				type:'hidden',
				id:'tId',
				name:'comment[tid]',
				value:toId
			}).appendTo('#commentForm');
		}
		
		if($('#commentId').length>0){
			$('#commentId').val(commentId);
		}else{
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm')
			
		}

	});
})