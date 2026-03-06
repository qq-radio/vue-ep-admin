# BasicRadioGroup 单选框组

## 简介

- 解决`el-radio`在选中后再次点击无法取消选中
- 使用`value`而非`label`作为组件的双向绑定值
- 传入数组渲染选项组替代手动`v-for`渲染
- 提供灵活的渲染方式，渲染的优先级为：各个选项的`customRender` > 各个选项的`customSlot` > 模板的`render` > 模板的默认插槽 > 普通的`label`渲染

::: note
`BasicRadioGroup`选项渲染优先级与[`BasicCheckboxGroup`](/components/basic-checkbox-group)、[`BasicSelect`](/components/basic-select)选项渲染优先级一致
:::

## 基本使用

`el-radio`在选中后再次点击无法取消选中，但在实际项目场景中往往有表单项为单选且非必填，我们希望它能够取消或者清空选择，`BasicRadioGroup`解决了这个问题，您只需设置`cancelWhenDoubleClick`便可实现在已选择的项再次点击从而取消选中

本组件库使用的`element-plus`版本为`2.3.5`，该版本`el-radio-group`以`label`作为双向绑定值，但在实际项目场景我们更希望`value`作为双向绑定值，并将该`value`传递给后端接口，而非`label`，因此`BasicRadioGroup`解决了这个问题

（`element-plus`版本为`2.6.0`及以上已支持`el-radio-group`以`value`作为双向绑定值）

:::demo
basic-radio-group/basic
:::

## 监听`change`

很多时候，后端希望您将更多的信息传值给他，如选择产品后，包括产品名称、产品编号、产品分类等更详细的信息传值给后端，因此您可以通过监听`change`事件拿到详细的选中数据

:::demo
basic-radio-group/change
:::

## 远程数据

若选项数据来自后端接口，请传入`api`，且可传入`resultField`、`labelField`、`valueField`自动构建`options`数组

:::demo
basic-radio-group/api
:::

## 格式化

您可以传入`formatter`格式化各个选项的`label`，`formatter`会`map`数组里的每个元素后并执行`formatter`函数，得到的结果作为`label`值进行展示

:::demo
basic-radio-group/formatter
:::

## 自定义渲染 - `customRender`

您可以使用`customRender`为各个选项定制渲染

:::demo
basic-radio-group/custom-render
:::

## 自定义渲染 - `customSlot`

您可以使用`customSlot`为各个选项定制渲染

:::demo  
basic-radio-group/custom-slot
:::

## 统一渲染 - `render`

您可以使用`render`为所有选项指定统一的渲染模板

:::demo
basic-radio-group/template-render
:::

## 统一渲染 - `defaultSlot`

您可以使用默认插槽为所有选项指定统一的渲染模板

:::demo
basic-radio-group/template-slot
:::
