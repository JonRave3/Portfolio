# API Resources and examples for both NodeJS and C# WebAPI

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

## Do's & Don't's
### Do's
* Make hot code paths asynchronous.
* Call data access, I/O, and long-running operations APIs asynchronously if an asynchronous API is available.
* Make controller/Razor Page actions asynchronous. The entire call stack is asynchronous in order to benefit from async/await patterns.
* add pagination to mitigate the preceding scenarios. Using page size and page index parameters, developers should favor the design of returning a partial result. When an exhaustive result is required, pagination should be used to asynchronously populate batches of results to avoid locking server resources.
* use `ToListAsync` before returning the enumerable.

### Don't's
* Block asynchronous execution by calling `Task.Wait` or `Task<TResult>.Result`.
* Acquire locks in common code paths. ASP.NET Core apps are most performant when architected to run code in parallel.
* Call `Task.Run` and immediately await it. ASP.NET Core already runs app code on normal Thread Pool threads, so calling `Task.Run` only results in extra unnecessary Thread Pool scheduling. Even if the scheduled code would block a thread, `Task.Run` does not prevent that.
* use `Task.Run` to make a synchronous API asynchronous.


[ASP.NET Core Performance Best Practices]: https://learn.microsoft.com/en-us/aspnet/core/performance/performance-best-practices?view=aspnetcore-6.0#understand-hot-code-paths

[Response caching in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/caching/response?view=aspnetcore-6.0

[Response compression in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/response-compression?view=aspnetcore-6.0

[Bundle and minify static assets]: https://learn.microsoft.com/en-us/aspnet/core/client-side/bundling-and-minification?view=aspnetcore-6.0

[profiling tools (C#, Visual Basic, C++, F#)]: https://learn.microsoft.com/en-us/visualstudio/profiling/profiling-feature-tour?view=vs-2022

[Large Object Heap]: https://devblogs.microsoft.com/dotnet/large-object-heap/

[Connection Pooling]: https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests

[Pooling large arrays with ArrayPool]: https://adamsitnik.com/Array-Pool/#the-problem

[Distributed caching in ASP.NET Core]: https://learn.microsoft.com/en-us/aspnet/core/performance/caching/distributed?source=recommendations&view=aspnetcore-6.0