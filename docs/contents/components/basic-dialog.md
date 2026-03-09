# BasicDialog 弹窗

## 基本使用

:::demo
basic-dialog/basic
:::

## 自定义`footer`

您可以通过插槽`footer`自定义按钮

:::demo
basic-dialog/custom-footer
:::

## 防抖

在新增、编辑等需要与后端接口交互的弹窗中，对提交按钮进行防抖处理防止重复提交是个高频的场景，您只需传入`hasDebounce`便可实现防抖处理，默认防抖时间为`2s`

:::demo
basic-dialog/has-debounce
:::
