`maven-repo` is a Maven repository for my personal projects. Originally, it was
closed-source, however now I'm moving it onto a public GitHub repo. This site
is built with Handlebars and Markdown by Travis CI.

The <span class="glyphicon glyphicon-file"></span> icon is for the `pom.xml`;
the <span class="glyphicon glyphicon-circle-arrow-down"></span> is for the
JAR.
### Usage
#### ...with Maven
```
<repositories>
    <repository>
        <id>thatlittlegit</id>
        <url>https://gh.thatlittlegit.tk/maven-repo</url>
    </repository>
</repositories>
```
#### ...with Gradle
```
repositories {
    maven {
        name 'thatlittlegit'
        url 'https://gh.thatlittlegit.tk/maven-repo'
    }
}
```
