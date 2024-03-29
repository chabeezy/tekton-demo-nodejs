# Tekton Demo

Demo of building, testing and running a Hello World Node app using Tekton.

Tekton is a powerful yet flexible Kubernetes-native open-source framework for creating continuous integration
and delivery (CI/CD) systems. It lets users build, test, and deploy across multiple cloud providers or on-premises
systems by abstracting away the underlying implementation details.

This repo will help you set up your first pipeline, you'll pull some code, build it, test it, and run it - all from tekton!

## Setup
```
# Install minikube, and tekton cli
   Via brew from https://formulae.brew.sh/formula/minikube

# Start Minikube

    minikube start

# Install tekton    

  kubectl apply --filename \
https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml

kubectl get pods --namespace tekton-pipelines --watch


# Add Git Clone task from tekton hub, many more at tekton hub

    tkn hub install task git-clone

# Add tasks

    kubectl apply -f tekton/task-node-build.yaml
    kubectl apply -f tekton/task-node-test.yaml
    kubectl apply -f tekton/task-node-run.yaml

# Install the Pipeline

      kubectl apply -f tekton/pipeline.yaml

# Make the Persistent Volume Claim that we'll be using 

      kubectl apply -f tekton/workspace.yaml

# Execute the Pipeline
      tkn pipeline start --showlog \
    -f tekton/pipeline.yaml \
    -p package=github.com/chabeezy/tekton-demo-nodejs \
    -w name=workarea,volumeClaimTemplateFile=tekton/workspace.yaml

  tkn pipelinerun ls
  tkn pipelinerun describe -L
  tkn taskrun describe <taskRunName>
  kubectl describe tr <taskRunName>
  kubectl get -o yaml pod <podName> | less
