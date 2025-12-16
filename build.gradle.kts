tasks.register("StackRun") {
    group = "application"
    description = "Build the Angular project and run the Spring Boot application"
    dependsOn("Angular:Ngbuild", "Spring:bootRun")
}
tasks.register("StackTest") {
    group = "application"
    description = "Build the Angular project and run the Spring Boot application"
    dependsOn("Angular:Ngtest", "Spring:test")
}

