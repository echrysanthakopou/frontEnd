pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-credentials')
    }
    stages {
        stage ('Stage 1 - Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false, extensions: [],
                    submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'e69ff7f5-1d77-48c6-9f2c-b2123caac355',
                    url: 'https://github.com/echrysanthakopou/frontEnd.git']]])
            }
        }
        stage('Stage 2 - Build Docker Image') {
            steps {
                sh('docker build . -t echrysanthakopou/front:latest')
                sh("docker build . -t echrysanthakopou/front:${env.GIT_COMMIT}")
            }
        }
        stage('Stage 3 - Push Image In DockerHub') {
            steps {
                sh('docker login -u $DOCKERHUB_CREDS_USR -p $DOCKERHUB_CREDS_PSW')
                sh('docker push echrysanthakopou/front:latest')
                sh("docker push echrysanthakopou/front:${env.GIT_COMMIT}")
            }
        }
        stage('Stage 4 - Deploy Frontend') {
            steps {
                sh('microk8s kubectl apply -f ./k8s')
                sh("microk8s kubectl set image deployment frontend pensionapp-frontend=echrysanthakopou/front:${env.GIT_COMMIT} --namespace=pensionapp")
            }
        }
    }
}