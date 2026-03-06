// main.js

import VxeUITable from 'vxe-table'

// 创建一个空内容渲染
// VxeUITable.renderer.add('MyTableEmptyImg', {
//   // 空内容模板
//   renderTableEmpty() {
//     return (
//       <span>
//         <p style="color: red;">??/ 11111 222222 0000 已经到底了，没有11111更多数据了！</p>
//       </span>
//     )
//   },
// })

VxeUITable.formats.add('formatEmpty', {
  cellFormatMethod: ({ cellValue }) => {
    console.log('有调用这个吗？？？、 cellValue --->', cellValue)
    return cellValue == null || cellValue === '' ? '-？？？？ 空的，，' : cellValue
  },
})
