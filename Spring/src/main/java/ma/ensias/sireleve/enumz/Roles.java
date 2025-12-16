package ma.ensias.sireleve.enumz;

public enum Roles {
    ROLE_SUPERADMIN("ROLE_SUPERADMIN"),
    ROLE_UTILISATEUR("ROLE_UTILISATEUR");

    private final String roleName;

    Roles(String roleName) {
        this.roleName = roleName;
    }

    public String getString() {
        return roleName;
    }

    @Override
    public String toString() {
        return roleName;
    }

    public static Roles fromSimpleName(String name) {
        if (name == null)
            return null;
        return switch (name.toUpperCase()) {
            case "SUPERADMIN" -> ROLE_SUPERADMIN;
            case "UTILISATEUR" -> ROLE_UTILISATEUR;
            default -> null;
        };
    }
}