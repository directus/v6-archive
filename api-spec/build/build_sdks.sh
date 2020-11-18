#!/bin/bash

git clone https://github.com/swagger-api/swagger-codegen.git -b 3.0.0
cp /configs/codegen.diff swagger-codegen/
cp /configs/*.json swagger-codegen/
cd swagger-codegen/

git apply codegen.diff || exit 1

mvn clean package || exit 1

for language in ruby python java objc csharp go;
do
  mkdir -p /sdks/${language}_sdk;
  java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i directus-api-1.1.json -l ${language} -o /sdks/${language}_sdk -c ${language}_config.json;
done;

