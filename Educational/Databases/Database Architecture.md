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

**Page**: Stored in a buffer's frame. These are usually mapped to a block of a file on disk.
 
**Frame**: Unit of storage within a buffer.

**Segment**: A counterpart of files stored in main memory. A contiguous sub-area of the buffer in a virtual, linear address space with visible page borders. Consists of an order sequence of pages such that borders are respected. 


Buffer = Frame(Page(Block))[]

| Main Memory | Disk |
| ........... | .... |
| Buffer | n/a |
| Segment | File |
| Frame | Block |
| Page | Block |

|           Buffer          |
|   Segment1  |   Segment2  |
|Frame1|Frame2|Frame3|Frame4|
|Page1 |Page2 |Page3 |Page4 |

|              File             |
|     Block1    |     Block2    |
| Data1 | Data2 | Data3 | Data4 |


**Update in Place**:  Modified pages are written back to the block that it has been assigned to.

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

6. **Buffer**: Partitioned into an array of frames, each of which can keep a page. A major goal of buffer management is to minimize the number of block transfers between the disk and the buffer. Usually pages are mapped to a block of a file so that reading and writing of a page only require one disk access each. Application queries make requests on the buffer manager when they need a block of disk. The buffer manager sends the address of the block in main memory to the requestor. If the block is not in main memory, the buffer manager first allocates space in the buffer for the block (removing old blocks by writing them back to disk if updated), then reading in the requested block from disk into the freed frame and passes the page address to the requestor. Segments allow one to define different segment types with additional attributes. If a data item is required, the address of the page in the buffer containing the item, is returned.

7. **Page Table**: Used in Indirect Page Addressing. Maintains an association with Segments in a Buffer to a Block in a File. Each page of the segment contains an entry indicating the block currently assigned to the page. Empty pages obtain a special null value.

8. **Bit Table**: Used in Indirect Page Addressing. Each block in a file is associated with a page as either a 1/0 if it is mapped or not. Bit Tables enable dynamic assignment between pages and blocks.  


## Algorithms

1. **External Merge Sort**: a file which does not fit into main memory can be sorted by breaking it into smaller pieces (sublists), sorting them individually, and them merging them to produce a file that contains the original data in sorted order.  

    a. Run-Generation Phase: merge-sort fills the available buffer pages into main memory with blocks containing the data records from the file on disk (fetching). Sorting is done using any main-memory algorithm (Heapsort, Quicksort, etc.). The sorted data is written back to new blocks on disk. This process repeats until all records in the data file in one of the sorted sublists.      
    b. Merging Phase: All but one of the main-memory buffers are used to hold input data from one of the sorted sublists. 

2. **Parse Tree**: an m-ary tree that shows the structure of a query in SQL. Each interior node of the tree is labeled with a non-terminal symbol of SQL's grammar with the goal symbol labeling the root node. Leaf nodes are lexical elements such as keywords of the language (e.g. SELECT, JOIN, WHERE, etc.), attribute names, relations, operators, and other schema elements. A Parse tree is said to be valid if it conforms to the syntactic rules of the grammar as well as a the semantic rules on the use of the schema names. 

3. **Expression Tree**: Binary Tree data structure that corresponds to the relational algebra expression. All relational operators are either unary or binary. Represents the input relations of the query as leaf nodes, and relational algebra operations (with estimates for the result sizes) as internal nodes. They differ from physical query plans in the information that is stored in the nodes. At the leaf nodes, table names are replaced by scan operators (TableScan, SortScan, IndexScan). In general, join operations perform best when the left argument (i.e., the outer relation) is the smaller
of the two relations.
    a. **left-deep trees**:  an expression tree in which the right child of each join is a leaf (i.e. base table). Allow the query optimizer to generate more efficient plans by avoiding the intermediate storage (materialization) of join results. 
    b. **Bushy tree**: non-linear expression tree.
    c. **right-deep tree**: 

4. **Histograms**: Used to help calculate the cost associated with logical execution plans and physical execution plans. Data distribution is approximated by dividing the range of values into sub-ranges or buckets.  When the number of buckets gets large, they can be compressed by combining buckets with similar distributions. In general, equidepth histograms provide better estimates than equiwidth histograms.
    a. **Equiwidth**: The value range is divided into buckets of equal size.
    b. **Equidepth**: The value range is divided so that the number of tuples in each bucket is the same size (uniformity among the smallest delta).

5. **Direct Page Addressing**: Assumes an implicitly given map between the Pages of a Segment and the Blocks of a File.  The page Pki (1 ≤ i ≤ sk) is stored in the block Bjl (1 ≤ l ≤ dj ) so that l = Kj − 1 + i and dj ≥ Kj − 1 + sk holds. Kj denotes the number of the first block reserved for Sk.
    cons:
        1. at the time of the segment creation, the assigned file area has to be allocated so that a block is occupied for each empty page. 
        2. For segment whose data stock grows slowly, the fixed block allocation leads to a low storage utilization.

6. **Indirect Page Addressing**: More flexible storage allocation than Direct Page Addressing. Facilitates dynamic update and extension functionality. Requires 2 auxillary data structures (Page Table, Bit Table). For large segments (files), the page tables and bit tables have to split and transferred and managed in a special buffer. The provision of a page that is not in the buffer can require 2 physical block accesses, because, when necessary, the page table has to be loaded first in order to find the current block address.


7. **Twin Slot Method**: Regarded as a modification of Direct Page Addressing. Cause very low cost for recovery. Partially compensates low recovery cost through 2x disk space utilization. 

8. **Shadow Page Concept**: An extension of Indirect Page Addressing. Before the beginning of a new save-internal given by 2 save-points, the contents of all current pages of a segment are duplicated as "shadow-pages". Changes are performed on the shadow pages. Changed pages are not written back to their original blocks to free blocks. The Save points orientate themselves to segments and not transaction borders. In the event of an error, segment-oriented recovery is executed. For transaction-oriented recovery, additional log data needs to be collected. 

