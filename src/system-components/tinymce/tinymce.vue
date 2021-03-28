<template>
  <div style="width: 310px;margin-top: 20px;position: relative">
    <image-upload ref="imageUpload" @confirm="sureImg" :config="config"
                  :rootConfig="rootConfig"></image-upload>
    <div class="icon-box">
      <a-tooltip>
        <template slot="title">
          上传图片
        </template>
        <i class="iconfont icon-ht_btn_editsend" @click="openUpload()"></i>
      </a-tooltip>
    </div>
    <!--<div style="text-align:right">-->
      <!--<a-button type="primary" @click="openUpload()">点击上传图片</a-button>-->
    <!--</div>-->
    <div>
      <textarea :id="`tinymceId${timestamp}`" style="height:500px" v-model="value"></textarea>
    </div>
  </div>
</template>

<script>
import imageUpload from "../image-upload/index.vue";
export default {
  name: "tinymce",
	props: ['value', 'config', 'rootConfig'],
  components: {
    imageUpload,
  },

  data() {
    return {
      img:'',
	    timestamp: '',
    };
  },
  watch: {
    value(val) {
      if (this.flag) {
        tinyMCE.activeEditor.setContent(val);
      }
      this.flag = true;
    },
    // img() {
    //   if (this.img) {
    //     tinyMCE.activeEditor.insertContent(`<img src="${this.img}" >`);
    //   }
    // },
  },
  created(){
	  this.timestamp = Date.parse(new Date());
    window.addEventListener('beforeunload', e => {
      window.onbeforeunload =null
    });
  },
  mounted() {
    this.tinymceInit();
  },
  methods: {
	  tinymceInit() {
		  var component = this;
		  tinymce.init({
			  selector: `#tinymceId${this.timestamp}`,
			  convert_urls: false, //阻止相对路径
			  language: "zh_CN",
			  hasChange: false,
			  hasInit: false,
			  menubar: false,
			  body_class: "panel-body",
			  object_resizing: false,
			  end_container_on_empty_block: true,
			  powerpaste_word_import: "merge", // 参数可以是propmt, merge, clear
			  powerpaste_html_import: 'merge', // propmt, merge, clear
			  powerpaste_allow_local_images: true,//允许带图片
			  code_dialog_height: 450,
			  code_dialog_width: 1000,
			  advlist_bullet_styles: "square",
			  advlist_number_styles: "default",
			  imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
			  default_link_target: "_blank",
			  fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
			  link_title: false,
			  nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
			  plugins: [
				  "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak powerpaste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
			  ],
			  toolbar: [
				  "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
				  "hr bullist numlist link image charmap preview anchor fontsizeselect fontselect pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
			  ],
			  image_advtab: true,
			  init_instance_callback: (editor) => {
				  if (this.value) {
					  editor.setContent(this.value);
				  }
				  this.hasInit = true;
				  editor.on("NodeChange Change KeyUp SetContent", () => {
					  this.hasChange = true;
					  // this.$emit('input', editor.getContent())
				  });
			  },
			  setup: function(editor) {
				  editor.on("input undo redo execCommand blur", function(e) {
					  component.flag = false;
					  component.$emit("input", editor.getContent());
				  });
			  },
		  });
    },
    // setContent(value) {
    //   window.tinymce.get(this.tinymceId).setContent(value);
    //   console.log(value)
    // },
    // getContent() {
    //   window.tinymce.get(this.tinymceId).getContent();
    // },
    // destroyTinymce() {
    //   const tinymce = window.tinymce.get(this.tinymceId);
    //   if (this.fullscreen) {
    //     tinymce.execCommand("mceFullScreen");
    //   }
    //
    //   if (tinymce) {
    //     tinymce.destroy();
    //   }
    // },
    openUpload() {
      this.$refs.imageUpload.show('');
    },
    sureImg(imgUrl) {
      // this.$emit("input", imgUrl);
      //测试的
      // this.img = "https://dev4.yunzmall.com/attachment/image/18ff363d9e8f942b9627e05bf7c9386c.jpg";
      this.img = "";
      this.img = imgUrl;
      if(this.img) {
        tinyMCE.activeEditor.insertContent(`<img src="${this.img}" >`);
      }
    },
    deleteImg() {
      // this.$emit("input", "");
      this.thumbnail_url = "";
    },
  },

};
</script>
<style lang="less" scoped>
.choose-img {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 3px;
  border: dashed 1px #e2e2e2;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
  color: #5e5e5e;
  cursor: pointer;
  i {
    height: 28px;
  }
}
.choose-img:hover,
.show-img:hover {
  color: #29ba9c;
  border-color: #29ba9c;
}

.show-img {
  position: relative;
  width: 240px;
  margin: 0 auto;
  border: dashed 1px #e2e2e2;
  cursor: pointer;
  img {
    width: 100%;
  }
  .icon-close11 {
    position: absolute;
    top: -10px;
    right: -7px;
    color: #999;
    font-size: 18px;
  }
}

.tips {
  margin-top: 15px;
  color: #b4b4b4;
}

.icon-box {
  position: absolute;
  z-index: 10;
  right: 25px;
  top: 68px;
  cursor: pointer;
  .icon-ht_btn_editsend {
    font-size: 20px;
  }
}
</style>
