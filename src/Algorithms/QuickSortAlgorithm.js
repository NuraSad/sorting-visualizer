function partition(arr, low, high, changeOrder) {
  // let midIdx = Math.floor((low+high)/2);
  // let pivot = arr[midIdx];
  let pivot = arr[low];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    // Find leftmost element greater
    // than or equal to pivot
    do {
      i++;
    } while (arr[i] < pivot);

    // Find rightmost element smaller
    // than or equal to pivot
    do {
      j--;
    } while (arr[j] > pivot);

    // If two pointers met.
    if (i >= j) {
      console.log(j);
      return j;
    }
    // changeOrder.push([i,j,midIdx]);
    changeOrder.push([i, j, low]);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    // swap(arr[i], arr[j]);
  }
}

function partition2(arr, low, high, changeOrder) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      changeOrder.push(i, j, high);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // show that pivot in its final place;
  changeOrder.push(i + 1, high, "pivot");
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
}

function quickSort(arr, low, high, changeOrder) {
  if (low < high) {
    /* pi is partitioning index,
        arr[p] is now at right place */
    let pi = partition2(arr, low, high, changeOrder);
    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1, changeOrder);
    quickSort(arr, pi + 1, high, changeOrder);
  }
}

export default quickSort;
