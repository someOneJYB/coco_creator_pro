# coco_creator_pro
### 用于练习 coco creator 的项目和学习 coco creator
粒子效果：

![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/1.png)
![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/2.png)
![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/3.png)
### 使用 coco——creator教程
1、设置整体框架

![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/4.png)
bg是一个新建的 sprite 单节点并设置大小

![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/5.png)
点击添加组件创建 bg 的组件 widget 铺满整个 bg 节点

![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/6.png)
设置铺满
![](https://github.com/someOneJYB/coco_creator_pro/raw/master/desc/7.png)
设置关联的组件 js 点击添加组件选择用户组件就会有对应的js脚本，同时 property 就是在 js 文件中定义的 property
其他的node节点从资源中拖拽到bg的下面就会形成组件。编写 js，在 property 中的 node 链接需要把 bg 下的节点拖拽到对应的名字下，获取节点在js进行操作
设置的坐标中心和 anchor有关，默认就是坐标系中心是 0 0 物体的中心。当然也可以手动改变 anchor，修改坐标原点。
