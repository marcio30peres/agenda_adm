import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Agendamento from "./Agendamento";

@Entity()
export default class Unidade {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    tipo_logradouro: string

    @Column()
    logradouro: string

    @Column()
    numero: number

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    uf: string

    @OneToMany(type => Agendamento, agendamentos => agendamentos.colaborador)
    agendamentos: Agendamento[]
}
