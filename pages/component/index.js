import behaviors from "@tool-developer/wx-app/behaviors"
const component = {
  options:{},
  behaviors:[behaviors],
  properties:{
    data:{
      type:Array,
      value:[]
    }
  },
  //
  events:{

  },
  methods:{
    //
  },
  lifetimes:{
    // 组件实例刚刚被创建时执行
    /*created(){
      //
    },*/
    // 组件实例进入页面节点时执行
    attached(){
      //
    },
    // 组件布局完成后执行
    ready(){
      //
    },
    // 组件实例被移动到另一位置时执行
    /*moved(){
      //
    },*/
    // 组件实例从页面节点移除时执行
    detached(){
      //
    },
    // 组件抛出错误时执行
    error(){
      //
    }
  },
  /*pageLifetimes:{
    // 组件所在页面被展示
    show(){

    },
    // 组件所在页面被隐藏
    hide(){

    },
    // 组件所在页面尺寸发生变化
    resize(){

    }
  }*/
}

Component(component);