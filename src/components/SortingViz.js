import React, { useState } from "react";
import getMergeSortArray from "../Algorithms/MergeAlgorithm";
import quickSort from "../Algorithms/QuickSortAlgorithm";
import heapSort from "../Algorithms/HeapSortAlgotithm";
import "./SortingViz.css";

const INITIAL_COLOR = "rgb(233, 196, 106)";
const COMPARISON_COLOR = "rgb(231, 111, 81)";
const PIVOT_COLOR = "rgb(0, 150, 199)";
const SORTED_COLOR = "rgb(42, 157, 143)";
const SWAP_COLOR = "rgb(255, 112, 166)";

const SortingViz = () => {
  const size = 100;
  const [originalArray, setOriginalArray] = useState([]);
  const [PRIMARY_COLOR, setPrimaryColor] = useState(INITIAL_COLOR);
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(100);

  const makeNewArray = (size) => {
    setPrimaryColor(INITIAL_COLOR);
    const array = [];
    const minNum = 5;
    const maxNum = 900;
    for (let i = 0; i < size; i++) {
      array.push(randomNum(minNum, maxNum));
    }
    return array;
  };

  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // Returns a promise that resolves after given delay
  const timer = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const mergeSort = (array, delay) => {
    setIsDisabled(true);
    const changeOrder = getMergeSortArray(array);
    mergeSortAnimation(changeOrder, delay);
  };
  //stackoverflow.com/questions/60804672/reactjs-not-rendering-until-for-loop-ends
  const mergeSortAnimation = async (changeOrder, delay) => {
    for (let i = 0; i < changeOrder.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const firstBar = changeOrder[i][0];
      const secondBar = changeOrder[i][1];
      const insert = changeOrder[i][2];
      if (firstBar === secondBar) {
        continue;
      }
      arrayBars[firstBar].style.backgroundColor = COMPARISON_COLOR;
      arrayBars[secondBar].style.backgroundColor = COMPARISON_COLOR;
      await timer(delay);
      //think how to make insert better or redo whole merge sort algor.
      if (insert) {
        const insertVal = originalArray[secondBar];
        originalArray.splice(secondBar, 1);
        originalArray.splice(firstBar, 0, insertVal);
        arrayBars[secondBar].style.backgroundColor = PRIMARY_COLOR;
      }
      setOriginalArray([...originalArray]);
      // Wait delay amount in ms before continuing, give browser time to render last update
      await timer(delay);
      arrayBars[firstBar].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[secondBar].style.backgroundColor = PRIMARY_COLOR;
    }
    setPrimaryColor(SORTED_COLOR);
    setIsDisabled(false);
  };

  //   have to left in this file because sorting happens on original array
  const bubbleSort = async (array, delay) => {
    setIsDisabled(true);
    for (let i = array.length; i > 0; i--) {
      let sorted = false;
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let j = 0; j < i - 1; j++) {
        arrayBars[j].style.backgroundColor = COMPARISON_COLOR;
        arrayBars[j + 1].style.backgroundColor = COMPARISON_COLOR;
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          sorted = true;
        }
        setOriginalArray([...array]);
        // Wait delay amount in ms before continuing, give browser time to render last update
        await timer(delay);
        arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[j + 1].style.backgroundColor = PRIMARY_COLOR;
      }
      //If no changes were made to the array, return sorted array
      if (sorted === false) {
        break;
      }

      arrayBars[i - 1].style.backgroundColor = SORTED_COLOR;
    }
    setPrimaryColor(SORTED_COLOR);
    setIsDisabled(false);
  };

  //   const startQuickSort2 = async (arrOrg, delay) => {
  //     setIsDisabled(true);
  //     const arr = arrOrg.slice();
  //     const low = 0;
  //     const high = arr.length - 1;
  //     const changeOrder = [];
  //     quickSort(arr, low, high, changeOrder);
  //     console.log(arrOrg, changeOrder);
  //     for (let i = 0; i < changeOrder.length; i++) {
  //       const arrayBars = document.getElementsByClassName("array-bar");
  //       let firstIdx = changeOrder[i][0];
  //       let secondIdx = changeOrder[i][1];
  //       let pivotBarIdx = changeOrder[i][2];
  //       arrayBars[firstIdx].style.backgroundColor = COMPARISON_COLOR;
  //       arrayBars[secondIdx].style.backgroundColor = COMPARISON_COLOR;
  //       arrayBars[pivotBarIdx].style.backgroundColor = PIVOT_COLOR;
  //       let temp = arrOrg[firstIdx];
  //       arrOrg[firstIdx] = arrOrg[secondIdx];
  //       arrOrg[secondIdx] = temp;
  //       setOriginalArray([...arrOrg]);
  //       await timer(delay);
  //       arrayBars[pivotBarIdx].style.backgroundColor = PRIMARY_COLOR;
  //       arrayBars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
  //       arrayBars[secondIdx].style.backgroundColor = PRIMARY_COLOR;
  //     }
  //     setPrimaryColor(SORTED_COLOR);
  //     setIsDisabled(false);
  //   };

  const startQuickSort = async (arrOrg, delay) => {
    setIsDisabled(true);
    const arr = arrOrg.slice();
    const low = 0;
    const high = arr.length - 1;
    const changeOrder = [];
    quickSort(arr, low, high, changeOrder);

    for (let i = 0; i < changeOrder.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      if (changeOrder[i][2] === "pivot") {
        let firstIdx = changeOrder[i][0];
        let secondIdx = changeOrder[i][1];
        if (firstIdx === secondIdx) {
          arrayBars[firstIdx].style.backgroundColor = SORTED_COLOR;
          await timer(delay);
          continue;
        }
        arrayBars[firstIdx].style.backgroundColor = SWAP_COLOR;
        arrayBars[secondIdx].style.backgroundColor = SWAP_COLOR;
        let temp = arrOrg[firstIdx];
        arrOrg[firstIdx] = arrOrg[secondIdx];
        arrOrg[secondIdx] = temp;
        setOriginalArray([...arrOrg]);
        await timer(delay);
        arrayBars[firstIdx].style.backgroundColor = SORTED_COLOR;
        arrayBars[secondIdx].style.backgroundColor = PRIMARY_COLOR;
      } else if (changeOrder[i][2] === "swap") {
        let firstIdx = changeOrder[i][0];
        let secondIdx = changeOrder[i][1];
        if (firstIdx === secondIdx) continue;
        arrayBars[firstIdx].style.backgroundColor = SWAP_COLOR;
        arrayBars[secondIdx].style.backgroundColor = SWAP_COLOR;
        let temp = arrOrg[firstIdx];
        arrOrg[firstIdx] = arrOrg[secondIdx];
        arrOrg[secondIdx] = temp;
        setOriginalArray([...arrOrg]);
        await timer(delay);
        arrayBars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[secondIdx].style.backgroundColor = PRIMARY_COLOR;
      } else if (changeOrder[i][2] === "final") {
        let idx = changeOrder[i][0];
        arrayBars[idx].style.backgroundColor = SORTED_COLOR;
        await timer(delay);
      } else {
        let firstIdx = changeOrder[i][0];
        let secondIdx = changeOrder[i][1];
        arrayBars[firstIdx].style.backgroundColor = COMPARISON_COLOR;
        arrayBars[secondIdx].style.backgroundColor = PIVOT_COLOR;
        await timer(delay);
        arrayBars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[secondIdx].style.backgroundColor = PIVOT_COLOR;
      }
    }
    setPrimaryColor(SORTED_COLOR);
    setIsDisabled(false);
  };

  const heapSortAnimation = async (arrOrg, delay) => {
    setIsDisabled(true);
    const arr = arrOrg.slice();
    const changeOrder = heapSort(arr);
    console.log(arrOrg, changeOrder);
    for (let i = 0; i < changeOrder.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const firstBar = changeOrder[i][0];
      const secondBar = changeOrder[i][1];
      if (changeOrder[i][2] === "swap") {
        arrayBars[firstBar].style.backgroundColor = SWAP_COLOR;
        arrayBars[secondBar].style.backgroundColor = SWAP_COLOR;
        let temp = arrOrg[firstBar];
        arrOrg[firstBar] = arrOrg[secondBar];
        arrOrg[secondBar] = temp;
        setOriginalArray([...arrOrg]);
        await timer(delay);
        arrayBars[firstBar].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[secondBar].style.backgroundColor = PRIMARY_COLOR;
      } else if (changeOrder[i][2] === "final") {
        arrayBars[firstBar].style.backgroundColor = SWAP_COLOR;
        arrayBars[secondBar].style.backgroundColor = SWAP_COLOR;
        await timer(delay);
        let temp = arrOrg[firstBar];
        arrOrg[firstBar] = arrOrg[secondBar];
        arrOrg[secondBar] = temp;
        setOriginalArray([...arrOrg]);
        arrayBars[secondBar].style.backgroundColor = SORTED_COLOR;
        arrayBars[firstBar].style.backgroundColor = SWAP_COLOR;
        await timer(delay);
        arrayBars[firstBar].style.backgroundColor = PRIMARY_COLOR;
      } else {
        arrayBars[firstBar].style.backgroundColor = COMPARISON_COLOR;
        arrayBars[secondBar].style.backgroundColor = COMPARISON_COLOR;
        await timer(delay);
        arrayBars[firstBar].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[secondBar].style.backgroundColor = PRIMARY_COLOR;
      }
    }
    setPrimaryColor(SORTED_COLOR);
    setIsDisabled(false);
  };

  return (
    <div className="container">
      <div className="bars-field">
        {originalArray.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="button-field">
        <button
          className="button"
          disabled={isDisabled}
          onClick={() => setOriginalArray(makeNewArray(size))}
        >
          Generate new Array
        </button>
        <div className="slider-parent">
          <label className="bubble">Speed: {speed} ms</label>
          <input
            type="range"
            min="1"
            max="500"
            value={speed}
            disabled={isDisabled}
            onChange={(e) => {
              setSpeed(e.target.value);
            }}
          />
        </div>
        <button
          className="button"
          disabled={isDisabled}
          onClick={() => mergeSort(originalArray, speed)}
        >
          Merge Sort
        </button>
        <button
          className="button"
          disabled={isDisabled}
          onClick={() => bubbleSort(originalArray, speed)}
        >
          Bubble Sort
        </button>
        <button
          className="button"
          disabled={isDisabled}
          onClick={() => startQuickSort(originalArray, speed)}
        >
          Quick Sort
        </button>
        <button
          className="button"
          disabled={isDisabled}
          onClick={() => heapSortAnimation(originalArray, speed)}
        >
          Heap Sort
        </button>
      </div>
    </div>
  );
};

export default SortingViz;
