# Architecture and Organization

## Major Components & Modules

1. **Query Evaluation Engine**: 

    a. Parsing Input    
    b. Creating Execution Plans 
    c. **Parser**: scans, parses, and validates queries. Check whether the query is formulated according to the syntax rules supported by the DBMS. Validates all attribute and relation names are part of the database schema. Produces a *parse tree* as input to Query Translation & Re-Writing module.  
    d. **Query Translation & Re-Writing**: translates query (represented as a Parse Tree) into an internal representation (based on Relational Algebra Notation).
    e. **Physical Plan Generator**: Converts *logical query plans* to *physical query plans*. Among the multiple plans generated, it evaluates the cost for each and chooses the one with the lowest overall cost.  
    f. **Code Generator**: Produces the executable code that is either executed directly (interpreted mode) or is stored and executed later as needed (compiled mode).  

2. **Storage Subsystem**

    a. places data on disk*   
    b. assure efficient localization of persistent data
    c. allow direct access;facilitates communication between higher levels to data
    d. **Disk Space Manager**: submodule;   

        i. stores physical data item on disk.
        ii. managing free regions of the disk space.
        iii. hiding device properties (abstracting).
        iv. mapping physical blocks to tracks and sectors of disk*.
        v. controlling the data transfer of data between memory and disk.  
    e. **Buffer Manager**: submodule, organizes an assigned, limited main memory area. It can be pooled or comprised of several smaller buffers. These are freely available at higher levels.

3. **Transaction Processing Subsystem**: Supports concurrent execution of queries against the database and recovery from failure.

---
## Terminology
**Query**: command to either retrieve or update data. Commands are parsed sent to the query optimizer sub-module.

**Data Definition Statements**: Describes the schema of a relational database.

**Execution Plan**: set of instructions for evaluating an input command, usually represented as a tree (Parse Tree) of relational operators.

**Buffer**: limited area of main memory.

**Logical Query Plans**: different algebraic expressions use to represent queries (as Expression Trees or Operator Trees). 

**Physical Query Plans**: contain information about the algorithms to be used in computing the relational operators represented in the plan.

**Access Methods**: Ways to retrieve tuples (data) from a table and consist of either a file scan or an index plus a matching selection condition. 

**Query Optimization**: Query re-writing and physical plan generation. 

**Indexes**: used to speed-up the *basic* database operations. Used to answer certain types of queries without having to access the
data file.

**Self-Tuning**: A Data Structure that maintains as many levels of the index as is appropriate for teh size of the file being index.

**Partial Matches**: all points withing a range in each dimension.

**Range Queries**: all points within a range in each dimension.

**Nearest-Neighbor Queries**: closet point to a given point.

**"Where Am I" Queries**: region(s) containing a point.

---
## Data Structures

1. **Parse Tree**: storing parsed and validated input queries. 
2. **Expression/Operator Tree**: representing logical and physical query plans.
3. **Histogram**: Used to approximate the distribution of attribute values in the input relations.
4. **1-Dimensional Indexes**:   
    a. B/B+ Trees: used for range searching. manage the space on the blocks they use ("self-tuning"); do not require overflow blocks.
    b. Hash-based Indexes using extendible and linear hashing: used for equality searches (such as joins).
    c.  
5. **N-Dimensional Indexes**:
    
    a. **Grid File**: extension of a 1D hash-table. Support range queries, partial-match queries, and nearest-neighbor queries well AS LONG AS DATA IS UNIFORMLY DISTRIBUTED.   
    b. **Multi-Key Indexes**: the index on one attribute leads to indexes on another attribute for each value of the first. Useful for range and nearest-neighbor queries.   
    c. **R-Tree**: A B-Tree suitable for collections of regions. Used to represent a collection of regions by grouping them into a hierarchy of larger regions. Used for "Where Am I", range, nearest-neighbor searches IF the atomic regions are individual points.    
    d. **Quad-Tree**: Recursively divides a (N-Dimensional) data set into quadrants until each quadrant contains a minimal number of points (which can be fit on disk). Support partial-matches, range, and nearest-neighbor searches.  
    e. **Bitmap Index**: A collection of bit vectors which encode the location of records within a given value in a given field. Support range, nearest-neighbor, and partial-match queries. Tend to get large when the underlying attributes have many values. Often compressed using a run-length encoding.  


## Algorithms

1. **External Merge Sort**: a file which does not fit into main memory can be sorted by breaking it into smaller pieces (sublists), sorting them individually, and them merging them to produce a file that contains the original data in sorted order.  

    a. Run-Generation Phase: merge-sort fills the available buffer pages into main memory with blocks containing the data records from the file on disk (fetching). Sorting is done using any main-memory algorithm (Heapsort, Quicksort, etc.). The sorted data is written back to new blocks on disk. This process repeats until all records in the data file in one of the sorted sublists.      
    b. Merging Phase: All but one of the main-memory buffers are used to hold input data from one of the sorted sublists. 

2. **Parse Tree**: an m-ary tree that shows the structure of a query in SQL. Each interior node of the tree is labeled with a non-terminal symbol of SQL's grammar with the goal symbol labeling the root node. Leaf nodes are lexical elements such as keywords of the language (e.g. SELECT, JOIN, WHERE, etc.), attribute names, relations, operators, and other schema elements. A Parse tree is said to be valid if it conforms to the syntactic rules of the grammar as well as a the semantic rules on the use of the schema names. 

3. **Expression Tree**: Binary Tree data structure that corresponds to the relational algebra expression. All relational operators are either unary or binary. Represents the input relations of the query as leaf nodes, and relational algebra operations (with estimates for the result sizes) as internal nodes. They differ from physical query plans in the information that is stored in the nodes. At the leaf nodes, table names are replaced by scan operators (TableScan, SortScan, IndexScan). 
    a. **left-deep trees**:  an expression tree in which the right child of each join is a leaf (i.e. base table). Allow the query optimizer to generate more efficient plans by avoiding the intermediate storage (materialization) of join results. 
    b. **Bushy tree**: non-linear expression tree.
    c. **right-deep tree**: 