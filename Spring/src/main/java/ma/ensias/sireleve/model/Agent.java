package ma.ensias.sireleve.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "agent")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAgent;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    private String telPersonnel;
    private String telProfessionnel;

    @ManyToOne
    @JoinColumn(name = "id_quartier")
    private Quartier quartier;

    @OneToMany(mappedBy = "agent")
    private List<Releve> releves;

    // Getters & Setters
}