# BasicCheckboxGroup 多选框

## 简介

- 使用`value`而非`label`作为组件的双向绑定值
- 支持全选
- 传入数组渲染选项组替代手动`v-for`渲染
- 提供灵活的渲染方式，渲染的优先级为：各个选项的`customRender` > 各个选项的`customSlot` > 模板的`render` > 模板的默认插槽 > 普通的`label`渲染

::: note
`BasicCheckboxGroup`选项渲染优先级与[`BasicRadioGroup`](/components/basic-radio-group)、[`BasicSelect`](/components/basic-select)选项渲染优先级一致
:::

## 基本使用

本组件库使用的`element-plus`版本为`2.3.5`，该版本`el-checkbox-group`以`label`作为双向绑定值，但在实际项目场景我们更希望`value`作为双向绑定值，并将该`value`传递给后端接口，而非`label`，因此`BasicCheckboxGroup`解决了这个问题

（`element-plus`版本为`2.6.0`及以上已支持`el-checkbox-group`以`value`作为双向绑定值）

:::demo
basic-checkbox-group/basic
:::

## 监听`change`

很多时候，后端希望您将更多的信息传值给他，如选择产品后，包括产品名称、产品编号、产品分类等更详细的信息传值给后端，因此您可以通过监听`change`事件拿到详细的选中数据

:::demo
basic-checkbox-group/change
:::

## 垂直布局

选项默认为水平排列，您可以传入`vertical`设为垂直排列

:::demo
basic-checkbox-group/vertical
:::

## 全选

若您希望全选，只需传入`hasCheckAll`即可

:::demo
basic-checkbox-group/check-all
:::

## 远程数据

若选项数据来自后端接口，请传入`api`，且可传入`resultField`、`labelField`、`valueField`自动构建`options`数组

:::demo
basic-checkbox-group/api
:::

## 格式化

您可以传入`formatter`格式化各个选项的`label`，`formatter`会`map`数组里的每个元素后并执行`formatter`函数，得到的结果作为`label`值进行展示

:::demo
basic-checkbox-group/formatter
:::

## 自定义渲染 - `customRender`

您可以使用`customRender`为各个选项定制渲染

:::demo
basic-checkbox-group/custom-render
:::

## 自定义渲染 - `customSlot`

您可以使用`customSlot`为各个选项定制渲染

:::demo
basic-checkbox-group/custom-slot
:::

## 统一渲染 - `render`

您可以使用`render`为所有选项指定统一的渲染模板

:::demo
basic-checkbox-group/template-render
:::

## 统一渲染 - `defaultSlot`

您可以使用默认插槽为所有选项指定统一的渲染模板

:::demo
basic-checkbox-group/template-slot
:::
