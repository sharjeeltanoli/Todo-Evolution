# Feature Specification: Kubernetes Resource Manifests

**Feature Branch**: `008-k8s-resource-manifests`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "Create Kubernetes resource manifests following constitution section 14.8. Define Deployments with resource limits, health probes, and environment variables. Create ClusterIP Services for internal communication and LoadBalancer for external access. Follow Phase IV standards."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Deploy and Scale Core Services (Priority: P1)

As a DevOps Engineer, I want to deploy the Todo application services (Frontend, Backend, MCP) to Kubernetes using declarative manifests so that I can ensure consistent state and easy scaling of the application components.

**Why this priority**: Fundamental requirement for Phase IV Kubernetes migration.

**Independent Test**: Successfully apply the manifests to a Minikube cluster and verify that all three services (frontend, backend, mcp) have active pods and associated services.

**Acceptance Scenarios**:

1. **Given** a Kubernetes cluster, **When** I apply the deployment manifests, **Then** pods for all three services reach the "Running" state.
2. **Given** a running deployment, **When** I increase the replica count in the manifest and re-apply, **Then** Kubernetes automatically scales the number of pods without downtime.

---

### User Story 2 - Automated Health Monitoring and Recovery (Priority: P2)

As a System Operator, I want the Kubernetes cluster to automatically monitor the health of my application pods so that unhealthy instances are automatically restarted or removed from rotation.

**Why this priority**: Ensures high availability and resilience of the application in production.

**Independent Test**: Simulate an application failure (e.g., stopping the process inside the pod) and verify that the liveness probe triggers a pod restart.

**Acceptance Scenarios**:

1. **Given** a running backend pod, **When** the `/health` endpoint fails to respond, **Then** Kubernetes restarts the pod based on the liveness probe configuration.
2. **Given** a new frontend pod starting up, **When** it passes its readiness probe, **Then** it starts receiving traffic from the service.

---

### User Story 3 - Secure Internal Communication and External Access (Priority: P2)

As a Security Engineer, I want to isolate internal service traffic and expose only the necessary endpoints so that the application's attack surface is minimized.

**Why this priority**: Aligns with Phase IV security standards (Section 14.16).

**Independent Test**: Verify that the backend is only reachable via its internal DNS name within the cluster and that the frontend is accessible via the LoadBalancer IP.

**Acceptance Scenarios**:

1. **Given** the backend service, **When** I check its type, **Then** it is `ClusterIP`, preventing direct external access.
2. **Given** the frontend service, **When** I check its type, **Then** it is `LoadBalancer`, allowing external users to access the application.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide Deployment manifests for Frontend, Backend, and MCP Server.
- **FR-002**: Every Deployment MUST define CPU and Memory requests and limits as per Section 14.14.
- **FR-003**: Every Deployment MUST implement Liveness and Readiness probes as per Section 14.12.
- **FR-004**: System MUST provide ClusterIP Service manifests for the Backend and MCP Server for internal DNS resolution.
- **FR-005**: System MUST provide a LoadBalancer Service manifest for the Frontend to enable external access (via Minikube tunnel).
- **FR-006**: Pods MUST source environment variables (DB URLs, secrets) from ConfigMaps and Secrets.
- **FR-007**: Deployments MUST specify a non-root security context for all containers as per Section 14.16.
- **FR-008**: Manifests MUST follow Phase IV naming conventions and labeling standards (e.g., `app: todo-frontend`).

### Key Entities *(include if feature involves data)*

- **Deployment**: Declarative definition of the desired state for a set of pods.
- **Service**: Abstraction that defines a logical set of pods and a policy by which to access them.
- **Resource Limits**: Boundary for CPU and Memory consumption to prevent resource exhaustion.
- **Probes**: Health checks used by Kubernetes to determine pod status (Liveness/Readiness).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All manifests pass `kubectl apply --dry-run=client` validation.
- **SC-002**: Pods transition to "Ready" state within 30 seconds of deployment.
- **SC-003**: Resource consumption of pods stays within 90% of defined limits under normal load.
- **SC-004**: LoadBalancer service provides a reachable IP/URL for the frontend within Minikube.
- **SC-005**: All pods run with a non-root UID as verified by `kubectl exec ... id`.
