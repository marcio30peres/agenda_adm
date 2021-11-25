import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}
