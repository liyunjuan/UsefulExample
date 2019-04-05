/**
 * @Time 2019/3/23上午9:39
 * @Filename 排序
 */
/**
  快速排序：选择第一个数为基准值，用splice，比较之后的数，比他小的放在左边，大的放在右边，然后连接起来
 */
function quickSort(arr) {
  if(arr.length <= 1){
    return arr;
  }
  let left = [],
      right = [],
      current = arr.splice(0,1);
  for(let i=0,len=arr.length;i<len;i++){
    if(arr[i]<current){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current,quickSort(right))
}
console.log(quickSort([1,3,2,6,8,3,4,0]));

function quickSort1(arr) {
  if(arr.length <= 1){
    return arr;
  }
  let len = arr.length
  let currentIndex = Math.floor(len/2)
  let current = arr.splice(currentIndex,1)[0]
  let left = []
  let right = []
  for(let i=0;i<len;i++){
    if(arr[i] < current){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort1(left).concat([current],quickSort1(right))
}

console.log(quickSort1([1,3,2,6,8,3,4,0,88,99]));
/*
冒泡：两两比较，升序
 */

function bubleSort(arr) {
  for(let i=0,len=arr.length-1;i<len;i++){
    for(let j=0;j<len-i-1;j++){
      if(arr[j] > arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr;
}
console.log(bubleSort([1,3,2,6,8,3,4,0]));

/*
选择排序：比较和自身之后的元素
 */
function selectSort(arr) {
  for(let i=0,len=arr.length;i<len;i++){
    for(let j=i+1;j<len;j++){
      if(arr[i] > arr[j]){
        [arr[i],arr[j]] = [arr[j],arr[i]]
      }
    }
  }
  return arr;
}
console.log(selectSort([1,3,2,6,8,3,4,0]));
