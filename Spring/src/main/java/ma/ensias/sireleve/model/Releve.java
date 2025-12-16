package ma.ensias.sireleve.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "releve")
public class Releve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReleve;

    @Column(nullable = false)
    private LocalDate dateReleve;

    @Column(nullable = false)
    private Integer index;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_compteur")
    private Compteur compteur;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_agent")
    private Agent agent;
}