PROJECT_NAME := mikereem/kube-frontend
VERSION := 1.0.0

build:
	docker build -t $(PROJECT_NAME):$(VERSION) -t $(PROJECT_NAME):latest .
build-dev:
	docker build -t $(PROJECT_NAME):dev --target dev .
push:
	docker push $(PROJECT_NAME):$(VERSION)
	docker push $(PROJECT_NAME):latest
dev:
	docker run -it --rm --name kube-frontend -p 3000:3000 -v ${CURDIR}:/usr/frontend $(PROJECT_NAME):dev /bin/sh