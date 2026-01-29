# Feature Specification: Helm Charts for Todo Application

**Feature Branch**: `007-helm-charts-todo`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "Create Helm charts for Todo application following constitution section 14.7. Include Chart.yaml, values.yaml, values-dev.yaml, values-prod.yaml. Create templates for Deployment, Service, ConfigMap, Secret, and Ingress resources for frontend, backend, and MCP server."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Deploy Application to Kubernetes using Helm (Priority: P1)

As a DevOps Engineer, I want to deploy the entire Todo application (Frontend, Backend, and MCP Server) to a Kubernetes cluster using Helm charts so that the deployment is manageable, versioned, and repeatable.

**Why this priority**: Core requirement for Phase IV to move beyond individual manifest management and enable cluster-wide deployments.

**Independent Test**: Successfully run `helm install` using the developed charts and verify all three services are up and running in the cluster.

**Acceptance Scenarios**:

1. **Given** a Kubernetes cluster (Minikube), **When** I run `helm install todo-app ./helm/todo-app`, **Then** Deployments, Services, and ConfigMaps are created for frontend, backend, and MCP server.
2. **Given** the deployed application, **When** I verify the pods, **Then** all pods reach a "Running" state and pass their readiness probes.

---

### User Story 2 - Environment-Specific Configuration (Priority: P2)

As a DevOps Engineer, I want to provide different configurations for development and production environments using Helm values files so that I can easily switch environment settings without modifying the core templates.

**Why this priority**: Necessary for proper lifecycle management and security (e.g., using different database URLs or replica counts in prod).

**Independent Test**: Perform a dry-run install with `values-dev.yaml` and `values-prod.yaml` and verify the generated manifests reflect the environment-specific values.

**Acceptance Scenarios**:

1. **Given** `values-dev.yaml` with 1 replica, **When** I run a helm dry-run, **Then** the resulting Deployment manifest specifies `replicas: 1`.
2. **Given** `values-prod.yaml` with 3 replicas, **When** I run a helm dry-run, **Then** the resulting Deployment manifest specifies `replicas: 3`.

---

### User Story 3 - External Access via Ingress (Priority: P3)

As a User, I want to access the frontend of the application through a stable URL provided by the Kubernetes Ingress so that I don't have to manage port-forwarding or node ports.

**Why this priority**: Standard way of exposing web applications in Kubernetes.

**Independent Test**: Access the application through the host defined in the Ingress resource (after enabling ingress in Minikube and updating hosts file).

**Acceptance Scenarios**:

1. **Given** an Ingress resource is created by the Helm chart, **When** I navigate to the configured host URL, **Then** I am directed to the Todo application frontend.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a standard Helm chart structure as defined in Constitution Section 14.7.
- **FR-002**: Chart MUST include `Chart.yaml` with metadata and `values.yaml` with default settings.
- **FR-003**: System MUST provide `values-dev.yaml` and `values-prod.yaml` for environment-specific overrides.
- **FR-004**: System MUST include Deployment templates for Frontend, Backend, and MCP Server.
- **FR-005**: System MUST include Service templates for all three components (ClusterIP for internal, LoadBalancer/Ingress for external).
- **FR-006**: System MUST include ConfigMap and Secret templates for managing environment variables and sensitive data.
- **FR-007**: System MUST include Ingress templates for routing external traffic to the Frontend.
- **FR-008**: Templates MUST follow the resource standards defined in Constitution Section 14.8 (requests/limits, probes).

### Key Entities *(include if feature involves data)*

- **Helm Chart**: The collection of templates and values that describe the Kubernetes application.
- **Values File**: YAML files containing parameters that populate the templates.
- **Kubernetes Resource**: The resulting objects (Deployment, Service, etc.) created in the cluster.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Helm chart passes `helm lint` without errors.
- **SC-002**: Deployment of the full stack (3 services) takes less than 2 minutes for all pods to be ready.
- **SC-003**: All secrets and configuration are successfully injected as environment variables from ConfigMaps and Secrets.
- **SC-004**: Ingress correctly routes traffic to the frontend service.
- **SC-005**: No hardcoded application secrets are found in the `values.yaml` or template files.
