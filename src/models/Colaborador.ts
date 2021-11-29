import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Agendamento from "./Agendamento";

@Entity()
export default class Colaborador {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    telefone: string

    @Column()
    email: number

    @Column()
    status: string

    @OneToMany(type => Agendamento, agendamentos => agendamentos.colaborador)
    agendamentos: Agendamento[]
}
