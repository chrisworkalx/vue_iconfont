 <template>
  <el-dialog title="批量导入" :visible.sync="importDialog" width="30%">
    <div class="importDialog-content">
      <el-upload ref="upload" :limit="1"
        :auto-upload="false"
       
        drag
        :http-request="uploadFile"
        accept='.xls,.xlsx'
        action="customize">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <span class="template-download">
        <i class="el-icon-download"></i>格式模板下载：data.xlsx
      </span>
      <el-button @click="importDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确定上传</el-button>
    </span>
  </el-dialog>
</template>
 <script>
 export default {
     data () {
         return {

         }
     },
    methods: {
        // 确认上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传
    uploadFile(params) {
      console.log("uploadFile", params);

      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;

      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);

      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }

      // 发起请求
      RequestUploads(formData).then(res => {
        console.log("_RequestUploads_", res);
        if (code === 2000) {
          this.$message({
            type: "success",
            message: res.msg
          });

          // 隐藏弹出框
          this.importDialog = false;
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    }
    }
 }
 </script>