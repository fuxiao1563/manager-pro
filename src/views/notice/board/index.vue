<template>
  <el-card>
    <template #header>
      <div>
        <span>公告栏</span>
      </div>
    </template>
    <div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <el-select
            v-model="value"
            placeholder="选择接收部门进行筛选"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
          <el-radio-group v-model="form.resource" style="margin: 0 0 30px 50px">
            <el-radio
              v-for="item in ['所有', '一般', '重要', '必要']"
              :key="item"
              :value="item"
            >
              {{ item }}
            </el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-button type="primary" plain @click="totaldialogVisible = true">
            全部公告
          </el-button>
          <el-button type="primary" @click="dialogVisible = true">
            发布公告
          </el-button>
        </div>
      </div>

      <el-table
        ref="multipleTableRef"
        :data="boardInfoList"
        stripe
        border
        row-key="_id"
        @selection-change=""
        style="width: 100%"
      >
        <!-- 选择框 -->
        <el-table-column fixed type="selection" width="40" />
        <!-- 序号 -->
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="60"
          align="center"
        />
        <!-- 公告主题 -->
        <el-table-column
          fixed
          prop="title"
          label="公告主题"
          min-width="200"
          align="center"
        />
        <!-- 公告类别 -->
        <el-table-column
          prop="classes"
          label="公告类别"
          min-width="100"
          align="center"
        />
        <!-- 发布部门 -->
        <el-table-column
          prop="releaseDepartment"
          label="发布部门"
          min-width="100"
          align="center"
        />
        <!-- 发布人 -->
        <el-table-column
          prop="releasePerson"
          label="发布人"
          min-width="80"
          align="center"
        />
        <!-- 接收对象 -->
        <el-table-column
          prop="receiveObject"
          label="接收对象"
          min-width="100"
          align="center"
        />
        <!-- 公告等级 -->
        <el-table-column
          prop="boardLevel"
          label="等级"
          min-width="80"
          align="center"
        >
          <template #default="item">
            <el-tag
              v-if="item.row.boardLevel === '一般'"
              type="primary"
              size="small"
            >
              {{ item.row.boardLevel }}
            </el-tag>
            <el-tag
              v-else-if="item.row.boardLevel === '重要'"
              type="warning"
              size="small"
            >
              {{ item.row.boardLevel }}
            </el-tag>
            <el-tag v-else type="danger" size="small">
              {{ item.row.boardLevel }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 发布时间 -->
        <el-table-column
          prop="releaseTime"
          label="发布时间"
          min-width="120"
          align="center"
        />
        <!-- 最新编辑时间 -->
        <el-table-column
          prop="latestEditeTime"
          label="最新编辑时间"
          min-width="120"
          align="center"
        />
        <!-- 阅读人数 -->
        <el-table-column
          prop="readerNumber"
          label="阅读人数"
          min-width="100"
          align="center"
        />
        <!-- 操作 -->
        <el-table-column
          fixed="right"
          prop="_id"
          label="操作"
          width="150"
          align="center"
        >
          <template #="{ row }">
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="small"
              plain
              @click="dialogVisible = true"
            >
              编辑
            </el-button>
            <!-- 删除 -->
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              title="你确定要删除吗？"
              @confirm=""
            >
              <template #reference>
                <el-button type="danger" size="small" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <!-- 发布 / 编辑公告对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="发布 / 编辑公告"
    width="800"
    :before-close="handleClose"
  >
    <el-form :model="editForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="公告主题">
        <el-input v-model="editForm.title" placeholder="请输入公告主题" />
      </el-form-item>
      <el-form-item label="消息类别">
        <el-input v-model="editForm.classes" placeholder="请输入消息类别" />
      </el-form-item>
      <el-form-item label="发布部门">
        <el-select
          v-model="editForm.releaseDepartment"
          placeholder="请选择发布部门"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="editForm.title" placeholder="请输入发布人" />
      </el-form-item>
      <el-form-item label="接收部门">
        <el-select
          v-model="editForm.releaseDepartment"
          placeholder="请选择接收部门"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="公告等级">
        <el-select v-model="editForm.boardLevel" placeholder="请选择公告等级">
          <el-option
            v-for="item in levelOptions"
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
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 全部公告对话框 -->
  <el-dialog
    v-model="totaldialogVisible"
    title="全部公告"
    width="800"
    center
    :before-close="totalHandleClose"
  >
    <div class="common-layout">
      <el-container>
        <el-aside width="400px">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            highlight-current-row
            @row-click="messageClick"
            :row-style="rowStyle"
          >
            <!-- 序号 -->
            <el-table-column
              fixed
              type="index"
              label=""
              min-width="60"
              align="center"
            />
            <!-- 主题 -->
            <el-table-column
              prop="title"
              label="主题"
              min-width="140"
              align="center"
            />
            <!-- 等级 -->
            <el-table-column
              prop="boardLevel"
              label="等级"
              min-width="80"
              align="center"
            >
              <template #default="item">
                <el-tag
                  v-if="item.row.boardLevel === '一般'"
                  type="primary"
                  size="small"
                >
                  {{ item.row.boardLevel }}
                </el-tag>
                <el-tag
                  v-else-if="item.row.boardLevel === '重要'"
                  type="warning"
                  size="small"
                >
                  {{ item.row.boardLevel }}
                </el-tag>
                <el-tag v-else type="danger" size="small">
                  {{ item.row.boardLevel }}
                </el-tag>
              </template>
            </el-table-column>
            <!-- 发布日期 -->
            <el-table-column
              prop="releaseTime"
              label="发布日期"
              min-width="120"
              align="center"
            />
          </el-table>
        </el-aside>
        <el-main>
          <div v-if="messageInfo.title !== ''">{{ messageInfo.title }}</div>
          <div v-else>请点击列表中的消息进行查看</div>
        </el-main>
      </el-container>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
const tableData = [
  {
    title: '上午开会',
    boardLevel: '一般',
    releaseTime: '2021-01-01',
  },
  {
    title: '中午开会',
    boardLevel: '重要',
    releaseTime: '2021-01-01',
  },
  {
    title: '下午开会',
    boardLevel: '必要',
    releaseTime: '2021-01-01',
  },
]
const messageInfo = ref({
  title: '',
  contant: '',
})
const messageClick = (row: any) => {
  messageInfo.value.title = row.title
}
const totalHandleClose = (done: () => void) => {
  done()
  messageInfo.value.title = ''
  messageInfo.value.contant = ''
}
const rowStyle = (data: { row: any; rowIndex: number }) => {
  if (data.rowIndex === 0) {
    return 'color:#909399;'
  } else {
    return 'font-weight: bold;'
  }
}

const boardInfoList = ref([
  {
    title: '下班后全体开会',
    classes: '公司公告',
    releaseDepartment: '行政部',
    releasePerson: '王总',
    receiveObject: '行政部',
    boardLevel: '重要',
    releaseTime: '2021-01-01',
    latestEditeTime: '2021-01-01',
    readerNumber: '7',
    _id: '1',
  },
  {
    title: '采购会议',
    classes: '公司公告',
    releaseDepartment: '研发部',
    releasePerson: '张三',
    receiveObject: '研发部',
    boardLevel: '一般',
    releaseTime: '2021-01-01',
    latestEditeTime: '2021-01-01',
    readerNumber: '7',
    _id: '1',
  },
  {
    title: '采购会议',
    classes: '公司公告',
    releaseDepartment: '研发部',
    releasePerson: '张三',
    receiveObject: '研发部',
    boardLevel: '必要',
    releaseTime: '2021-01-01',
    latestEditeTime: '2021-01-01',
    readerNumber: '7',
    _id: '1',
  },
])
const value = ref('')
const options = [
  {
    value: '行政部',
    label: '行政部',
  },
  {
    value: '人力资源部',
    label: '人力资源部',
    disabled: true,
  },
  {
    value: '财务部',
    label: '财务部',
  },
  {
    value: '市场部',
    label: '市场部',
  },
  {
    value: '客户服务部',
    label: '客户服务部',
  },
  {
    value: '研发部',
    label: '研发部',
  },
  {
    value: '法务部',
    label: '法务部',
  },
]

const levelOptions = [
  {
    value: '一般',
    label: '一般',
  },
  {
    value: '重要',
    label: '重要',
  },
  {
    value: '必要',
    label: '必要',
  },
]
const form = reactive({
  resource: '',
})

const totaldialogVisible = ref(false)
const dialogVisible = ref(false)
const editForm = reactive({
  title: '',
  classes: '',
  releaseDepartment: '',
  releasePerson: '',
  receiveObject: '',
  boardLevel: '',
  contant: '',
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('<p>hello</p>')
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})
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
  console.log(editor.getAllMenuKeys())
}
const mode = 'default' // 或 'simple'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要取消编辑吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style scoped lang="scss"></style>
