function solveSingleArrayTraversal(input, keyOperation, extra = {}) {
    const n = input.length;
    switch (keyOperation){
        case "find-maximum": {
            let max = input[0];
            for(let i = 1; i < n; i++){
                if(input[i] > max) max = input[i];
            }
            return max;
        }

        case "find-minimum": {
            let min = input[0];
            for(let i = 1; i < n; i++){
                if(input[i] > min) min = input[i];
            }
            return min;
        }
        case "count-occurrences": {
            const target = extra.length;
            let count = 0;
            for(let i = 1; i < n; i++){
                if(input[i] === target) count++;
            }
            return count;
        }
        case "running-sum": {
            let sum = 0;
            for(let i = 0; i < n; i++){
                sum += input[i];
            }
            return sum;
        }
        case "max-subarray-sum": { //kadane
            let best = input[0];
            let curr = input[0];
            for(let i = 1; i < n; i++){
                curr = Math.max(input[i], curr + input[i]);
                best = Math.max(best, curr);
            }
            return best;
        }

        case "max-difference": {
            let minSoFar = input[0];
            let ans = 0;
            for(let i = 1; i < n; i++){
                ans = Math.max(ans, input[i] - minSoFar);
                minSoFar = Math.min(minSoFar, input[i]);
            }
            return ans;
        }

        case "is-sorted": {
            for(let i = 1; i < n; i++){
                if(input[i] < input[i - 1]) return false;
            }
            return true;
        }
        default: 
            throw new Error(
                `single-array-traversal: unsupported keyOperation "${keyOperation}"`
            );
    }
}

module.exports = { solveSingleArrayTraversal };