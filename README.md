# NATS Websocket React Practice


### Step 1. Install NATS CLI tool
Server and publisher/subscrition

```bash
brew install nats-server
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
```

### Step 2. Create React App and Set Up Code Base

### Step 3. Nats server configuration
build server.conf in your react project

```
websocket: {
    port: 9090,
    no_tls: true
}
```

### Step 4. Running NATS server
run nats server with configuration

```bash
nats-server -c ./public/server.conf
```

### Step 5. Publish a message

nats pub {subject} {data}
```bash
nats pub hello hahahaha
```

</br>


[NATS doc : Installing](https://docs.nats.io/nats-concepts/what-is-nats/walkthrough_setup)

[NATS doc : Pub Sub](https://docs.nats.io/nats-concepts/core-nats/pubsub)