pipeline {
    agent any

    environment {
        PROJECT_NAME   = 'microsservico_relatorio'
        COMPOSE_FILE   = 'docker-compose.yml'
        CONTAINER_NAME = 'biblioteca-relatorio'
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
                sh 'docker compose -f ${COMPOSE_FILE} up -d --build --remove-orphans'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Aguardando o serviço iniciar..."
                    for i in $(seq 1 15); do
                        STATUS=$(docker inspect --format="{{.State.Health.Status}}" ${CONTAINER_NAME} 2>/dev/null || echo "none")
                        if [ "$STATUS" = "healthy" ]; then
                            echo "Serviço respondendo com sucesso! (healthy)"
                            exit 0
                        fi
                        # Fallback: tenta wget direto caso o HEALTHCHECK ainda não tenha rodado
                        if docker exec ${CONTAINER_NAME} wget -qO- http://localhost:9504/health > /dev/null 2>&1; then
                            echo "Serviço respondendo com sucesso! (wget)"
                            exit 0
                        fi
                        echo "Tentativa $i/15 — status: $STATUS — aguardando 5s..."
                        sleep 5
                    done
                    echo "Serviço não respondeu dentro do prazo."
                    docker compose -f ${COMPOSE_FILE} logs --tail=30
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