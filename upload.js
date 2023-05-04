function DragImgUpload(id,options) {
    this.me = $(id);
    this.preview = $('#drop-area-preview');
    this.opts = $.extend(true, {}, options);
    this.uploadBtn = $('#upload');
    this.init();
    this.callback = this.opts.callback;
}

DragImgUpload.prototype = {
    init:function () {
        this.eventClickInit();
    },
    onDragover:function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    },
    onDrop:function (e) {
        var self = this;
        e.stopPropagation();
        e.preventDefault();

        let file = e.dataTransfer.files;
        console.log(file);
        if (file.length == 0) {
            return false;
        }
        if (file[0].type.indexOf('image') === -1) {
            alert("上傳文件為image.");
            return false;
        }
        var filesize = Math.floor((file[0].size)/1024);
        if (filesize>500) {
            alert("文件不超過500K.");
            return false;
        }

        $("#file1").prop("files", file);
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
            self.me.find("img").prop("src", e.target.result)
                .css({width: "100%", height: "auto"});

            var img = new Image();
            img.src = e.target.result;
            img.onload = function(e) {
                self.me.find("img").css({width: img.width, height: img.height});
                self.preview.css({height: img.height});
            };
        };

        if (this.callback) {
            this.callback(file);
        }
    },
    eventClickInit:function () {
        var self = this;
        this.me.unbind().click(function () {
            self.createImageUploadDialog();
        })
        var dp = this.me[0];
        dp.addEventListener('dragover', function(e) {
            self.onDragover(e);
        });
        dp.addEventListener("drop", function(e) {
            self.onDrop(e);
        });

        $('#reupload').click(function() {
            alert(0);
            self.createImageUploadDialog();
        })
    },
    onChangeUploadFile:function (obj) {
        var self = this;
        console.log(obj.files);
        var reader = new FileReader();
        reader.readAsDataURL(obj.files[0]);
        reader.onload = function (e) {
            self.me.find("img").prop("src", e.target.result)
                .css({width: "100%", height: "auto"});
            $('#pic_1').attr('src', e.target.result);
            $('#imgsrc').val(e.target.result);
        };
        if(this.callback){
            this.callback(obj.files);
        }

    },
    createImageUploadDialog:function () {
        var fileInput = this.fileInput;
        var self = this;
        //if (!fileInput) {
            fileInput = $('#file1');
            fileInput.change(function(){
                return self.onChangeUploadFile(this);
            }) 
            this.fileInput = fileInput;
        //}

        fileInput.click();
    }

}