<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：index.vue
  - 创建日期：2021/1/24 下午12:48
  - 创建作者：Jaxson
  -->

<template>
  <div ref="tagsViewContainerRef" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :ref="tagHandleNodes"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.path,
          query: tag.query,
          fullPath: tag.fullPath
        }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag.value)">重新加载</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag.value)">关闭当前</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag.value)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
import { defineComponent, ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ScrollPane from './ScrollPane'

export default defineComponent({
  name: 'TagsView',
  components: {
    ScrollPane
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const visible = ref(false)
    const top = ref(0)
    const left = ref(0)
    const tagsViewContainerRef = ref(null)
    const scrollPaneRef = ref(null)
    const selectedTag = reactive({})
    const affixTags = reactive([])
    const visitedViews = computed(() => store.state.tagsView.visitedViews)
    const routes = computed(() => router.options.routes)

    let tagArrNodes = reactive([])

    const isActive = $route => $route.path === route.path
    const isAffix = tag => tag && tag.meta && tag.meta.affix
    const filterAffixTags = (routes, basePath = '/') => {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }
    const initTags = () => {
      const affixTagsArr = affixTags.value = filterAffixTags(routes.value)
      for (const tag of affixTagsArr) {
        // Must have tag name
        if (tag.name) {
          store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    }
    const addTags = to => {
      const { name } = to
      if (name) {
        store.dispatch('tagsView/addView', to)
      }
      return false
    }
    const moveToCurrentTag = to => {
      for (const tag of tagArrNodes) {
        if (tag.to.path === to.path) {
          scrollPaneRef.value.moveToTarget(tag)
          // when query is different then update
          if (tag.to.fullPath !== to.fullPath) {
            store.dispatch('tagsView/updateVisitedView', to)
          }
          break
        }
      }
    }
    const tagHandleNodes = tag => tagArrNodes.push(tag)
    const refreshSelectedTag = view => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }
    const closeSelectedTag = view => {
      store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }
    const closeOthersTags = () => {
      router.push(selectedTag)
      store.dispatch('tagsView/delOthersViews', selectedTag).then(() => {
        moveToCurrentTag(route)
      })
    }
    const closeAllTags = view => {
      store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (affixTags.some(tag => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }
    const openMenu = (tag, event) => {
      const menuMinWidth = 105
      const offsetLeft = tagsViewContainerRef.value.getBoundingClientRect().left // container margin left
      const offsetWidth = tagsViewContainerRef.value.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const leftEl = event.clientX - offsetLeft + 15 // 15: margin right

      if (leftEl > maxLeft) {
        left.value = maxLeft
      } else {
        left.value = leftEl
      }

      top.value = event.clientY
      visible.value = true
      selectedTag.value = tag
    }
    const closeMenu = () => {
      visible.value = false
    }
    const handleScroll = () => {
      closeMenu()
    }

    watch(() => visible.value, value => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })
    // 监听路由回调
    watch(() => route.path, () => {
      // 清空 tag ref 数组对象
      tagArrNodes = []
      addTags(route)
      moveToCurrentTag(route)
    })

    onMounted(() => {
      initTags()
      addTags(route)
    })

    return {
      visitedViews,
      visible,
      left,
      top,
      selectedTag,
      scrollPaneRef,
      tagArrNodes,
      tagsViewContainerRef,
      tagHandleNodes,
      handleScroll,
      isAffix,
      isActive,
      openMenu,
      closeSelectedTag,
      refreshSelectedTag,
      closeOthersTags,
      closeAllTags
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.tags-view-container {
  height: 40px;
  width: 100%;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: $colorPrimary;
        color: #fff;
        border-color: $colorPrimary;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 280ms cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
