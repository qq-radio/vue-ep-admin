# BasicTable 表格

## 简介

- 通过`schemas`配置渲染表格

:::danger
为了方便模拟数据的统一维护，该页面的所有表格数据或`api`请求均来自`docs/mocks/mock-user.ts`文件，因此当您复制代码时，需同`mock-user.ts`文件一起复制，才能保证demo的正常运行
:::

## 基本使用

您可以传入`schemas`数组快速渲染表格，以下是最常见的表格使用示例

:::demo
basic-table/basic
:::

## 搜索

您可以通过`searchConfig`设置表格的搜索项

:::demo
basic-table/search
:::

## 搜索 - 透传属性与插槽

表格的搜索采用`BasicForm`渲染，每一项搜索配置`searchConfig`相当于`BasicForm`里的一个表单项配置，此外您还可以通过`searchProps`透传`BasicForm`属性

:::demo
basic-table/search-passing-props-slots
:::

## 搜索 - 自动构建搜索配置

您可以在`searchConfig`里配置搜索表单项的完整属性，若有以下情况也可省略部分配置

- 若搜索项的`label`、`prop`与表格里的`label`、`prop`一致，可直接省略
- 若搜索项的`label`、`prop`与表格里的`label`、`prop`一致，且`component=input`，则可以直接使用`searchable: true`替代`searchConfig`配置

:::demo
basic-table/search-searchable
:::

## 搜索 - 自定义搜索配置

`BasicTable`更推荐您在表格列配置里添加`searchConfig`当做表单的搜索配置，原因：

- 使数据、业务逻辑更加集中
- 当字段名称一致，可以省略部分配置

当然，若有特殊情况，您也可以自定义`searchSchemas`，当配置`searchSchemas`时，表格列里的每一项`searchConfig`均不生效

:::demo
basic-table/search-schemas
:::

## 显示或隐藏

您可以通过`visible`控制列的显示或隐藏

:::demo
basic-table/visible
:::

## 文字提示

您可以通过`headerTooltip`设置列的表头提示语

:::demo
basic-table/tooltip
:::

## 操作栏按钮组

您可以通过配置`operations`渲染表格操作栏按钮组，且可通过`operationProps`传入按钮组自定义属性

:::note
操作栏按钮组`operations`与操作列按钮组`actions`均采用`BasicButtonGroup`渲染，更多用法请参考[BasicButtonGroup](/components/basic-button-group)
:::

:::demo
basic-table/operations
:::

## 操作列按钮组

您可以通过配置`actions`渲染表格操作列按钮组，且可通过`actionProps`传入按钮组自定义属性

:::note
操作列按钮组`actions`与操作栏按钮组`operations`均采用`BasicButtonGroup`渲染，更多用法请参考[BasicButtonGroup](/components/basic-button-group)
:::

:::demo
basic-table/actions
:::

## 格式化数据

您可以传入`formatter`格式化单元格数据，`formatter`的属性名称与`el-table`的`formatter`属性名称保持一致，但是函数的回调参数区别如下：

- `el-table`的回调参数为`(row: any, column: any, cellValue: any, index: number)`
- `BasicTable`的回调参数为`(params:{ row: any, column: any, value: any, rowIndex: number, schema: TableSchema})`

重写回调参数的目的有3点：

- 注入当前列配置`schema`
- 用对象解构替换数组解构，避免数组解构时存在未使用的变量
- 使用更具语义化的变量名称

:::demo
basic-table/formatter
:::

## 自定义渲染列 - `customRender`/`tsx`

您可以通过`customRender`/`tsx`自定义渲染列

:::demo
basic-table/custom-render-tsx
:::

## 自定义渲染列 - `customRender`/`h`

您可以通过`customRender`/`h`自定义渲染列

:::demo
basic-table/custom-render-h
:::

## 自定义渲染列 - `customSlot`

您可以通过`customSlot`自定义渲染列

:::demo
basic-table/custom-slot
:::

## 自定义渲染列 - `display`

您可以指定`display`类型来自定义渲染列

:::note
更多的`display`用法请参考[BasicDisplay](/components/basic-display)
:::

:::demo
basic-table/custom-display
:::

## 自定义渲染表头 - `customHeaderRender`/`tsx`

您可以通过`customHeaderRender`/`tsx`自定义渲染表头

:::demo
basic-table/custom-header-tsx
:::

## 自定义渲染表头 - `customHeaderRender`/`h`

您可以通过`customHeaderRender`/`h`自定义渲染表头

:::demo
basic-table/custom-header-h
:::

## 自定义渲染表头 - `customHeaderSlot`

您可以通过`customHeaderSlot`自定义渲染表头

:::demo
basic-table/custom-header-slot
:::

## 分页器

分页器参数键名默认使用`el-pagination`的`currentPage`、`pageSize`，您也可以使用`currentPageField`、`pageSizeField`指定新的键名

:::demo
basic-table/page-field
:::

## 单选

若需要使用表格单选，需传入`hasRadioSelection`，且可通过`radioSelectionColumnProps`自定义单选列属性

:::demo
basic-table/radio-selection
:::

## 多选

若需要使用表格多选，需传入`hasSelection`，且可通过`selectionColumnProps`自定义多选列属性

:::demo
basic-table/selection
:::

## 序号

若需要显示序号列，需传入`hasIndex`，且可通过`indexColumnProps`自定义序号列属性

:::demo
basic-table/index
:::

## 展开

若需要显示展开列，需传入`hasExpand`，且可通过`expandColumnProps`自定义展开列属性

:::demo
basic-table/expand
:::
