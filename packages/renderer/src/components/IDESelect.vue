<template>
  <el-space>
    <img v-for="ide in ides"
         @click.stop="onSelect(ide.type)"
         @mouseover="hoverType=ide.type"
         @mouseleave="hoverType=''"
         :key="ide.type"
         :class="['icon',selectType===ide.type ? 'icon-select':'']"
         :src="ide.icon"/>
  </el-space>
</template>

<script>
import {Tools} from "../Constant";

export default {
  name: "IDESelect",
  props: {
    defaultSelected: String,
    onChange: Function
  },
  data: function () {
    return {
      ides: [
        {type: Tools.AndroidStudio, icon: require('../assets/icon_android_studio.png')},
        {type: Tools.VSCode, icon: require('../assets/icon_vscode.png')},
        {type: Tools.IDEA, icon: require('../assets/icon_idea.png')},
        {type: Tools.Finder, icon: require('../assets/icon_finder.png')},
        {type: Tools.Terminal, icon: require('../assets/icon_iterm2.png')}
      ],
      selectType: this.defaultSelected || Tools.Terminal,
      hoverType: ''
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
      this.onChange(type)
    }
  }
}
</script>

<style scoped>
.icon {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 2px;
}

.icon-select {
  background: #e8e8e8;
  border: 2px solid #e5e5e5;
}

.icon:hover {
  background: #e8e8e8;
  border: 2px solid #e5e5e5;
}

</style>