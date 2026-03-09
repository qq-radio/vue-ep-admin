# BasicReadonlyInput 输入框

## 基本使用

在一些情况下`input`需设为`readonly`，例如：点击输入框后打开表格弹窗勾选数据后回填至输入框，此时`input`需设为`readonly`

当设为`readonly`时，`input`的`clearable`会失效，导致凡是输入框有值后无法删除，这在该项不是必填的情况下会导致无法清空的情况，因此`BasicReadonlyInput`在`el-input`设为`readonly`基础上添加清空按钮

:::demo
basic-readonly-input/basic
:::

## 禁用

禁用时自动隐藏`search`和`clear`图标
:::demo
basic-readonly-input/disabled
:::
