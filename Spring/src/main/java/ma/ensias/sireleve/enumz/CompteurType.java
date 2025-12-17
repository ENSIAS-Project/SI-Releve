package ma.ensias.sireleve.enumz;

public enum CompteurType {
    ELECTRICITE("ELECTRICITE"),
    EAU("EAU");

    private final String type;

    CompteurType(String roleName) {
        this.type = roleName;
    }

    public String getString() {
        return type;
    }

    @Override
    public String toString() {
        return type;
    }


}
