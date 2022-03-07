CURR_PATH := $(shell pwd)
APP_DIR = $(shell echo "app")
APP_NAME = $(shell echo "composition-api")

.PHONY: prep-dev-env-win
prep-dev-env-win:  ## Prepares dev environment for windows os
	@powershell Set-ExecutionPolicy RemoteSigned && [Environment]::Is64BitProcess

.PHONY: build-dev-env
build-dev-env:  ## Build dev instance on your local machine
	@docker-compose \
 		--file docker-compose.yml \
 		--project-name $(APP_NAME) \
 		build
	@echo "[DEV-INFO] DEV instances were successfully built!"

.PHONY: run-dev-env
run-dev-env:  ## Run DEV instance
	@docker-compose \
		--file docker-compose.yml up \
		--detach \
		app
	@echo "[DEV-INFO] DEV instance(s) were successfully started!"

.PHONY: run-unit-tests
run-unit-tests:  ## Run unit tests on DEV instance
	@docker-compose \
		--file docker-compose.yml run \
		--rm \
		--user root \
		app \
		sh -c "yarn test:unit"
	@echo "[DEV-INFO] Unit Tests on DEV instance(s) were successfully run!"

.PHONY: down-dev-env
down-dev-env:  ## Stop and clear DEV instance
	@docker-compose \
		--file docker-compose.yml \
 		down --remove-orphans
	@echo "[DEV-INFO] DEV instances were successfully stopped."
