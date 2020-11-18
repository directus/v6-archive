#!/bin/bash


docker build -t sdkbuilds . && docker run --name directussdks -d sdkbuilds /bin/bash && docker cp directussdks:/sdks sdks && docker rm directussdks
