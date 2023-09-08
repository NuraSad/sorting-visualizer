function getMergeSortArray(arrayOrg) {
  const changeOrder = [];
  const array = arrayOrg.slice();
  let end = array.length - 1;
  divideArray(array, 0, end, changeOrder);
  return changeOrder;
}

function sortAndMergeArrays(arr, l, m, r, changeOrder) {
  let final = l === 0 && r === arr.length - 1 ? true : false;
  let i = l;
  let j = m + 1;
  while (i <= r) {
    if (j > r) {
      j = r;
    }
    let swap = false;
    if (arr[j] <= arr[i]) {
      let insertVal = arr[j];
      arr.splice(j, 1);
      arr.splice(i, 0, insertVal);
      changeOrder.push([i, j, !swap, final]);
      j++;
    } else {
      changeOrder.push([i, j, swap, final]);
    }
    i++;
  }
}

function divideArray(array, l, r, changeOrder) {
  if (l === r) return;

  let m = Math.floor((l + r) / 2);
  divideArray(array, l, m, changeOrder);
  divideArray(array, m + 1, r, changeOrder);
  sortAndMergeArrays(array, l, m, r, changeOrder);
}

export default getMergeSortArray;
