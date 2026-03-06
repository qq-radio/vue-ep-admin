<template>
  <el-container class="layout" :class="layoutClass">
    <el-header
      class="layout-header"
      :class="{
        'header-hidden': contentFullscreen || navType === 'vertical',
        'header-horizontal': navType === 'horizontal',
        'header-mixed': navType === 'mixed',
      }"
    >
      <div class="logo-container">
        <slot name="logo"></slot>
      </div>
      <div class="header-menu-container">
        <slot name="header-menu"></slot>
      </div>
      <div class="extra-container">
        <slot name="extra"></slot>
      </div>
    </el-header>
    <el-container class="layout-content-container">
      <el-aside
        v-show="showAside"
        class="layout-aside"
        :class="{
          'aside-vertical': navType === 'vertical',
          'aside-hidden': contentFullscreen || (navType !== 'vertical' && navType !== 'mixed'),
          'aside-mixed': navType === 'mixed',
        }"
        :width="getSidebarWidth"
      >
        <div v-if="navType === 'vertical'" class="vertical-logo">
          <slot name="logo"></slot>
        </div>

        <el-scrollbar class="flex-1">
          <slot name="sidebar-menu"></slot>
        </el-scrollbar>
      </el-aside>
      <el-container
        class="main-container"
        :class="{
          'main-fullscreen': contentFullscreen,
          'main-vertical': navType === 'vertical',
          'main-horizontal': navType === 'horizontal',
        }"
      >
        <el-header
          class="vertical-header"
          :class="{
            hidden: contentFullscreen || navType !== 'vertical',
            'justify-end': !showBreadcrumb,
            'justify-between': showBreadcrumb,
          }"
        >
          <slot v-if="showBreadcrumb" name="breadcrumb"></slot>
          <slot name="extra"></slot>
        </el-header>
        <el-main class="layout-main">
          <slot name="tabbar"></slot>
          <div class="content-scroll">
            <slot name="content"></slot>
          </div>
        </el-main>
        <el-footer v-if="showFooter" class="layout-footer">
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import type { AppNavType } from '#/types/preference'

import { computed } from 'vue'

interface Props {
  navType: AppNavType
  collapsed: boolean
  showAside: boolean
  showBreadcrumb: boolean
  showFooter: boolean
  contentFullscreen: boolean
}

const props = defineProps<Props>()

const getSidebarWidth = computed(() => {
  return props.collapsed ? '66px' : '200px'
})

const layoutClass = computed(() => {
  return {
    'layout-vertical': props.navType === 'vertical',
    'layout-horizontal': props.navType === 'horizontal',
    'layout-mixed': props.navType === 'mixed',
  }
})
</script>

<style scoped lang="scss">
.layout {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.layout-vertical {
    flex-direction: row;

    .layout-content-container {
      width: calc(100% - v-bind(getSidebarWidth));

      .main-container {
        display: flex;
        flex-direction: column;

        .layout-main {
          height: calc(100vh - 66px);
        }
      }
    }
  }

  &.layout-horizontal {
    .layout-content-container {
      height: calc(100vh - 66px);
    }
  }

  &.layout-mixed {
    .layout-content-container {
      height: calc(100vh - 66px);
    }
  }

  .layout-header {
    display: flex;
    align-items: center;
    background-color: white;
    border-bottom: 0.5px solid #e5e7eb;
    min-height: 46px;

    &.header-hidden {
      display: none;
    }

    &.header-horizontal,
    &.header-mixed {
      justify-content: space-between;

      .logo-container {
        width: 180px;
      }

      .header-menu-container {
        flex: 1;
        width: 0;
        max-width: calc(100% - 270px);
      }

      .extra-container {
        width: 90px;
      }
    }
  }

  .layout-content-container {
    flex: 1;
    display: flex;
    height: 100%;

    .layout-aside {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-right: 0.5px solid #e5e7eb;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &.aside-hidden {
        display: none;
      }

      &.aside-vertical {
        .vertical-logo {
          height: 45px;
          display: flex;
          align-items: center;
          padding-left: 20px;
        }
      }

      &.aside-mixed {
        height: calc(100vh - 66px);
      }

      :deep(.el-scrollbar) {
        flex: 1;
      }
    }

    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;

      &.main-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
      }

      .vertical-header {
        display: flex;
        align-items: center;
        background-color: white;
        border-bottom: 0.5px solid #e5e7eb;
        height: 46px;

        &.hidden {
          display: none;
        }

        &.justify-end {
          justify-content: flex-end;
        }

        &.justify-between {
          justify-content: space-between;
        }
      }

      .layout-main {
        overflow: hidden;
        background-color: #f5f7fa;
        padding: 0;
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 500px;
        width: 100%;
        // background-color: #f87171;

        .content-scroll {
          margin: 10px;
          // display: flex;
          flex: 1;
          flex-direction: column;
          // width: 100%;
          // background-color: gray;
          height: 100%;
        }
      }

      .layout-footer {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        background-color: #f5f7fa;
      }
    }
  }
}

:deep(.el-menu) {
  border-right: 0;
}

:deep(.el-menu--horizontal) {
  --el-menu-horizontal-height: 40px;
}

:deep(.el-menu--horizontal.el-menu) {
  border-bottom: none;
}
</style>
