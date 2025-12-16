import com.github.gradle.node.npm.task.NpmTask
import com.github.gradle.node.task.NodeTask

plugins {
	id("com.github.node-gradle.node") version "7.0.2"
}


node {
    version.set("24.11.1")
    npmVersion.set("")
    yarnVersion.set("")
    npmInstallCommand.set("install")
    distBaseUrl.set("https://nodejs.org/dist")
    download.set(true)
    workDir.set(file("${project.projectDir}/.cache/nodejs"))
    npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
    yarnWorkDir.set(file("${project.projectDir}/.cache/yarn"))
    nodeProjectDir.set(file("${project.projectDir}"))
}

tasks.npmInstall {
    nodeModulesOutputFilter {
        exclude("notExistingFile")
    }
}


val installAngularUsingNpm = tasks.register<NpmTask>("installAngular") {
    dependsOn(tasks.npmInstall)
    npmCommand.set(listOf("install", "-g @angular/cli"))
    //args.set(listOf("arg2"))
    ignoreExitValue.set(false)
    //environment.set(mapOf("MY_CUSTOM_VARIABLE" to "hello"))
    workingDir.set(projectDir)
    execOverrides {
        standardOutput = System.out
    }
    inputs.dir("node_modules")
    inputs.file("package.json")
    inputs.dir("src")
    //inputs.dir("arg3") ANAS: uncomment this line and set the folder where the angular project reside starting from the folder where build.gradle.kts reside
    outputs.upToDateWhen {
        true
    }
}

tasks.register<NodeTask>("Ngserve") {
    dependsOn(installAngularUsingNpm)
    script.set(file("node_modules/@angular/cli/bin/ng.js"))
    args.set(listOf("serve"))
    ignoreExitValue.set(false)
    //environment.set(mapOf("MY_CUSTOM_VARIABLE" to "hello"))
    workingDir.set(projectDir)
    execOverrides {
        standardOutput = System.out
    }
    inputs.dir("src")
    outputs.upToDateWhen {
        false
    }
}

tasks.register<NodeTask>("Ngbuild") {
    dependsOn(installAngularUsingNpm)
    script.set(file("node_modules/@angular/cli/bin/ng.js"))
    args.set(listOf("build"))
    ignoreExitValue.set(false)
    workingDir.set(projectDir)
    execOverrides {
        standardOutput = System.out
    }
    inputs.dir("src")
    outputs.upToDateWhen {
        false
    }
}


tasks.register<NodeTask>("Ngtest") {
    dependsOn(installAngularUsingNpm)
    script.set(file("node_modules/@angular/cli/bin/ng.js"))
    args.set(listOf("test"))
    ignoreExitValue.set(false)
    //environment.set(mapOf("MY_CUSTOM_VARIABLE" to "hello"))
    workingDir.set(projectDir)
    execOverrides {
        standardOutput = System.out
    }
    inputs.dir("src")
    outputs.upToDateWhen {
        false
    }
}

repositories {
	mavenCentral()
}
