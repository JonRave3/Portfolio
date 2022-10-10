[HTTP.sys]: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/httpsys?view=aspnetcore-6.0
[Kestral vs HTTP.sys]: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/?view=aspnetcore-6.0#kestrel-vs-httpsys

# [Http.sys] Overview
HTTP.sys is a web server for ASP.NET Core that only runs on Windows. HTTP.sys is an alternative to Kestrel server and offers some features that Kestrel doesn't provide. HTTP.sys is mature technology that protects against many types of attacks and provides the robustness, security, and scalability of a full-featured web server. IIS itself runs as an HTTP listener on top of HTTP.sys.

## Features
* Windows Authentication
* Port Sharing
* HTTPS w/ SNI
* HTTP/2 over TLS (Win10+, enabled by default) 
* HTTP/3
* Direct File transmission
* Response Caching
* WebSockets (Win8+)
* gRCP support

## When & Why to Use?
1. Can't/Won't deploy with IIS 
2. An internal deployment requires a feature not available in Kestral ([Kestral vs HTTP.sys]).

