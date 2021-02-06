Commands:

- skaffold dev

- docker build -t <container name> .
- docker push <container name>

- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
- kubectl get secrets
- kubectl get pods
- kubectl describe pod <pod name>
- kubectl get namespace
- kubectl get services -n ingress-nginx
- kubectl exec -it <pod name> sh

Add ticketing.dev into C:\Windows\System32\drivers\etc\hosts -> 127.0.0.1 ticketing.dev

// start typescript config file
tsc --init

// publishing to npm
npm login
npm publish --access public
npm version patch
