<template>
  <el-card class="card-admin">
    <Admin></Admin>
  </el-card>
  <el-card class="card-data">
    <Data></Data>
  </el-card>
  <el-row class="card-groups" gutter="15">
    <el-col class="group-item" :md="24" :lg="14">
      <el-card class="item-content">测试</el-card>
    </el-col>
    <el-col class="group-item" :md="24" :lg="10">
      <el-card class="item-content">
        <template #header>项目动态</template>
        <div>
          <img
            style="width: 550px"
            src="../../../../public/pie-padAngle.png"
            alt=""
          />
        </div>
      </el-card>
    </el-col>
    <el-col class="group-item" :md="24" :lg="14">
      <el-card class="item-content">
        <template #header>
          <div class="pro-header">
            <span>项目动态</span>
            <el-link type="primary">更多动态</el-link>
          </div>
        </template>
        <el-timeline style="max-width: 600px">
          <el-timeline-item center timestamp="2018/4/2" placement="top">
            <div class="pro-content">
              <el-avatar
                :size="50"
                src="../../../../public/soybean-JC38yUrs.png"
              />
              <h4 class="pro-msg">
                UpdSoybean 在2021年5月28日创建了开源项目 soybean-admin!
              </h4>
            </div>
          </el-timeline-item>
          <el-timeline-item center timestamp="2018/4/2" placement="top">
            <div class="pro-content">
              <el-avatar
                :size="50"
                src="../../../../public/soybean-JC38yUrs.png"
              />
              <h4 class="pro-msg">
                Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。
              </h4>
            </div>
          </el-timeline-item>
          <el-timeline-item center timestamp="2018/4/2" placement="top">
            <div class="pro-content">
              <el-avatar
                :size="50"
                src="../../../../public/soybean-JC38yUrs.png"
              />
              <h4 class="pro-msg">
                Soybean 准备为 soybean-admin 的发布做充分的准备工作!
              </h4>
            </div>
          </el-timeline-item>
          <el-timeline-item center timestamp="2018/4/2" placement="top">
            <div class="pro-content">
              <el-avatar
                :size="50"
                src="../../../../public/soybean-JC38yUrs.png"
              />
              <h4 class="pro-msg">
                Soybean 正在忙于为soybean-admin写项目说明文档！
              </h4>
            </div>
          </el-timeline-item>
          <el-timeline-item center timestamp="2018/4/2" placement="top">
            <div class="pro-content">
              <el-avatar
                :size="50"
                src="../../../../public/soybean-JC38yUrs.png"
              />
              <h4 class="pro-msg">
                Soybean 刚才把工作台页面随便写了一些，凑合能看了！
              </h4>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col class="group-item" :md="24" :lg="10">
      <el-card class="item-content">
        <template #header>创意</template>
        测试
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import Admin from './admin/index.vue'
import Data from './data/index.vue'
</script>

<style scoped lang="scss">
.card-admin {
  border-radius: $home-border-radius;
  margin-bottom: 15px;

  .admin-content {
    display: flex;
    justify-content: space-between;

    .card-admin-left {
      height: 100%;
      display: flex;
      align-items: center;

      .left-item {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .left-title {
          font-size: 18px;
          font-weight: 600;
        }

        .left-subtitle {
          font-size: 16px;
          color: lightslategray;
          margin-top: 10px;
        }
      }
    }

    .card-admin-right {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .right-item-title {
        font-size: 15px;
        height: 20px;
        text-align: center;
      }

      .right-item-content {
        font-size: 25px;
        line-height: 40px;
        height: 40px;
        text-align: center;
      }
    }
  }
}
.card-data {
  margin-bottom: 15px;
  border-radius: $home-border-radius;
  .data-content {
    .data-item {
      height: 100px;
      color: white;
      border-radius: $home-border-radius;
      background-color: aqua;
      margin: 7.5px 0;

      .data-item-title {
        font-size: 15px;
        line-height: 20px;
        padding: 10px 0 10px 10px;
      }

      .data-item-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 10px 10px;

        .data-item-content {
          font-size: 30px;
          margin: 10px 10px 0 10px;
        }
      }
    }
  }
}

.card-groups {
  border-radius: $home-border-radius;

  .group-item {
    padding-bottom: 15px;

    .item-content {
      height: 550px;
      border-radius: $home-border-radius;
      padding: 15px;

      .pro-header {
        display: flex;
        justify-content: space-between;

        .el-link {
          font-size: 15px;
        }
      }

      .pro-content {
        display: flex;
        align-items: center;

        .pro-msg {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
