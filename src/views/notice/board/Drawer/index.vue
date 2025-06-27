<template>
  <!-- 发布 / 编辑公告 -->
  <el-dialog
    v-model="boardStore.boardDrawerSwitch"
    :title="boardStore.boardDrawerTitle"
    width="800"
    align-center
    :before-close="handleClose"
  >
    <el-form :model="board" label-width="auto" style="max-width: 600px">
      <el-form-item label="公告主题">
        <el-input v-model="board.title" placeholder="请输入公告主题" />
      </el-form-item>
      <el-form-item label="消息类别">
        <el-input v-model="board.category" placeholder="请输入消息类别" />
      </el-form-item>
      <el-form-item label="发布部门">
        <el-select v-model="board.department" placeholder="请选择发布部门">
          <el-option
            v-for="item in deptOpts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="board.title" placeholder="请输入发布人" />
      </el-form-item>
      <el-form-item label="接收部门">
        <el-select v-model="board.target" placeholder="请选择接收部门">
          <el-option
            v-for="item in deptOpts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="公告等级">
        <el-select v-model="board.level" placeholder="请选择公告等级">
          <el-option
            v-for="item in boardLevelOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容">
        <div style="width: 100%; border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 200px; overflow-y: hidden"
            v-model="board.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="boardStore.boardDrawerSwitch = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleConfirm()">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { toRefs, onBeforeUnmount, shallowRef } from 'vue'
import { ElMessageBox } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import type { IEditorConfig } from '@wangeditor/editor/dist/types/esm/config/index.d.ts'
import useBoardStore from '@/store/modules/board'
const boardStore = useBoardStore()
import { deptOpts, boardLevelOpts } from '@/shared/constants/options'
// 表单数据
const { board } = toRefs(boardStore)
// 确定按钮
const handleConfirm = () => {
  boardStore.boardDrawerSwitch = false
}
// 取消按钮
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要取消编辑吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// 富文本编辑器
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  toolbarKeys: [
    'headerSelect',
    '|',
    'bold',
    'italic',
    'color',
    'justifyLeft',
    'justifyRight',
    'justifyCenter',
    'bulletedList',
    'numberedList',
    'todo',
    'redo',
    'undo',
  ],
}
const editorConfig = {
  placeholder: '请输入内容...',
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const mode = 'default' // 或 'simple'
</script>

<style scoped lang="scss"></style>
