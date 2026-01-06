function solveTwoPointer(input, keyOperation, extra = {}) {
    let left = 0;
    let right = input.length - 1;
  
    switch (keyOperation) {
  
      case "two-sum-sorted": {
        const target = extra.target;
        while (left < right) {
          const sum = input[left] + input[right];
          if (sum === target) return [left, right];
          if (sum < target) left++;
          else right--;
        }
        return [-1, -1];
      }
  
      case "remove-duplicates-sorted": {
        if (input.length === 0) return 0;
        let k = 1;
        for (let i = 1; i < input.length; i++) {
          if (input[i] !== input[i - 1]) {
            input[k++] = input[i];
          }
        }
        return k;
      }
  
      case "reverse-array": {
        while (left < right) {
          [input[left], input[right]] = [input[right], input[left]];
          left++;
          right--;
        }
        return input;
      }
  
      case "is-palindrome": {
        while (left < right) {
          if (input[left] !== input[right]) return false;
          left++;
          right--;
        }
        return true;
      }
  
      case "pair-with-condition": {
        const condition = extra.condition; // (a, b) => boolean
        while (left < right) {
          if (condition(input[left], input[right])) {
            return true;
          }
          left++;
          right--;
        }
        return false;
      }
  
      default:
        throw new Error(
          `two-pointer: unsupported keyOperation "${keyOperation}"`
        );
    }
  }
  
  module.exports = { solveTwoPointer };
  