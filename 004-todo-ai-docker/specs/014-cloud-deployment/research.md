# Research: Phase V Part C - Cloud Deployment

## Decision 1: DOKS Cluster Configuration
- **Choice**: 3 Nodes of "s-2vcpu-2gb" (Basic Droplets).
- **Rationale**: 
    - Cost: $12/node/month = $36 total. 
    - Resources: 6 vCPUs and 6GB RAM total across the cluster.
    - Capacity: Sufficient to run Dapr sidecars (approx 100MB each), 4 microservices (2 replicas each), and Kubernetes overhead (Kubelet, etc.).
    - Reliability: 3 nodes provide better rescheduling flexibility than 2 nodes if one fails.
- **Alternatives Considered**: 
    - 2 Nodes of "s-2vcpu-4gb": More RAM per node, but less redundancy.
    - General Purpose Droplets: Too expensive for the $200 credit limit for a demo.

## Decision 2: Redpanda Cloud Connectivity (Dapr)
- **Choice**: SASL/SCRAM authentication via Dapr PubSub Component.
- **Rationale**: 
    - Security: Redpanda Cloud Serverless requires TLS + SASL/SCRAM.
    - Implementation: Dapr's `pubsub.kafka` component supports SASL via `authType: password` and `saslMechanism: SCRAM-SHA-256`.
    - Secrets: Bootstrap URL, Username, and Password will be stored in K8s Secrets and referenced in the Dapr YAML.
- **Alternatives Considered**: 
    - Plain Kafka client: Too much boilerplate; Dapr sidecar abstracts this perfectly.

## Decision 3: CI/CD Strategy
- **Choice**: GitHub Actions with `digitalocean/action-doctl`.
- **Rationale**: 
    - Automation: Official DO action allows seamless `kubeconfig` retrieval.
    - Security: No need to store long-lived static kubeconfig; use `DIGITALOCEAN_TOKEN` to generate a short-lived one.
    - Registry: `docker/login-action` supports `registry.digitalocean.com`.
- **Alternatives Considered**: 
    - Manual kubectl apply: Error-prone and violates "Zero Manual Deploys" principle.

## Decision 4: LoadBalancer and Ingress
- **Choice**: `Service type: LoadBalancer` for Frontend.
- **Rationale**: 
    - Simplicity: Directly provisions a DigitalOcean LoadBalancer ($12/month).
    - Cost: Affordable within $200 credit.
    - Visibility: Provides a clean Public IP for the user.
- **Alternatives Considered**: 
    - Nginx Ingress Controller: Adds complexity (requires cert-manager, separate ingress resources) which is out of scope for "HTTP only".
