#!/bin/bash

docker run -it --rm --name kube-frontend -p 3000:3000 -v $(pwd):/usr/frontend mikereem/kube-frontend:dev /bin/sh