# mitm-proxy

demo and testing with mitm http proxy in node.js

These instructions are for MacOS, verified on macOS Mojave version 10.14.6

## Create SSL certs

- Prepare `certs` dir

```bash
mkdir certs
cd certs
```

- dev.myserver.com

```bash
openssl req -new -x509 -nodes -sha256 -days 3650 \
 -newkey rsa:2048 -out dev-server.crt -keyout dev-server.key \
 -extensions SAN -reqexts SAN -subj /CN=dev.myserver.com \
 -config <(cat /etc/ssl/openssl.cnf \
    <(printf '[ext]\nbasicConstraints=critical,CA:TRUE,pathlen:0\n') \
    <(printf '[SAN]\nsubjectAltName=DNS:dev.myserver.com,IP:127.0.0.1\n'))
```

- dev.mydomain.com (proxy)

```bash
openssl req -new -x509 -nodes -sha256 -days 3650 \
 -newkey rsa:2048 -out dev-proxy.crt -keyout dev-proxy.key \
 -extensions SAN -reqexts SAN -subj /CN=dev.mydomain.com \
 -config <(cat /etc/ssl/openssl.cnf \
    <(printf '[ext]\nbasicConstraints=critical,CA:TRUE,pathlen:0\n') \
    <(printf '[SAN]\nsubjectAltName=DNS:dev.mydomain.com,IP:127.0.0.1\n'))
```

## Register certs in System keychain

- dev.myserver.com

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev-server.crt
```

- dev.mydomain.com (proxy)

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev-proxy.crt
```

## Testing

### http to https

```bash
node http-to-https
```

Point browser to `http://localhost:3000`

You should see Google's homepage

### https to https

```bash
node https-to-https
```

Point browser to `https://dev.mydomain.com`

You should see Google's homepage

### https to https with self signed certs

1. In one terminal, start the server

```
node server.js
```

2. In another terminal, start the proxy

```bash
node https-to-https-with-self-certs.js
```

Now point browser to `https://dev.mydomain.com/hello`.

You should get back `"hello world"`.

- custom client CA

To avoid node.js throwing `Error: self signed certificate`, these tests specified the `ca` option in target to use the self signed certificate for CA.

Another way is to add the self signed cert to node.js CA store:

```bash
NODE_EXTRA_CA_CERTS=${PWD}/certs/dev-server.crt node https-to-https-with-self-certs.js
```

## Misc: Generate PKCS12 file

To generate [PKCS12](https://en.wikipedia.org/wiki/PKCS_12) file from certificate key/cert files:

```bash
openssl pkcs12 -export -out dev-server.pfx -inkey dev-server.key -in dev-server.crt
```
