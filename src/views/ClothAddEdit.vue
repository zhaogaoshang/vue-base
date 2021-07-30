<template>
  <div class="public-column store-page">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <user>
        <div class="public-row__align">
          <div class="public-miaobao-left">面料管理 </div>
          <div class="public-mianbao-middle"> > </div>
          <div class="public-mianbao-right"> 编辑面料 </div>
          <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
        </div>
      </user>
      <shadow-box>
        <div class="title">编辑面料</div>
        <el-row>
          <el-col :span="16" class="middle-box">
            <div class="middle-box">
              <el-form-item label="面料图片：" class="photoPath">

                <el-upload
                  class="upload-demo"
                  :action="$apis.photoHost+$apis.api_upload_shopByPhoto"
                  name="imgUpload"
                  multiple
                  :data="upData"
                  :show-file-list="false"
                  :on-success="photoSuccess"
                >
                  <btn typeStyle="su" >上传</btn>
                </el-upload>
                &nbsp;
                &nbsp;
                &nbsp;
                <span class="ticp">温馨提示：图片建议尺寸：800*800px,图片格式为JPG.</span>
              </el-form-item>
            </div>
            <div class="middle-box">
              <el-form-item label="" class="img_content">
                <div class="img_box" v-for="(url,index) in photoList" :key="url">
                  <el-image  :src="url" class="list_img" ></el-image>
                  <i class="el-icon-error close_img" @click="removePhoto(index)"></i>
                </div>
              </el-form-item>
            </div>
            <div class="middle-box">
              <el-form-item label="材质球：">
                <btn typeStyle="su" @click.native="handleShowDialog('上传材质球')">编辑</btn>
              </el-form-item>
            </div>
            <div class="middle-box">
              <el-form-item label="" class="img_content">
                <div class="img_box" v-for="url in modelList" :key="url" :src="url">
                  <el-image  class="list_img" :src="url"></el-image>
                </div>
              </el-form-item>
            </div>
            <div class="middle-box">
              <el-form-item label="材质球配置文件：" class="photoPath modelConfig">

                <el-upload
                  class="upload-demo"
                  :action="$apis.photoHost+$apis.api_upload_shopByPhoto"
                  name="imgUpload"
                  multiple
                  :data="upData"
                  :show-file-list="false"
                  :on-success="modelConfigSuccess"
                >
                  <span class="upstatus" @click="stopProp" v-show="this.ruleForm.modelConfigFilePath">已上传</span>
                  <span class="upstatus" @click="stopProp" v-show="!this.ruleForm.modelConfigFilePath">未上传</span>
                  <btn typeStyle="su" >上传</btn>
                </el-upload>
                &nbsp;
                &nbsp;
                &nbsp;
                <span class="ticp">温馨提示：图片建议尺寸：文件格式为text或json.</span>
              </el-form-item>
            </div>
            <div class="public-row__align">
              <el-form-item label="面料货号：" prop="materialArticleNumber">
                <el-input v-model="ruleForm.materialArticleNumber"></el-input>
              </el-form-item>
              <el-form-item label="面料编号：" prop="materialNo">
                <el-input v-model="ruleForm.materialNo"></el-input>
              </el-form-item>
            </div>

            <div class="public-row__align">
              <el-form-item label="面料品牌：" prop="brandUuid">
                <el-select v-model="ruleForm.brandUuid" placeholder="面料品牌" @change="handlePickCloth">
                  <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in brandList.items" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面料名称：" prop="name">
                <el-select v-model="ruleForm.name" placeholder="面料名称">
                  <el-option :label="item.name" :value="item.name" v-for="(item, index) in brandName" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面料册：" prop="materialVolume">
                <el-input v-model="ruleForm.materialVolume"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="面料成分：" prop="materialComponent">
              <el-input v-model="ruleForm.materialComponent"></el-input>
            </el-form-item>

            <el-form-item label="面料属性：" prop="attributeUuid">
              <el-select v-model="ruleForm.attributeUuid" placeholder="属性">
                <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in attributeList.items" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料颜色：" prop="colourUuid">
              <el-select v-model="ruleForm.colourUuid" placeholder="请选择活动区域">
                <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in colorList.items" :key="index"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="面料产地：" prop="materialOrigin">
              <el-input v-model="ruleForm.materialOrigin"></el-input>
            </el-form-item>

            <div class="public-row__align">
              <el-form-item label="面料价格：" prop="materialPrice">
                <el-input v-model="ruleForm.materialPrice" type="number"></el-input>
              </el-form-item>
              &nbsp;
              &nbsp;
              <span>元/m</span>
            </div>

            <el-form-item label="面料幅度：" prop="materialRange">
              <el-input v-model="ruleForm.materialRange" type="number"></el-input>
            </el-form-item>

            <el-form-item label="面料纱支：" prop="materialYarn">
              <el-input v-model="ruleForm.materialYarn" type="number"></el-input>
            </el-form-item>

            <div class="public-row__align">
              <el-form-item label="面料克重：" prop="materialGramWeight">
                <el-input v-model="ruleForm.materialGramWeight" type="number"></el-input>
              </el-form-item>
              &nbsp;
              &nbsp;
              <!-- <span>g/m</span> -->
            </div>

            <el-form-item label="洗涤说明：">
              <el-input v-model="ruleForm.washExplain" type="textarea" :rows="2"></el-input>
            </el-form-item>

            <div>
              <div class="category-shiyong">适用品类</div>
              <el-form-item label="单品：" prop="type">
                <el-checkbox @change="hCheckAll($event,'singleList')" v-model="checkAll_singleList">全选</el-checkbox>
                <el-checkbox-group v-model="activeSingleList" @change="listChange('singleList')">
                  <el-checkbox :label="item.uuid" v-for="(item, index) in categoty.singleList" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="套装：" prop="type">
                <el-checkbox @change="hCheckAll($event,'suitList')" v-model="checkAll_suitList">全选</el-checkbox>
                <el-checkbox-group @change="listChange('suitList')" v-model="activeSuitList">
                  <el-checkbox :label="item.uuid" v-for="(item, index) in categoty.suitList" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="public-row__center">
          <discolor-btn typeStyle="middle" @click.native="submitForm('ruleForm')">保存</discolor-btn>
          &nbsp;
        </div>
        <center-dialog :modalClose="false" :showClose="true" :dialogVisible.sync="dialogVisible" :title="title" >
          <drop-upload class="dropBox" :api="$apis.api_upload_shopByPhoto" :idata="{typeName: 'introduce'}" @success="imgUploadSuccess" :fileList.sync="dropFileList">
            <div class="el-upload__text upload__text" slot="text">请拖拽需要上传的材质球贴图6张</div>
          </drop-upload>
          <div class="dialog_footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </center-dialog>
        <!-- <center-dialog :modalClose="false" :showClose="true" :dialogVisible.sync="dialogVisible" :title="title" >
          <drop-upload class="dropBox" :api="$apis.api_upload_shopByPhoto" :idata="{typeName: 'introduce'}" @success="imgUploadSuccess" :fileList.sync="fileList">
            <div class="el-upload__text upload__text" slot="text">请拖拽需要上传的材质球贴图6张</div>
          </drop-upload>
          <div class="dialog_footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </center-dialog> -->
      </shadow-box>
    </el-form>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import FUpload from '../components/FUpload.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
import DropUpload from '@/components/DropUpload'
import CenterDialog from '@/components/CenterDialog'
export default {
  components: { User, ShadowBox, DiscolorBtn, Btn, FUpload, DropUpload, CenterDialog },
  data () {
    return {
      ruleForm: {
        id: '', // 主键id
        photoPath: '', // 图片路径
        materialArticleNumber: '', // 面料货号
        materialNo: '', // 面料编号
        brandId: '', // 品牌id
        brandUuid: '', // 品牌uuid
        brandParentId: '', // 品牌父id
        materialComponent: '', // 面料成分
        attributeId: '', // 属性id
        attributeUuid: '', // 属性id
        colourId: '', // 颜色id
        colourUuid: '', // 颜色id
        materialOrigin: '', // 面料产地
        materialPrice: '', // 面料价格
        discountId: '', // 优惠id
        materialRange: '', // 面料幅度
        materialYarn: '', // 面料砂支
        materialGramWeight: '', // 面料克重
        washExplain: '', // 洗涤说明
        modelPath: '', // 模型路径
        materialCoverName: '', // 面料封面名称
        materialCoverPath: '', // 面料封面图
        materialDetailName: '', // 面料详情名称
        materialDetailPath: '', // 面料详情图
        materialIntroducePath: '', // 面料介绍图
        status: 0, // 0可用1禁用2删除
        name: '', // 面料名称
        materialVolume: '', // 面料册
        modelConfigFilePath: ''
      },

      // 分类列表
      categoty: {
        singleList: [], // 单品
        suitList: [] // 套装
      },
      activeSingleList: [], // 选中的单品
      activeSuitList: [], // 选中的套装

      checkAll_singleList: false,
      checkAll_suitList: false,

      // 面料品牌
      brandList: {
        items: []
      },
      brandName: [], // 面料名称选项
      attributeList: {}, // 面料属性
      colorList: {}, // 面料颜色

      rules: {
        // 面料货号
        materialArticleNumber: [
          { required: true, message: '面料货号', trigger: 'blur' }
        ],
        // 面料编号
        // materialNo: [
        //   { required: true, message: '面料编号', trigger: 'blur' }
        // ],
        // // 面料品牌
        // brandUuid: [
        //   { required: true, message: '面料品牌', trigger: 'blur' }
        // ],
        // // 面料名称
        // name: [
        //   { required: true, message: '面料名称', trigger: 'blur' }
        // ],
        // // 面料册
        // materialVolume: [
        //   { required: true, message: '面料册', trigger: 'blur' }
        // ],
        // // 面料成分
        // materialComponent: [
        //   { required: true, message: '面料成分', trigger: 'blur' }
        // ],
        // // 面料属性
        // attributeUuid: [
        //   { required: true, message: '面料属性', trigger: 'blur' }
        // ],
        // // 面料颜色
        // colourUuid: [
        //   { required: true, message: '面料颜色', trigger: 'blur' }
        // ],
        // // 面料产地
        // materialOrigin: [
        //   { required: true, message: '面料产地', trigger: 'blur' }
        // ],
        // 面料价格：
        materialPrice: [
          { required: true, message: '面料价格', trigger: 'blur' }
        ]
        // // 面料幅度：
        // materialRange: [
        //   { required: true, message: '面料幅度', trigger: 'blur' }
        // ],
        // // 面料纱支：
        // materialYarn: [
        //   { required: true, message: '面料纱支', trigger: 'blur' }
        // ],
        // // 面料克重：
        // materialGramWeight: [
        //   { required: true, message: '面料克重', trigger: 'blur' }
        // ]
      },
      photoList: [],
      title: '',
      dialogVisible: false,
      dropFileList: [], // 拖拽上传后弹窗内的图片
      modelList: [] // 模型贴图列表
    }
  },
  watch: {
  },
  created () {
    this._getInfo()
  },
  computed: {
    upData () {
      return {
        typeName: 'introduce',
        merchantCode: this.$store.state.user.userInfo.merchantCode,
        superMerchantCode: this.$store.state.user.userInfo.merchantCode
      }
    }
  },
  methods: {
    // 全选框
    hCheckAll (e, listName) {
      let arr = []
      this.categoty[listName].forEach(item => {
        arr.push(item.uuid)
      })
      if (e) {
        if (listName === 'singleList') {
          this.activeSingleList = arr
        } else {
          this.activeSuitList = arr
        }
      } else {
        if (listName === 'singleList') {
          this.activeSingleList = []
        } else {
          this.activeSuitList = []
        }
      }
    },
    // 勾选子选项
    listChange (listName) {
      if (listName === 'singleList') {
        let isAll = this.categoty['singleList'].length === this.activeSingleList.length
        this.checkAll_singleList = isAll
      } else {
        let isAll = this.categoty['suitList'].length === this.activeSuitList.length
        this.checkAll_suitList = isAll
      }
    },
    // 获取分类
    _getCategory () {
      this.$http.post(this.$apis.api_category_categoryList, {}).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.categoty = res.result
        this._handleCategoryActive()
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取详情
    _getInfo () {
      this.ruleForm = {
        ...this.ruleForm,
        ...this.$store.state.cloth.agent
      }
      // 图片填充到图片list 材质球list
      if (this.ruleForm.photoPath) {
        this.photoList = [...this.ruleForm.photoPath.split(',')]
      }
      if (this.ruleForm.modelPath) {
        this.modelList = [...this.ruleForm.modelPath.split(',')]
      }

      this._getBrand()
      this._getColor()
      this._getCategory()
      this._getAttribute()
      // this._handleCategoryActive()
    },

    // 筛选使用的品类
    _handleCategoryActive () {
      let data = JSON.parse(this.ruleForm.categoryJson)
      this.activeSingleList = data.filter(item => item.packageType === 1).map(only => only.uuid)
      this.activeSuitList = data.filter(item => item.packageType === 2).map(only => only.uuid)
      this.listChange('singleList')
      this.listChange('suitList')
    },

    // 退出
    handleSignOut () {
      this.type = 'info'
      this._getInfo()
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.photoList.length <= 0) {
          //   return this.$message({
          //     type: 'warning',
          //     message: '请上传面料图片'
          //   })
          // }
          // if (this.modelList.length < 6) {
          //   return this.$message({
          //     type: 'warning',
          //     message: '请上传材质球'
          //   })
          // }
          // if (!this.ruleForm.modelConfigFilePath) {
          //   return this.$message({
          //     type: 'warning',
          //     message: '请上传材质球配置文件'
          //   })
          // }
          this._handleSubmit()
        } else {
          return false
        }
      })
    },

    //
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 提交表单
    _handleSubmit () {
      // 把photoList和modelList的图片以逗号相隔字符串形式放入ruleForm
      delete this.ruleForm.createTime
      delete this.ruleForm.updateTime
      if (this.photoList.length > 0) {
        this.ruleForm.photoPath = this.photoList.join(',')
      }
      if (this.modelList.length > 0) {
        this.ruleForm.modelPath = this.modelList.join(',')
      }

      let params = JSON.parse(JSON.stringify(this.ruleForm))
      let categoryUuids = [...this.activeSingleList, ...this.activeSuitList]

      // 单品
      let singleList = this.categoty.singleList.filter(item => {
        if (this.activeSingleList.includes(item.uuid)) {
          return item
        }
      })
      // 套装
      let suitList = this.categoty.suitList.filter(item => {
        if (this.activeSuitList.includes(item.uuid)) {
          return item
        }
      })

      this.$http.post(this.$apis.api_material_update, {
        ...params,
        categoryJson: JSON.stringify([...singleList, ...suitList]),
        categoryUuids: categoryUuids.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.go(-1)
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取品牌
    _getBrand () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 1, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.brandList = res.result
        this.handlePickCloth(true)
      })
    },

    // 品牌子集
    handlePickCloth (first = false) {
      if (!first) {
        this.ruleForm.name = ''
      }
      this.brandList.items.forEach(item => {
        if (item.uuid === this.ruleForm.brandUuid) {
          this.brandName = item.configurationList
        }
      })
    },

    // 获取颜色
    _getColor () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 2, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.colorList = res.result
      })
    },

    // 获取属性
    _getAttribute () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 3, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.attributeList = res.result
      })
    },
    // 模型材质球上传成功
    imgUploadSuccess (src) {
      if (this.dropFileList.length === 6) {
        return this.$message({
          type: 'warning',
          message: '最多上传6张'
        })
      }
      if (this.dropFileList.includes(src)) {
        return this.$message({
          type: 'warning',
          message: '不能重复上传'
        })
      }
      this.dropFileList.push(src)
    },
    // 打开拖拽框
    handleShowDialog (title) {
      // 如果已经有上传好的贴图 那么同步到弹窗里
      this.dropFileList = [...this.modelList]
      this.title = title
      this.dialogVisible = true
    },
    cancel () {
      this.dropFileList = []
      this.dialogVisible = false
    },
    confirm () {
      if (this.dropFileList.length < 6) {
        return this.$message({
          type: 'warning',
          message: '必须上传六张材质球贴图'
        })
      }
      this.modelList = [...this.dropFileList]
      this.dialogVisible = false
    },
    // 面料图片上传成功
    photoSuccess (response, file, fileList) {
      console.log('photoPath', response)
      if (this.photoList.includes(response.result)) {
        return this.$message({
          type: 'warning',
          message: '不能重复上传'
        })
      }
      this.photoList.push(response.result)
    },
    removePhoto (index) {
      this.photoList.splice(index, 1)
    },
    modelConfigSuccess (response, file, fileList) {
      console.log(response.result)
      this.ruleForm.modelConfigFilePath = response.result
    },
    stopProp ($event) {
      $event.stopPropagation()
    }
  },
  beforeDestroy () {
    this.$store.commit('cloth/setagent', null)
  }

}
</script>
<style lang="scss" scoped>
.store-page{
  color: #666666;
  flex: 1;
  .Shadow-box{
    flex: 1;
  }
  .applicable-title{
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 30px 40px;
  }
  .middle-box{
    flex: 1;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .store-avatar{
    position:relative;
    height: 40px;
    width: 40px;
    border: 1px solid #999;
    border-radius: 6px;
    margin-right: 10px;
    span{
      font-size: 8px;
      line-height: 18px;
    }
  }
  .bei-zhu{
    width: 400px;
  }
  /deep/ .el-input{
    width: 170px;
  }
  .model-box{
    width: 40px;
    height: 40px;
  }
  .ticp{
    font-size: 14px;
    font-weight: 500;
    color: #0081CC;
  }
  .category-shiyong{
    font-size: 18px;
    font-weight: bold;
    color: #666666;
  }
}
.wh40 {
  width: 52px;
  height: 42px;
  position:relative;
}
.delimg {
  z-index: 9;
  position: absolute;
  top: -9px;
  left: 32px;
  font-size: 18px;
  color: #af092e;
  cursor: pointer;
}
.delimg:hover {
  color:red;
}
.dropBox {

}
.dropBox /deep/.el-upload.el-upload--text {
  width: 100%;
  height: 300px;
}
.dropBox /deep/.el-upload-dragger {
  width: 100%;
  height: 300px;
  border: none;
}
.upload__text {
  margin:auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog_footer {
  display: flex;
  justify-content: center;
  align-items:center;
  padding-top: 20px;
  padding-bottom:20px;
}
.img_box {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  position: relative;
}
/deep/.list_img {
  width: 80px;
  height: 80px;

}
.close_img {
  font-size: 16px;
  color: red;
  position: absolute;
  top: -8px;
  right: -8px;
}
/deep/.photoPath .el-form-item__content {
  display: flex;
}
.img_content /deep/.el-form-item__content {
  display: flex;
  flex-wrap:wrap;
}
.modelConfig /deep/.el-form-item__label{
  width: 140px!important;
}
/deep/.el-upload.el-upload--text {
  display: flex;
  align-items:center;
}
.upstatus {
  display: inline-block;
  width: 55px;
  height: 36px;
  margin-right:12px;
  border-radius: 7px;
  border: 1px solid #cccc;
  cursor: default;
}
</style>
