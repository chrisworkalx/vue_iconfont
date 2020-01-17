<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: yaomingfei
 * @Date: 2020-01-15 14:43:25
 * @LastEditors  : yaomingfei
 * @LastEditTime : 2020-01-15 17:44:57
 -->
<template>
  <!-- <div class="move" @mousedown="move">
            {{positionX}}
            {{positionY}}
  </div>-->
  <!-- <div class="move" v-drag>
     运动
  </div>-->
  <div>
    <ul class="wrapper">
      <li
        v-for="items in list"
        :key="items.id"
        class="move"
        @mousedown="move($event, items)"
        :style="{left:items.positionX+'px', top:items.positionY+'px'}"
      >{{items.name}}</li>
    </ul>
  </div>
</template>>
<script>
export default {
  name: "move",
  data() {
    return {
      positionX: 0,
      positionY: 0,
      list: [
        {
          name: "box1",
          id: 1,
          positionX: 10,
          positionY: 10
        },
        {
          name: "box2",
          id: 2,
          positionX: 120,
          positionY: 10
        },
        {
          name: "box3",
          id: 3,
          positionX: 230,
          positionY: 10
        },
        {
          name: "box4",
          id: 4,
          positionX: 10,
          positionY: 120
        },
        {
          name: "box5",
          id: 5,
          positionX: 120,
          positionY: 120
        },
        {
          name: "box6",
          id: 6,
          positionX: 230,
          positionY: 120
        }
      ]
    };
  },
  methods: {
    move(e, item) {
        const _this = this;
        console.log(item, '=====item')
      let odiv = e.target; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // console.log('初始化点击位置', left, top)
        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
        // console.log(this.list, '=====move中的list')
      };
      document.onmouseup = e => {
        let left = e.clientX - disX; //左边
        let top = e.clientY - disY; //右边
        console.log(left, top, '===抬起');
        function getIndex(v) {
            var index;
            for(var i=0, len=_this.list.length; i<len; i++) {
                if(v.id === _this.list[i].id) {
                    index = i;
                }
            }
            return index;
        }
        var index = getIndex(item);
        var leftX = _this.list[index].positionX;
        var topY = _this.list[index].positionY;
        console.log(index, '====index');

        _this.list.forEach((v, i, arr) => {
                    // _this.list[0].positionX = 120;
                    // _this.list[0].positionY = 10;
                    // _this.list[1].positionX = 10;
                    // _this.list[1].positionY = 10;
                    if(i !== index) {
                            if(left - v.positionX < 100 && left - v.positionX > 0 && top - v.positionY < 100 && top - v.positionY > 0) {
                            var xx = v.positionX;
                            var yy = v.positionY;
                            console.log(xx, yy, '变量替换的')
                            console.log(i, '====被挤出来的')
                            console.log(left, top, '?????')
                            _this.list[i].positionX = leftX;
                            _this.list[i].positionY = topY;
                            _this.list[index].positionX = xx;
                            _this.list[index].positionY = yy;
                        } else {

                        }
                    }
            });
        console.log(_this.list, '=====this.list');
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
  computed: {},
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        //   const self = this;
        //   console.dir(el, '=====el')
        let odiv = el; //获取当前元素
        odiv.onmousedown = e => {
          console.log(e, "=====e");
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          //   console.log(disX, disY)
          // console.dir(document, '===document')
          document.onmousemove = e => {
            //   console.log(e, '=====e');
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            //绑定元素位置到positionX和positionY上面
            // self.positionX = top;
            // self.positionY = left;
            
            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  }
};
</script>>
<style scoped>
.wrapper {
  position: relative;
  list-style: none;
  width: 320px;
  height: 250px;
  border: solid #f00 1px;
}
.move {
  /*定位*/
  position: absolute;
  width: 100px;
  height: 100px;
  background: #666; /*设置一下背景*/
  cursor: move;
}
</style>