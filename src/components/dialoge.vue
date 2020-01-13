<template>
      <el-dialog title="提示" :visible.sync="isShowDialog" width="30%" center
       :before-close="hideData"
       @close="readyClose"
      >
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>


<script>
export default {
  data() {
    return {};
  },
  props :{
        isShowDialog:{
          type:Boolean,
          default:false,
        },
      },
  methods:{
      readyClose() {
          this.$emit('done')
      },
        hideData() {
          this.$emit("hideDialog")
        },
        confirm(){
          this.hideData();
        },
        cancel(){
          this.hideData();
        }
      }
};
</script>