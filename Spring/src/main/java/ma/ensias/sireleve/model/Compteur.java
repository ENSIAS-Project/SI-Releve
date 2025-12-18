package ma.ensias.sireleve.model;

import jakarta.persistence.*;
import lombok.Data;
import ma.ensias.sireleve.enumz.CompteurType;

import java.util.List;

@Entity
@Data
@Table(name = "compteur")
public class Compteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompteur;

    @Column(nullable = false)
    private CompteurType typeCompteur;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_client")
    private Client client;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_adresse")
    private Adresse adresse;

    @OneToMany(mappedBy = "compteur")
    private List<Releve> releves;
}