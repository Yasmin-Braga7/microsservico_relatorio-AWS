pipeline {
    agent any

    environment {
        PROJECT_NAME     = 'microsservico_relatorio'
        COMPOSE_FILE     = 'docker-compose.yml'
        CONTAINER_NAME   = 'biblioteca-relatorio'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose -f ${COMPOSE_FILE} build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                // --build garante rebuild; --remove-orphans remove containers obsoletos
                sh 'docker compose -f ${COMPOSE_FILE} up -d --build --remove-orphans'
            }
        }

        stage('Health Check') {
            steps {
                // Aguarda até 30 s para o serviço responder
                sh '''
                    echo "Aguardando o serviço iniciar..."
                    for i in $(seq 1 10); do
                        if docker exec ${CONTAINER_NAME} wget -qO- http://localhost:9504/health > /dev/null 2>&1; then
                            echo "Serviço respondendo com sucesso!"
                            exit 0
                        fi
                        echo "Tentativa $i/10 — aguardando 3s..."
                        sleep 3
                    done
                    echo "Serviço não respondeu dentro do prazo."
                    exit 1
                '''
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
            echo 'Ocorreu um erro no pipeline. Verificando logs...'
            sh 'docker compose -f ${COMPOSE_FILE} logs --tail=50 || true'
        }
    }
}