FROM centos:7

RUN yum -y install git java-1.7.0-openjdk java-1.7.0-openjdk-devel wget which rubygems ruby-devel gcc make python-setuptools
RUN yum -y install golang-bin golang-tests golang yum-utils
RUN rpm --import "http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF"
RUN yum-config-manager --add-repo http://download.mono-project.com/repo/centos7/
RUN yum -y install mono-devel
RUN wget http://mirrors.sonic.net/apache/maven/maven-3/3.2.5/binaries/apache-maven-3.2.5-bin.tar.gz
RUN wget https://bootstrap.pypa.io/get-pip.py && python get-pip.py && pip install nose
RUN tar -zxf apache-maven-3.2.5-bin.tar.gz && mv apache-maven-3.2.5 /usr/local/ && ln -s /usr/local/apache-maven-3.2.5/bin/mvn /usr/bin/mvn
RUN gem install rspec rake typhoeus


COPY build/build_sdks.sh /build/
COPY configs /configs

WORKDIR "/build"
RUN ./build_sdks.sh

WORKDIR "/sdks/ruby_sdk"
RUN echo "Running Ruby tests" && rspec spec/* && echo ""

WORKDIR "/sdks/python_sdk"
RUN echo "Running Python tests" && pip install -r requirements.txt && nosetests && echo ""

WORKDIR "/sdks/java_sdk"
RUN echo "Running Java tests" && chmod a+x ./gradlew && mvn test && echo ""

WORKDIR "/sdks/go_sdk"
RUN echo "Running Golang tests" && go get -d -v . && go build -v ./ && echo ""

WORKDIR "/sdks/csharp_sdk"
RUN echo "Running C# tests" && /bin/sh ./mono_nunit_test.sh && echo ""
