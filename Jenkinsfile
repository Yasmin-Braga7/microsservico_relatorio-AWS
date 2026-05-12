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
                // Comando batch para Windows
                bat 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                // Comando batch para Windows para subir os containers
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline Windows finalizada!'
        }
        success {
            echo 'Deploy realizado com sucesso no ambiente Windows.'
        }
        failure {
            echo 'Ocorreu um erro no pipeline do Windows.'
        }
    }
}
