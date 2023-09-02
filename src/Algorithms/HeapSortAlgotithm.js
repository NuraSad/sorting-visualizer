//restore the maxHeap structure
function maxHeapify(arr, n, i, changeOrder) {
  let max = i;
  let l = 2 * i + 1; //left child index
  let r = 2 * i + 2; //right child index

  //If left child is larger than root
  if (l < n && arr[l] > arr[max]) {
    max = l;
  }

  // If right child is larger than smallest so far
  if (r < n && arr[r] > arr[max]) {
    max = r;
  }
  changeOrder.push([i, max]);
  // If larger is not root
  if (max !== i) {
    let temp = arr[i];
    arr[i] = arr[max];
    arr[max] = temp;
    // Recursively heapify the affected sub-tree
    maxHeapify(arr, n, max, changeOrder);
  }
}

// main function to do heap sort
function heapSort(arr) {
  // Build heap (rearrange array)
  const changeOrder = [];
  const n = arr.length;
  for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
    maxHeapify(arr, n, i, changeOrder);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i >= 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    changeOrder.push([0, i]);

    // call max heapify on the reduced heap
    maxHeapify(arr, i, 0, changeOrder);
  }
  return changeOrder;
}

export default heapSort;
