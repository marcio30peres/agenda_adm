import {
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm";
import Colaborador from "./Colaborador";
import Unidade from "./Unidade";

@Entity()
export default class Agendamento {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(type => Colaborador)
    @JoinColumn({ name: "id_colaborador", referencedColumnName: "id" })
    colaborador: Colaborador
    
    @ManyToOne(type => Unidade, unidade => unidade.agendamentos)
    @JoinColumn({ name: "id_unidade", referencedColumnName: "id" })
    unidade: Unidade

    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    horario: Date

    @Column()
    status: string
}
