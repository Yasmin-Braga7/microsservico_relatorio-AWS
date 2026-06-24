pipeline {
    agent any
    
    environment {
        PROJECT_NAME = 'microsservico_relatorio'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada!'
        }
        success {
            echo 'Deploy realizado com sucesso.'
        }
        failure {
            echo 'Ocorreu um erro no pipeline.'
        }
    }
}
