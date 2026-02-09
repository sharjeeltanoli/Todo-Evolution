# Instructions to Resolve Kubernetes Pod Issues

To fully resolve the `ImagePullBackOff` errors across all your services and ensure the `todo-backend` starts correctly, please follow these steps:

## 1. Update GitHub Actions Workflow for DigitalOcean Container Registry

The `ImagePullBackOff` errors are occurring because your Kubernetes cluster does not have the necessary authentication to pull images from the DigitalOcean Container Registry. This needs to be configured in your GitHub Actions deployment workflow.

1.  **Locate your GitHub Actions workflow file** (e.g., `.github/workflows/deploy.yml`) in your remote GitHub repository.
2.  **Edit the workflow file** to include a step that logs into the DigitalOcean Container Registry and creates/updates the Kubernetes secret.
    *   Find the step that says "Log in to DigitalOcean Container Registry" or a similar login step.
    *   **Immediately after this login step, or before any `kubectl apply` commands that deploy your services, add the following command:**
        ```yaml
        - name: Configure Kubernetes Secret for DigitalOcean Registry
          run: doctl registry kubernetes-manifest | kubectl apply -f -
          env:
            DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
        ```
        This command uses `doctl` (DigitalOcean CLI) to generate a Kubernetes secret containing your registry credentials and applies it to your cluster. This secret will then be used by your pods (due to the `imagePullSecrets` configuration I've already applied) to authenticate and pull the images.
3.  **Commit and push this change to your GitHub repository.** This will trigger your GitHub Actions workflow, and new pods will be able to pull their images successfully.

## 2. Verify `todo-secrets` (Already Done)

You provided the `DATABASE_URL`, and I have already updated the `k8s/cloud/todo-secrets.yaml` file with this value and committed it. The `todo-backend` deployment has also been restarted to pick up this change.

Once the `ImagePullBackOff` issue is resolved by updating your GitHub Actions workflow, the `todo-backend` pods should start successfully, as the `DATABASE_URL` error has been addressed.

---

**Summary of the current state:**

*   **`k8s/cloud/todo-secrets.yaml`**: Updated and committed with the correct `DATABASE_URL`.
*   **Kubernetes Deployments**: All application deployments (`todo-frontend`, `notification-service`, `recurring-task-service`, `todo-backend`) have been patched to include `imagePullSecrets: [{name: todo-app-registry-123}]`.
*   **Remaining Issue**: `ImagePullBackOff` for all application pods due to invalid/missing DigitalOcean registry credentials in the Kubernetes cluster. This will be resolved by the GitHub Actions workflow update described in step 1.

Please let me know once you have updated your GitHub Actions workflow and pushed the changes.
