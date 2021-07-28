<template>
  <div class="container">
    <search @search="search" class="search"></search>
    <el-card class="box-card left_card">
      <div class="add">
        <span class="el-icon-circle-plus-outline"></span>
      </div>
      <div>
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="text">{{ node.label }}</span>
            <span>
              1
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
    <el-card class="box-card right_card">
      2
    </el-card>
  </div>
</template>

<script>
import Search from '@/components/Search'
import {
  Card,
  Tree,
  Button
} from 'element-ui'
export default {
  name: 'Single',
  components: {
    Search,
    ElCard: Card,
    ElTree: Tree,
    ElButton: Button
  },
  data () {
    return {
      data: [{
        label: '一级 1',
        id: 0,
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    search () {

    }

  }
}
</script>

<style lang="scss" scoped>
$color1:rgba(77, 77, 77, 1);
.container {
  display: flex;
  justify-content: space-between;
}
// /deep/.search {
//   position: absolute;
//   top: 30px;
//   left: 330px;
// }
.box-card {
  border-radius: 30px;

}
.left_card {
  box-sizing: border-box;
  margin-right: 30px;
  width: 300px;
}
.right_card {
  flex: 1;
}
.add {
  text-align: right;
  font-size: 24px;
  color:$color1;
}
.el-icon-circle-plus-outline {
  cursor: pointer;
}
.text {
  color: blue;
}
</style>
