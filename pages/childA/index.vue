<template>
  <div class="childA" v-on="eventsListener">
    <slot name="ptxt"></slot>
    <span class="txt">我是子组件a1</span>
    <button @click="emitClick">触发emit</button>
    <slot name="listA"></slot>
    <!-- <UploadFile :fileList.sync="fileList"/> -->
    <el-upload
      action
      ref="upload"
      :data="sendObj"
      accept="image/jpeg, image/png"
      :on-change="onUploadChange"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过1m</div>
    </el-upload>
    <TableDemo />
  </div>
</template>
<script>
// import UploadFile from "@/components/myupload";
import TableDemo from "@/components/tableDemo";
export default {
  name: "childA",
  data() {
    return {
      msg: "",
      dataUrl: '',
      sendObj: {
          dataUrl: ''
      },
      fileList: [
        {
          url:
            "https://worker.doggadatachina.com/base/fus/files/uAGsD6BOyIIOz0qp0471K7cJ.png",
          contentType: "image/png",
          name: "1540519646.png"
        }
      ]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    onUploadChange(file) {
        const _this = this;
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("只能上传jpg/png图片!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
          _this.sendObj.dataUrl = this.result;
        // console.log(this.result); //图片的base64数据
      };
    },
    emitClick() {
      this.$emit("receive", "who are you?");
    },
    getListenner(response) {
      this.msg = response;
    }
  },
  components: {
    // UploadFile,
    TableDemo
  },
  computed: {
    eventsListener() {
      return Object.assign({}, this.$listeners);
    }
  }
};
</script>
<style scoped>
.txt {
  display: inline-block;
  width: 100px;
  height: 30px;
  background: #ccc;
}
</style>


