package ma.ensias.sireleve.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "quartier")
public class Quartier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idQuartier;

    @Column(nullable = false)
    private String nomQuartier;

    @OneToMany(mappedBy = "quartier")
    private List<Adresse> adresses;

    @OneToMany(mappedBy = "quartier")
    private List<Agent> agents;

}