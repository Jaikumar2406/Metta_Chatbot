# Comprehensive MeTTa Programming Guide

## Introduction

MeTTa (Meta Type Talk) is a multi-paradigm language for declarative and functional computations over knowledge (meta)graphs. This guide provides a comprehensive overview of MeTTa's syntax, features, and common programming patterns to enable AI systems to write error-free MeTTa code.

## Core Concepts

### Atomspace and Knowledge Representation

Every MeTTa program lives inside an **Atomspace** - a knowledge database with an associated query engine. MeTTa programs can contain both factual knowledge and rules or functional code to perform reasoning on knowledge, including the programs themselves, making the language fully self-reflective.

An **Atom** is the fundamental building block of all data in MeTTa. In the context of graph representation, an Atom can be either a node or a link. In the metagraph model, links can connect not only nodes but other links - they connect atoms, and they can connect any number of atoms.

## Atom Kinds and Types

MeTTa has 4 kinds of Atoms:

1. **Symbol** - Represents concepts or ideas. Two symbols with the same name are considered equal. Names can be arbitrary strings.
   ```
   A
   known?
   replace-me
   ≱
   ```

2. **Expression** - Encapsulates other atoms including other expressions. MeTTa uses Scheme-like syntax.
   ```
   (f A)
   (implies (human Socrates) (mortal Socrates))
   ```

3. **Variable** - Used to create patterns (expressions with variables) that can be matched against other atoms. Variables are prefixed with `$`.
   ```
   $x
   $_
   $my-argument
   ```

4. **Grounded** - Represents sub-symbolic data in the Atomspace. May contain any binary object such as operations, collections or values.
   ```
   (+ 1 2)  ; + is a grounded atom referring to arithmetic operation
   ```

## Special Symbols

MeTTa has a small number of built-in symbols that determine evaluation:

1. **Equality symbol `=`** - Defines evaluation rules for expressions; can be read as "can be evaluated as" or "can be reduced to".

2. **Colon symbol `:`** - Used for type declarations.

3. **Arrow symbol `->`** - Defines type restrictions for evaluable expressions.

## Basic Evaluation

### MeTTa Programs

Programs in MeTTa consist of atoms that are parsed and placed into a program Space. To evaluate an atom immediately instead of adding it to the Space, prefix it with `!`. The result will be included in the output.

Comments start with `;` and are ignored by the parser.

```
; This line will be ignored.
Hello               ; This symbol will be added to the Space
(Hello World)       ; This expression will also be added
! (+ 1 2)           ; This expression will be immediately evaluated to 3
! (Hi there)        ; This evaluates to itself since Hi is not an operation
```

### Equalities and Function Definitions

Equalities in MeTTa work similar to function definitions in other languages, with some important differences:

#### Basic Function Definition

```
(= (h) (Hello world))   ; Defines function h with no arguments
! (h)                   ; Evaluates to (Hello world)
```

#### Pattern Matching in Functions

Functions can accept specific values or patterns as arguments:

```
(= (only-a A) (Input A is accepted))
! (only-a A)   ; Evaluates to (Input A is accepted)
! (only-a B)   ; Remains unchanged as (only-a B) - no matching definition
```

#### Variables in Functions

```
(= (duplicate $x) ($x $x))
! (duplicate A)     ; Evaluates to (A A)
! (duplicate 1.05)  ; Evaluates to (1.05 1.05)
```

#### Pattern Matching with Structure

```
(= (swap (Pair $x $y)) (Pair $y $x))
! (swap (Pair A B))  ; Evaluates to (Pair B A)
```

#### Multiple Results (Nondeterminism)

Functions can have multiple equalities, leading to nondeterministic results:

```
(= (bin) 0)
(= (bin) 1)
! (bin)  ; Returns both 0 and 1
```

## Evaluation Chaining

Function results are evaluated further, both for symbolic and grounded operations:

```
(= (square $x) (* $x $x))
! (square 3)  ; First reduces to (* 3 3), then evaluates to 9
```

## Control Structures

### Conditional Statements

#### If-Then-Else

```
(= (factorial $x)
   (if (> $x 0)
       (* $x (factorial (- $x 1)))
       1))
```

#### Case Statement (Pattern Matching)

```
(= (factorial $x)
   (case $x
     ((0 1)
      ($_ (* $x (factorial (- $x 1)))))
   ))
```

## Pattern Matching and Querying

The core operation in MeTTa is matching. It searches for declared atoms corresponding to the given pattern.

### Basic Matching

```
(Parent Tom Bob)  ; Declare a fact

; Match exact pattern
! (match &self (Parent Tom Bob) (Tom is Bob's parent))  ; Returns [(Tom is Bob's parent)]

; Match with variables
! (match &self (Parent $x Bob) $x)  ; Returns [Tom]

; Broad query - "Who is parent of whom?"
! (match &self (Parent $x $y) ($x $y))  ; Returns all parent-child pairs
```

### Complex Pattern Matching

#### Nested Pattern Matching

Matching can be nested to create complex queries:

```
; Find grandparents
! (match &self 
    (and (Parent $grandparent $parent)
         (Parent $parent $child))
    ($grandparent is grandparent of $child))
```

#### Using Logical Operators

```
; Find sci-fi movies not watched by Alice
! (match &self
    (and (movie-genre $movie sci-fi)
         (not (match &self (watched Alice $movie) True)))
    $movie)
```

#### Multiple Variable Constraints

```
; Find users who like the same movie with rating > 4
! (match &self
    (and (user-rating $user1 $movie $rating1)
         (user-rating $user2 $movie $rating2)
         (> $rating1 4)
         (> $rating2 4)
         (not (== $user1 $user2)))
    ($user1 and $user2 both like $movie))
```

### Unification

Unification is the process of making two patterns match by finding values for their variables.

```
! (unify (parent $x Bob) (parent Tom $y) ($x $y) Failed)
; Returns (Tom Bob) because $x=Tom and $y=Bob makes both patterns identical
```

## Recursion and Higher-Order Functions

### Recursive Functions

```
(= (length ()) 0)
(= (length (:: $x $xs))
   (+ 1 (length $xs)))
```

### Higher-Order Functions

```
(= (map $f ()) ())
(= (map $f (:: $x $xs))
   (:: ($f $x) (map $f $xs)))
```

## Best Practices and Common Pitfalls

### 1. Function Definition Format

- Always provide complete pattern matching cases for functions
- Be careful with variable naming to avoid unintended variable capturing

### 2. Correct Use of Logical Operators

- When using `not` with pattern matching, ensure proper nesting:
  ```
  ; INCORRECT:
  (not (user-rating $user $movie $_))
  
  ; CORRECT:
  (not (match &self (user-rating $user $movie $_) True))
  ```

### 3. Comparison Operations

- Use `>=` instead of `>` when you want to include the boundary value
- Remember that equality comparison uses `==` not `=`

### 4. Function Evaluation

- Arguments are evaluated before the function is called
- Be careful with infinite recursion patterns

### 5. Type Handling

- Consider using type declarations for better error checking
- Use pattern matching to enforce type constraints

## Real-World Example: Movie Recommendation System

Here's a basic recommendation function that recommends movies by genre:

```
; Content-based recommendation: by genre preference
(= (recommend-by-genre $user)
   (match &self
     (and (user-rating $user $liked-movie $rating)
          (>= $rating 4)
          (movie-genre $liked-movie $genre)
          (movie-genre $rec-movie $genre)
          (not (has-watched $user $rec-movie))
          (not (== $liked-movie $rec-movie)))
     $rec-movie))
```

## Debugging Techniques in MeTTa

### 1. Incremental Testing and Development

Always develop MeTTa code incrementally, testing each component before moving on:

```
; First define and test a simple function
(= (has-genre $movie $genre) (movie-genre $movie $genre))
! (has-genre inception sci-fi)  ; Test it works

; Then build more complex functions on top
(= (recommend-same-genre $liked-movie)
   (match &self 
     (and (has-genre $liked-movie $genre)
          (has-genre $other-movie $genre)
          (not (== $liked-movie $other-movie)))
     $other-movie))
```

### 2. Debug Output with Match

Use the `match` function to inspect intermediate results:

```
; Debug which users like sci-fi movies
! (match &self 
    (and (user-rating $user $movie $rating)
         (>= $rating 4)
         (movie-genre $movie sci-fi))
    (debug: $user likes sci-fi movie $movie with rating $rating))
```

### 3. Verifying Pattern Matching

Verify pattern matching rules with simple test cases:

```
; Add test facts
(test-parent Alice Bob)
(test-parent Bob Charlie)

; Test pattern matching for complex queries
! (match &self
    (and (test-parent $grandparent $parent)
         (test-parent $parent $child))
    (test-result: $grandparent is grandparent of $child))
; Should return [(test-result: Alice is grandparent of Charlie)]
```

### 4. Isolating Complex Conditions

Break down complex conditions into separate functions for easier debugging:

```
; Define helper functions for complex conditions
(= (likes-genre $user $genre)
   (match &self
     (and (user-rating $user $movie $rating)
          (>= $rating 4)
          (movie-genre $movie $genre))
     True))

; Use the helper function in recommendations
(= (recommend-by-user-genre-preference $user)
   (match &self
     (and (likes-genre $user $genre)
          (movie-genre $rec-movie $genre)
          (not (has-watched $user $rec-movie)))
     $rec-movie))
```

## Common Error Patterns and Solutions

### 1. Empty Results When Using NOT

**Problem**: Using `not` incorrectly in pattern matching often results in empty outputs.

```
; INCORRECT - Will likely return empty results
(= (unwatched-movies $user)
   (match &self
     (and (movie $m)
          (not (watched $user $m)))
     $m))
```

**Solution**: Proper negation requires nested `match` statements:

```
; CORRECT
(= (unwatched-movies $user)
   (match &self
     (and (movie $m)
          (not (match &self (watched $user $m) True)))
     $m))
```

### 2. Variable Binding Issues

**Problem**: Variables not being bound as expected:

```
; INCORRECT - $rating may not be bound properly
(= (high-rated-movies)
   (match &self
     (and (movie $m)
          (> $rating 8.0))
     $m))
```

**Solution**: Ensure all variables are properly introduced in patterns:

```
; CORRECT
(= (high-rated-movies)
   (match &self
     (and (movie $m)
          (movie-rating $m $rating)
          (> $rating 8.0))
     $m))
```

### 3. Function Evaluation Order Issues

**Problem**: Unexpected results due to evaluation order:

```
; May not work as expected because (bin) evaluates independently each time
(= (pair-match)
   (== (bin) (bin)))
```

**Solution**: Bind variables first, then compare:

```
; CORRECT
(= (pair-match)
   (let* (($val (bin)))
     (== $val $val)))
```

### 4. Missing Cases in Pattern Matching

**Problem**: Recursive functions failing due to missing edge cases:

```
; INCORRECT - Missing base case
(= (process-list (:: $x $xs))
   (:: (process $x) (process-list $xs)))
```

**Solution**: Add all necessary pattern cases:

```
; CORRECT
(= (process-list ()) ())
(= (process-list (:: $x $xs))
   (:: (process $x) (process-list $xs)))
```

### 5. Type Errors in Operations

**Problem**: Operations applied to incorrect types:

```
; INCORRECT - Trying to add a number to a symbol
(= (increment-value $x) (+ $x 1))
! (increment-value "hello")  ; Error
```

**Solution**: Add type checking or pattern matching for different types:

```
; CORRECT
(= (increment-value $x)
   (if (number? $x)
       (+ $x 1)
       $x))
```

## Best Practices for Production MeTTa Code

1. **Document your functions** with clear descriptions and examples
2. **Use meaningful variable names** that indicate their purpose
3. **Build abstractions** for repeated patterns
4. **Test edge cases** explicitly
5. **Separate logic** into smaller, composable functions
6. **Validate inputs** where necessary
7. **Use type declarations** for better error detection

By following these guidelines and being aware of common pitfalls, you can write robust, error-free MeTTa code that handles complex knowledge representation and reasoning tasks effectively.

## Step-by-Step Practical Example: Building a Knowledge Graph and Query System

This section walks through creating a complete MeTTa program for representing and querying a simple knowledge graph about books, authors, and genres.

### Step 1: Define Core Types and Entities

```
; Define core types
(: Book Type)
(: Author Type)
(: Genre Type)

; Define books
(: the-hobbit Book)
(: lotr Book)  ; Lord of the Rings
(: foundation Book)
(: dune Book)
(: neuromancer Book)

; Define authors
(: tolkien Author)
(: asimov Author)
(: herbert Author)
(: gibson Author)

; Define genres
(: fantasy Genre)
(: sci-fi Genre)
(: cyberpunk Genre)
```

### Step 2: Define Relationships

```
; Book-Author relationships
(wrote tolkien the-hobbit)
(wrote tolkien lotr)
(wrote asimov foundation)
(wrote herbert dune)
(wrote gibson neuromancer)

; Book-Genre relationships
(book-genre the-hobbit fantasy)
(book-genre lotr fantasy)
(book-genre foundation sci-fi)
(book-genre dune sci-fi)
(book-genre neuromancer cyberpunk)
(book-genre neuromancer sci-fi)  ; Books can have multiple genres
```

### Step 3: Add Properties

```
; Book details
(book-title the-hobbit "The Hobbit")
(book-title lotr "The Lord of the Rings")
(book-title foundation "Foundation")
(book-title dune "Dune")
(book-title neuromancer "Neuromancer")

; Publication years
(published-year the-hobbit 1937)
(published-year lotr 1954)
(published-year foundation 1951)
(published-year dune 1965)
(published-year neuromancer 1984)

; Author full names
(author-name tolkien "J.R.R. Tolkien")
(author-name asimov "Isaac Asimov")
(author-name herbert "Frank Herbert")
(author-name gibson "William Gibson")
```

### Step 4: Create Basic Query Functions

```
; Get all books by an author
(= (books-by-author $author)
   (match &self (wrote $author $book) $book))

; Get the author of a book
(= (author-of-book $book)
   (match &self (wrote $author $book) $author))

; Get all books in a genre
(= (books-in-genre $genre)
   (match &self (book-genre $book $genre) $book))

; Get all genres of a book
(= (genres-of-book $book)
   (match &self (book-genre $book $genre) $genre))
```

### Step 5: Create Advanced Query Functions

```
; Get book details including title, author, and year
(= (book-details $book)
   (let* (($title (book-title $book))
          ($author (author-of-book $book))
          ($author-full (author-name $author))
          ($year (published-year $book)))
     (list $title by $author-full published $year)))

; Find books published after a certain year
(= (books-after-year $year)
   (match &self
     (and (: $book Book)
          (published-year $book $pub-year)
          (> $pub-year $year))
     $book))

; Get books that share a genre with the specified book
(= (similar-books $book)
   (match &self
     (and (book-genre $book $genre)
          (book-genre $other-book $genre)
          (not (== $book $other-book)))
     $other-book))
```

### Step 6: Execute Queries and Test the System

```
; Basic queries
!(books-by-author tolkien)  ; Expected: [the-hobbit, lotr]
!(author-of-book dune)      ; Expected: [herbert]
!(books-in-genre sci-fi)    ; Expected: [foundation, dune, neuromancer]

; Advanced queries
!(book-details the-hobbit)  ; Should show title, author name, and year
!(books-after-year 1960)    ; Books published after 1960
!(similar-books neuromancer) ; Books sharing genres with Neuromancer
```

### Step 7: Create More Complex Queries with Pattern Matching

```
; Find authors who wrote in multiple genres
(= (versatile-authors)
   (match &self
     (and (wrote $author $book1)
          (wrote $author $book2)
          (not (== $book1 $book2))
          (book-genre $book1 $genre1)
          (book-genre $book2 $genre2)
          (not (== $genre1 $genre2)))
     $author))

; Find the earliest book in each genre
(= (earliest-book-in-genre $genre)
   (match &self
     (and (book-genre $book $genre)
          (published-year $book $year1)
          (not (match &self
                (and (book-genre $other-book $genre)
                     (published-year $other-book $year2)
                     (< $year2 $year1))
                True)))
     $book))

!(versatile-authors)  ; Authors who wrote in different genres
!(earliest-book-in-genre sci-fi)  ; The earliest sci-fi book
```

### Step 8: Add User Interaction Layer

```
; Function to recommend books based on a book a user liked
(= (recommend-from-liked $liked-book)
   (match &self
     (and (book-genre $liked-book $genre)
          (book-genre $other-book $genre)
          (not (== $liked-book $other-book))
          (author-of-book $liked-book $liked-author)
          (author-of-book $other-book $other-author)
          (not (== $liked-author $other-author)))
     (list recommend $other-book because you liked $liked-book)))

!(recommend-from-liked dune)  ; Get recommendations based on liking Dune
```

This complete example demonstrates how to build a knowledge graph, define relationships between entities, and create increasingly complex query functions in MeTTa. By following this step-by-step approach, you can apply similar patterns to build more sophisticated knowledge representation and reasoning systems.
