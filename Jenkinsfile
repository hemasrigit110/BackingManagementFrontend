pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/hemasrigit110/BackingManagementFrontend.git', branch: 'main'
            }
        }

        stage('NPM RUN') {
            steps {
                sh 'nohup npm run dev -- --host 0.0.0.0 > frontend.log 2>&1 &'
            }
        }
    }
}