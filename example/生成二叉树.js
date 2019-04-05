/**
 * @Time 2019/3/23下午1:17
 * @Filename 生成二叉树
 */

function gNode(data,left,right){
  this.data = data;
  this.left = left;
  this.right = right;
}

//定义插入对象
function BTS() {
  this.root = null
  this.insert = insert
  this.show = () => {
    console.log(11)
  }
}

function insert(data) {
  let n = new gNode(data,null,null)
  if(this.root == null){
    this.root = n
  }else{
    let currnt = this.root
    let parent
    while (currnt){
      parent = currnt
      if(data<currnt.data){
        parent = currnt
        if(currnt == null){
          currnt = currnt.left
          parent.left = n
          break
        }
      }else {
        parent = currnt
        if(currnt == null){
          currnt = currnt.right
          parent.right = n
          break
        }
      }
    }
  }
}

const bts = new BTS()
bts.insert(13)
bts.insert(21)
bts.insert(15)
bts.insert(29)
bts.insert(3)
bts.insert(55)
bts.show()
