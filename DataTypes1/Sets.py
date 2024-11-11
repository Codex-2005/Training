# Write a Python program to find the symmetric difference between two sets.
def symmetric_difference(set1, set2):
    # Using the symmetric_difference() method
    result_method = set1.symmetric_difference(set2)

    # Using the caret (^) operator
    result_operator = set1 ^ set2

    return result_method, result_operator

# Example Test Case
set1 = {1, 2, 3}
set2 = {3, 4, 5}

result_method, result_operator = symmetric_difference(set1, set2)

print("Symmetric Difference using method:", result_method)
print("Symmetric Difference using operator:", result_operator)

# Write a Python function to find all subsets of a given set.
def find_subsets_recursive(current_set, index=0, current_subset=None):
    if current_subset is None:
        current_subset = []

    # Base case: if we've considered all elements
    if index == len(current_set):
        return [current_subset]

    # Exclude the current element
    subsets_without_current = find_subsets_recursive(current_set, index + 1, current_subset)

    # Include the current element
    subsets_with_current = find_subsets_recursive(current_set, index + 1, current_subset + [current_set[index]])

    # Combine results
    return subsets_without_current + subsets_with_current

# Example usage
input_set = {1, 2, 3}
subsets = find_subsets_recursive(list(input_set))
print("Subsets using recursion:", subsets)
