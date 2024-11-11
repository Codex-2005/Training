# Create a program that evaluates a list of Boolean expressions and returns the count of
# True values
def count_true_values(boolean_list):
    return sum(boolean_list)

input_values = [True, False, True, True, False]
output = count_true_values(input_values)
print("Count of True values:", output)

# Write a Python function to evaluate a complex Boolean expression represented as a string
# (e.g., "True and False or True").

def evaluate_boolean_expression(expression):
    # Replace 'True' and 'False' to ensure they are recognized as Booleans
    expression = expression.replace('True', 'True').replace('False', 'False')
    # Use eval to evaluate the expression safely
    try:
        result = eval(expression)
        return result
    except Exception as e:
        return f"Error evaluating expression: {e}"

# Example Test Cases
expression1 = "True and False or True"
expression2 = "not False and True"
expression3 = "False or (True and (False or True))"

print(f"Expression: {expression1} -> Result: {evaluate_boolean_expression(expression1)}")
print(f"Expression: {expression2} -> Result: {evaluate_boolean_expression(expression2)}")
print(f"Expression: {expression3} -> Result: {evaluate_boolean_expression(expression3)}")

# Write a Python function to find the second largest element in a list.
def second_largest(numbers):
    if len(numbers) < 2:
        return None

    first, second = float('-inf'), float('-inf')

    for number in numbers:
        if number > first:
            second = first
            first = number
        elif first > number > second:
            second = number

    return second if second != float('-inf') else None

# Example Test Cases
print(second_largest([10, 20, 4, 45, 99]))
print(second_largest([3, 3, 3])) 
print(second_largest([5, 5, 2, 8, 8]))  
print(second_largest([1]))   