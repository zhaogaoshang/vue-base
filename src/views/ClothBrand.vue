<template>
  <div class="public-column category">
      <!-- <div class="top">
        <div class="public-miaobao-left">面料管理 </div>
        <div class="public-mianbao-middle"> > </div>
        <div class="public-mianbao-right" v-if="$route.query.type == 1">品牌管理</div>
        <div class="public-mianbao-right" v-if="$route.query.type == 2">颜色管理</div>
        <div class="public-mianbao-right" v-if="$route.query.type == 3">属性管理</div>
        <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
      </div> -->
      <div class="backbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>面料管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query.type == 2">颜色管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query.type == 3">属性管理</el-breadcrumb-item>
        </el-breadcrumb>
        <btn class="back" @click.native="$router.go(-1)">返回上一级</btn>
      </div>

    <div class="public-row bottom-info">
      <shadow-box>
        <div class="public-heng">
          <div>
            <div class="title" v-if="$route.query.type == 1">面料品牌管理</div>
            <div class="title" v-if="$route.query.type == 2">面料颜色管理</div>
            <div class="title" v-if="$route.query.type == 3">面料属性管理</div>
          </div>
          <div class="public-center"></div>
          <div>
            <discolor-btn typeStyle="middle" @click.native="handleIsShowSonSpecial('add')" v-if="$route.query.type == 1">添加品牌</discolor-btn>
            <discolor-btn typeStyle="middle" @click.native="handleIsShowSonSpecial('add')" v-if="$route.query.type == 2">添加颜色</discolor-btn>
            <discolor-btn typeStyle="middle" @click.native="handleIsShowSonSpecial('add')" v-if="$route.query.type == 3">添加属性</discolor-btn>
          </div>
        </div>
        <el-row class="row-item" v-for="(item, index) in tableData.items" :key="index">
          <el-col :span="23">
            <div class="title-name" v-if="$route.query.type == 1">品牌：{{item.name}}</div>
            <div class="title-name" v-if="$route.query.type == 2">颜色：{{item.name}}</div>
            <div class="title-name" v-if="$route.query.type == 3">属性：{{item.name}}</div>
          </el-col>
          <el-col :span="1">
            <!-- <i class="el-icon-edit" @click="handleIsShowParentSpecial('edit', item)"></i> -->
            <i class="el-icon-edit" @click="handleIsShowSonSpecial('edit', item)"></i>
            &nbsp;
            &nbsp;
            <!-- supplyStatus -->
            <i v-if="item.supplyStatus===1" class="el-icon-lock orange" @click="handleTip(item)"></i>
            <i v-else class="el-icon-delete" @click="handleDeleteParent(item)"></i>
          </el-col>
        </el-row>
        <br/>
        <br/>
        <br/>
        <div class="public-row__center" v-if="tableData.items.length === 0">暂无数据</div>
        <br/>
        <br/>
        <br/>
        <div class="public-row__center total-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="params.pageSize"
            layout="prev, pager, next, sizes, total"
            :total="tableData.totalCount">
          </el-pagination>
        </div>
      </shadow-box>
    </div>

    <!-- 选项 -->
    <el-dialog
      :title="$route.query.type == 1?'品牌管理': $route.query.type == 2? '颜色管理':'属性管理'"
      :visible="isShowSonSpecial !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-row__center">
        <span>{{$route.query.type == 1 ? '品牌' : $route.query.type == 2 ? '颜色' : '属性'}}名称：</span>
        <el-input class="input-name" v-model="editSonParams.name"></el-input>
        <!-- <span>{{editSonParams.name}}</span> -->
      </div>
      <br/>
      <br/>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSonSpecial = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import User from '../components/User.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import {Dialog, Button, Input, Pagination, Col, Row, Breadcrumb, BreadcrumbItem} from 'element-ui'

export default {
  components: {
    ShadowBox,
    User,
    Search,
    DiscolorBtn,
    Btn,
    ElDialog: Dialog,
    ElButton: Button,
    ElInput: Input,
    ElPagination: Pagination,
    ElCol: Col,
    ElRow: Row,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem},
  name: 'ClothBrand',
  data () {
    return {
      isShowSonSpecial: 'none', // add edit none
      isShowParentSpecial: 'none', // add edit none
      params: {
        currentPage: 1,
        pageSize: 10,
        name: '',
        status: 0,
        systemName: '',
        type: this.$route.query.type
      },

      addParentParams: {
        name: '',
        status: 0,
        systemName: ['']
      },

      editSonParams: {
        id: '',
        name: '',
        configurationList: [{
          name: ''
        }]
      },

      tableData: {
        items: []
      },
      tableAllData: []
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
    this._initParams()
    this._getList()
    this.getAllList()
  },

  computed: {
  },

  methods: {
    // 搜索
    handleSearch () {
      this._initParams({
        systemName: this.params.systemName
      })
      this._getList()
    },

    // 显示子集
    handleIsShowSonSpecial (e, data) {
      this.isShowSonSpecial = e
      if (e === 'add') {
        this.editSonParams = {
          id: '',
          name: '',
          configurationList: [{
            name: ''
          }]
        }
      } else {
        this.editSonParams = JSON.parse(JSON.stringify(data))
      }
    },

    // 提交
    handleSubmitSon () {
      const isRepeat = this.checkRepeat()
      if (isRepeat) {
        return false
      }
      if (this.isShowSonSpecial === 'add') {
        this._addSub()
      } else {
        this._handleSubmitSon()
      }
    },

    // 检查名称是否重复
    checkRepeat () {
      return this.tableAllData.some(item => {
        if (item.name === this.editSonParams.name) {
          if (item.id !== this.editSonParams.id) {
            this.$message({
              type: 'warning',
              message: '名称不能重复'
            })
            return true
          }
        }
      })
    },

    // 添加
    _addSub () {
      this.$http.post(this.$apis.api_materialConfig_save, {
        type: Number(this.$route.query.type),
        name: this.editSonParams.name,
        systemName: this.editSonParams.configurationList.map(item => item.name).join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowSonSpecial = 'none'
        this._getList()
        this.getAllList()
      })
    },

    // 编辑子集
    _handleSubmitSon () {
      delete this.editSonParams.createTime
      this.$http.post(this.$apis.api_materialConfig_update, {
        name: this.editSonParams.name,
        id: this.editSonParams.id,
        type: Number(this.$route.query.type),
        systemName: this.editSonParams.configurationList.map(item => item.name).join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowSonSpecial = 'none'
        this._getList()
        this.getAllList()
      })
    },

    // 提交添加父级
    handleSubmit () {
      if (this.isShowParentSpecial === 'add') {
        this._addParent()
      } else {
        this._editParent()
      }
    },

    // 添加父级
    _addParent () {
      this.$http.post(this.$apis.api_specialBodily_save, {
        status: 0,
        name: this.addParentParams.systemName.join('/'),
        systemName: this.addParentParams.systemName.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowParentSpecial = 'none'
        this._getList()
        this.getAllList()
      })
    },

    // 提交修改父类
    _editParent () {
      this.$http.post(this.$apis.api_specialBodily_update, {
        status: 0,
        id: this.addParentParams.id,
        name: this.addParentParams.systemName.join('/'),
        systemName: this.addParentParams.systemName.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowParentSpecial = 'none'
        this._getList()
        this.getAllList()
      })
    },

    // 删除父级的特体
    handleDeleteParent (data) {
      this.$confirm('此操作将会删除面料品牌，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteParent(data)
      }).catch(() => {})
    },
    handleTip (item) {
      this.$message(`${item.name}正在被使用，不可删除`)
    },
    // 删除
    _deleteParent (data) {
      this.$http.post(this.$apis.api_materialConfig_update, {
        status: 2,
        id: data.id,
        type: this.$route.query.type
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
        this.getAllList()
      })
    },

    // 是否显示添加父亲
    handleIsShowParentSpecial (e, data) {
      this.isShowParentSpecial = e
      if (e === 'add') {
        this.addParentParams = {
          name: '',
          status: 0,
          systemName: ['']
        }
      } else {
        this.addParentParams.systemName = data.systemName.split('/')
        this.addParentParams.id = data.id
      }
    },

    // 初始化参数
    _initParams (data) {
      this.params = {
        currentPage: 1,
        pageSize: 10,
        name: '',
        status: 0,
        systemName: '',
        type: this.$route.query.type,
        ...data
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_materialConfig_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)

        res.result.items.forEach(element => {
          element.systemName = element.systemName.split(',')
        })

        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },
    async getAllList () {
      try {
        let params = {
          type: this.$route.query.type
        }
        const res = await this.$http.post(this.$apis.api_materialConfig_list, params)
        if (res.code === 'SUCCESS') {
          this.tableAllData = res.result.items
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e
      })
      this._getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  flex: 1;
  .Shadow-box,
  .bottom-info{
    flex: 1;
  }
  .input-name{
    flex: 1;
  }
  .backbox {
  position: fixed;
  top:30px;
  left:330px;
  display: flex;
  align-items: center;
  }
  .back {
  margin-left:24px;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .row-item{
    padding: 20px 0;
    border-bottom: 1px dashed #000000;
    align-items: center;
  }
  .title-name{
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .discription{
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    padding: 14px 0;
  }
  .discription-item{
    margin-right: 10px;
    font-size: 16px;
    font-weight: 500;
  }
//   i{
//     color: $lan;
//     font-size: 16px;
//   }
  .total-box{
    flex: 1;
    align-items: flex-end;
  }
  .input-item{
    position: relative;
    width: 120px;
    height: 33px;
    margin-right: 10px;
    margin-bottom: 20px;
    .el-icon-error{
      position: absolute;
      top: -6px;
      right: -6px;
      color: #CC0026;
    }
  }

  .public-center{
    flex-wrap: wrap;
  }
  .orange {
    color: orangered;
  }
}
</style>
