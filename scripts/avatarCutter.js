jQuery.UtrialAvatarCutter = function(config){
	var h,w,x,y;
	var os,oh,ow;
	var api = null;
	var sel = this;
	var img_content_id = config.content;
	var img_id = config.imgid || ("img_"+(Math.random()+"").substr(3,8));

	var select_width = null;
	var select_height = null;

	this.reload = function(img_url){
		if(img_url!=null && img_url != ""){
			os = img_url+"?"+Math.random();
			$("#"+img_content_id).html("<img id='"+img_id+"' src='"+os+"'/>");
			$("#"+img_id).bind("load",
				function(){
					sel.init();
				}
			);
		}
	}
	$("#"+img_content_id+" img").attr("id", img_id);

	var preview = function(c) {
		/*if ( c.w == 0 || c.h == 0 ) {
			api.setSelect([ x, y, x+w, y+h ]);
			api.animateTo([ x, y, x+w, y+h ]);
			return;
		}
		x = c.x;
		y = c.y;
		w = c.w;
		h = c.h;*/
		//console.log(c);
		if(config.showCoords) {
			config.showCoords.call(this, c);
		}
	}

	this.init = function(){
		if (api!=null) {
			api.destroy();
		}
		os = $("#"+img_content_id+" img").attr("src");
		if (os=="") return;

		oh = $('#'+img_id).height();
		ow = $('#'+img_id).width();
		
		select_width = config.selector.width;
		select_height = config.selector.height;	

		select_width = Math.min(ow, select_width);
		select_height = Math.min(oh, select_height);
		
		x = ((ow - select_width) / 2);
		y = ((oh - select_height) / 2);

		console.log(ow, oh, select_width, select_height);

		var cropattrs = config.cropattrs || {};
		cropattrs = $.extend(cropattrs, { 
			onChange: preview,
			onSelect: preview
			//boxWidth: 500,
    		//boxHeight: 300,
		});
		api = $.Jcrop($('#'+img_id), cropattrs);
		//console.log(api)
		//设置选择框默认位置
		//api.animateTo([ x, y, x+select_width, y+select_height ]);*/
	}

	this.submit = function(){
		return {w:w,h:h,x:x,y:y,s:os};
	}
}