# API Performance Concepts and Resources C# WebAPIs, ExpressJS, and Others. 

## Concepts
1. Caching aggressively
2. Hot Code Paths
3. Avoid blocking calls
4. Paging: Returning Large collections across multiple requests
5. Minimizing Large Object Allocation (LOA)
6. Optimizing I/O (see [Databases/readme.md](../Databases/readme.md))
7. Connection Pooling
8. Complete long-running Tasks outside of HTTP requests
9. Minify client assets
10. Compress responses (see [Response compression in ASP.NET Core])
11. Avoid synchronous read or write on HttpRequest/HttpResponse body
12. Prefer ReadFormAsync over Request.Form
13. Avoid reading large request bodies or response bodies into memory ([further reading][Pooling large arrays with ArrayPool])
14. Working with a synchronous data processing API
15. Distributed Caching
16. [Asynchronous Programming]

## Resource Links
* [ASP.NET Core Performance Best Practices]
* [Response caching in ASP.NET Core]
* [Response compression in ASP.NET Core]
* [Bundle and minify static assets]
* [profiling tools (C#, Visual Basic, C++, F#)]
* [Large Object Heap]
* [Connection Pooling]
* [Pooling large arrays with ArrayPool]
* [Distributed caching in ASP.NET Core]
* [Optimization of Correlated Subqueries]
* [Client vs. Server Evaluation]
* [Asynchronous Programming]


## Do's & Don't's
### **Do's**
* Make hot code paths asynchronous.
* Call data access, I/O, and long-running operations APIs asynchronously if an asynchronous API is available.
* Make controller/Razor Page actions asynchronous. The entire call stack is asynchronous in order to benefit from async/await patterns.
* Add pagination to mitigate:
    * `OutOfMemoryExceptions`
    * Thread pool starvation
    * Slow response time(s)
    * Frequent garbage collection

    Using page size and page index parameters, developers should favor the design of returning a partial result. When an exhaustive result is required, pagination should be used to asynchronously populate batches of results to avoid locking server resources.
* Use `ToListAsync` before returning the enumerable.
* Consider caching large objects that are frequently used. Caching large objects prevents expensive allocations.
* Pool buffers by using an `ArrayPool<T>` to store large arrays.
* Call all data access APIs asynchronously.
* Consider caching frequently accessed data retrieved from a database or remote service if slightly out-of-date data is acceptable. Depending on the scenario, use a `MemoryCache` or a `DistributedCache`.
* Minimize network round trips. The goal is to retrieve the required data in a single call rather than several calls.
* Use `no-tracking` queries in Entity Framework Core when accessing data for read-only purposes. EF Core can return the results of no-tracking queries more efficiently.
* Filter and aggregate `LINQ` queries (with `.Where`, `.Select`, or `.Sum`, etc.) so that the filtering is performed by the database.
* Consider that EF Core resolves some query operators on the client, which may lead to inefficient query execution. For more information, see [Client vs. Server Evaluation].
* use `HttpClientFactory` to retrieve `HttpClient` instances.
* use performance profiling tools.
* Consider handling long-running requests with background services or out of process. Completing work out-of-process is especially beneficial for CPU-intensive tasks.
* Use real-time communication options, such as SignalR, to communicate with clients asynchronously.
* Use the bundling and minification guidelines, which mentions compatible tools and shows how to use ASP.NET Core's environment tag to handle both Development and Production environments.
* Consider other third-party tools, such as `Webpack`, for complex client asset management.
* Include logic in the app to detect and handle conditions that would cause an exception.
* Throw or catch exceptions for unusual or unexpected conditions.

### **Don't's**
* Block asynchronous execution by calling `Task.Wait` or `Task<TResult>.Result`.
* Acquire locks in common code paths. ASP.NET Core apps are most performant when architected to run code in parallel.
* Call `Task.Run` and immediately await it. ASP.NET Core already runs app code on normal Thread Pool threads, so calling `Task.Run` only results in extra unnecessary Thread Pool scheduling. Even if the scheduled code would block a thread, `Task.Run` does not prevent that.
* Use `Task.Run` to make a synchronous API asynchronous.
* Allocate many, short-lived, large, objects on hot code paths.
* Retrieve more data than is necessary. Write queries to return just the data that's necessary for the current HTTP request.
* Use projection queries on collections, which can result in executing "N + 1" SQL queries. For more information, see [Optimization of Correlated Subqueries].
* Create and dispose of HttpClient instances directly.
* Use custom middleware components with long-running tasks.
* Wait for long-running tasks to complete as part of ordinary HTTP request processing.
* Use throwing or catching exceptions as a means of normal program flow, especially in hot code paths.
* 



[ASP.NET Core Performance Best Practices]: https://learn.microsoft.com/en-us/aspnet/core/performance/performance-best-practices?view=aspnetcore-6.0#understand-hot-code-paths

[Response caching in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/caching/response?view=aspnetcore-6.0

[Response compression in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/response-compression?view=aspnetcore-6.0

[Bundle and minify static assets]: https://learn.microsoft.com/en-us/aspnet/core/client-side/bundling-and-minification?view=aspnetcore-6.0

[profiling tools (C#, Visual Basic, C++, F#)]: https://learn.microsoft.com/en-us/visualstudio/profiling/profiling-feature-tour?view=vs-2022

[Large Object Heap]: https://devblogs.microsoft.com/dotnet/large-object-heap/

[Connection Pooling]: https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests

[Pooling large arrays with ArrayPool]: https://adamsitnik.com/Array-Pool/#the-problem

[Distributed caching in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/caching/distributed?source=recommendations&view=aspnetcore-6.0

[Garbage Collection and Performance]: https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/performance

[Client vs. Server Evaluation]: https://learn.microsoft.com/en-us/ef/core/querying/client-eval#client-evaluation-performance-issues

[Optimization of Correlated Subqueries]: https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-2.1#optimization-of-correlated-subqueries

[Asynchronous Programming]: https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md#warning-sync-over-async