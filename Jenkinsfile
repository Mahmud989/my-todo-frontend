pipeline {
    agent any
    options {
      disableConcurrentBuilds()
    }
    stages {
        stage ('Git - Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false,
                 extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'Jenkins-git-auth',
                  url: 'https://github.com/Mahmud989/my-todo-frontend.git']]])
            }
        }

//         stage('Install') {
//           steps { sh 'npm install'
//           }
//         }
//
//         stage ('ngbuild ') {
//             steps {
//                 sh 'npm run build'
//             }
//         }

        stage ('Docker build') {
            steps {
                sh 'docker build -t hub.letsecure.az/my-todo-frontend . '
            }
        }

        stage ('Docker push') {
            steps {
                sh 'docker push hub.letsecure.az/my-todo-frontend'
            }
        }

        stage ('Docker rm') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh "exit 0"
                }
                sh 'docker-compose rm -f -s my-todo-frontend  && echo "container my-todo-frontend removed" || echo "container my-todo-frontend does not exist"'
            }
        }

        stage ('Docker up') {
            steps {
                sh 'docker-compose up -d my-todo-frontend'
            }
        }
    }
}
