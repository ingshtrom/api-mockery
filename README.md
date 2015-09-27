# api-mockery
Mock a server based on exported data from Chrome Dev Tools (network tab)

# installation
```
npm i -g api-mockery
```

# Instructions
1. Run your app as normal with the Chrome dev tools open
2. Open the Network tab in the Chrome dev tools, select a request, right click and select "Save as HAR with Content"
3. Save the file somewhere
4. Run the app:

```
# debug - lots of extra logging
# PORT - the port API Mockery will listen on
# FILE - the absolute path to the exported .har file
PORT=8080 FILE='/Users/alex/Desktop/192.168.1.64.har' DEBUG=main,routing api-mockery

# non-debug
# PORT - the port API Mockery will listen on
# FILE - the absolute path to the exported .har file
PORT=8080 FILE='/Users/alex/Desktop/192.168.1.64.har' api-mockery
```
