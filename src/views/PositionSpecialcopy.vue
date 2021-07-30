<template>
    <div>
      <search></search>
      <discolor-btn class="discolorbtn" typeStyle="middle" @click.native="handleIsShowParentSpecial('add')">添加特体</discolor-btn>
       <div class="public-row bottom-info">
      <el-card class='card'>
        <div class="title">特体部位管理</div>
        <el-row class="row-item" v-for="(item, index) in tableData.items" :key="index">
          <el-col :span="23">
            <div class="title-name">特体名称：{{item.name}}</div>
            <div class="discription" v-for="(only, index) in item.list" :key="index">
              <span class="discription-item">{{only.name}}选项：</span>
              <span class="discription-item" v-for="(the, index) in only.list" :key="index">{{the.name}}</span>
              <i class="el-icon-setting" @click="handleIsShowSonSpecial(only)"></i>
            </div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-edit" @click="handleIsShowParentSpecial('edit', item)"></i>
            &nbsp;
            &nbsp;
            <i class="el-icon-delete" @click="handleDeleteParent(item)"></i>
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
      </el-card>
    </div>

    <!-- 添加特体 -->
    <el-dialog
      title="添加特体"
      :visible="isShowParentSpecial !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-heng">
        <div class="public-left">特体名称：</div>
        <div class="public-row__align public-center">
          <div class="input-item" v-for="(item, index) in addParentParams.specialOptionName" :key="index">
            <el-input clear="" v-model.trim="addParentParams.specialOptionName[index]" clearable></el-input>
            <i class="el-icon-error" @click="addParentParams.specialOptionName.splice(index, 1)" v-if="index !== 0"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su" @click.native="addParentParams.specialOptionName.push('')">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowParentSpecial = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 选项 -->
    <el-dialog
      title="特体选项"
      :visible="isShowSonSpecial !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-row">
        <span>特体名称：</span>
        <!-- <el-input class="input-name" v-model="addParentParams.name"></el-input> -->
        <span>{{editSonParams.name}}</span>
      </div>
      <br/>
      <br/>
      <div class="public-heng">
        <div class="public-left">{{editSonParams.name}}选项：</div>
        <div class="public-row__align public-center">
          <div class="input-item" v-for="(item, index) in editSonParams.list" :key="index">
            <el-input placeHolder="请选择" clear="" v-model.trim="editSonParams.list[index].name" :value="item.name"></el-input>
            <!-- <el-input clear="" :value="item.name"></el-input> -->
            <i class="el-icon-error" @click="editSonParams.list.splice(index, 1)" v-if="index !== 0"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su" @click.native="editSonParams.list.push({name: ''})">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSonSpecial = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSon">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import ShadowBox from '../components/ShadowBox.vue'
import Search from '../components/Search.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Btn from '../components/Btn.vue'
import {Input, Dialog, Button, Col, Card, Row} from 'element-ui'
export default {
  components: {
    ShadowBox,
    Search,
    DiscolorBtn,
    Btn,
    ElDialog: Dialog,
    ElInput: Input,
    ElButton: Button,
    ElCol: Col,
    ElCard: Card,
    ElRow: Row
  },
  data () {
    return {
      isShowSonSpecial: 'none', // add edit none
      isShowParentSpecial: 'none', // add edit none
      params: {
        currentPage: 1,
        pageSize: 10,
        name: '',
        status: 0,
        specialOptionName: ''
      },

      addParentParams: {
        name: '',
        status: 0,
        specialOptionName: ['']
      },

      editSonParams: {
        id: '',
        name: '',
        list: []
      },

      tableData: {},
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
        specialOptionName: this.params.specialOptionName
      })
      this._getList()
    },

    // 显示子集
    handleIsShowSonSpecial (e) {
      let data = JSON.parse(JSON.stringify(e))
      this.isShowSonSpecial = 'add'
      this.editSonParams.id = data.id
      this.editSonParams.name = data.name
      if (data.list.length === 0) {
        data.list.push({
          name: '无选项'
        })
      }
      this.editSonParams.list = data.list
    },

    // 编辑子集
    handleSubmitSon () {
      if (this.editSonParams.list.length === 0 || !this.editSonParams.list.every(item => item.name)) {
        this.$message.error('选项不能为空')
        return
      }
      if (this.editSonParams.list.length > 1) {
        let isRepeat = false
        this.editSonParams.list.forEach((item, idx) => {
          this.editSonParams.list.forEach((item1, idx1) => {
            if (item.name === item1.name && idx !== idx1) {
              isRepeat = true
            }
          })
        })
        if (isRepeat) {
          return this.$message({
            type: 'warning',
            message: '选项不能重复'
          })
        }
      }
      this.$http.post(this.$apis.api_specialBodily_subsetUpdate, {
        parentId: this.editSonParams.id,
        name: this.editSonParams.list.map(item => item.name).join('/'),
        specialOptionName: this.editSonParams.list.map(item => item.name).join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowSonSpecial = 'none'
        this._getList()
      })
    },

    // 提交添加父级
    handleSubmit () {
      if (this.addParentParams.specialOptionName.length === 0 || !this.addParentParams.specialOptionName.every(item => item)) {
        this.$message.error('选项不能为空')
        return
      }
      // 禁止使用/字符
      const reg = this.addParentParams.specialOptionName.some((item, index) => {
        if (item.search('/') !== -1) {
          this.$message({
            type: 'warning',
            message: '不能使用特殊字符"/"'
          })
          return true
        }
      })
      if (reg) {
        return false
      }
      // 名称不能重复
      let isRepeat = this.checkRepeat()
      if (isRepeat) {
        return false
      }
      if (this.isShowParentSpecial === 'add') {
        this._addParent()
      } else {
        this._editParent()
      }
    },
    // 检查是否重复名称
    checkRepeat () {
      if (this.addParentParams.specialOptionName.length !== new Set(this.addParentParams.specialOptionName).size) {
        this.$message({
          type: 'warning',
          message: '特体名称不能重复'
        })
        return true
      }
      return this.tableAllData.some(item => {
        if (item.specialOptionName === this.addParentParams.specialOptionName.join('/') && item.id !== this.addParentParams.id) {
          this.$message({
            type: 'warning',
            message: '特体名称不能重复'
          })
          return true
        }
      })
    },
    // 添加父级
    _addParent () {
      this.$http.post(this.$apis.api_specialBodily_save, {
        status: 0,
        name: this.addParentParams.specialOptionName.join('/'),
        specialOptionName: this.addParentParams.specialOptionName.join(',')
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
        name: this.addParentParams.specialOptionName.join('/'),
        specialOptionName: this.addParentParams.specialOptionName.join(',')
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
      this.$confirm('此操作将会删除特体, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteParent(data)
      }).catch(() => {})
    },

    // 删除
    _deleteParent (data) {
      this.$http.post(this.$apis.api_specialBodily_update, {
        status: 2,
        id: data.id
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
          specialOptionName: ['']
        }
      } else {
        this.addParentParams.specialOptionName = data.specialOptionName.split('/')
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
        specialOptionName: '',
        ...data
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_specialBodily_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },

    // 获取所有列表数据
    async getAllList () {
      try {
        const res = await this.$http.post(this.$apis.api_specialBodily_list, {})
        this.tableAllData = res.result.items
      } catch (error) {
        console.log(error)
      }
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e,
        specialOptionName: this.params.specialOptionName
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e,
        specialOptionName: this.params.specialOptionName
      })
      this._getList()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.discolorbtn {
  position: absolute;
  top: 30px;
  right: 300px;
}
.card{
  border-radius: 30px;
  width: 100%;
  min-height: 700px;
}
.public-row .bottom-info{
    display:flex;
}
  .Shadow-box,
  .bottom-info{
    flex: 1;
  }
  .input-name{
    flex: 1;
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
    .discription-item{
      margin-right: 30px;
    }
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
</style>
