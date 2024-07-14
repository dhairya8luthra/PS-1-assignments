function processArray() {
  const input = document.getElementById("arrayInput").value;
  const array = input.split(",").map(Number);

  const squaredArray = squareArray(array);
  const filteredArray = filterEvenNumbers(array);
  const { max, min } = findMaxMin(array);
  const reversedArray = reverseArray(array);
  const combinedArray = combineAndRemoveDuplicates(array, [6, 7, 8, 1, 2]);

  displayResults(
    squaredArray,
    filteredArray,
    max,
    min,
    reversedArray,
    combinedArray
  );
}

function squareArray(arr) {
  return arr.map((num) => num * num);
}

function filterEvenNumbers(arr) {
  return arr.filter((num) => num % 2 !== 0);
}

function findMaxMin(arr) {
  let max = -Infinity;
  let min = Infinity;

  for (let num of arr) {
    if (num > max) {
      max = num;
    }
    if (num < min) {
      min = num;
    }
  }

  return { max, min };
}

function reverseArray(arr) {
  return arr.slice().reverse();
}

function combineAndRemoveDuplicates(arr1, arr2) {
  const combinedArray = [...arr1, ...arr2];
  return [...new Set(combinedArray)];
}

function displayResults(squared, filtered, max, min, reversed, combined) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
        <p>Squared Array: ${squared.join(", ")}</p>
        <p>Filtered Array (odd numbers): ${filtered.join(", ")}</p>
        <p>Maximum Value: ${max}</p>
        <p>Minimum Value: ${min}</p>
        <p>Reversed Array: ${reversed.join(", ")}</p>
        <p>Combined and Deduplicated Array: ${combined.join(", ")}</p>
    `;
}
