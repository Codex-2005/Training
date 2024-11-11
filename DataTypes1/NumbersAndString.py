# Write a Python program to find all the prime numbers between two given numbers
def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def find_primes(start, end):
    primes = []
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
    return primes

start = 10
end = 30
result = find_primes(start, end)
print(result)

# Write a Python program to find the first n numbers that are both prime.
def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def find_first_n_primes(n):
    primes = []
    num = 2 
    while len(primes) < n:
        if is_prime(num):
            primes.append(num)
        num += 1
    return primes

n = 10
result = find_first_n_primes(n)
print(result)

# Write a Python function to find the longest word in a given sentence.
def find_longest_word(sentence):
    words = sentence.split()
    
    longest_word = ""
    
    for word in words:
        if len(word) > len(longest_word):
            longest_word = word
            
    return longest_word

sentence = "Find the longest word in this sentence."
result = find_longest_word(sentence)
print(result)

# Write a Python function to check if two given strings are anagrams of each other.
def are_anagrams(str1, str2):
    str1 = str1.replace(" ", "").lower()
    str2 = str2.replace(" ", "").lower()
    
    return sorted(str1) == sorted(str2)

string3 = "Hello"
string4 = "O hell"
result2 = are_anagrams(string3, string4)
print(result2)

string5 = "Python"
string6 = "Java"
result3 = are_anagrams(string5, string6)
print(result3)
