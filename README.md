# api-mockery
Mock a server based on exported data from Chrome Dev Tools (network tab)

# run it locally
```
# debug
PORT=8080 FILE='/Users/alex/Desktop/192.168.1.64.har' DEBUG=main,routing api-mockery

# non-debug
PORT=8080 FILE='/Users/alex/Desktop/192.168.1.64.har' api-mockery
```
