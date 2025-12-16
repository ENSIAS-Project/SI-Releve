package ma.ensias.sireleve.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "adresse")
public class Adresse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdresse;

    @Column(nullable = false)
    private String adresseComplete;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_quartier")
    private Quartier quartier;
}