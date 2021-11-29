import {
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn
} from "typeorm";
import Arquivo from "./Arquivo";
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

    @OneToOne(type => Arquivo)
    @JoinColumn({ name: "id_arquivo", referencedColumnName: "id" })
    arquivo: Arquivo

    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    horario: Date

    @Column()
    status: string
}
