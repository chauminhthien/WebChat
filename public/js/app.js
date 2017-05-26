var iconsList 		= {
								'icon_devil'		:'3:)',
								'icon_angel'		:'O:)',
								'icon_smile' 		:':)',
								'icon_grumpy'		:'>:(',
								'icon_frown'		:':(',
								'icon_tongue'		:':P',
								'icon_grin'			:'=D',
								'icon_upset'		:'>:o',
								'icon_gasp'			:':o',
								'icon_wink'			:';)',
								'icon_pacman'		:':v',
								'icon_unsure'		:':/',
								'icon_cry'			:":'(",
								'icon_kiki'			:'^_^',
								'icon_glasses'		:'8-)',
								'icon_sunglasses'	:'B|',
								'icon_heart'		:'<3',
								'icon_squint'		:'-_-',
								'icon_confused'		:'o.O',
								'icon_colonthree'	:':3',
								'icon_like'			:'(y)'
							};


function friendMessageConvertIcons(value){
			// <3 => <span class="icon icon_heart"></span>
			$.each(iconsList,function(cl,char){
				if(value.indexOf(char) >= 0){
					
					char = char.replace(/\(/g,'\\(')
					           .replace(/\)/g,'\\)')
					           .replace(/\^/g,'\\^')
					           .replace(/\|/g,'\\|');
					
					var regex = new RegExp(char,"g");
					value = value.replace(regex,'<span class="icon '+cl+'"></span>');
				}
			});
			return value;
}

function Xss(value){


	
		value = value.replace(/\'/g, '&lsquo;')
		           	  .replace(/\"/g,'&ldquo;')
		          	  .replace(/\(/g,'&#40;')
		              .replace(/\)/g,'&#41;')
		              .replace(/\>/g,'&gt;')
		              .replace(/\\/g,'&frasl;')
		              .replace(/\</g,'&lt;');
		
		


		return value;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//================================================================


// var socket = io('https://chattingonline.herokuapp.com/');
var socket = io('http://localhost:3000/');

socket.on('server-send-info-that-bai', function(){
	$('input#name + p').html('Tên này đã có người sử dụng');
});

socket.on('server-send-info-thanh-cong', function(data){
	$('input#name + p').html('');
	$('#authName').html(Xss(data[0]));
	$('#login').hide(2000);
	$('#chatting').show(1000);

	$('title').html('Xin Chào: ' + Xss(data[0]));

});


socket.on('server-send-listUserName', function(listUserChat, id){
	
	$('#friendsList').html('');
	listUserChat.forEach(function(x){
		if(x[0] != info[0]){
			$('#friendsList').append(`<li>
							<a data-id="${x[2]}"> 
								<span class="img"> <img alt="" src="${x[1]}"> </span> 
								<span class="name">${Xss(x[0])}</span> 
								<span class="status ">Online</span>
							</a>
						</li>`);
		}
	});

	if (typeof id != 'undefined'){

    	$('span#'+ id).css('display', 'none');
	};
	
	
});

socket.on('server-send-message-id', function(data, id, txt){
	if(!$('li#chat-' +id).length){
			$('ul#windowsChat').append(`<li id="chat-${id}" data-id="${id}">
							<div class="layoutInner">
								<div class="titleBar clearfix ">
									<h4 id="${id}"> <span id="${id}" class="online"> </span> ${Xss(data[0])}</h4>
									<i id="${id}" class="close"></i>
								</div>
								<div class="layoutBody">
									<div class="conversation">
											<!-- chatting -->
										
											<!-- end chatting -->

									</div>
									<div class="typing" style="display: none;">
										<div class="message clearfix">
											<div class="avatar">
												<img src="${data[1]}" alt="${Xss(name)}" width="32" height="32">
											</div>
											<div class="bg"></div>
										</div>
									</div>
									
								</div>
								
								<div class="layoutSubmit">
									<input name="message" id="${id}" class="input">
									<div class="iconWrap">
										<div class="emoticonsPanel">
											<a title="Choose a sticker" class="toggleIcon"><i class="emoteToggler"></i></a>
											<div class="iconLayout">
												<div class="iconLists">
													<div class="iconItem">
														<a class="icon icon_smile" title="smile"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_frown" title="frown"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_tongue" title="tongue"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grin" title="grin"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_gasp" title="gasp"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_wink" title="wink"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_pacman" title="pacman"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grumpy" title="grumpy"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_unsure" title="unsure"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_cry" title="cry"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_kiki" title="kiki"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_glasses" title="glasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_sunglasses" title="sunglasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_heart" title="heart"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_devil" title="devil"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_angel" title="angel"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_squint" title="squint"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_confused" title="confused"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_upset" title="upset"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_colonthree" title="colonthree"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_like" title="like"></a>
													</div>
												</div>
												<div class="layoutArrow"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>`);

		};

		$('li#chat-'+ id +' div.conversation').append(`<div class="message clearfix" data-id="">
											<div class="avatar">
												<img src="${data[1]}" alt="${Xss(data[0])}" width="32" height="32">
											</div>
											<div class="msg-body">
												<div class="kso">
													<span>${friendMessageConvertIcons(txt)}</span>
												</div>
											</div>
										</div>`);
		$('li#chat-'+ id + ' div.layoutBody').scrollTop($('li#chat-'+ id + ' div.conversation').height());//////
});

socket.on('server-send-message', function(txt, id){
	$('li#chat-'+ id + ' div.conversation').append(`<div class="message clearfix me">
											<div class="msg-body">
												<div class="kso">
													<span>${friendMessageConvertIcons(txt)}</span>
												</div>
											</div>
										</div>`);
	$('li#chat-'+ id + ' div.layoutBody').scrollTop($('li#chat-'+ id + ' div.conversation').height());//////
});



socket.on('server-send-txt-room-all', function(data, txt){
	$('ul.message-room-list').append(`<li class="message">
										<div class="clearfix">
											<div class="avatar">
												<img src="${data[1]}" alt="${Xss(data[0])}" width="32" height="32">
											</div>
											<div class="content clearfix">
												<div class="created">
													<i></i> <span>${Xss(data[0])}</span>
												</div>
												<div>
													<div class="fullname">${Xss(data[0])}</div>
													<div class="msg">${Xss(txt)}</div>
												</div>
											</div>
										</div>	
									</li>`);
	$('div.scrollableAreaWrap').scrollTop($('ul.message-room-list').height());
	
});

socket.on('server-send-txt-room', function(data, txt){
	$('ul.message-room-list').append(`<li class="message-room-me">
										<div class="clearfix">
											<div class="avatar">
												<img src="${data[1]}" alt="${Xss(data[0])}" width="32" height="32">
											</div>
											<div class="content clearfix">
												
												<div>
													<div class="fullname">${Xss(data[0])}</div>
													<div class="msg">${Xss(txt)}</div>
												</div>
											</div>
										</div>	
									</li>`);
	$('div.scrollableAreaWrap').scrollTop($('ul.message-room-list').height());
	
});

socket.on('server-send-focusin', function(id){
	$('li#chat-'+ id + ' div.typing').css('display', 'block');
	$('li#chat-'+ id + ' div.layoutBody').scrollTop($('li#chat-'+ id + ' div.conversation').height());//////
});

socket.on('server-send-focusout', function(id){
	$('li#chat-'+ id + ' div.typing').css('display', 'none');
	$('li#chat-'+ id + ' div.layoutBody').scrollTop($('li#chat-'+ id + ' div.conversation').height());//////
});

//======================================================================
var info = [];
var img = 'images/avatars/luffy.jpg';

$(document).ready(function(){


	$('#login').show();
	$('#chatting').hide();

	function changeBK(){
		var url = '../images/bk.jpg';

		var listBk = [
			'../images/bk.jpg',
			'../images/bk1.jpg',
			'../images/bk2.jpg',
			'../images/bk3.jpg',
			'../images/bk4.jpg',
			'../images/bk5.jpg'

		];

		url = listBk[getRandomIntInclusive(0,listBk.length - 1)];

		return url;
	}



	$('body').css('background', 'url("'+ changeBK() +'")');


	$('#listAvatar ul li img').click(function(){
		img = $(this).attr('src');
		$('#listAvatar ul li img').removeClass('active');
		$(this).addClass('active');
		$('#avatrUser img').attr('src', img);
	});

	$('#clickInfoName').click(function(){
		$('input#name + p').html('');
		var name = $('input#name').val();
		if(name.length  > 3 && name.length <= 20){
			info[0] = name;
			info[1] = img;

			socket.emit('user-send-info', info);
			
		}else{
			$('input#name + p').html('Độ dài tên từ 4 đến 20 ký tự');
		}
	});

	$('a#logoutBtn').click(function(){
		socket.emit('user-logout', info);
		
		$('#chatting').hide(2000);
		$('#login').show(1000);
		$('title').html('Web Chat: Thiện Xin Trai');
		$('input#name').val('');
	});

	$('input#room_message_content').keyup(function(x){
		if(x.keyCode == 13){
			var txt = $(this).val();
			console.log(txt);
			if(txt.length > 0){
				socket.emit('user-send-txt-room', info,txt);
				$(this).val('');
			}
		}
	});


	
	$(document).on('click', 'ul#friendsList li a', function(){
		var id 		= $(this).attr('data-id');
		var img 	= $(this).find('img').attr('src');
		var name 	= $(this).children('span.name').text();

		if(!$('li#chat-' +id).length){
			$('ul#windowsChat').append(`<li id="chat-${id}" data-id="${id}">
							<div class="layoutInner">
								<div class="titleBar clearfix ">
									<h4 id="${id}"> <span id="${id}" class="online"> </span> ${Xss(name)}</h4>
									<i id="${id}" class="close"></i>
								</div>
								<div class="layoutBody">
									<div class="conversation">
											<!-- chatting -->
										
											<!-- end chatting -->

									</div>
									<div class="typing" style="display: none;">
										<div class="message clearfix">
											<div class="avatar">
												<img src="${img}" alt="${Xss(name)}" width="32" height="32">
											</div>
											<div class="bg"></div>
										</div>
									</div>
									
								</div>
								
								<div class="layoutSubmit">
									<input name="message" id="${id}" class="input">
									<div class="iconWrap">
										<div class="emoticonsPanel">
											<a title="Choose a sticker" class="toggleIcon"><i class="emoteToggler"></i></a>
											<div class="iconLayout">
												<div class="iconLists">
													<div class="iconItem">
														<a class="icon icon_smile" title="smile"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_frown" title="frown"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_tongue" title="tongue"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grin" title="grin"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_gasp" title="gasp"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_wink" title="wink"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_pacman" title="pacman"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grumpy" title="grumpy"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_unsure" title="unsure"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_cry" title="cry"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_kiki" title="kiki"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_glasses" title="glasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_sunglasses" title="sunglasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_heart" title="heart"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_devil" title="devil"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_angel" title="angel"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_squint" title="squint"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_confused" title="confused"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_upset" title="upset"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_colonthree" title="colonthree"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_like" title="like"></a>
													</div>
												</div>
												<div class="layoutArrow"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>`);
		}


		$('ul#windowsChat li#chat-' + id).removeClass('off');

		$('input#' + id).focus();


		

	});

	
	$(document).on('click', 'i.close', function(){
		var id = $(this).attr('id');
		$('li#chat-' + id).remove();
	});

	$(document).on('click', '.layoutInner h4', function(){
		var id = $(this).attr('id');
		$('li#chat-' + id).toggleClass('off');
	});

	$(document).on('click', 'a.toggleIcon', function(){
		
		$(this).closest('.emoticonsPanel').toggleClass('open');
		
	});

	$(document).on('click', 'div.iconItem a.icon', function(){
		
		var cl 		= $(this).attr('class').split(' ')[1];
		var chars 	= ' ' +  iconsList[cl] + ' ';

		var input = $(this).closest('.layoutSubmit').children('input.input');

		$(input).val(input.val() + chars);

		$(this).closest('.emoticonsPanel').removeClass('open');

		
	});


	$(document).on('keyup', 'div.layoutSubmit input.input', function(e){
		
		if(e.keyCode == 13){
			var txt = $(this).val();

			if(txt.length > 0){
				var id = $(this).attr('id');

				socket.emit('user-send-message', info, id, txt);

				$(this).val('');
			}
		}

		
	});

	$(document).on('focusin', 'div.layoutSubmit input.input', function(e){
		
	
		var id = $(this).attr('id');

		socket.emit('user-send-focusin', id);
		
	});

	$(document).on('focusout', 'div.layoutSubmit input.input', function(e){
		
	
		var id = $(this).attr('id');

		socket.emit('user-send-focusout', id);
		
	});



});

/*
<li id="chat{ID}" data-id="{ID}">
							<div class="layoutInner">
								<div class="titleBar clearfix ">
									<h4>Châu Minh Thiện</h4>
									<i class="close"></i>
								</div>
								<div class="layoutBody">
									<div class="conversation">
											<!-- chatting -->
										<div class="message clearfix" data-id="{ID}">
											<div class="avatar">
												<img src="images/avatars/1.jpg" alt="{NAME}" width="32" height="32">
											</div>
											<div class="msg-body">
												<div class="kso">
													<span>Châu Minh Thiện</span>
												</div>
											</div>
										</div>
										

										<div class="message clearfix me">
											<div class="msg-body">
												<div class="kso">
													<span>aaaaaaaaaaaaaaaaaaaaaaaaaa</span>
												</div>
											</div>
										</div>	
										<!-- end chatting -->

									</div>
									<div class="typing" style="display: none;">
										<div class="message clearfix">
											<div class="avatar">
												<img src="images/avatars/1.jpg" alt="{NAME}" width="32" height="32">
											</div>
											<div class="bg"></div>
										</div>
									</div>
									
								</div>
								
								<div class="layoutSubmit">
									<input name="message" class="input">
									<div class="iconWrap">
										<div class="emoticonsPanel">
											<a title="Choose a sticker" class="toggleIcon"><i class="emoteToggler"></i></a>
											<div class="iconLayout">
												<div class="iconLists">
													<div class="iconItem">
														<a class="icon icon_smile" title="smile"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_frown" title="frown"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_tongue" title="tongue"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grin" title="grin"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_gasp" title="gasp"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_wink" title="wink"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_pacman" title="pacman"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_grumpy" title="grumpy"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_unsure" title="unsure"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_cry" title="cry"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_kiki" title="kiki"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_glasses" title="glasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_sunglasses" title="sunglasses"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_heart" title="heart"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_devil" title="devil"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_angel" title="angel"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_squint" title="squint"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_confused" title="confused"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_upset" title="upset"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_colonthree" title="colonthree"></a>
													</div>
													<div class="iconItem">
														<a class="icon icon_like" title="like"></a>
													</div>
												</div>
												<div class="layoutArrow"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						*/